"use server";

import { EsignResponseSchema } from "./schema";

export async function getEsignUrl(userId: number, userType: string) {
  const resp = await fetch("http://localhost:8000/partner/esign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, userType }),
  });

  const json = await resp.json();
  console.log(json);
  return EsignResponseSchema.parse(json);
}
