# AI Studio Pro

**Enterprise-grade React AI image generation platform** with sophisticated design, advanced performance optimizations, and comprehensive testing infrastructure.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-3.2-green) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan) ![Vitest](https://img.shields.io/badge/Vitest-Testing-yellow)

## 🚀 Quick Start

### Installation

```bash
# Clone and install dependencies
npm install

# Start development server
npm run dev
```

### Running the Application

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests in watch mode
npm run test

# Run all tests once
npm run test:run

# Open test UI interface
npm run test:ui
```

## 📋 Features

### Core Functionality
- **Image Upload**: Drag-and-drop with validation (PNG/JPG, ≤10MB)
- **Client-side Processing**: Automatic image resizing (max 1920px)
- **Prompt Input**: Smart character counting with validation
- **Style Selection**: 5 artistic styles (Editorial, Streetwear, Vintage, Minimalist, Artistic)
- **Live Preview**: Real-time summary of selections
- **Generation History**: Last 5 generations with management

### API & Backend
- **Mock API System**: Realistic HTTP requests with fallback
- **Error Simulation**: 20% error rate with "Model overloaded" responses
- **Retry Logic**: Exponential backoff (max 3 attempts: 1s, 2s, 4s delays)
- **Abort Functionality**: Cancel generation mid-process
- **Real API Ready**: Attempts real `/api/generate` endpoint first

### Performance Optimizations
- **React.memo**: All major components optimized
- **useCallback**: Event handlers memoized for efficiency
- **useMemo**: Expensive calculations cached
- **Lazy Loading**: Intersection Observer for animations
- **Code Splitting**: Automatic with Vite

### Accessibility & UX
- **Keyboard Navigation**: Full keyboard-only support
- **Tab Order**: Logical flow (Upload → Prompt → Style → Generate)
- **Global Shortcuts**: Enter/G to generate, Escape to abort
- **ARIA Support**: Screen reader friendly
- **Focus Management**: Visible focus states with pink accents

## 🎨 Design System

### Visual Design
- **Background**: Sophisticated gradient from pitch black to purple-900/40
- **Cards**: Premium dark gray (gray-900/80) with backdrop blur
- **Typography**: Clean white text with professional hierarchy
- **Accents**: Pink-to-purple gradients (pink-500 → purple-600)
- **Loading States**: Dual-ring spinners with shimmer effects
- **Animations**: Smooth slide-in transitions (fadeInUp, slideInLeft)

### Component Architecture
```
src/
├── components/          # React components
│   ├── ImageUpload.tsx     # File upload with drag-and-drop
│   ├── PromptInput.tsx     # Text input with validation
│   ├── StyleSelector.tsx   # Dropdown with descriptions
│   ├── LiveSummary.tsx     # Real-time preview
│   ├── GenerateSection.tsx # Generation controls
│   ├── HistorySection.tsx  # Previous generations
│   └── __tests__/          # Component tests
├── services/            # API services
│   └── mockApi.ts          # Mock API with retry logic
├── hooks/               # Custom React hooks
│   ├── useScrollAnimation.ts  # Intersection Observer
│   └── useKeyboardShortcuts.ts # Global shortcuts
└── test/                # Testing setup
    └── setup.ts            # Test environment configuration
```

## 🛠️ Technical Stack

### Core Technologies
- **React 18**: Modern component architecture with hooks
- **TypeScript**: Type safety and enhanced development experience
- **Vite**: Fast development server and optimized builds
- **Tailwind CSS**: Utility-first styling with custom design system

### Testing Infrastructure
- **Vitest**: Fast unit test runner built on Vite
- **React Testing Library**: Component testing focused on user interactions
- **Jest DOM**: Enhanced DOM assertions for testing

### Development Tools
- **ESLint**: Code quality with TypeScript rules
- **Prettier**: Consistent code formatting
- **PostCSS**: CSS processing with Autoprefixer

## 📊 API Specification

### Generate Endpoint

**Request:**
```typescript
POST /api/generate
{
  imageDataUrl?: string | null,
  prompt: string,
  style: string
}
```

**Success Response:**
```typescript
{
  id: string,
  imageUrl: string,
  prompt: string,
  style: string,
  createdAt: string
}
```

**Error Response:**
```typescript
{
  message: "Model overloaded"
}
```

### Retry Behavior
- **Max Attempts**: 3 total attempts
- **Backoff Strategy**: Exponential (1s, 2s, 4s)
- **Error Rate**: 20% simulated failure rate in mock mode
- **Abort Support**: User can cancel at any time

## 🔧 Configuration

### Environment Setup
The application runs on **port 5000** and is configured for Replit deployment with proper host settings.

### Build Configuration
- **TypeScript**: Strict mode with modern ES modules
- **Vite**: Optimized for React with fast HMR
- **Tailwind**: Custom configuration with enterprise design tokens

## 🧪 Testing Strategy

### Test Coverage
- **Component Tests**: UI interactions and state management
- **API Tests**: Mock service behavior and error handling
- **Integration Tests**: End-to-end user workflows
- **Accessibility Tests**: Keyboard navigation and screen readers

### Running Tests
```bash
# Watch mode for development
npm run test

# Single run for CI/CD
npm run test:run

# Visual test interface
npm run test:ui
```

## 🚀 Deployment

The application is configured for deployment on Replit with:
- **Autoscale target**: Stateless website deployment
- **Port configuration**: 5000 (required for Replit)
- **Build optimization**: Vite production builds
- **Static asset serving**: Optimized for CDN delivery

## 📈 Performance Metrics

- **Bundle Size**: Optimized with code splitting
- **Load Time**: Fast initial render with lazy loading
- **Interaction**: Smooth 60fps animations
- **Accessibility**: 100% keyboard navigable
- **Test Coverage**: Comprehensive component and integration tests

## 🤝 Contributing

1. **Code Style**: Follow ESLint and Prettier configurations
2. **Testing**: Add tests for new components and features
3. **Performance**: Maintain React.memo optimizations
4. **Accessibility**: Ensure keyboard navigation and ARIA support

---

**Built with enterprise-grade practices for production-ready AI applications** ⚡️