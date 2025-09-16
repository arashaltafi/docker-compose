"use client";

import { IUser } from "@/types";
import { useRouter } from "next/navigation";

export default function UserDetailClient({ user }: { user: IUser }) {
    const router = useRouter();

    async function handleDelete() {
        const res = await fetch(`/api/proxy/users/${user._id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            router.push("/users");
        } else {
            alert("Failed to delete user");
        }
    }

    return (
        <>
            <h1 className="text-2xl mb-4">User: {user.name}</h1>
            <p>Email: {user.email}</p>
            <button
                onClick={handleDelete}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
                Delete User
            </button>
        </>
    );
}