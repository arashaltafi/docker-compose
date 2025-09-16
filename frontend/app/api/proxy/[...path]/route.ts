import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://back:4000";

// helper function
async function proxyFetch(req: NextRequest, method: string, params: string[]) {
  const url = `${BACKEND_URL}/${params.join("/")}${req.nextUrl.search}`;
  const init: RequestInit = { method };

  if (method !== "GET" && method !== "DELETE") {
    init.body = JSON.stringify(await req.json());
    init.headers = { "Content-Type": "application/json" };
  }

  const res = await fetch(url, init);
  if (method === "DELETE" && res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// GET
export async function GET(req: NextRequest, ctx: any) {
  return proxyFetch(req, "GET", ctx.params.path as string[]);
}

// POST
export async function POST(req: NextRequest, ctx: any) {
  return proxyFetch(req, "POST", ctx.params.path as string[]);
}

// PUT
export async function PUT(req: NextRequest, ctx: any) {
  return proxyFetch(req, "PUT", ctx.params.path as string[]);
}

// DELETE
export async function DELETE(req: NextRequest, ctx: any) {
  return proxyFetch(req, "DELETE", ctx.params.path as string[]);
}