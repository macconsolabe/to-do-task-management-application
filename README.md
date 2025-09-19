# eTask - Smart Task Management Application

A full-stack todo task management application built with .NET Core backend and React TypeScript frontend. This project demonstrates modern web development practices, clean architecture, and production-ready features.

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [🌐 Access Points](#-access-points)
- [🔧 API Endpoints](#-api-endpoints)
- [👨‍💻 Developer Guide](#-developer-guide)
- [🧪 Testing](#-testing)
- [🚀 Deployment Considerations](#-deployment-considerations)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Developer Notes](#-developer-notes)

## 🚀 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Task Status Management**: Pending, In Progress, Completed
- ✅ **Priority Levels**: Low, Medium, High priority tasks
- ✅ **Due Dates**: Set and track task deadlines with overdue indicators
- ✅ **Real-time Updates**: Instant UI updates with optimistic updates

### User Experience
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Fully responsive across all device sizes
- 🔍 **Advanced Filtering**: Filter by status and priority
- 📊 **Task Statistics**: Overview dashboard with task counts
- 🗂️ **Flexible Sorting**: Sort by creation date, due date, priority, or title
- 💫 **Loading States**: Smooth loading indicators and skeleton screens
- 🔔 **Notifications**: Success and error notifications for user actions

### Production Ready
- 🛡️ **Input Validation**: Client-side and server-side validation
- 🚨 **Error Handling**: Comprehensive error handling with user-friendly messages
- 🔒 **CORS Configuration**: Secure cross-origin resource sharing
- 📚 **API Documentation**: Swagger/OpenAPI documentation
- 🗃️ **Database**: SQLite with Entity Framework Core
- 🎯 **Type Safety**: Full TypeScript implementation

## 🏗️ Architecture

### Backend (.NET Core 8)
```
backend/
├── Controllers/          # API controllers
│   └── TodoTasksController.cs
├── Models/              # Data models and DTOs
│   ├── TodoTask.cs
│   └── CreateTodoTaskDto.cs
├── Data/                # Database context
│   └── TodoContext.cs
├── Properties/          # Launch settings
└── Program.cs           # Application entry point
```

### Frontend (React + TypeScript) - SOC Architecture

**🎯 Separation of Concerns Implementation:**

```
frontend/src/
├── components/
│   ├── calendar/           # 📅 Calendar system (5 components)
│   │   ├── CalendarTaskBrowser.tsx    # Main calendar interface
│   │   ├── CalendarModal.tsx          # Full calendar modal
│   │   └── Calendar[Day|Week|Month]View.tsx
│   ├── createnewtask/      # ➕ Task creation (7 components)
│   │   ├── CreateNewTask.tsx          # Main orchestrator
│   │   └── CreateNewTask[*].tsx       # Specialized sub-components
│   ├── updatetaskdetails/  # ✏️ Task editing (7 components)
│   │   ├── TaskDetail.tsx             # Main orchestrator
│   │   └── [Editable|Task]*].tsx      # Specialized sub-components
│   ├── taskcard/           # 📋 Task display (5 components)
│   │   ├── TaskCard.tsx, TaskList.tsx # Task list & cards
│   │   └── CalendarCard*.tsx          # Calendar card components
│   ├── layout/             # 🏠 App layout (3 components)
│   └── ui/                 # 🧩 Reusable UI (5 components)
├── hooks/                  # 🎣 Custom hooks (9 hooks)
│   ├── useCalendarState.ts      # Calendar date management
│   ├── useCreateNewTask*.ts     # Task creation logic
│   ├── useTaskDetail*.ts        # Task editing logic
│   └── use[Tasks|Modal|etc].ts  # Core app logic
├── utils/                  # 🛠️ Utility functions
└── services/              # 🌐 API layer
```

**🎯 SOC Benefits:**
- **📦 Modular**: Each folder has single responsibility
- **🔧 Maintainable**: Easy to find and modify features
- **🧪 Testable**: Components can be tested in isolation
- **📈 Scalable**: Simple to add new features or modify existing ones
- **👥 Team-friendly**: Multiple developers can work on different features

## 🛠️ Tech Stack

### Backend
- **.NET Core 8**: Modern, cross-platform framework
- **Entity Framework Core**: ORM for database operations
- **SQLite**: Lightweight, file-based database
- **Swagger/OpenAPI**: API documentation
- **ASP.NET Core Web API**: RESTful API framework

### Frontend
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Development Mode (Fast Setup)

**Best for**: Quick testing, development, debugging
**Requirements**: .NET 8 SDK + Node.js

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-task-management-application
   ```

2. **Run the development script**
   ```bash
   ./start-dev.sh
   ```

   **What it does:**
   - ✅ Checks prerequisites (.NET 8, Node.js)
   - 📦 Installs dependencies automatically
   - 🚀 Starts backend API on http://localhost:5001
   - 🎨 Starts frontend dev server on http://localhost:5173
   - 📊 Provides real-time logs and hot-reload

### Option 2: Docker Mode (Cross-Platform, Production-Ready)

**Best for**: Cross-platform compatibility, "works everywhere", production testing
**Requirements**: Docker + Docker Compose only

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-task-management-application
   ```

2. **Run with Docker**
   ```bash
   ./start-docker.sh
   ```

   **What it does:**
   - 🐳 Builds and runs all services in containers
   - 🔧 Backend API (containerized) on http://localhost:5001
   - 🎨 Frontend (Nginx + React build) on http://localhost:3000
   - 🗃️ Database Admin UI (Adminer) on http://localhost:8080
   - 📁 Persistent SQLite data storage
   - 🌍 **Works identically on Windows, Mac, Linux**

### Option 3: Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   dotnet restore
   dotnet run --urls="http://localhost:5001"
   ```

2. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🌐 Access Points

### Development Mode (`./start-dev.sh`)
| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React dev server with hot-reload |
| **Backend API** | http://localhost:5001 | REST API endpoints |
| **API Docs** | http://localhost:5001/swagger | Interactive API documentation |
| **Health Check** | http://localhost:5001/api/health | API health status |

### Docker Mode (`./start-docker.sh`)
| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Production React build (Nginx) |
| **Backend API** | http://localhost:5001 | Containerized REST API |
| **DB Admin** | http://localhost:8080 | SQLite database management (Adminer) |
| **Health Check** | http://localhost:5001/api/health | API health status |

## 🔧 API Endpoints

### Tasks (Base URL: http://localhost:5001)
- `GET /api/TodoTasks` - Get all tasks
- `GET /api/TodoTasks/{id}` - Get task by ID
- `POST /api/TodoTasks` - Create new task
- `PUT /api/TodoTasks/{id}` - Update existing task
- `DELETE /api/TodoTasks/{id}` - Delete task
- `PATCH /api/TodoTasks/{id}/status` - Update task status

### Example API Usage

**Create a new task:**
```bash
curl -X POST "http://localhost:5001/api/TodoTasks" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Complete project documentation",
       "description": "Write comprehensive README and API docs",
       "priority": 2,
       "dueDate": "2024-12-31"
     }'
```

## 👨‍💻 Developer Guide

### 🏗️ Adding New Features (SOC Pattern)

**Follow these patterns when extending the application:**

#### 1. **Adding New Modal/Form Features**
```typescript
// 📁 Create new folder: components/[featurename]/
// 📄 Main orchestrator: [FeatureName].tsx (< 150 lines)
// 📄 Sub-components: [FeatureName][Section].tsx
// 📄 Custom hooks: hooks/use[FeatureName]*.ts

// Example: Adding "DuplicateTask" feature
components/duplicatetask/
├── DuplicateTask.tsx              # Main orchestrator
├── DuplicateTaskForm.tsx          # Form section
├── DuplicateTaskOptions.tsx       # Options section
└── DuplicateTaskActions.tsx       # Button actions

hooks/
├── useDuplicateTaskState.ts       # Form state management
└── useDuplicateTaskLogic.ts       # Business logic
```

#### 2. **Adding New Calendar Features**
```typescript
// 📁 Add to: components/calendar/
// 📄 Follow naming: Calendar[ViewType].tsx
// 📄 Connect to: CalendarModal.tsx

// Example: Adding "CalendarYearView"
components/calendar/
└── CalendarYearView.tsx           # New view component

// Update CalendarModal.tsx:
// 1. Add to view type union
// 2. Add to viewButtons array  
// 3. Add to renderCurrentView switch
```

#### 3. **Adding New Task Display Components**
```typescript
// 📁 Add to: components/taskcard/
// 📄 Follow patterns from TaskCard.tsx
// 📄 Use metallic theme consistently

// Example: Adding "TaskKanbanCard"
components/taskcard/
└── TaskKanbanCard.tsx             # New display format
```

#### 4. **Adding New Reusable UI**
```typescript
// 📁 Add to: components/ui/
// 📄 Make generic and reusable
// 📄 Include proper TypeScript interfaces

// Example: Adding "ConfirmDialog"
components/ui/
└── ConfirmDialog.tsx              # Reusable confirmation
```

### 🎯 **SOC Best Practices**

**✅ Do:**
- Keep main components under 150 lines
- Extract specialized logic into custom hooks
- Use feature-based folder organization
- Follow existing naming conventions
- Maintain metallic theme consistency

**❌ Don't:**
- Put everything in one large component
- Mix business logic with UI rendering
- Create deeply nested folder structures
- Break existing naming patterns

### 🎨 **Theme Guidelines**

**Metallic Design System:**
```css
/* Use these consistent patterns */
background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)'
boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1)'

/* Golden accents */
background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)'

/* Reflections */
background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%)'
```

## 🎨 UI Components

### TaskList
- Displays all tasks with filtering and sorting
- Shows task statistics dashboard
- Handles loading states and empty states

### TaskItem
- Individual task card with all task information
- Quick action buttons for status changes
- Edit and delete functionality
- Visual indicators for priority and overdue status

### TaskForm
- Modal form for creating and editing tasks
- Client-side validation with error messages
- Support for all task properties

## 🧪 Testing

The application includes comprehensive error handling and validation:

### Backend Validation
- Model validation attributes
- Custom validation logic
- Database constraint validation

### Frontend Validation
- Form validation with error messages
- Type checking with TypeScript
- Input sanitization

### Manual Testing Scenarios
1. **Create Task**: Test form validation and successful creation
2. **Update Task**: Test editing functionality and status changes
3. **Delete Task**: Test confirmation dialog and deletion
4. **Filtering**: Test status and priority filters
5. **Sorting**: Test all sorting options
6. **Error Handling**: Test with backend offline

## 🚀 Deployment Considerations

### Production Readiness Checklist
- ✅ Environment-specific configurations
- ✅ CORS properly configured
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ Database migrations
- ✅ Security headers
- ✅ API documentation

### Deployment Options

**Backend:**
- Azure App Service
- AWS Elastic Beanstalk
- Docker containers
- IIS (Windows)

**Frontend:**
- Netlify
- Vercel
- Azure Static Web Apps
- AWS S3 + CloudFront

**Database:**
- For production, consider migrating to:
  - PostgreSQL
  - SQL Server
  - MySQL

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: Multi-user support with login/registration
- **Task Categories**: Organize tasks into categories or projects
- **File Attachments**: Add files to tasks
- **Comments**: Task discussion and collaboration
- **Notifications**: Email/push notifications for due dates
- **Search**: Full-text search across tasks
- **Bulk Operations**: Select and modify multiple tasks
- **Task Templates**: Reusable task templates
- **Time Tracking**: Track time spent on tasks
- **Reporting**: Advanced analytics and reports

### Technical Improvements
- **Caching**: Redis for improved performance
- **Real-time Updates**: SignalR for live collaboration
- **Offline Support**: PWA with offline capabilities
- **API Versioning**: Support for multiple API versions
- **Unit Testing**: Comprehensive test coverage
- **CI/CD Pipeline**: Automated testing and deployment
- **Monitoring**: Application performance monitoring
- **Logging**: Structured logging with Serilog

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer Notes

### Design Decisions

**Why SQLite?**
- Lightweight and zero-configuration
- Perfect for development and small deployments
- Easy to migrate to other databases later

**Why Tailwind CSS?**
- Utility-first approach for rapid development
- Consistent design system
- Excellent performance with purging

**Why TypeScript?**
- Type safety reduces bugs
- Better IDE support and autocomplete
- Improved maintainability

### Performance Considerations
- Optimistic updates for better UX
- Efficient re-rendering with React keys
- Debounced search and filtering
- Lazy loading for large datasets (future)

### Security Considerations
- Input validation on both client and server
- CORS configuration for cross-origin requests
- SQL injection prevention with EF Core
- XSS prevention with React's built-in escaping

---

**Built with ❤️ for Ezra's Full Stack Developer Assessment**