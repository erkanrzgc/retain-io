const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const recoveries = await prisma.recovery.findMany({
    include: {
      customer: true
    }
  });
  console.log(JSON.stringify(recoveries, null, 2));
}

run();
