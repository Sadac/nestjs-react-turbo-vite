import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.$transaction(async (prisma) => {
    // Delete all rows from dependent tables first
    await prisma.organizationMembership.deleteMany();
    await prisma.stack.deleteMany();

    // Delete main table rows
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  });
}

async function generateUsers(config: {
  usersQuantity: number;
  generateAdmin: boolean;
  prefix: string;
}) {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash('qwerty', saltRounds);

  const { usersQuantity, generateAdmin, prefix } = config;

  const users = [];

  for (let i = 0; i < usersQuantity; i++) {
    users.push({
      email: `user.${prefix}+${i}@user.com`,
      firstName: `User${prefix} ${i}`,
      lastName: `UserLastName ${i}`,
      password: hashedPassword,
      type: 'USER',
      telephone: '12345678',
    });
  }

  if (generateAdmin) {
    users.push({
      email: `admin@admin.com`,
      firstName: `AdminFirstName`,
      lastName: `AdminLastName`,
      password: hashedPassword,
      type: 'ADMIN',
      telephone: '12345678',
    });
  }

  return users;
}

async function main() {
  await clearDatabase();

  console.log('Executing seeder...');

  await prisma.$transaction(async (prisma) => {
    // Generate users for alpha organization
    const alphaUsers = await generateUsers({
      usersQuantity: 20,
      generateAdmin: true,
      prefix: 'alpha',
    });

    const createdAlphaUsers = await prisma.user.createManyAndReturn({
      data: alphaUsers,
    });

    await prisma.organization.create({
      data: {
        name: 'Alpha Organization',
        memberships: {
          create: createdAlphaUsers.map((u) => ({ userId: u.id })),
        },
      },
    });

    // Generate users for beta organization
    const betaUsers = await generateUsers({
      usersQuantity: 20,
      generateAdmin: false,
      prefix: 'beta',
    });

    const createdBetaUsers = await prisma.user.createManyAndReturn({
      data: betaUsers,
    });

    await prisma.organization.create({
      data: {
        name: 'Beta Organization',
        memberships: {
          create: createdBetaUsers.map((u) => ({ userId: u.id })),
        },
      },
    });
  });

  // Generate users for delta organization
  const deltaUsers = await generateUsers({
    usersQuantity: 20,
    generateAdmin: false,
    prefix: 'delta',
  });

  const createdDeltaUsers = await prisma.user.createManyAndReturn({
    data: deltaUsers,
  });

  await prisma.organization.create({
    data: {
      name: 'Delta Organization',
      memberships: {
        create: createdDeltaUsers.map((u) => ({ userId: u.id })),
      },
    },
  });

  console.log('Finished seeder execution...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
