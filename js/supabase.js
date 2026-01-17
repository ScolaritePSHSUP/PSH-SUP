// js/supabase.js

const SUPABASE_URL = "https://wqjzgpxcudobdbhtatgw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RQyY6vwKpcQdlRVFvDVD-A_YybqqTS_";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
