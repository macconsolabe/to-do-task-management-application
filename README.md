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

# 2. Choose your setup method:

# OPTION A: Docker (easiest - only needs Docker installed)
./start-docker.sh      # Mac/Linux
start-docker.bat       # Windows

# OPTION B: Development mode (needs Node.js & .NET SDK pre-installed)
./start-dev.sh         # Mac/Linux  
start-dev.bat          # Windows

# 3. Open http://localhost:3000 (Docker) or http://localhost:5173 (Dev)
```

**Note:** The scripts will automatically install all project dependencies (npm packages, .NET packages) but you need Docker OR Node.js+.NET SDK installed first.

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

## 📋 Prerequisites

### For Docker Mode (Recommended - Easiest!)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
  - That's it! Docker handles everything else

### For Development Mode
**You must install these first:**
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)

**The scripts will automatically install:**
- ✅ All npm packages (React, Vite, Tailwind, etc.)
- ✅ All NuGet packages (.NET dependencies)
- ✅ Create the SQLite database
- ✅ Set up the data directory

## 🚀 Installation Options

### Option 1: Docker (Easiest)

```bash
# Mac/Linux
./start-docker.sh

# Windows
start-docker.bat
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Database Admin: http://localhost:8080

### Option 2: Development Mode

```bash
# Mac/Linux
./start-dev.sh

# Windows
start-dev.bat
```

**Access Points:**
- Frontend: http://localhost:5173 (with hot-reload)
- Backend API: http://localhost:5001
- Swagger Docs: http://localhost:5001/swagger

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

**Scripts not executable (Mac/Linux):**
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