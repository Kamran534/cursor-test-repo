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
