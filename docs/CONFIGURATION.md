# Configuration Documentation

## Table of Contents

1. [Overview](#overview)
2. [Package Configuration](#package-configuration)
3. [Next.js Configuration](#nextjs-configuration)
4. [TypeScript Configuration](#typescript-configuration)
5. [Tailwind CSS Configuration](#tailwind-css-configuration)
6. [ESLint Configuration](#eslint-configuration)
7. [PostCSS Configuration](#postcss-configuration)
8. [Environment Configuration](#environment-configuration)
9. [Deployment Configuration](#deployment-configuration)
10. [Configuration Best Practices](#configuration-best-practices)

---

## Overview

This document provides comprehensive documentation for all configuration files in the Next.js Hello World application. Each configuration file is explained with its purpose, options, and customization examples.

### Configuration Files Structure

```
project-root/
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore patterns
└── .env.local             # Environment variables (create as needed)
```

---

## Package Configuration

### package.json

**File**: `package.json`

The package.json file defines the project metadata, dependencies, and available scripts.

#### Current Configuration

```json
{
  "name": "nextjs-hello-world",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8.4.24"
  }
}
```

#### Scripts Explanation

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Starts development server with hot reloading |
| `build` | `next build` | Creates optimized production build |
| `start` | `next start` | Starts production server |
| `lint` | `next lint` | Runs ESLint for code quality checks |

#### Dependencies

##### Production Dependencies

- **next**: ^14.0.4 - React framework with App Router
- **react**: ^18 - React library for building UI
- **react-dom**: ^18 - React DOM rendering

##### Development Dependencies

- **typescript**: ^5 - TypeScript compiler
- **@types/node**: ^20 - Node.js type definitions
- **@types/react**: ^18 - React type definitions
- **@types/react-dom**: ^18 - React DOM type definitions
- **eslint**: ^8 - JavaScript/TypeScript linter
- **eslint-config-next**: 14.0.4 - ESLint configuration for Next.js
- **tailwindcss**: ^3.3.0 - Utility-first CSS framework
- **autoprefixer**: ^10.0.1 - PostCSS plugin for vendor prefixes
- **postcss**: ^8.4.24 - CSS post-processor

#### Extended Configuration Example

```json
{
  "name": "nextjs-hello-world",
  "version": "0.1.0",
  "private": true,
  "description": "A modern Next.js application with TypeScript and Tailwind CSS",
  "keywords": ["nextjs", "react", "typescript", "tailwindcss"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prepare": "husky install"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8.4.24",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.3.1",
    "jest-environment-jsdom": "^29.3.1",
    "prettier": "^2.8.1",
    "husky": "^8.0.2",
    "lint-staged": "^13.1.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "browserslist": {
    "production": [
      ">0.3%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

## Next.js Configuration

### next.config.js

**File**: `next.config.js`

Configures Next.js build and runtime behavior.

#### Current Configuration

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

#### Configuration Options

| Option | Value | Description |
|--------|-------|-------------|
| `experimental.appDir` | `true` | Enables App Router (Next.js 13+) |

#### Extended Configuration Example

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable App Router
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['package-name'],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Public runtime config
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },

  // Server runtime config
  serverRuntimeConfig: {
    secret: process.env.SECRET,
  },

  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
      {
        source: '/temporary',
        destination: '/new-location',
        permanent: false,
      },
    ]
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://external-api.com/:path*',
      },
    ]
  },

  // Headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
        ],
      },
    ]
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack config
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // Output configuration
  output: 'standalone', // For Docker deployments

  // Compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Generate etags
  generateEtags: false,

  // Strict mode
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,

  // Experimental features
  experimental: {
    appDir: true,
    serverActions: true,
    typedRoutes: true,
  },
}

module.exports = nextConfig
```

#### Performance Optimizations

```javascript
const nextConfig = {
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
      return config
    },
  }),

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['package-name'],
  },
}
```

---

## TypeScript Configuration

### tsconfig.json

**File**: `tsconfig.json`

Configures TypeScript compiler options and project settings.

#### Current Configuration

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Configuration Options Explanation

| Option | Value | Description |
|--------|-------|-------------|
| `target` | `"es5"` | JavaScript version to compile to |
| `lib` | `["dom", "dom.iterable", "es6"]` | Library files to include |
| `allowJs` | `true` | Allow JavaScript files |
| `skipLibCheck` | `true` | Skip type checking of declaration files |
| `strict` | `true` | Enable strict type checking |
| `noEmit` | `true` | Don't emit output (Next.js handles this) |
| `esModuleInterop` | `true` | Enable ES module interoperability |
| `module` | `"esnext"` | Module system to use |
| `moduleResolution` | `"bundler"` | Module resolution strategy |
| `resolveJsonModule` | `true` | Allow importing JSON files |
| `isolatedModules` | `true` | Ensure each file is a module |
| `jsx` | `"preserve"` | Preserve JSX for Next.js processing |
| `incremental` | `true` | Enable incremental compilation |

#### Extended Configuration Example

```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "es6", "es2017"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    },
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".next",
    "out",
    "dist"
  ],
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  }
}
```

#### Strict Type Checking Options

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## Tailwind CSS Configuration

### tailwind.config.ts

**File**: `tailwind.config.ts`

Configures Tailwind CSS utilities, theme, and plugins.

#### Current Configuration

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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
```

#### Configuration Options Explanation

| Option | Description |
|--------|-------------|
| `content` | Paths to scan for class names |
| `theme` | Theme configuration and extensions |
| `plugins` | Tailwind plugins to include |

#### Extended Configuration Example

```typescript
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      // Colors
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gray: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#d1d5db',
          200: '#e5e7eb',
          100: '#f3f4f6',
          50: '#f9fafb',
        },
      },

      // Typography
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },

      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Box shadow
      boxShadow: {
        'inner-lg': 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'outline-blue': '0 0 0 3px rgba(59, 130, 246, 0.5)',
      },

      // Background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/images/hero-bg.svg')",
      },

      // Animation
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Keyframes
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },

      // Screens (breakpoints)
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
}

export default config
```

#### Custom Component Classes

```typescript
const config: Config = {
  // ... other config
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        '.btn': {
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            '--tw-ring-color': theme('colors.blue.500'),
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.blue.500'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.blue.600'),
          },
        },
      })
    },
  ],
}
```

---

## ESLint Configuration

### .eslintrc.json

**File**: `.eslintrc.json`

Configures ESLint rules for code quality and consistency.

#### Current Configuration

```json
{
  "extends": "next/core-web-vitals"
}
```

#### Extended Configuration Example

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "ignorePatterns": [
    "node_modules/",
    ".next/",
    "out/",
    "dist/"
  ]
}
```

#### Rule Categories

##### TypeScript Rules
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-inferrable-types": "error"
  }
}
```

##### React Rules
```json
{
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-key": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-undef": "error"
  }
}
```

##### Accessibility Rules
```json
{
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn"
  }
}
```

---

## PostCSS Configuration

### postcss.config.js

**File**: `postcss.config.js`

Configures PostCSS plugins for CSS processing.

#### Current Configuration

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### Extended Configuration Example

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
```

#### Plugin Explanations

| Plugin | Description |
|--------|-------------|
| `postcss-import` | Process CSS imports |
| `tailwindcss/nesting` | CSS nesting support |
| `tailwindcss` | Tailwind CSS processing |
| `autoprefixer` | Add vendor prefixes |
| `cssnano` | CSS minification (production) |

---

## Environment Configuration

### .env.local

**File**: `.env.local` (create as needed)

Stores environment variables for local development.

#### Example Configuration

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API Keys
OPENAI_API_KEY="sk-your-openai-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-key"

# Public variables (accessible in browser)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_ANALYTICS_ID="G-XXXXXXXXXX"

# Feature flags
NEXT_PUBLIC_FEATURE_NEW_UI="true"
NEXT_PUBLIC_FEATURE_ANALYTICS="false"
```

#### Environment File Types

| File | Purpose | Loaded When |
|------|---------|-------------|
| `.env` | Default variables | Always |
| `.env.local` | Local overrides | Always (ignored by git) |
| `.env.development` | Development variables | `NODE_ENV=development` |
| `.env.production` | Production variables | `NODE_ENV=production` |
| `.env.test` | Test variables | `NODE_ENV=test` |

#### Usage in Code

```typescript
// Server-side only
const databaseUrl = process.env.DATABASE_URL

// Client-side accessible (must start with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// With fallback
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
```

---

## Deployment Configuration

### Vercel

#### vercel.json

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  }
}
```

### Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

---

## Configuration Best Practices

### 1. Environment Variables

- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep sensitive data in server-side only variables
- Use `.env.local` for local development
- Never commit `.env.local` to version control

### 2. TypeScript Configuration

- Enable strict mode for better type safety
- Use path mapping for cleaner imports
- Configure incremental compilation for faster builds
- Set up proper type checking in CI/CD

### 3. ESLint Configuration

- Extend recommended configurations
- Add project-specific rules gradually
- Use prettier for code formatting
- Configure IDE integration

### 4. Next.js Configuration

- Use environment-specific configurations
- Optimize images and fonts
- Configure proper redirects and rewrites
- Enable compression and security headers

### 5. Tailwind Configuration

- Purge unused styles in production
- Use consistent design tokens
- Organize custom utilities properly
- Document custom component classes

### 6. Security Considerations

```javascript
// next.config.js
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ]
  },
}
```

### 7. Performance Optimization

```javascript
// next.config.js
const nextConfig = {
  // Compression
  compress: true,
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize packages
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns'],
  },
}
```

---

This comprehensive configuration documentation provides detailed information about all configuration files and their options. Use this as a reference when customizing your Next.js application for different environments and requirements.