import { Resend } from 'resend';

// Initialize Resend
// In a real production app, we ensure this key exists
export const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_build');

export async function sendRecoveryEmail({
  to,
  customerName,
  amount,
  recoveryLink,
  companyName
}: {
  to: string;
  customerName: string;
  amount: number;
  recoveryLink: string;
  companyName: string;
}) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);

  try {
    const data = await resend.emails.send({
      from: `${companyName} Support <support@retain.io>`, // Replace with verified domain in prod
      to: [to],
      subject: `Action Required: Payment failed for your ${companyName} subscription`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4F46E5;">Payment Action Required</h2>
          <p>Hi ${customerName},</p>
          <p>We were unable to process your recent payment of <strong>${formattedAmount}</strong> for your <strong>${companyName}</strong> subscription.</p>
          <p>This usually happens due to an expired card or insufficient funds. To keep your access active, please update your payment information using the secure link below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${recoveryLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Update Payment Method
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666;">If you have any questions or need help, simply reply to this email.</p>
          <p>Thanks,<br>The ${companyName} Team</p>
        </div>
      `,
    });

    console.log('Recovery email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send recovery email:', error);
    return { success: false, error };
  }
}
