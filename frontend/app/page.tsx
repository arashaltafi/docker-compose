import type { Metadata } from 'next'
import Link from 'next/link'

// Page-specific metadata
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View and manage all users',
}

export default async function HomePage() {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">User Manager Dashboard</h1>
      <p className="mb-6">Use the navigation above to view or edit users.</p>
      <Link href="/users" className="text-blue-600 hover:underline">
        View All Users →
      </Link>
    </main>
  )
}