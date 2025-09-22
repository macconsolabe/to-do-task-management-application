# eTask - Smart Task Management Application

A full-stack todo task management application built with .NET Core backend and React TypeScript frontend.

## 📋 Table of Contents

- [🚀 Quick Setup](#-quick-setup-2-minutes)
- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation Options](#-installation-options)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Quick Setup (2 minutes!)

```bash
# 1. Clone the repo
git clone <repository-url>
cd to-do-task-management-application

# 2. Choose your platform:

# WINDOWS - Simple Development Setup
start.bat              # One command - opens 2 windows (no AI support)

# MACOS/LINUX - Full Feature Support  
./start-docker.sh      # Docker mode (includes AI option)
./start-dev.sh         # Development mode

# 3. Open your app:
# Windows: http://localhost:5173
# macOS/Linux: http://localhost:3000 (Docker) or http://localhost:5173 (Dev)
```

**Cross-Platform Notes:**
- **Windows**: Simple development setup, no Docker/AI (developed for cross-platform compatibility)
- **macOS/Linux**: Full Docker support with optional AI assistant (Ezra AI with Llama 3.2)
- **All platforms**: Scripts auto-install dependencies (npm packages, .NET packages)

## ✨ Features

- ✅ **Task Management**: Create, update, delete, and organize tasks
- 🔍 **Smart Search**: Search across titles, descriptions, and subtasks
- 📊 **Progress Tracking**: Visual progress bars with subtask completion
- 🏷️ **Status & Priority**: Organize with Todo, In Progress, Completed statuses
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- 📅 **Calendar View**: Visualize tasks in calendar format
- 🔔 **Notifications**: Real-time updates and alerts

## 🏗️ Tech Stack

### Backend (.NET 8)
- **ASP.NET Core Web API** - RESTful API
- **Entity Framework Core** - ORM with SQLite
- **Clean Architecture** - DTOs, Dependency Injection
- **Swagger** - API documentation

### Frontend (React + TypeScript)
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Lucide Icons** - Modern icons

### AI Assistant (macOS/Linux Only)
- **Ezra AI** - Local AI assistant powered by Llama 3.2
- **Natural Language** - Create tasks through conversation
- **Smart Suggestions** - Intelligent subtask recommendations
- **Zero Cloud Dependency** - Runs completely offline
- **Platform Support**: 
  - **Docker mode**: Automatic setup on macOS/Linux
  - **Development mode**: Available on macOS/Linux if Ollama + Llama 3.2 model already installed

## 📋 Prerequisites

### For Docker Mode (Recommended - Easiest!)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
  - That's it! Docker handles everything else including the AI assistant

### For Development Mode
**🚨 CRITICAL REQUIREMENTS - You MUST install these first:**
- **🔥 .NET 8 SDK** (REQUIRED) - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
  - ⚠️ **Must be SDK, not just Runtime** - The application will NOT work without this
  - ✅ Verify installation: `dotnet --version` should show 8.x.x
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **Ollama** (Optional - macOS/Linux only) - [Download](https://ollama.com/) for AI assistant functionality

**After installing Ollama, run:**
```bash
ollama run llama3.2
```
This downloads the Llama 3.2 model (2GB) needed for the Ezra AI assistant.

**The scripts will automatically install:**
- ✅ All npm packages (React, Vite, Tailwind, etc.)
- ✅ All NuGet packages (.NET dependencies)
- ✅ Create the SQLite database
- ✅ Set up the data directory

## 🚀 Installation Options

### Windows (Simple Development Setup)

```cmd
# Windows - Simple one-command startup
start.bat
```

**What it does:**
- ✅ **Starts .NET backend** in a new window (port 5001)
- ✅ **Starts React frontend** in a new window (port 5173)  
- ✅ **Hot-reload enabled** for development
- ✅ **No Docker required** - uses your installed Node.js & .NET
- ⚠️ **AI Assistant not supported** on Windows

**Access Points:**
- Frontend: http://localhost:5173 (with hot-reload)
- Backend API: http://localhost:5001
- Swagger Docs: http://localhost:5001/swagger

### macOS/Linux (Full Feature Support)

#### Option 1: Docker (Recommended)
```bash
# Core app only (fast startup)
./start-docker.sh

# With AI assistant (takes 5-10 min first time - macOS only)
./start-docker-with-ai.sh
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001  
- Database Admin: http://localhost:8080
- Ollama AI: http://localhost:11434 (AI version only)

#### Option 2: Development Mode
```bash
# Development with hot-reload
./start-dev.sh
```

**Access Points:**
- Frontend: http://localhost:5173 (with hot-reload)
- Backend API: http://localhost:5001
- Swagger Docs: http://localhost:5001/swagger

**AI Assistant in Development Mode:**
- ✅ **Auto-detected** - Scripts check if Ollama + llama3.2 are available
- ✅ **Graceful fallback** - App works perfectly without AI
- ✅ **Easy to enable** - Install Ollama, run `ollama run llama3.2`, restart script

### Option 3: Manual Setup

```bash
# Terminal 1 - Backend
cd backend
dotnet restore
dotnet run --urls="http://localhost:5001"

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## 🔧 Troubleshooting

### Windows Issues

**start.bat not working:**
```cmd
# Try running from Command Prompt (not PowerShell)
cd C:\Code\to-do-task-management-application
start.bat

# Or double-click the start.bat file in File Explorer
```

**Prerequisites missing:**
- **🔥 .NET 8 SDK** (CRITICAL): Download from https://dotnet.microsoft.com/download/dotnet/8.0
  - ⚠️ Must be SDK, not Runtime - verify with `dotnet --version`
- **Node.js** (v18+): Download from https://nodejs.org/

**Port already in use:**
```cmd
# Kill existing processes
taskkill /f /im dotnet.exe
taskkill /f /im node.exe
```

### Mac/Linux Issues

**Scripts not executable:**
```bash
chmod +x start-dev.sh start-docker.sh
```

**.NET SDK not found:**

**On macOS:**
- The script checks common locations:
  - System PATH
  - `~/.dotnet/` (user installation)
  - `/usr/local/share/dotnet/` (system installation)
- If installed elsewhere, add to PATH:
  ```bash
  export PATH="$PATH:/path/to/dotnet"
  ```

**On Windows:**
- The script checks:
  - System PATH
  - `%ProgramFiles%\dotnet\` (default installation)
  - `%LocalAppData%\Microsoft\dotnet\` (user installation)
- If installed elsewhere:
  1. Add to PATH via System Properties → Environment Variables
  2. Or restart your terminal/command prompt after installation

**Ollama/AI Assistant not working (Development Mode only):**
- Install Ollama: https://ollama.com/
- Download the model: `ollama run llama3.2`
- Ensure Ollama is running: `ollama serve`
- Note: Docker mode includes Ollama automatically

**Port already in use:**
- Kill the process using the port or change the port in the scripts

**Docker not starting on Windows:**
- Ensure Docker Desktop is running
- Enable WSL 2 if prompted

**Database issues:**
- The SQLite database file is located at `./data/ezratask.db`
- **To reset the database:**
  ```bash
  # Stop the application first (Ctrl+C)
  rm -rf ./data/ezratask.db*  # Mac/Linux
  del data\ezratask.db*       # Windows
  # Restart the application - database will be recreated
  ```
- **If "database is locked" error:**
  - Stop all running instances of the app
  - Check no other process is using the database file
  - Restart the application
- **If "unable to open database file" error:**
  - Ensure the `data` directory exists: `mkdir data`
  - Check write permissions on the `data` directory
  - On Windows, check if antivirus is blocking file creation
- **To backup your database:**
  ```bash
  cp ./data/ezratask.db ./data/ezratask.backup.db
  ```
- **To restore from backup:**
  ```bash
  cp ./data/ezratask.backup.db ./data/ezratask.db
  ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built by Mac Consolabe