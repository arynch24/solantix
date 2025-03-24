export async function POST(req) {
    try {
        const data = await req.json();
        console.log("🔔 Webhook Received:", data);

        // You can save transactions to a database or display them in the UI
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Webhook Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
