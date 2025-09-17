'use client';

import { INews } from '@/types';
import { useState } from 'react';

export default function UserForm({ user, onSave }: { user?: INews; onSave: (u: Partial<INews>) => void }) {
    const [title, setTitle] = useState(user?.title || '');
    const [content, setContent] = useState(user?.content || '');
    return (
        <form onSubmit={e => { e.preventDefault(); onSave({ title, content }); }}>
            <div className="mb-4">
                <label>title</label>
                <input className="border w-full p-2" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="mb-4">
                <label>content</label>
                <input className="border w-full p-2" value={content} onChange={e => setContent(e.target.value)} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}