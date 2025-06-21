import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(
        {
            message: "Welcome To Front Project"
        },
        { status: 200 }
    );
}

export async function POST() {
    return NextResponse.json(
        {
            message: "Welcome To Front Project"
        },
        { status: 200 }
    );
}