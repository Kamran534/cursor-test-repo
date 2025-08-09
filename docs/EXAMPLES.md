# Usage Examples

## Table of Contents

1. [Getting Started Examples](#getting-started-examples)
2. [Component Examples](#component-examples)
3. [Styling Examples](#styling-examples)
4. [API Routes Examples](#api-routes-examples)
5. [Data Fetching Examples](#data-fetching-examples)
6. [Form Handling Examples](#form-handling-examples)
7. [State Management Examples](#state-management-examples)
8. [Routing Examples](#routing-examples)
9. [SEO and Metadata Examples](#seo-and-metadata-examples)
10. [Testing Examples](#testing-examples)
11. [Deployment Examples](#deployment-examples)
12. [Performance Optimization Examples](#performance-optimization-examples)

---

## Getting Started Examples

### 1. Running the Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### 2. Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start

# Check build output
ls -la .next/

# Analyze bundle size
ANALYZE=true npm run build
```

### 3. Code Quality Checks

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Type checking
npx tsc --noEmit

# Format code (if prettier is installed)
npx prettier --write .
```

---

## Component Examples

### 1. Creating a Simple Button Component

```typescript
// components/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
```

### 2. Using the Button Component

```typescript
// app/page.tsx
'use client'

import { useState } from 'react'
import Button from '../components/Button'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const handleAsyncAction = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setCount(prev => prev + 1)
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-center">Button Examples</h1>
        
        <div className="flex gap-4">
          <Button variant="primary" onClick={() => setCount(prev => prev + 1)}>
            Primary Button
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Large
          </Button>
          <Button variant="danger" size="sm">
            Danger Small
          </Button>
        </div>

        <div className="text-center">
          <p className="mb-4">Count: {count}</p>
          <Button
            variant="primary"
            loading={loading}
            onClick={handleAsyncAction}
          >
            {loading ? 'Loading...' : 'Async Action'}
          </Button>
        </div>
      </div>
    </main>
  )
}
```

### 3. Creating a Card Component

```typescript
// components/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  footer?: ReactNode
  className?: string
}

export default function Card({ children, title, footer, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  )
}
```

### 4. Modal Component with Portal

```typescript
// components/Modal.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
```

---

## Styling Examples

### 1. Using Tailwind CSS Classes

```typescript
// components/StyledComponents.tsx
export default function StyledComponents() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg">Card 1</div>
        <div className="bg-green-500 text-white p-4 rounded-lg">Card 2</div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">Card 3</div>
      </div>

      {/* Flexbox Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-gray-800">Flex Layout</h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Action 1
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
            Action 2
          </button>
        </div>
      </div>

      {/* Typography */}
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Main Heading</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Subheading</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          This is a paragraph with some example text to show typography styling.
          It includes proper spacing and line height for better readability.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          This is a blockquote example with custom styling.
        </blockquote>
      </div>
    </div>
  )
}
```

### 2. Custom CSS with Tailwind

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes */
@layer components {
  .btn {
    @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-blue-500;
  }
  
  .card {
    @apply bg-white overflow-hidden shadow rounded-lg;
  }
  
  .card-header {
    @apply px-4 py-5 sm:px-6 border-b border-gray-200;
  }
  
  .card-body {
    @apply px-4 py-5 sm:p-6;
  }
}

/* Custom utilities */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.8);
  }
}
```

### 3. Dark Mode Implementation

```typescript
// components/ThemeProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme
    if (stored) {
      setTheme(stored)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

// Usage component
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

---

## API Routes Examples

### 1. Basic API Route

```typescript
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get('name') || 'World'
  
  return NextResponse.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    // Process the data
    const result = {
      id: Date.now(),
      name: body.name,
      message: `Hello, ${body.name}!`,
      createdAt: new Date().toISOString(),
    }
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}
```

### 2. Dynamic API Route

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: string
  name: string
  email: string
}

// Mock database
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === params.id)
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(user)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const userIndex = users.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    users[userIndex] = { ...users[userIndex], ...body }
    
    return NextResponse.json(users[userIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex(u => u.id === params.id)
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  users.splice(userIndex, 1)
  
  return NextResponse.json({ success: true })
}
```

### 3. File Upload API

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      )
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const path = join('./public/uploads', filename)
    
    await writeFile(path, buffer)
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      filename,
      url: `/uploads/${filename}`,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

---

## Data Fetching Examples

### 1. Server Components (App Router)

```typescript
// app/posts/page.tsx
interface Post {
  id: number
  title: string
  body: string
  userId: number
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    // Revalidate every hour
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        {posts.slice(0, 10).map(post => (
          <div key={post.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 2. Client-Side Data Fetching with SWR

```typescript
// components/PostsList.tsx
'use client'

import useSWR from 'swr'

interface Post {
  id: number
  title: string
  body: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function PostsList() {
  const { data: posts, error, isLoading, mutate } = useSWR<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  )

  if (error) {
    return (
      <div className="text-red-600 p-4">
        <h2>Error loading posts</h2>
        <button
          onClick={() => mutate()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => mutate()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh
      </button>
      {posts?.slice(0, 10).map(post => (
        <div key={post.id} className="border rounded-lg p-4">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Custom Hook for API Calls

```typescript
// hooks/useApi.ts
'use client'

import { useState, useEffect } from 'react'

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

// Usage
export function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error, refetch } = useApi<User>(
    `/api/users/${userId}`
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <button onClick={refetch} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Refresh
      </button>
    </div>
  )
}
```

---

## Form Handling Examples

### 1. Basic Form with useState

```typescript
// components/ContactForm.tsx
'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800">Message sent successfully!</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 text-green-600 hover:text-green-800"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

### 2. Form with Validation

```typescript
// components/SignupForm.tsx
'use client'

import { useState } from 'react'

interface FormErrors {
  name?: string
  email?: string
  password?: string
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      // API call here
      console.log('Form submitted:', formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}
```

---

## State Management Examples

### 1. Local State with useState

```typescript
// components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Counter: {count}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Step: {step}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setCount(prev => prev - step)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            -{step}
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(prev => prev + step)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +{step}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### 2. Global State with Context

```typescript
// context/AppContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

interface AppState {
  user: User | null
  theme: 'light' | 'dark'
  notifications: Notification[]
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

interface User {
  id: string
  name: string
  email: string
}

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

const initialState: AppState = {
  user: null,
  theme: 'light',
  notifications: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
}>({
  state: initialState,
  dispatch: () => null,
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Custom hooks for specific actions
export const useNotifications = () => {
  const { state, dispatch } = useApp()

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
    }
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })

    // Auto-remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })
    }, 5000)
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
  }
}
```

### 3. Using the Global State

```typescript
// components/UserProfile.tsx
'use client'

import { useApp, useNotifications } from '../context/AppContext'

export default function UserProfile() {
  const { state, dispatch } = useApp()
  const { addNotification } = useNotifications()

  const handleLogin = () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    }
    dispatch({ type: 'SET_USER', payload: user })
    addNotification('Successfully logged in!', 'success')
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null })
    addNotification('Successfully logged out!', 'info')
  }

  if (!state.user) {
    return (
      <div className="p-4">
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome, {state.user.name}!</h2>
      <p className="text-gray-600">{state.user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}
```

---

## Routing Examples

### 1. Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
interface Post {
  slug: string
  title: string
  content: string
  publishedAt: string
}

async function getPost(slug: string): Promise<Post | null> {
  // Simulate API call
  const posts: Post[] = [
    {
      slug: 'hello-world',
      title: 'Hello World',
      content: 'This is my first blog post!',
      publishedAt: '2023-01-01',
    },
    {
      slug: 'nextjs-tips',
      title: 'Next.js Tips',
      content: 'Here are some useful Next.js tips...',
      publishedAt: '2023-01-02',
    },
  ]

  return posts.find(post => post.slug === slug) || null
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Post not found</h1>
        <p className="mt-2 text-gray-600">
          The blog post you're looking for doesn't exist.
        </p>
      </div>
    )
  }

  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </article>
  )
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160) + '...',
  }
}
```

### 2. Navigation Component

```typescript
// components/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center px-4 text-lg font-bold">
              My App
            </Link>
          </div>
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

### 3. Breadcrumbs Component

```typescript
// components/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) return null

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/')
          const isLast = index === pathSegments.length - 1
          const label = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <li key={href}>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {label}
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

---

## SEO and Metadata Examples

### 1. Dynamic Metadata

```typescript
// app/products/[id]/page.tsx
import { Metadata } from 'next'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

async function getProduct(id: string): Promise<Product | null> {
  // Simulate API call
  return {
    id,
    name: 'Amazing Product',
    description: 'This is an amazing product that you will love.',
    price: 99.99,
    image: '/product-image.jpg',
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: 'Product not found',
    }
  }

  return {
    title: `${product.name} - Our Store`,
    description: product.description,
    keywords: ['product', 'store', product.name],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-bold mt-4">${product.price}</p>
    </div>
  )
}
```

### 2. JSON-LD Structured Data

```typescript
// components/StructuredData.tsx
interface ProductStructuredDataProps {
  product: {
    name: string
    description: string
    price: number
    image: string
    brand: string
    sku: string
  }
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Usage in a page
export default function ProductPage() {
  const product = {
    name: 'Amazing Widget',
    description: 'The most amazing widget you will ever see',
    price: 29.99,
    image: 'https://example.com/widget.jpg',
    brand: 'Widget Co',
    sku: 'WIDGET-001',
  }

  return (
    <>
      <ProductStructuredData product={product} />
      <div className="product-page">
        {/* Product content */}
      </div>
    </>
  )
}
```

---

## Testing Examples

### 1. Component Testing with Jest

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../components/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button loading>Loading button</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText(/loading button/i)).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })
})
```

### 2. API Route Testing

```typescript
// __tests__/api/hello.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '../../pages/api/hello'

describe('/api/hello', () => {
  it('returns hello message for GET request', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { name: 'John' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    
    const data = JSON.parse(res._getData())
    expect(data.message).toBe('Hello, John!')
  })

  it('creates new greeting for POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: 'Jane' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    
    const data = JSON.parse(res._getData())
    expect(data.name).toBe('Jane')
    expect(data.message).toBe('Hello, Jane!')
  })

  it('returns 400 for invalid POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    
    const data = JSON.parse(res._getData())
    expect(data.error).toBe('Name is required')
  })
})
```

### 3. Integration Testing

```typescript
// __tests__/integration/user-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import UserProfile from '../components/UserProfile'

// Mock API server
const server = setupServer(
  rest.get('/api/user/1', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      })
    )
  }),
  
  rest.put('/api/user/1', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('User Profile Flow', () => {
  it('loads and updates user profile', async () => {
    render(<UserProfile userId="1" />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'))

    // Update name
    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'John Smith' } })

    // Save changes
    fireEvent.click(screen.getByText('Save'))

    // Wait for update
    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument()
    })
  })
})
```

---

## Deployment Examples

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
vercel env add DATABASE_URL
```

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2. Docker Deployment

```dockerfile
# Dockerfile
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

```bash
# Build and run Docker container
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

### 3. GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Performance Optimization Examples

### 1. Image Optimization

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
}: OptimizedImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgADBAUREiExkbHB0f/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknysoC5OTjHHqapAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi//Z"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
```

### 2. Component Lazy Loading

```typescript
// components/LazyComponents.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div className="animate-pulse bg-gray-300 h-64 rounded" />,
  ssr: false, // Don't render on server if not needed
})

const LazyModal = dynamic(() => import('./Modal'), {
  loading: () => <div>Loading modal...</div>,
})

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>
      
      {/* Lazy load chart only when needed */}
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
      
      {/* Conditionally load modal */}
      {showModal && <LazyModal />}
    </div>
  )
}
```

### 3. Memory Optimization

```typescript
// hooks/useOptimizedState.ts
import { useState, useCallback, useMemo } from 'react'

interface UseOptimizedListProps<T> {
  items: T[]
  filterFn?: (item: T, query: string) => boolean
  sortFn?: (a: T, b: T) => number
}

export function useOptimizedList<T>({
  items,
  filterFn,
  sortFn,
}: UseOptimizedListProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Memoize expensive operations
  const filteredAndSortedItems = useMemo(() => {
    let result = items

    // Filter items
    if (searchQuery && filterFn) {
      result = result.filter(item => filterFn(item, searchQuery))
    }

    // Sort items
    if (sortFn) {
      result = [...result].sort((a, b) => {
        const comparison = sortFn(a, b)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [items, searchQuery, sortOrder, filterFn, sortFn])

  // Memoize callbacks to prevent unnecessary re-renders
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }, [])

  return {
    items: filteredAndSortedItems,
    searchQuery,
    sortOrder,
    handleSearchChange,
    toggleSortOrder,
  }
}
```

---

This comprehensive examples documentation provides practical, real-world usage patterns for all the APIs, components, and functionality in your Next.js application. Use these examples as starting points for implementing features in your own projects.