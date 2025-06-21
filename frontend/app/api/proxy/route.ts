import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', '');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api/proxy', '')}${path}${url.search}`);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy', '');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api/proxy', '')}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': request.headers.get('content-type')! },
        body: await request.text(),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}