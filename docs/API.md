# API Documentation

## Table of Contents

1. [Components](#components)
   - [RootLayout](#rootlayout)
   - [Home](#home)
2. [Configuration](#configuration)
   - [Next.js Configuration](#nextjs-configuration)
   - [Tailwind Configuration](#tailwind-configuration)
3. [Styles](#styles)
   - [Global Styles](#global-styles)
4. [Metadata](#metadata)
5. [Usage Examples](#usage-examples)

---

## Components

### RootLayout

**File:** `app/layout.tsx`

The root layout component that wraps all pages in the application. It provides the basic HTML structure and applies global styles.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | Yes | The page content to be rendered inside the layout |

#### Features

- Sets up the Inter font from Google Fonts
- Applies global CSS styles
- Provides semantic HTML structure
- Configures page metadata

#### Example Usage

```tsx
// This component is automatically used by Next.js App Router
// No direct usage required - it wraps all pages automatically

// The layout provides the following structure:
// <html lang="en">
//   <body className={inter.className}>
//     {children} // Your page content goes here
//   </body>
// </html>
```

#### Implementation Details

```tsx
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

---

### Home

**File:** `app/page.tsx`

The main page component that displays the Hello World content. This is the default route (`/`) of the application.

#### Props

This component doesn't accept any props as it's a page component.

#### Features

- Responsive design using Tailwind CSS
- Centered layout with flexbox
- Welcome message with styling
- Instructions for getting started

#### Example Usage

```tsx
// This component is automatically rendered at the root route "/"
// Access it by navigating to http://localhost:3000

// To customize the home page:
import Home from './app/page'

// The component renders a centered welcome message
```

#### Styling Classes Used

- `flex min-h-screen flex-col items-center justify-center p-24` - Main container
- `z-10 max-w-5xl w-full items-center justify-between font-mono text-sm` - Content wrapper
- `text-4xl font-bold text-center mb-8` - Main heading
- `text-xl text-center text-gray-600` - Subtitle
- `mt-8 text-center` - Instructions container
- `text-sm text-gray-500` - Instructions text
- `bg-gray-100 px-2 py-1 rounded` - Code highlight

#### Implementation Details

```tsx
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

---

## Configuration

### Next.js Configuration

**File:** `next.config.js`

Configures Next.js build and runtime behavior.

#### Configuration Options

| Option | Value | Description |
|--------|-------|-------------|
| `experimental.appDir` | `true` | Enables the new App Router (Next.js 13+) |

#### Example Usage

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Add additional configuration options here
  // images: {
  //   domains: ['example.com'],
  // },
  // env: {
  //   CUSTOM_KEY: process.env.CUSTOM_KEY,
  // },
}

module.exports = nextConfig
```

#### Common Configuration Extensions

```javascript
// Production optimizations
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Enable image optimization
  images: {
    domains: ['cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Environment variables
  env: {
    API_URL: process.env.API_URL,
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
}
```

---

### Tailwind Configuration

**File:** `tailwind.config.ts`

Configures Tailwind CSS utilities and theme customizations.

#### Configuration Structure

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
```

#### Content Paths

- `./pages/**/*.{js,ts,jsx,tsx,mdx}` - Pages directory (Pages Router)
- `./components/**/*.{js,ts,jsx,tsx,mdx}` - Components directory
- `./app/**/*.{js,ts,jsx,tsx,mdx}` - App directory (App Router)

#### Custom Theme Extensions

- `gradient-radial` - Custom radial gradient utility
- `gradient-conic` - Custom conic gradient utility

#### Example Usage

```typescript
// Extending the theme with custom colors
const config: Config = {
  // ... existing config
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
```

---

## Styles

### Global Styles

**File:** `app/globals.css`

Defines global CSS variables, base styles, and Tailwind directives.

#### Tailwind Directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### CSS Custom Properties

| Property | Light Mode | Dark Mode | Description |
|----------|------------|-----------|-------------|
| `--foreground-rgb` | `0, 0, 0` | `255, 255, 255` | Text color values |
| `--background-start-rgb` | `214, 219, 220` | `0, 0, 0` | Gradient start color |
| `--background-end-rgb` | `255, 255, 255` | `0, 0, 0` | Gradient end color |

#### Body Styling

The body element includes:
- Responsive text color based on color scheme preference
- Linear gradient background
- Support for dark mode via `prefers-color-scheme: dark`

#### Custom Utilities

- `.text-balance` - Applies `text-wrap: balance` for better text wrapping

#### Example Usage

```css
/* Custom component styles */
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded;
  }
}

/* Custom utilities */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
}
```

---

## Metadata

### Page Metadata

**File:** `app/layout.tsx`

The application metadata is defined in the root layout:

```typescript
export const metadata: Metadata = {
  title: 'Hello World - Next.js',
  description: 'A simple Hello World Next.js application',
}
```

#### Metadata Properties

| Property | Value | Description |
|----------|-------|-------------|
| `title` | `'Hello World - Next.js'` | Page title shown in browser tab |
| `description` | `'A simple Hello World Next.js application'` | Meta description for SEO |

#### Extending Metadata

```typescript
// Example of extended metadata
export const metadata: Metadata = {
  title: 'Hello World - Next.js',
  description: 'A simple Hello World Next.js application',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  openGraph: {
    title: 'Hello World - Next.js',
    description: 'A simple Hello World Next.js application',
    url: 'https://example.com',
    siteName: 'Hello World App',
    images: [
      {
        url: 'https://example.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hello World - Next.js',
    description: 'A simple Hello World Next.js application',
    images: ['https://example.com/twitter-image.png'],
  },
}
```

---

## Usage Examples

### Creating a New Page

```typescript
// app/about/page.tsx
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <p className="text-xl text-center text-gray-600">
        Learn more about our application
      </p>
    </main>
  )
}
```

### Adding Custom Components

```typescript
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md' 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded transition-colors'
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  }
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Using the Button Component

```typescript
// app/page.tsx
import Button from '../components/Button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">Hello World!</h1>
      
      <div className="flex gap-4">
        <Button onClick={() => alert('Primary clicked!')}>
          Primary Button
        </Button>
        <Button variant="secondary" size="lg">
          Secondary Button
        </Button>
      </div>
    </main>
  )
}
```

### Setting Up API Routes

```typescript
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello, World!' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ 
    message: 'Data received!', 
    data: body 
  })
}
```

### Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://username:password@localhost:5432/mydb
SECRET_KEY=your-secret-key-here
```

```typescript
// Using environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const dbUrl = process.env.DATABASE_URL // Server-side only
```

### Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start

# Development server
npm run dev
```

### Testing

```bash
# Run ESLint
npm run lint

# Add testing (example setup)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## Best Practices

1. **Component Organization**: Keep components in a dedicated `components/` directory
2. **Type Safety**: Use TypeScript interfaces for all props and data structures
3. **Styling**: Prefer Tailwind utility classes over custom CSS when possible
4. **Performance**: Use Next.js Image component for optimized images
5. **SEO**: Always include appropriate metadata for each page
6. **Accessibility**: Use semantic HTML and proper ARIA attributes
7. **Error Handling**: Implement error boundaries and proper error pages
8. **Code Splitting**: Leverage Next.js automatic code splitting
9. **Environment Variables**: Use environment variables for configuration
10. **Testing**: Write unit tests for components and integration tests for pages

---

This documentation covers all public APIs, components, and configurations in the current Next.js Hello World application. For specific implementation details or advanced usage patterns, refer to the individual code files and the Next.js official documentation.