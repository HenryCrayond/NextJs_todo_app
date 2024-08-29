import { createClient } from '@vercel/kv';

export async function GET() {
    const users = createClient({
        url: process.env.USERS_REST_API_URL,
        token: process.env.USERS_REST_API_TOKEN,
    });

    const user = await users.hgetall('user:me');

    return Response.json({ user }, { status: 200 });
}