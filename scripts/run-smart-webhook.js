const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@retain.io' }
  });

  if (!user) {
    console.error("Local admin user not found");
    return;
  }

  // Update the user to have a mock connect ID if they don't have one
  let connectId = user.stripeConnectId;
  if (!connectId) {
    console.log("Admin didn't have a Stripe Connect ID, adding a mock one for testing.");
    await prisma.user.update({
      where: { email: 'admin@retain.io' },
      data: { stripeConnectId: 'acct_mock_connect_id_123' }
    });
    connectId = 'acct_mock_connect_id_123';
  }

  console.log(`Use this Connect ID for the webhook test: ${connectId}`);
  
  // Now run the webhoook script with this ID via child_process
  const { execSync } = require('child_process');
  
  try {
     const output = execSync(`node scripts/test-webhook.js ${connectId}`);
     console.log(output.toString());
  } catch (err) {
      console.error(err.stdout.toString());
      console.error(err.stderr.toString());
  }
}

run();
