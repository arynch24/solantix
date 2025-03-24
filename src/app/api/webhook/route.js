// pages/api/webhook.ts
export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log("Webhook received:", req.body);
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
