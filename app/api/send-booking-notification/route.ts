import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Send email notification to admin
    await sendAdminNotification(bookingData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending booking notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

async function sendAdminNotification(booking: any) {
  // In a real application, you would use a service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP

  const adminEmail = "vipulmgs@gmail.com"

  const emailContent = {
    to: adminEmail,
    subject: `🏨 New Booking Alert - ${booking.hotel.name}`,
    html: generateAdminEmailHTML(booking),
    text: generateAdminEmailText(booking),
  }

  // Simulate email sending (in production, replace with actual email service)
  console.log("📧 ADMIN EMAIL NOTIFICATION:")
  console.log("To:", emailContent.to)
  console.log("Subject:", emailContent.subject)
  console.log("Content:", emailContent.text)

  // Example with SendGrid (uncomment and configure in production):
  /*
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  await sgMail.send({
    to: adminEmail,
    from: 'bookings@stayease.com',
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text
  })
  */

  // Example with Nodemailer (uncomment and configure in production):
  /*
  const nodemailer = require('nodemailer')
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  
  await transporter.sendMail({
    from: 'StayEase Bookings <bookings@stayease.com>',
    to: adminEmail,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text
  })
  */

  return true
}

function generateAdminEmailHTML(booking: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .total { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 New Booking Alert!</h1>
          <p>A new reservation has been made on StayEase</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>⚡ Action Required:</strong> New booking received - please review and confirm with hotel.
          </div>
          
          <div class="booking-details">
            <h2>📋 Booking Information</h2>
            <div class="detail-row">
              <span class="label">Booking ID:</span>
              <span class="value">${booking.bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="label">Booking Date:</span>
              <span class="value">${new Date(booking.bookingDate).toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value">${booking.status}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h2>👤 Guest Information</h2>
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">${booking.guestName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${booking.guestEmail}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${booking.guestPhone || "Not provided"}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h2>🏨 Hotel Details</h2>
            <div class="detail-row">
              <span class="label">Hotel:</span>
              <span class="value">${booking.hotel.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Location:</span>
              <span class="value">${booking.hotel.location}</span>
            </div>
            <div class="detail-row">
              <span class="label">Rating:</span>
              <span class="value">${booking.hotel.rating} ⭐</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h2>📅 Stay Details</h2>
            <div class="detail-row">
              <span class="label">Check-in:</span>
              <span class="value">${new Date(booking.checkIn).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-out:</span>
              <span class="value">${new Date(booking.checkOut).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Duration:</span>
              <span class="value">${Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</span>
            </div>
            <div class="detail-row">
              <span class="label">Guests:</span>
              <span class="value">${booking.guests} guests</span>
            </div>
            <div class="detail-row">
              <span class="label">Rooms:</span>
              <span class="value">${booking.rooms} room(s)</span>
            </div>
          </div>
          
          <div class="total">
            <h2>💰 Payment Information</h2>
            <div class="detail-row">
              <span class="label">Total Amount:</span>
              <span class="value" style="font-size: 1.2em; font-weight: bold; color: #059669;">₹${booking.totalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h2>📞 Next Steps</h2>
            <ul>
              <li>Contact the hotel to confirm availability</li>
              <li>Send confirmation to guest if needed</li>
              <li>Update booking status in system</li>
              <li>Monitor for any special requests</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 0.9em;">
              This is an automated notification from StayEase Hotel Booking System<br>
              Generated on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateAdminEmailText(booking: any) {
  return `
🏨 NEW BOOKING ALERT - StayEase

📋 BOOKING INFORMATION
Booking ID: ${booking.bookingId}
Booking Date: ${new Date(booking.bookingDate).toLocaleString()}
Status: ${booking.status}

👤 GUEST INFORMATION  
Name: ${booking.guestName}
Email: ${booking.guestEmail}
Phone: ${booking.guestPhone || "Not provided"}

🏨 HOTEL DETAILS
Hotel: ${booking.hotel.name}
Location: ${booking.hotel.location}
Rating: ${booking.hotel.rating} stars

📅 STAY DETAILS
Check-in: ${new Date(booking.checkIn).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Check-out: ${new Date(booking.checkOut).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Duration: ${Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
Guests: ${booking.guests} guests
Rooms: ${booking.rooms} room(s)

💰 PAYMENT INFORMATION
Total Amount: ₹${booking.totalPrice.toLocaleString("en-IN")}

📞 NEXT STEPS:
- Contact hotel to confirm availability
- Send confirmation to guest if needed  
- Update booking status in system
- Monitor for special requests

---
This is an automated notification from StayEase Hotel Booking System
Generated on ${new Date().toLocaleString()}
  `
}
