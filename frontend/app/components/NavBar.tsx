import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="bg-white p-4 shadow mb-6">
            <Link href="/users" className="font-semibold">Users</Link>
        </nav>
    );
}