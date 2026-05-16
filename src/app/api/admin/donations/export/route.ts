import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { env } from "@/lib/env";

export const runtime = "nodejs";

function escapeCsv(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(request: Request) {
  const secret = process.env.DONATIONS_EXPORT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "export_not_configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase || !env.supabase.enabled) {
    return NextResponse.json({ error: "supabase_not_configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("donations")
    .select(
      "order_id,gateway,amount,currency,email,note,project_slug,recurring,status,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(10_000);

  if (error) {
    console.error("[donations export]", error);
    return NextResponse.json({ error: "query_failed" }, { status: 500 });
  }

  const header = [
    "order_id",
    "gateway",
    "amount",
    "currency",
    "email",
    "note",
    "project_slug",
    "recurring",
    "status",
    "created_at",
  ];

  const rows = (data ?? []).map((row) =>
    [
      row.order_id,
      row.gateway,
      row.amount,
      row.currency,
      row.email,
      row.note,
      row.project_slug,
      row.recurring,
      row.status,
      row.created_at,
    ]
      .map(escapeCsv)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");
  const filename = `fenrir-donations-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
