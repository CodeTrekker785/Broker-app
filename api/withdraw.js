import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { username, amount } = req.body;

  const { data: user } = await supabase
    .from("users")
    .select("balance")
    .eq("username", username)
    .single();

  if (!user || user.balance < amount)
    return res.json({ error: "Insufficient balance" });

  await supabase.from("requests").insert({
    type: "withdraw",
    username,
    amount,
    status: "pending"
  });

  res.json({ success: true });
}