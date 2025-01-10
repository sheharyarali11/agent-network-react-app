# Agent Network

A modern React TypeScript application for managing a network of agents. Built with Vite, PrimeReact, and TypeScript.

## Features

- **Agent Management**
  - View list of agents with sorting and filtering capabilities
  - Add new agents with form validation
  - Edit existing agent details
  - Delete agents with confirmation
  - View detailed agent information on separate pages

- **Technical Features**
  - TypeScript integration for type safety
  - React Context for state management
  - Responsive design using PrimeFlex
  - Modern UI components from PrimeReact
  - Client-side routing with React Router
  - Form validation
  - API integration with fallback to localStorage
  - Error handling and loading states

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sheharyarali11/agent-network-react-app
cd agent-network-react-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

1. Install json-server:
```bash
npm install json-server
```

1. Create a db.json file in the root directory with initial data:
```json
{
  "agents": []
}
```

1. Start the json-server (in a separate terminal):
```bash
npx json-server --watch db.json --port 3001
```

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

1. Open your browser and navigate to `http://localhost:5173`

The API will be available at `http://localhost:3001/agents`

## Project Structure

```
agent-network/
├── src/
│   ├── components/         # React components
│   │   ├── AgentList.tsx  # List and table of agents
│   │   ├── AgentForm.tsx  # Form for add/edit agent
│   │   └── Header.tsx     # Header component
│   ├── context/
│   │   └── AgentContext.tsx  # State management
│   ├── types/
│   │   └── Agent.ts       # TypeScript interfaces
│   ├── services/
│   │   └── api.ts         # API integration
│   ├── App.tsx            # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
└── public/               # Static assets
```

## Technologies Used

- **Core**
  - React 18
  - TypeScript
  - Vite (Build tool)

- **UI Components**
  - PrimeReact
  - PrimeFlex (Utility-first CSS framework)
  - PrimeIcons

- **State Management**
  - React Context API

- **Routing**
  - React Router v6

## Key Features Implementation

### Agent Management

The application provides a complete CRUD interface for managing agents:

- **List View**: DataTable with sorting, filtering, and pagination
- **Add/Edit**: Modal form with validation
- **Delete**: Confirmation dialog
- **Details**: Dedicated page for viewing agent details

### State Management

Uses React Context API with a reducer pattern for state management. Features include:

- Centralized state management
- Type-safe actions and state
- API integration with localStorage fallback
- Loading and error states

### Data Persistence

The application implements a dual-layer persistence strategy:

1. Primary: REST API integration using JSON SERVER
2. Fallback: localStorage for offline functionality

### Form Handling

Includes comprehensive form validation:

- Required field validation
- Email format validation
- Real-time validation feedback
- Loading states during submission

## API Integration

The application is configured to work with a JSON Server REST API at `http://localhost:3001/agents`. The API service includes fallback mechanisms to localStorage when the API is unavailable.