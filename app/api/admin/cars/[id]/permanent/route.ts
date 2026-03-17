import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const adminKey = process.env.ADMIN_API_KEY;

  if (!baseUrl) return NextResponse.json({ message: "Missing NEXT_PUBLIC_API_URL" }, { status: 500 });
  if (!adminKey) return NextResponse.json({ message: "Missing ADMIN_API_KEY" }, { status: 500 });

  const { id } = context.params;

  const res = await fetch(`${baseUrl}/api/admin/cars/${id}/permanent`, {
    method: "DELETE",
    headers: {
      "x-api-key": adminKey,
    },
  });

  const json = await res.json().catch(() => null);
  return NextResponse.json(json, { status: res.status });
}
