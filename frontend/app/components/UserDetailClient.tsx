'use client';

import { INews } from '@/types';
import { useRouter } from 'next/navigation';

export default function UserDetailClient({ user }: { user: INews }) {
    const router = useRouter();

    async function handleDelete() {
        const res = await fetch(`/api/proxy/news/${user.id}`, { method: 'DELETE' });
        if (res.ok) router.push('/users');
        else alert('Failed to delete user');
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{user.title}</h1>
            <p className="text-gray-700 mb-4">Content: {user.content}</p>
            <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow transition"
            >
                Delete User
            </button>
        </div>
    );
}