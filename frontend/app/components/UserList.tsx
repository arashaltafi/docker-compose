'use client';

import { INews } from '@/types';
import Link from 'next/link';

export default function UserList({ users }: { users: INews[] }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(u => (
                <li key={u.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition flex justify-between items-center">
                    <Link href={`/users/${u.id}`} className="font-semibold text-blue-600 hover:underline">{u.title}</Link>
                    <div className="space-x-2">
                        <Link href={`/users/edit?id=${u.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}