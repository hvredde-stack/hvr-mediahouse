# HVR Media House — Website

A bold, modern marketing website for **HVR Media House** (social media marketing
agency) built with **Next.js + TypeScript + Tailwind CSS**, with a backend,
a lead database, and a password-protected admin dashboard.

---

## ✨ What's included

- **Public website** (dark, animated, mobile-friendly)
  - Hero, Services, About / Why HVR, Process, Portfolio / Case studies,
    Testimonials, Pricing, and a Contact form.
- **Working contact form** → saves every inquiry to a database.
- **Admin dashboard** at `/admin` (login required) to view, search, filter,
  update the status of, and delete leads.
- Built so AI chat and email notifications can be added later.

---

## 🚀 Running it on your computer

```bash
npm install      # first time only
npm run dev      # start the site
```

Then open:

- Website → http://localhost:3000
- Admin dashboard → http://localhost:3000/admin

**Admin login** (set in the `.env` file):

- Username: `admin`
- Password: `hvr-admin-2026`  ← **change this before going live!**

---

## ✏️ Editing your content (no coding needed)

Almost all the text on the site lives in **one file**:

> `lib/site.ts`

Open it and change the company name, tagline, email, phone, services, prices,
case studies, testimonials, etc. Save the file and the website updates
automatically.

A few quick tips:

- **Currency:** change `currency: "$"` to `₹`, `€`, `£`, etc.
- **Prices:** edit the `pricing` list. Set `featured: true` on the plan you
  want highlighted.
- **Service icons:** use any icon name from https://lucide.dev/icons.
- **Social links:** update the `socials` URLs (Instagram, Facebook, TikTok,
  YouTube).

---

## 🔐 Important settings — the `.env` file

```
ADMIN_USERNAME       # admin login username
ADMIN_PASSWORD       # admin login password  (CHANGE THIS!)
ADMIN_SESSION_SECRET # a long random string (CHANGE THIS for production!)
DATABASE_URL         # database location (leave as-is for local dev)
```

---

## 🗄️ Database

- Local development uses a simple **SQLite** file (`dev.db`) — no setup needed.
- Leads are stored in the `Lead` table (see `prisma/schema.prisma`).
- Useful commands:
  ```bash
  npm run db:studio   # open a visual database browser
  npm run db:push     # apply schema changes to the database
  ```

---

## ☁️ Going live (deploy to Vercel)

1. Push this project to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add your environment variables in Vercel (the same keys as `.env`).
4. **Database:** SQLite doesn't persist on Vercel. Switch to a hosted database
   (e.g. [Turso](https://turso.tech) for libSQL, or Postgres):
   - For Turso/libSQL: set `DATABASE_URL` to your Turso URL + auth token — the
     app already uses the libSQL adapter.
   - For Postgres: change `provider` to `postgresql` in `prisma/schema.prisma`,
     install `@prisma/adapter-pg`, and update `lib/prisma.ts`.

> Need help with this step? Just ask.

---

## 🤖 Coming soon (optional add-ons)

These are scaffolded but turned off until you decide to enable them:

- **AI assistant** — a Claude-powered chat widget and AI-drafted reply
  suggestions in the admin dashboard. (Needs an `ANTHROPIC_API_KEY`.)
- **Email notifications** — get an email when someone submits the form.
  (Needs a `RESEND_API_KEY`.)

---

## 🧱 Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Prisma 7 (libSQL) ·
Framer Motion · lucide-react / react-icons.
