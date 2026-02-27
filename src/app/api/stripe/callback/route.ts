import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    console.error("Stripe OAuth Error:", errorDescription);
    return NextResponse.redirect(new URL("/dashboard?error=stripe_connect_failed", req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/dashboard?error=no_code_provided", req.url));
  }

  try {
    // Exchange the authorization code for an access token / connect account ID
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id;

    if (!connectedAccountId) {
      throw new Error("No stripe_user_id returned from Stripe");
    }

    // Save the connected account ID to the user in our database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeConnectId: connectedAccountId },
    });

    console.log(`Successfully connected Stripe Account ${connectedAccountId} to User ${session.user.id}`);

    // Redirect the user back to the dashboard with a success message
    return NextResponse.redirect(new URL("/dashboard?success=stripe_connected", req.url));
  } catch (err: any) {
    console.error("Error exchanging Stripe token:", err.message);
    return NextResponse.redirect(new URL("/dashboard?error=token_exchange_failed", req.url));
  }
}
