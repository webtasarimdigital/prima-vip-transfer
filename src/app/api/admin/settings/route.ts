import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET settings
export async function GET() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single();
  if (error) {
    return NextResponse.json({ phone: '05323591039', email: 'Primaviptransfer@gmail.com' });
  }
  return NextResponse.json(data);
}

// PUT update settings
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('settings')
    .update({ phone: body.phone, email: body.email })
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
