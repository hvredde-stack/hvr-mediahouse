// Temporary seed for verifying the client portal. Creates a marker client,
// a content item, and a client login. Run with "cleanup" to remove them.
//   node scripts/seed-portal-test.mjs           (seed)
//   node scripts/seed-portal-test.mjs cleanup   (delete the marker client)
import crypto from "node:crypto";
import pg from "pg";

function hash(pw) {
  const s = crypto.randomBytes(16);
  const k = crypto.scryptSync(pw, s, 64);
  return `scrypt$${s.toString("hex")}$${k.toString("hex")}`;
}

const cs = process.env.DATABASE_URL;
const ssl = /neon\.tech|sslmode=require/.test(cs)
  ? { rejectUnauthorized: false }
  : undefined;
const c = new pg.Client({ connectionString: cs, ssl });
await c.connect();

const MARKER = "__PORTAL_TEST__";

if (process.argv[2] === "cleanup") {
  await c.query(`DELETE FROM "Client" WHERE name = $1`, [MARKER]);
  console.log("CLEANED");
} else {
  const cid = crypto.randomUUID();
  await c.query(
    `INSERT INTO "Client"(id,name,status,retainer,"createdAt","updatedAt") VALUES($1,$2,'active',0,now(),now())`,
    [cid, MARKER],
  );
  await c.query(
    `INSERT INTO "User"(id,name,email,"passwordHash",role,"clientId","createdAt") VALUES($1,'Portal Test',$2,$3,'client',$4,now())`,
    [crypto.randomUUID(), "portaltest@example.com", hash("portaltest1234"), cid],
  );
  await c.query(
    `INSERT INTO "ContentItem"(id,"clientId",platform,title,status,approval,"createdAt","updatedAt") VALUES($1,$2,'instagram','__TEST_POST__','scheduled','pending',now(),now())`,
    [crypto.randomUUID(), cid],
  );
  console.log("SEEDED");
}
await c.end();
