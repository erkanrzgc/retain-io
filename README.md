# Retain.io - Smart Revenue Recovery SaaS 🚀

Retain.io is a specialized B2B SaaS platform designed to help digital businesses recover lost revenue from failed subscriptions. By connecting securely with Stripe, Retain.io automatically detects failed payments, generates secure customer-facing recovery portals, and dispatches automated dunning emails to win back lost subscriptions silently in the background.

## 🌟 Key Features

- **Stripe Connect Integration:** Seamlessly onboard business owners using secure Stripe OAuth.
- **Intelligent Webhooks:** Real-time detection of `invoice.payment_failed` and `invoice.payment_succeeded` events across all connected accounts.
- **Automated Dunning Campaigns:** Integrates with Resend to automatically dispatch actionable, conversion-optimized recovery emails to end-customers.
- **Secure Recovery Portal:** A dedicated, brand-agnostic React checkout flow utilizing Stripe Elements to securely capture updated payment methods without requiring customer login.
- **Owner Analytics Dashboard:** A clean, data-driven dashboard tracking "Recovered Revenue," "Active Dunning Instances," and "Recovery Rates" powered by Next.js and Tailwind CSS.
- **Authentication & Security:** NextAuth integrated for secure platform access.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling & UI:** Tailwind CSS, Shadcn UI
- **Database:** PostgreSQL (Neon) via Prisma ORM
- **Payment Engine:** Stripe Node.js SDK, Stripe Elements
- **Email Deliverability:** Resend
- **Authentication:** NextAuth.js
- **Deployment:** Vercel

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- A Stripe Developer Account
- A Resend API Key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/erkanrzgc/retain-io.git
    cd retain-io
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Rename `.env.example` to `.env` (or create a `.env` file) and populate the required API keys:

    ```env
    DATABASE_URL="postgresql://..." # Your Neon/Postgres connection string
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="..."
    STRIPE_CLIENT_ID="..."
    STRIPE_SECRET_KEY="..."
    STRIPE_WEBHOOK_SECRET="..."
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
    RESEND_API_KEY="..."
    ```

4.  **Database Migration:**

    ```bash
    npx prisma db push
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to preview the platform.

## 🔐 Architecture

Retain.io operates strictly on delegated access. It does not store actual credit card data. All payment processing and sensitive customer data tokenization are handled securely by Stripe's PCI-compliant infrastructure.

---

_Built as an MVP for automated revenue recovery._
