import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (typeof email !== "string" || email.length > 254 || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const api = process.env.API_URL?.replace(/\/$/, "");
  if (api) {
    const res = await fetch(`${api}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
