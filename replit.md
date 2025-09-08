# Overview

This is a React-based image generation application built with TypeScript and Vite. The app allows users to upload images, enter prompts, select artistic styles, and generate AI-powered image creations. It features a modern, professional interface inspired by the CleverMate template design with deep purple-to-blue gradient backgrounds, clean white typography, and pink/magenta gradient accents.

# User Preferences

Preferred communication style: Simple, everyday language.
Design preference: CleverMate template-inspired design with deep purple-to-blue gradients, clean white text, and pink/magenta accent colors for a professional, modern aesthetic.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript for type safety and modern development practices.

**Build Tool**: Vite for fast development server, hot module replacement, and optimized production builds. Chosen over Create React App for superior performance and smaller bundle sizes.

**Component Structure**: Modular component architecture with separate components for each major feature:
- `ImageUpload`: Handles file upload with drag-and-drop, validation, and image resizing
- `PromptInput`: Text input with character counting and validation
- `StyleSelector`: Dropdown for selecting artistic styles with descriptions
- `LiveSummary`: Real-time preview of user selections
- `GenerateSection`: Generation controls with loading states
- `HistorySection`: Display and management of previous generations

**State Management**: Local React state using hooks. No external state management library needed due to the focused scope of the application.

**Styling**: CleverMate template-inspired design built with Tailwind CSS featuring a deep purple-to-blue gradient background (from purple-800 via violet-800 to blue-900). Clean dark gray cards (gray-900/70) with subtle borders and backdrop blur effects. Clean white typography throughout with pink/magenta gradient buttons and accents (from pink-500 to purple-600) for interactive elements. Professional aesthetic with modern glassmorphism effects and smooth hover transitions.

**Code Quality**: ESLint with TypeScript rules for code consistency and error prevention. Prettier for code formatting.

## Data Models

**Generation Interface**: Structured data for tracking generated images including ID, image URL, prompt, style, and creation timestamp.

**Style Options**: Predefined style configurations with ID, name, and description for consistency across the application.

## Image Processing

**Client-side Processing**: Images are resized on the client to optimize performance and reduce upload sizes. Maximum resolution of 1920px with JPEG compression.

**File Validation**: Strict validation for file types (PNG/JPG only) and size limits (10MB maximum) to ensure compatibility and performance.

**Preview System**: Real-time preview generation showing selected images, prompts, and styles before generation.

## Development Environment

**TypeScript Configuration**: Strict mode enabled with modern ES modules and React JSX transform for type safety and optimal bundle size.

**Development Server**: Configured to run on host 0.0.0.0:5000 for Replit compatibility with strict port enforcement.

# External Dependencies

## Core Framework Dependencies
- **React 18**: UI library for component-based architecture
- **ReactDOM**: DOM rendering for React components
- **TypeScript**: Static typing for enhanced development experience

## Build and Development Tools
- **Vite**: Fast build tool and development server
- **@vitejs/plugin-react**: Vite plugin for React support

## Styling and UI
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **@tailwindcss/forms**: Enhanced form styling components
- **@tailwindcss/postcss**: PostCSS integration for Tailwind
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefix automation

## Code Quality Tools
- **ESLint**: Code linting with TypeScript support
- **@typescript-eslint/eslint-plugin**: TypeScript-specific ESLint rules
- **@typescript-eslint/parser**: TypeScript parser for ESLint
- **Prettier**: Code formatting tool

## Notes
- No backend services are currently integrated
- No database connections are established
- No external API integrations are present in the current codebase
- The application appears to be set up for future integration with AI image generation services