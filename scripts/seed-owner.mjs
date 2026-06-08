// One-off: create/update the owner team member.
// Usage: DATABASE_URL=... SEED_EMAIL=... SEED_PASSWORD=... SEED_NAME=... node scripts/seed-owner.mjs
import crypto from "node:crypto";
import pg from "pg";

function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(pw, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

const connectionString = process.env.DATABASE_URL;
const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;
const name = process.env.SEED_NAME || "Owner";
if (!connectionString || !email || !password) {
  console.error("Need DATABASE_URL, SEED_EMAIL, SEED_PASSWORD");
  process.exit(1);
}

const ssl = /neon\.tech|sslmode=require/.test(connectionString)
  ? { rejectUnauthorized: false }
  : undefined;
const client = new pg.Client({ connectionString, ssl });
await client.connect();
const res = await client.query(
  `INSERT INTO "User" (id, name, email, "passwordHash", role, "createdAt")
   VALUES ($1,$2,$3,$4,'owner', now())
   ON CONFLICT (email) DO UPDATE
     SET "passwordHash" = EXCLUDED."passwordHash", role = 'owner', name = EXCLUDED.name
   RETURNING email, role, name`,
  [crypto.randomUUID(), name, email.toLowerCase(), hashPassword(password)],
);
console.log("Seeded owner:", res.rows[0]);
await client.end();
