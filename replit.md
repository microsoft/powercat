# Agent Advisory Platform

## Overview

This is a React-based web application that provides AI agent platform recommendations through an interactive assessment questionnaire. The application guides users through a multi-step workflow to determine the most suitable Microsoft AI platform (Microsoft 365 Copilot, Agent Builder, Copilot Studio, or Azure AI) based on their technical expertise, use case complexity, integration needs, and deployment requirements. The system provides detailed recommendations, implementation checklists, and agent structure guidance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component system and Tailwind CSS for styling
- **State Management**: React hooks for local component state with TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod for validation and type safety

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Middleware**: Custom logging middleware for API request tracking and error handling
- **Development Server**: Vite integration for hot module replacement in development mode
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) and interface for database integration

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon Database serverless driver
- **Session Storage**: PostgreSQL session store using connect-pg-simple
- **Schema Management**: Centralized schema definitions in TypeScript using Zod for runtime validation
- **Migrations**: Drizzle Kit for database schema migrations

### Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL session storage
- **CORS Configuration**: Configured for cross-origin requests with credential support
- **Security Headers**: Standard security middleware for production deployment

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database operations and schema management

### UI and Styling
- **Radix UI**: Headless UI components for accessibility and interaction patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide Icons**: SVG icon library for consistent iconography
- **Google Fonts**: External font loading for typography (Segoe UI, Architects Daughter, DM Sans, Fira Code, Geist Mono)

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Type safety across frontend, backend, and shared code
- **ESBuild**: JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins for Replit platform

### Runtime Dependencies
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Date-fns**: Date utility functions
- **Class Variance Authority**: Component variant management
- **CLSX/Tailwind Merge**: Conditional CSS class merging