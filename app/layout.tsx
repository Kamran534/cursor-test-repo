import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitAI - Your AI-Powered Fitness Journey',
  description: 'Transform your body with intelligent workout planning, real-time AI coaching, and comprehensive progress tracking. Your personal trainer that never sleeps.',
  keywords: 'fitness, AI trainer, workout planner, gym, exercise, personal trainer, progress tracking',
  authors: [{ name: 'FitAI Team' }],
  creator: 'FitAI',
  publisher: 'FitAI',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      }
    ]
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
              borderRadius: '0.75rem',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            // Default options for specific types
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1f2937',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1f2937',
              },
            },
            loading: {
              iconTheme: {
                primary: '#3b82f6',
                secondary: '#1f2937',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
