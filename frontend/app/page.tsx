// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white p-8 rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome! Use the navigation to view, edit, or add users.
      </p>
      <Link href="/users" className="inline-block bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-500 transition">
        View All Users →
      </Link>
    </div>
  );
}