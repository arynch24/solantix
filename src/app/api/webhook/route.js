export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();

        // Log the entire payload
        console.log("Webhook Payload:", JSON.stringify(body, null, 2));

        // Specific logging for debugging
        console.log("Received Webhook Event:", {
            type: body.type,
            timestamp: new Date().toISOString()
        });

        // Basic payload validation
        if (!body) {
            return Response.json(
                { error: "Empty request body" }, 
                { status: 400 }
            );
        }

        // Process webhook event
        // Add your specific logic to handle NFT bid events here

        return Response.json(
            { 
                success: true,
                receivedAt: new Date().toISOString()
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Webhook Processing Error:", error);
        return Response.json(
            { 
                error: "Internal Server Error",
                details: error.message || 'Unknown error'
            }, 
            { status: 500 }
        );
    }
}

// Optional: Handle other HTTP methods
export async function GET() {
    return Response.json(
        { error: "Method Not Allowed" }, 
        { status: 405 }
    );
}