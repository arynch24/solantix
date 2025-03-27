
export const getWebhook = async () => {
  const webhookId = process.env.HELIUS_WEBHOOK_ID;
  const apiKey = process.env.HELIUS_API_KEY;
  try {
    const response = await fetch(
      `https://api.helius.xyz/v0/webhooks/${webhookId}?api-key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    console.log({ data });
  } catch (e) {
    console.error("error", e);
  }
};