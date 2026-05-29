import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qrkzrefkuplszqsecfac.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_gLZkAjzNl_og9WwUDNsESQ_qcTbNWqZ";

export const supabase = createClient(supabaseUrl, supabaseKey);
