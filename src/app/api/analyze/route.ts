import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check for either record_id (old format) or lead_id (new format)
    if (!body.record_id && !body.lead_id) {
      return NextResponse.json(
        { success: false, error: "record_id or lead_id is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not defined in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`n8n webhook failed with status: ${response.status}`);
      return NextResponse.json(
        { success: false, error: "Failed to process AI analysis with n8n" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error communicating with n8n webhook:", error);
    return NextResponse.json(
      { success: false, error: "Failed to communicate with the automation server" },
      { status: 500 }
    );
  }
}
