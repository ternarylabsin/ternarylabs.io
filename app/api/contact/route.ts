import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the data
    const { name, email, company, projectType, budget, message } = body

    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // For now, just log to console
    console.log("Contact Form Submission:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      projectType,
      budget,
      message,
    })

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification email to admin
    // 4. Integrate with CRM (HubSpot, Notion, etc.)

    return NextResponse.json(
      { success: true, message: "Thank you for your inquiry!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
