import EditUserPage from '@/app/components/EditUserPage';
import { Suspense } from 'react';

export default function EditPage() {
    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditUserPage />
        </Suspense>
    );
}