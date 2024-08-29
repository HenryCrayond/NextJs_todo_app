import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function SET() {
  const user = await kv.hset('me',{id:1,label:"HTML"});
  return NextResponse.json(user);
}

export async function GET() {
  const user = await kv.hgetall('user:me');
  return NextResponse.json(user);
}