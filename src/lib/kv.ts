// lib/kv.ts
import { VercelKV } from '@vercel/kv';

const kv = new VercelKV({
  url: process.env.VERCEL_KV_URL as any,
});

export default kv;
