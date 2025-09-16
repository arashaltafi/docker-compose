import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="bg-white shadow p-4 mb-6 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">User Manager</h1>
            <div className="space-x-4">
                <Link href="/" className="hover:text-blue-500">Dashboard</Link>
                <Link href="/users" className="hover:text-blue-500">Users</Link>
            </div>
        </nav>
    );
}