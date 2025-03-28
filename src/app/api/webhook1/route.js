export async function POST(req, response) {
    try {
        const result = await req.json();
        console.log(result);
        response.send(result);
    } catch (error) {
        console.log(`[Error] error message : ${error.message}`)
    }
}