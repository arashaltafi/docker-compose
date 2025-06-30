import { IUser } from "@/types";

async function getUser(id: string): Promise<IUser> {
    const res = await fetch(`/api/proxy/users/${id}`, { cache: 'no-store' });
    return res.json();
}

export default async function UserDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getUser(id);
    return (
        <>
            <h1 className="text-2xl mb-4">User: {user.name}</h1>
            <p>Email: {user.email}</p>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => fetch(`/api/proxy/users/${id}`, { method: 'DELETE' }).then(() => window.location.href = '/users')}>
                Delete User
            </button>
        </>
    );
}