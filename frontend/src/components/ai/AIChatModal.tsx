import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, ParsedTask } from '../../services/AIService';
import { aiService } from '../../services/AIService';
import { useUser } from '../../contexts/UserContext';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

export function AIChatModal({ isOpen, onClose, onTaskCreated }: AIChatModalProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm Ezra, your AI task assistant. I can help you create tasks quickly. Just tell me what you need to do!" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedTask, setParsedTask] = useState<ParsedTask | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskReady, setTaskReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiService.chat({
        message: userMessage,
        userId: user.id,
        conversationHistory: messages
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);

      // Store the parsed task but don't show confirmation until user clicks create
      if (response.parsedTask) {
        setParsedTask(response.parsedTask);
        // Only show confirmation if AI marked it as ready (user said yes)
        if (response.isTaskReady) {
          setTaskReady(true);
          setShowConfirmation(false);
        }
      }
    } catch (error) {
      console.error('Error chatting with AI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!parsedTask || !user) return;

    // Show final confirmation with all details
    const taskSummary = `
📋 **Task Summary:**
• **Title:** ${parsedTask.title}
• **Description:** ${parsedTask.description || 'No description'}
• **Priority:** ${parsedTask.priority}
• **Status:** ${parsedTask.status}
• **Due Date:** ${parsedTask.dueDate || 'No due date'}
${parsedTask.subtasks.length > 0 ? `• **Subtasks:** \n  ${parsedTask.subtasks.map(s => `  - ${s}`).join('\n')}` : ''}

Is everything correct? Click "Confirm & Create" to proceed or "Cancel" to make changes.`;
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: taskSummary
    }]);
    
    // Keep the confirmation dialog open for final confirmation
    setShowConfirmation(true);
  };
  
  const handleFinalConfirmation = async () => {
    if (!parsedTask || !user) return;
    
    setIsLoading(true);
    setShowConfirmation(false);
    
    try {
      await aiService.createTaskFromAI({
        task: parsedTask,
        userId: user.id
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '✅ Task created successfully! Is there anything else I can help you with?' 
      }]);
      setParsedTask(null);
      setTaskReady(false);
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I couldn\'t create the task. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Ezra AI Assistant</h2>
              <p className="text-sm text-gray-800 text-opacity-90">Your smart task creator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-900 hover:bg-gray-900 hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-md'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Create Task Button - Shows when AI confirms task is ready */}
        {taskReady && parsedTask && !showConfirmation && (
          <div className="p-4 bg-green-50 border-t border-green-200">
            <div className="flex items-center justify-between">
              <p className="text-green-800 font-medium">
                Task details are ready! Click below to review and create.
              </p>
              <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 font-medium shadow-sm"
              >
                Create Task →
              </button>
            </div>
          </div>
        )}

        {/* Task Confirmation - Only show when explicitly confirmed */}
        {showConfirmation && parsedTask && (
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border-t border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">Ready to Create Task:</h3>
            <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
              <p className="font-medium text-lg">{parsedTask.title}</p>
              {parsedTask.description && (
                <p className="text-sm text-gray-600 mt-1">{parsedTask.description}</p>
              )}
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-gray-500">
                  <span className="font-medium">Priority:</span> {parsedTask.priority}
                </span>
                <span className="text-gray-500">
                  <span className="font-medium">Status:</span> {parsedTask.status}
                </span>
                {parsedTask.dueDate && (
                  <span className="text-gray-500">
                    <span className="font-medium">Due:</span> {parsedTask.dueDate}
                  </span>
                )}
              </div>
              {parsedTask.subtasks && parsedTask.subtasks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">Subtasks:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {parsedTask.subtasks.map((subtask, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-yellow-600 mr-2">✓</span>
                        {subtask}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFinalConfirmation}
                disabled={isLoading}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 font-medium"
              >
                Confirm & Create
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: 'No problem! What would you like to change?' 
                  }]);
                }}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Make Changes
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tell me about your task..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
