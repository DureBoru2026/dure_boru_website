import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/contact (Admin viewing contact messages)
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, count: db.contactMessages.length, data: db.contactMessages });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/contact (Submitting message OR replying to message)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, messageId, replyMessage, name, email, subject, message } = body;

    // Admin Reply action
    if (action === "reply") {
      if (!messageId || !replyMessage) {
        return NextResponse.json({ success: false, error: "Missing messageId or replyMessage." }, { status: 400 });
      }

      const msg = db.contactMessages.find(m => m.id === messageId);
      if (!msg) {
        return NextResponse.json({ success: false, error: "Message not found." }, { status: 404 });
      }

      msg.isReplied = true;
      msg.replyMessage = replyMessage;

      // Log activity
      db.activityLogs.unshift({
        id: `act_${Date.now()}`,
        userId: "usr_admin",
        userName: "Admin Manager",
        action: `Replied to contact message from ${msg.name}: "${subject}"`,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({ success: true, data: msg });
    }

    // Normal client message submission
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Please fill in all contact form fields (name, email, subject, message)." }, { status: 400 });
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      name,
      email,
      subject,
      message,
      isReplied: false,
      createdAt: new Date().toISOString()
    };

    db.contactMessages.unshift(newMessage);

    return NextResponse.json({ success: true, message: "Your message has been sent successfully. Our support team will respond shortly." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
