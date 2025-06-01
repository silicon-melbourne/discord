import { httpRequest } from "./httpRequest.ts";

export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL ?? "";

if (!DISCORD_WEBHOOK_URL) {
  console.error("Error: DISCORD_WEBHOOK_URL environment variable is required");
  process.exit(1);
}

export async function sendToDiscord(content: string): Promise<void> {
  const data = JSON.stringify({ content });

  try {
    await httpRequest<string>(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data).toString(),
      },
      body: data,
      parseJson: false,
    });
  } catch (error) {
    throw new Error(
      `Discord API error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
