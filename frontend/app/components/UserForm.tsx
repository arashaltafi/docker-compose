'use client';

import { useState } from 'react';
import type { IUser } from '../types';

export default function UserForm({ user, onSave }: { user?: IUser; onSave: (u: Partial<IUser>) => void }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    return (
        <form onSubmit={e => { e.preventDefault(); onSave({ name, email }); }}>
            <div className="mb-4">
                <label>Name</label>
                <input className="border w-full p-2" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label>Email</label>
                <input className="border w-full p-2" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}