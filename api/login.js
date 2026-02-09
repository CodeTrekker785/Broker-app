import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { username, password } = req.body;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (!data) return res.status(401).json({ error: "Invalid login" });

  res.json({ success: true, user: data });
}