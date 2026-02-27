import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate the Stripe Connect OAuth link
  const state = crypto.randomUUID(); // In production, save this state to verify in callback
  
  const args = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.STRIPE_CLIENT_ID || '',
    scope: 'read_write',
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/stripe/callback`,
    state,
  });

  const url = `https://connect.stripe.com/oauth/authorize?${args.toString()}`;

  return NextResponse.redirect(url);
}
