# 🔐 AUTHENTICATION & PROGRESS TRACKING SETUP

## Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                    SUPABASE (Cloud Backend)                    │
├────────────────────────────────────────────────────────────────┤
│ • Authentication (Email/Password)                             │
│ • Database (Users, Progress Records)                          │
│ • Row-Level Security (Each student sees own data)             │
└────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                    Next.js App (Frontend)
                              │
            ┌───────────┬─────┴────────────────┬──────────────┐
            ▼           ▼                      ▼              ▼
        Auth Flow   Protected Routes    Progress Tracking  Dashboard
```

---

## Step 1: Install Dependencies

Run this command:

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

---

## Step 2: Create Supabase Project

### 2.1 Go to Supabase
- Visit: https://app.supabase.com
- Sign up with your email
- Create a new project
  - Name: `grammar-quiz` (or your choice)
  - Database password: Save this securely
  - Region: Choose closest to you
- Wait for project to initialize (~2 minutes)

### 2.2 Get Your Credentials
- Go to **Settings → API**
- Copy these values:
  - **Project URL** (e.g., `https://xxx.supabase.co`)
  - **Anon Key** (public key)
  - **Service Role Key** (private, for backend only)

---

## Step 3: Create Environment File

Create `.env.local` in your project root:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App
NEXT_PUBLIC_APP_NAME=Grammar Mastery
```

**⚠️ IMPORTANT:**
- Add `.env.local` to `.gitignore` (don't commit secrets!)
- Never share these keys on public repos
- "NEXT_PUBLIC_" prefix means it's visible to browser (that's OK for anon key)

---

## Step 4: Create Database Tables

In Supabase, go to **SQL Editor** and run this script:

```sql
-- Create users table (extends Supabase auth)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  email text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create test progress table
create table public.test_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  level text not null,
  unit integer not null,
  score integer not null,
  total_questions integer not null,
  percentage integer not null,
  completed_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique(user_id, level, unit)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.test_progress enable row level security;

-- Policies for profiles table
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Policies for test_progress table
create policy "Users can view their own progress"
  on public.test_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.test_progress for insert
  with check (auth.uid() = user_id);

-- Create indexes for performance
create index test_progress_user_id_idx on public.test_progress(user_id);
create index test_progress_user_level_unit_idx on public.test_progress(user_id, level, unit);
```

Run this in Supabase SQL Editor and wait for success messages.

---

## Step 5: Enable Email Authentication

In Supabase:
1. Go to **Authentication → Providers**
2. Make sure "Email" is enabled (it is by default)
3. Go to **Authentication → Email Templates**
4. (Optional) Customize email messages

---

## Database Schema

### profiles table
```
Column          Type        Notes
───────────────────────────────────────
id              UUID        Links to auth.users
full_name       TEXT        Student's name
email           TEXT        Unique email
created_at      TIMESTAMP   Account creation
updated_at      TIMESTAMP   Last modified
```

### test_progress table
```
Column            Type      Notes
──────────────────────────────────────────────────────
id                UUID      Unique record ID
user_id           UUID      Links to profiles
level             TEXT      "Beginner", "Elementary", etc.
unit              INTEGER   1-14 or 1-12
score             INTEGER   Questions correct
total_questions   INTEGER   Total questions in test
percentage        INTEGER   Score / total * 100
completed_at      TIMESTAMP When test was completed
created_at        TIMESTAMP Record creation time
```

**Unique constraint:** Each student can only have one entry per (level, unit)

---

## How It Works

### Sign Up Flow
1. User fills form (name, email, password)
2. Supabase creates auth user
3. App creates profile record
4. User is logged in
5. Redirected to app

### Login Flow
1. User enters email + password
2. Supabase authenticates
3. App fetches user profile
4. Redirected to dashboard

### Test Completion Flow
1. Student finishes test
2. Results are saved to `test_progress` table
3. Progress is associated with student ID
4. Dashboard updates automatically

### Dashboard Flow
1. Student views dashboard
2. App queries `test_progress` for their records
3. Shows completed units, scores, progress

---

## Environment Check

After setup, verify it works:

```bash
npm run dev
```

Visit: `http://localhost:3000`

You should see the login page (not the home screen yet).

---

## Supabase Console Tips

**View User Data:**
- Go to **Database → Tables → profiles** to see registered students
- Go to **Database → Tables → test_progress** to see completed tests
- Go to **Authentication → Users** to see all accounts

**Debug Issues:**
- Go to **Logs** to see database errors
- Check browser console for client errors
- Use SQL Editor to query directly

---

## Troubleshooting

### "Can't connect to Supabase"
- Check `.env.local` variables are correct
- Make sure you didn't add spaces around `=`
- Restart dev server: `npm run dev`

### "Auth token not found"
- Clear browser cookies
- Sign out and log back in
- Check browser localStorage for `sb-` entries

### "Can't insert progress"
- Check user is logged in
- Verify Row Level Security policies
- Check SQL error in Supabase Logs

### "Build fails after setup"
- Run `npm install` again
- Check `.env.local` exists
- Restart with `npm run dev`

---

## Next Steps

1. ✅ Install dependencies (see above)
2. ✅ Create Supabase project
3. ✅ Get API keys
4. ✅ Create `.env.local`
5. ✅ Run SQL script
6. ✅ Test with `npm run dev`

Then the code files will handle the rest!

---

## Security Notes

✅ **What's Protected:**
- Passwords are hashed by Supabase
- Row-level security enforces student sees own data only
- Auth tokens expire automatically
- API keys are validated server-side

✅ **What You Should Do:**
- Never commit `.env.local`
- Use HTTPS in production
- Change Supabase password regularly
- Review Row Level Security policies
- Monitor Supabase activity logs

---

## File Organization

After setup, the app structure:

```
src/
├── auth/                      ← NEW: Auth logic
│   ├── supabase.ts
│   ├── auth-service.ts
│   └── hooks.ts
├── data/                      ← Existing
│   ├── levels.ts
├── components/                ← Existing + NEW
│   ├── auth/                  ← NEW: Auth pages
│   │   ├── SignUp.tsx
│   │   ├── Login.tsx
│   │   └── LogOut.tsx
│   ├── dashboard/             ← NEW: Student dashboard
│   │   └── StudentDashboard.tsx
│   └── ...
├── lib/                       ← NEW: Utilities
│   ├── progress.ts
│   └── profile.ts
└── middleware.ts              ← NEW: Route protection
```

Ready to implement? Let me know!
