// External Supabase client — connects to YOUR own Supabase project.
//
// Setup:
// 1. Create a `.env.local` file in the project root with:
//      VITE_MY_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
//      VITE_MY_SUPABASE_ANON_KEY=your-anon-public-key
// 2. Restart the dev server so Vite picks up the new env vars.
// 3. Run the SQL migration in `supabase-external/migration.sql` inside your
//    Supabase SQL Editor (dashboard → SQL Editor → New query).
// 4. In Storage, create a PUBLIC bucket named `materials`.
//
// This client is INDEPENDENT of any Lovable-managed Supabase integration.
// All data fetched through it comes directly from YOUR Supabase dashboard.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_MY_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_MY_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] Missing VITE_MY_SUPABASE_URL or VITE_MY_SUPABASE_ANON_KEY. " +
      "Add them to .env.local and restart the dev server."
  );
}

export type MaterialRow = {
  id: string;
  title: string | null;
  branch: string;
  semester: string;
  subject: string;
  unit: string | null;
  type: "Materials" | "PPT" | "PYQs" | string;
  file_url: string;
  created_at: string;
};

export const supabaseExternal: SupabaseClient = createClient(
  SUPABASE_URL ?? "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY ?? "placeholder-anon-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
