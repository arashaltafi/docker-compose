'use client';

import Link from 'next/link';
import type { IUser } from '../types';

export default function UserList({ users, onDelete }: { users: IUser[]; onDelete?: (id: string) => void }) {
    return (
        <ul className="space-y-2">
            {users.map(u => (
                <li key={u._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                    <Link href={`/users/${u._id}`} className="font-semibold">{u.name}</Link>
                    <div className="space-x-2">
                        <button onClick={() => onDelete?.(u._id)} className="text-red-600">Delete</button>
                        <Link href={`/users/${u._id}/edit`} className="text-blue-600">Edit</Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}