// types/next.d.ts
import "next";

declare module "next" {
    export interface PageProps {
        params?: any;        // <-- allow plain object
        searchParams?: any;  // <-- allow plain object
    }
}