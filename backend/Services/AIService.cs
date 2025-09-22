using OllamaSharp;
using OllamaSharp.Models;
using TodoApp.Models.DTOs.AI;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace TodoApp.Services
{
    public interface IAIService
    {
        Task<AIChatResponseDto> ChatAsync(AIChatRequestDto request);
        Task<ParsedTaskDto?> ParseTaskFromText(string text);
    }

    public class AIService : IAIService
    {
        private readonly OllamaApiClient _ollamaClient;
        private readonly ILogger<AIService> _logger;
        private const string ModelName = "llama3.2:latest";

        public AIService(ILogger<AIService> logger, IConfiguration configuration)
        {
            _logger = logger;
            // Use different URLs for Docker vs Development
            var ollamaUrl = configuration["OllamaUrl"] ?? 
                           (Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true" 
                            ? "http://ollama:11434"  // Docker service name
                            : "http://localhost:11434"); // Local development
            _logger.LogInformation($"Connecting to Ollama at {ollamaUrl}");
            _ollamaClient = new OllamaApiClient(ollamaUrl);
        }

        public async Task<AIChatResponseDto> ChatAsync(AIChatRequestDto request)
        {
            try
            {
                // Build the conversation context
                var conversationContext = BuildConversationContext(request.ConversationHistory);
                
                // Get current dates for the prompt (using UTC time from Docker)
                var now = DateTime.UtcNow;
                var today = now.ToString("yyyy-MM-dd");
                var tomorrow = now.AddDays(1).ToString("yyyy-MM-dd");
                
                _logger.LogInformation($"UTC date calculation: Today = {today}, Tomorrow = {tomorrow}");
                
                // System prompt for Ezra
                var systemPrompt = $@"You are Ezra, an AI assistant for task management. You extract task information and respond naturally.

CRITICAL: NEVER include [taskId], [anything], or any text in square brackets in your responses to users. Be conversational and human-like.

ALWAYS END YOUR RESPONSE WITH THIS HIDDEN SECTION:
[TASK_JSON]
{{
  ""title"": ""extracted title"",
  ""description"": ""extracted description"",
  ""priority"": ""High/Medium/Low"",
  ""dueDate"": ""YYYY-MM-DD or null"",
  ""subtasks"": [""subtask1"", ""subtask2""],
  ""readyToCreate"": true/false
}}

EXTRACTION RULES:
- Title: Extract from 'Create a task to [TITLE]'
- Description: Extract any detailed explanation
- Priority: Look for 'high', 'medium', 'low' priority
- Due date: 'tomorrow' = {tomorrow}, 'today' = {today}
- Subtasks: Extract from lists like 'subtasks: a, b, c' or 'add subtasks: x, y, z'
- Ready: Set to true when user confirms with 'yes', 'ok', 'create it'

When user says something like 'Create a task to [anything]':
- Use the [anything] part as the task title
- Ask for a description: 'Can you tell me more about this task?'
- Ask for priority (if not mentioned)
- Ask for due date (if not mentioned)
- Ask if they want subtasks
- ALWAYS extract subtasks when user mentions them
- Summarize and ask 'Should I create this task for you?'

Date handling:
- If user says 'tomorrow', use tomorrow's date in YYYY-MM-DD format
- If user says 'today', use today's date in YYYY-MM-DD format
- If user gives a specific date, convert to YYYY-MM-DD format

When user confirms with yes/ok/sure:
- Say 'Perfect! I have all the details ready.'
- Set readyToCreate to true in the JSON

INTELLIGENT SUBTASK SUGGESTIONS:
When user doesn't mention subtasks or says they don't know what subtasks to add:
- Analyze the task type and provide helpful suggestions
- For cooking tasks: suggest ingredients, prep steps, cooking steps
- For work tasks: suggest planning, execution, review steps
- For projects: suggest research, planning, implementation, testing
- For shopping: suggest making list, comparing prices, purchasing
- For travel: suggest booking, packing, itinerary, documents
- Always ask: 'Would you like me to suggest some subtasks for [task type]?'
- Then provide 3-5 relevant suggestions based on the task

EXAMPLES:

Example 1 - User provides subtasks:
Input: 'Create a task to review code for security issues. High priority, due tomorrow. Subtasks: check validation, test auth, review logs'
Response: 'I'll create a high priority code review task due tomorrow with 3 subtasks. Should I create this?
[TASK_JSON]
{{
  ""title"": ""review code"",
  ""description"": ""review code for security issues"",
  ""priority"": ""High"",
  ""dueDate"": ""{tomorrow}"",
  ""subtasks"": [""check validation"", ""test auth"", ""review logs""],
  ""readyToCreate"": false
}}'

Example 2 - User needs subtask suggestions:
Input: 'Create a task to cook alfredo chicken pasta. I don't know what subtasks to add'
Response: 'I'll help you with that! For cooking alfredo chicken pasta, I can suggest these subtasks: get ingredients (chicken, pasta, cream, parmesan, garlic), prep ingredients, cook chicken, boil pasta, make alfredo sauce, combine everything. Would you like me to add these subtasks?
[TASK_JSON]
{{
  ""title"": ""cook alfredo chicken pasta"",
  ""description"": ""cook alfredo chicken pasta"",
  ""priority"": ""Medium"",
  ""dueDate"": null,
  ""subtasks"": [""get ingredients (chicken, pasta, cream, parmesan, garlic)"", ""prep ingredients"", ""cook chicken"", ""boil pasta"", ""make alfredo sauce"", ""combine everything""],
  ""readyToCreate"": false
}}'

REMEMBER: Extract ALL information immediately. Always include [TASK_JSON] section.

REMEMBER: The [TASK_JSON] section is REQUIRED in EVERY response but HIDDEN from user.";

                // Combine system prompt with conversation
                var fullPrompt = $"{systemPrompt}\n\n{conversationContext}\nUser: {request.Message}\nEzra:";

                // Call Ollama
                var generateRequest = new GenerateRequest
                {
                    Model = ModelName,
                    Prompt = fullPrompt,
                    Stream = false
                };
                
                var responseStream = _ollamaClient.GenerateAsync(generateRequest);
                var fullResponse = string.Empty;
                
                await foreach (var response in responseStream)
                {
                    if (response != null && !string.IsNullOrEmpty(response.Response))
                    {
                        fullResponse += response.Response; // Concatenate all chunks
                    }
                }

                // Parse the response
                var aiResponse = fullResponse;
                var parsedTask = ExtractTaskFromResponse(aiResponse);
                
                // Clean the response for the user (remove JSON and markers)
                var cleanedResponse = CleanResponse(aiResponse);
                
                // Determine what we're waiting for
                var waitingFor = DetermineWaitingFor(aiResponse, parsedTask);
                
                // Check if the task is ready to create (user confirmed)
                bool isReady = false;
                if (parsedTask != null)
                {
                    // Check if the AI marked it as ready (user confirmed)
                    isReady = aiResponse.Contains("\"readyToCreate\": true") || 
                              aiResponse.Contains("\"readyToCreate\":true");
                }
                
                return new AIChatResponseDto
                {
                    Response = cleanedResponse,
                    ParsedTask = parsedTask,
                    WaitingFor = waitingFor,
                    IsTaskReady = isReady
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error communicating with Ollama");
                return new AIChatResponseDto
                {
                    Response = "I'm sorry, I'm having trouble connecting to my AI service. Please try again later.",
                    IsTaskReady = false
                };
            }
        }

        public async Task<ParsedTaskDto?> ParseTaskFromText(string text)
        {
            var prompt = $@"Extract task information from this text and return ONLY a JSON object:
Text: {text}

Return format:
{{
  ""title"": ""extracted title"",
  ""description"": ""extracted description"",
  ""priority"": ""Low/Medium/High"",
  ""dueDate"": ""YYYY-MM-DD or null"",
  ""subtasks"": [""subtask1"", ""subtask2""]
}}";

            try
            {
                var generateRequest = new GenerateRequest
                {
                    Model = ModelName,
                    Prompt = prompt,
                    Stream = false
                };
                
                var responseStream = _ollamaClient.GenerateAsync(generateRequest);
                var fullResponse = string.Empty;
                
                await foreach (var response in responseStream)
                {
                    if (response != null && !string.IsNullOrEmpty(response.Response))
                    {
                        fullResponse += response.Response; // Concatenate all chunks
                    }
                }
                
                return ExtractTaskFromResponse(fullResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing task from text");
                return null;
            }
        }

        private string BuildConversationContext(List<ChatMessage>? history)
        {
            if (history == null || !history.Any())
                return string.Empty;

            return string.Join("\n", history.Select(h => $"{h.Role}: {h.Content}"));
        }

        private ParsedTaskDto? ExtractTaskFromResponse(string response)
        {
            try
            {
                // Look for our special marker first
                var markerIndex = response.IndexOf("[TASK_JSON]");
                if (markerIndex >= 0)
                {
                    // Extract JSON after the marker
                    var jsonStart = markerIndex + "[TASK_JSON]".Length;
                    var jsonContent = response.Substring(jsonStart).Trim();
                    
                    // Find the JSON object
                    var jsonMatch = Regex.Match(jsonContent, @"\{(?:[^{}]|(?<open>\{)|(?<-open>\}))+(?(open)(?!))\}", RegexOptions.Singleline);
                    
                    if (jsonMatch.Success)
                    {
                        var jsonStr = jsonMatch.Value;
                        var options = new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        };

                        var parsed = JsonSerializer.Deserialize<ParsedTaskDto>(jsonStr, options);
                        
                        // Validate and normalize the parsed task
                        if (parsed != null)
                        {
                            // Ensure valid priority
                            if (!new[] { "Low", "Medium", "High" }.Contains(parsed.Priority))
                                parsed.Priority = "Medium";
                            
                            // Ensure valid status
                            if (!new[] { "Todo", "InProgress", "Completed" }.Contains(parsed.Status))
                                parsed.Status = "Todo";
                        }
                        
                        return parsed;
                    }
                }
                
                // Fallback: Look for JSON block in markdown
                var jsonMatch2 = Regex.Match(response, @"```json\s*(.*?)\s*```", RegexOptions.Singleline);
                if (!jsonMatch2.Success)
                {
                    // Try to find raw JSON
                    jsonMatch2 = Regex.Match(response, @"\{(?:[^{}]|(?<open>\{)|(?<-open>\}))+(?(open)(?!))\}", RegexOptions.Singleline);
                }

                if (jsonMatch2.Success)
                {
                    string jsonStr;
                    
                    // If we matched the markdown block, use the content inside (Groups[1])
                    if (response.Contains("```json"))
                    {
                        jsonStr = jsonMatch2.Groups[1].Value;
                    }
                    else
                    {
                        // Otherwise, we matched raw JSON, use the whole match
                        jsonStr = jsonMatch2.Value;
                    }

                    var options = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    var parsed = JsonSerializer.Deserialize<ParsedTaskDto>(jsonStr, options);
                    
                    // Validate and normalize the parsed task
                    if (parsed != null)
                    {
                        // Ensure valid priority
                        if (!new[] { "Low", "Medium", "High" }.Contains(parsed.Priority))
                            parsed.Priority = "Medium";
                        
                        // Ensure valid status
                        if (!new[] { "Todo", "InProgress", "Completed" }.Contains(parsed.Status))
                            parsed.Status = "Todo";
                    }
                    
                    return parsed;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error extracting task from response");
            }

            return null;
        }

        private string CleanResponse(string response)
        {
            // Remove [TASK_JSON] marker and everything after it
            var markerIndex = response.IndexOf("[TASK_JSON]");
            if (markerIndex >= 0)
            {
                response = response.Substring(0, markerIndex);
            }
            
            // Remove any [taskId: ...] or [taskId] patterns
            response = Regex.Replace(response, @"\[taskId[^\]]*\]", "", RegexOptions.IgnoreCase);
            
            // Remove any other technical markers like [taskId], [anything], etc.
            response = Regex.Replace(response, @"\[[A-Za-z0-9_\s:]*\]", "", RegexOptions.IgnoreCase);
            
            // Remove any JSON blocks from the display response
            var cleaned = Regex.Replace(response, @"```json.*?```", "", RegexOptions.Singleline);
            
            // Remove any raw JSON objects
            cleaned = Regex.Replace(cleaned, @"\{(?:[^{}]|(?<open>\{)|(?<-open>\}))+(?(open)(?!))\}", "", RegexOptions.Singleline);
            
            // Clean up any double spaces or extra whitespace
            cleaned = Regex.Replace(cleaned, @"\s+", " ");
            
            return cleaned.Trim();
        }

        private string? DetermineWaitingFor(string response, ParsedTaskDto? task)
        {
            if (task == null)
            {
                if (response.ToLower().Contains("priority"))
                    return "priority";
                if (response.ToLower().Contains("due date") || response.ToLower().Contains("when"))
                    return "dueDate";
                if (response.ToLower().Contains("subtask"))
                    return "subtasks";
            }
            
            return null;
        }

        private bool IsTaskComplete(ParsedTaskDto task)
        {
            return !string.IsNullOrEmpty(task.Title) && 
                   !string.IsNullOrEmpty(task.Priority);
        }
    }
}
