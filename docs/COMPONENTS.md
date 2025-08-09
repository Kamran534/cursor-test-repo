# Component Documentation

## Table of Contents

1. [Overview](#overview)
2. [Component Architecture](#component-architecture)
3. [RootLayout Component](#rootlayout-component)
4. [Home Component](#home-component)
5. [Component Guidelines](#component-guidelines)
6. [Styling Guide](#styling-guide)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Performance Considerations](#performance-considerations)

---

## Overview

This document provides detailed documentation for all React components in the Next.js Hello World application. Each component is documented with its purpose, props, usage patterns, and best practices.

### Component Structure

```
app/
├── layout.tsx          # Root layout component
├── page.tsx           # Home page component
└── globals.css        # Global styles
```

---

## Component Architecture

### Design Principles

1. **Single Responsibility**: Each component has a single, well-defined purpose
2. **Composability**: Components can be easily combined and reused
3. **Type Safety**: All components use TypeScript for type checking
4. **Accessibility**: Components follow WCAG 2.1 guidelines
5. **Performance**: Components are optimized for performance and SEO

### Component Categories

- **Layout Components**: Provide structure and consistent styling across pages
- **Page Components**: Represent individual routes in the application
- **UI Components**: Reusable interface elements (future expansion)

---

## RootLayout Component

### Overview

The `RootLayout` component serves as the application's root layout, wrapping all pages and providing consistent HTML structure, metadata, and global styling.

**File**: `app/layout.tsx`

### Interface

```typescript
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps): JSX.Element
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | The page content to be rendered within the layout |

### Features

- **Font Integration**: Automatically loads and applies the Inter font from Google Fonts
- **Responsive Design**: Provides a responsive foundation for all pages
- **SEO Optimization**: Includes metadata configuration for search engines
- **Global Styling**: Applies global CSS styles and Tailwind directives
- **Semantic HTML**: Uses proper HTML5 semantic structure

### Implementation

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello World - Next.js',
  description: 'A simple Hello World Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Font Configuration

The layout uses the Inter font with the following configuration:

```typescript
const inter = Inter({ 
  subsets: ['latin'],
  // Additional options:
  // weight: ['400', '500', '600', '700'],
  // style: ['normal', 'italic'],
  // display: 'swap',
})
```

### Metadata Configuration

The component exports metadata that affects the entire application:

```typescript
export const metadata: Metadata = {
  title: 'Hello World - Next.js',
  description: 'A simple Hello World Next.js application',
  // Can be extended with additional metadata
}
```

### Usage Patterns

#### Basic Usage (Automatic)
```typescript
// The RootLayout is automatically applied by Next.js App Router
// No manual implementation required
```

#### Extending with Custom Metadata
```typescript
// In individual pages, you can override metadata
export const metadata: Metadata = {
  title: 'About - Hello World',
  description: 'Learn more about our Hello World application',
}
```

### Customization Examples

#### Adding Global Scripts
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://analytics.example.com/script.js" />
      </head>
      <body className={inter.className}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `console.log('App initialized');`
        }} />
      </body>
    </html>
  )
}
```

#### Adding Global Context Providers
```typescript
import { ThemeProvider } from './context/ThemeContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Accessibility Features

- **Language Declaration**: `lang="en"` attribute for screen readers
- **Font Loading**: Uses `font-display: swap` for better performance
- **Semantic Structure**: Proper HTML5 document structure

---

## Home Component

### Overview

The `Home` component is the main page component that displays the application's welcome content. It serves as the landing page accessible at the root route (`/`).

**File**: `app/page.tsx`

### Interface

```typescript
export default function Home(): JSX.Element
```

### Props

This component doesn't accept any props as it's a page component that handles the root route.

### Features

- **Responsive Layout**: Adapts to different screen sizes using Flexbox and Tailwind CSS
- **Centered Design**: Content is vertically and horizontally centered
- **Typography Hierarchy**: Clear visual hierarchy with heading and body text
- **Interactive Elements**: Styled code element for visual emphasis
- **Instructions**: Provides clear guidance for developers

### Implementation

```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Hello World!
        </h1>
        <p className="text-xl text-center text-gray-600">
          Welcome to your Next.js application
        </p>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code> to get started
          </p>
        </div>
      </div>
    </main>
  )
}
```

### Layout Structure

```
<main> (Full-screen flex container)
  └── <div> (Content wrapper with max-width)
      ├── <h1> (Main heading)
      ├── <p> (Welcome message)
      └── <div> (Instructions container)
          └── <p> (Instructions with code element)
```

### CSS Classes Breakdown

#### Main Container
```css
.flex           /* Display: flex */
.min-h-screen   /* Min-height: 100vh */
.flex-col       /* Flex-direction: column */
.items-center   /* Align-items: center */
.justify-center /* Justify-content: center */
.p-24           /* Padding: 6rem (96px) */
```

#### Content Wrapper
```css
.z-10          /* Z-index: 10 */
.max-w-5xl     /* Max-width: 64rem (1024px) */
.w-full        /* Width: 100% */
.items-center  /* Align-items: center */
.justify-between /* Justify-content: space-between */
.font-mono     /* Font-family: monospace */
.text-sm       /* Font-size: 0.875rem */
```

#### Typography
```css
.text-4xl      /* Font-size: 2.25rem (36px) */
.font-bold     /* Font-weight: 700 */
.text-center   /* Text-align: center */
.mb-8          /* Margin-bottom: 2rem (32px) */
.text-xl       /* Font-size: 1.25rem (20px) */
.text-gray-600 /* Color: gray-600 */
.text-gray-500 /* Color: gray-500 */
```

#### Code Element
```css
.bg-gray-100   /* Background-color: gray-100 */
.px-2          /* Padding-left/right: 0.5rem */
.py-1          /* Padding-top/bottom: 0.25rem */
.rounded       /* Border-radius: 0.25rem */
```

### Responsive Behavior

The component is responsive by default due to Tailwind's mobile-first approach:

```typescript
// Mobile (default)
<main className="flex min-h-screen flex-col items-center justify-center p-24">

// Tablet and above (can be extended)
<main className="flex min-h-screen flex-col items-center justify-center p-24 md:p-32">

// Desktop (can be extended)
<main className="flex min-h-screen flex-col items-center justify-center p-24 md:p-32 lg:p-48">
```

### Customization Examples

#### Adding Interactive Elements
```typescript
'use client'

import { useState } from 'react'

export default function Home() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Hello World!
        </h1>
        <p className="text-xl text-center text-gray-600">
          Welcome to your Next.js application
        </p>
        <div className="mt-8 text-center">
          <button 
            onClick={() => setClickCount(prev => prev + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Clicked {clickCount} times
          </button>
        </div>
      </div>
    </main>
  )
}
```

#### Adding Navigation Links
```typescript
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Hello World!
        </h1>
        <p className="text-xl text-center text-gray-600">
          Welcome to your Next.js application
        </p>
        <nav className="mt-8 flex gap-4 justify-center">
          <Link href="/about" className="text-blue-500 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-blue-500 hover:text-blue-600">
            Contact
          </Link>
        </nav>
      </div>
    </main>
  )
}
```

### Accessibility Features

- **Semantic HTML**: Uses `<main>` element for primary content
- **Heading Hierarchy**: Proper `<h1>` for page title
- **Focus Management**: Keyboard navigation support
- **Screen Reader Support**: Descriptive content structure

### SEO Considerations

- **Heading Structure**: Clear H1 for page title
- **Content Hierarchy**: Logical content organization
- **Meta Information**: Inherits from RootLayout metadata
- **Semantic Markup**: Proper HTML5 semantics

---

## Component Guidelines

### Creating New Components

#### File Structure
```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Card/
│       ├── Card.tsx
│       ├── Card.test.tsx
│       └── index.ts
└── layout/
    ├── Header/
    │   ├── Header.tsx
    │   └── index.ts
    └── Footer/
        ├── Footer.tsx
        └── index.ts
```

#### Component Template
```typescript
import { ReactNode } from 'react'

export interface ComponentNameProps {
  children?: ReactNode
  className?: string
  // Add specific props here
}

export default function ComponentName({
  children,
  className = '',
  ...props
}: ComponentNameProps) {
  return (
    <div className={`base-classes ${className}`} {...props}>
      {children}
    </div>
  )
}
```

### TypeScript Patterns

#### Props Interface
```typescript
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}
```

#### Event Handlers
```typescript
interface FormProps {
  onSubmit: (data: FormData) => void
  onError?: (error: Error) => void
  onChange?: (field: string, value: string) => void
}
```

#### Ref Forwarding
```typescript
import { forwardRef } from 'react'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
```

---

## Styling Guide

### Tailwind CSS Patterns

#### Layout Utilities
```css
/* Flexbox */
.flex .flex-col .items-center .justify-center

/* Grid */
.grid .grid-cols-1 .md:grid-cols-2 .lg:grid-cols-3

/* Spacing */
.p-4 .px-6 .py-2 .m-4 .mx-auto .my-8

/* Sizing */
.w-full .max-w-md .h-screen .min-h-full
```

#### Component Variants
```typescript
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
}

const buttonSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}
```

#### Responsive Design
```css
/* Mobile-first approach */
.text-sm      /* Base: small text */
.md:text-base /* Medium screens and up: normal text */
.lg:text-lg   /* Large screens and up: large text */

.p-4          /* Base: 1rem padding */
.md:p-6       /* Medium screens and up: 1.5rem padding */
.lg:p-8       /* Large screens and up: 2rem padding */
```

### CSS Custom Properties

#### Theme Variables
```css
:root {
  --color-primary: 59 130 246;     /* blue-500 */
  --color-secondary: 107 114 128;  /* gray-500 */
  --color-success: 34 197 94;      /* green-500 */
  --color-danger: 239 68 68;       /* red-500 */
  --color-warning: 245 158 11;     /* amber-500 */
}
```

#### Usage
```css
.custom-button {
  background-color: rgb(var(--color-primary));
  color: white;
}
```

---

## Accessibility Guidelines

### WCAG 2.1 Compliance

#### Keyboard Navigation
```typescript
function AccessibleButton({ children, onClick }: ButtonProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick?.()
    }
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  )
}
```

#### ARIA Attributes
```typescript
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={isOpen ? 'block' : 'hidden'}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  )
}
```

#### Screen Reader Support
```typescript
function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className="animate-spin"
    >
      <span className="sr-only">Loading...</span>
      {/* Spinner visual element */}
    </div>
  )
}
```

### Focus Management

#### Focus Indicators
```css
.focus-visible:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

#### Skip Links
```typescript
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0"
    >
      Skip to main content
    </a>
  )
}
```

---

## Performance Considerations

### Optimization Strategies

#### Component Memoization
```typescript
import { memo } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ 
  data 
}: { data: ComplexData }) {
  // Expensive computations here
  return <div>{/* Rendered content */}</div>
})
```

#### Lazy Loading
```typescript
import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
```

#### Image Optimization
```typescript
import Image from 'next/image'

function OptimizedImage() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

### Bundle Optimization

#### Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable server-side rendering if needed
})
```

#### Tree Shaking
```typescript
// Good: Import only what you need
import { useState } from 'react'
import { format } from 'date-fns'

// Avoid: Importing entire libraries
import * as React from 'react'
import * as dateFns from 'date-fns'
```

---

This comprehensive component documentation provides detailed information about each component's structure, usage patterns, and best practices. Use this as a reference when working with or extending the existing components in the application.