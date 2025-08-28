"use server";

import { EsignResponseSchema } from "./schema";


const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export async function getEsignUrl(userId: number, userType: string) {
  const resp = await fetch(`${API_BASE_URL}/partner/esign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, userType }),
  });
  console.log(resp);
  const json = await resp.json();
  console.log(json);
  return EsignResponseSchema.parse(json);
}
