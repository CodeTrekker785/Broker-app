import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { username, amount } = req.body;

  await supabase.from("requests").insert({
    type: "deposit",
    username,
    amount,
    status: "pending"
  });

  res.json({ success: true });
}