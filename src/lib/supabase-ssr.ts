// src/lib/supabase-ssr.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Tambahkan 'async' di sini
export async function createClient() {
  // Tambahkan 'await' di sini
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // Hilangkan error jika dipanggil dari Server Component/Action
          }
        },
      },
    },
  );
}
