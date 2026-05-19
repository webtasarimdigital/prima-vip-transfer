import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  
  let adminUsername = process.env.ADMIN_USERNAME || 'admin';
  let adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      for (const line of lines) {
        const cleanLine = line.trim();
        if (cleanLine.startsWith('ADMIN_USERNAME=')) {
          const val = cleanLine.split('=')[1].replace(/['"\r]/g, '').trim();
          if (val) adminUsername = val;
        }
        if (cleanLine.startsWith('ADMIN_PASSWORD=')) {
          const val = cleanLine.split('=')[1].replace(/['"\r]/g, '').trim();
          if (val) adminPassword = val;
        }
      }
    }
  } catch (e) {
    console.error("Failed to read dynamic .env in login route:", e);
  }

  if (username === adminUsername && password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
}
