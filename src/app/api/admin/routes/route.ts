import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all routes
export async function GET() {
  const { data, error } = await supabase.from('route_price').select('*').order('id');
  if (error) {
    return NextResponse.json([], { status: 500 });
  }
  return NextResponse.json(data);
}

// POST new route
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('route_price')
    .insert({ from: body.from, to: body.to, price: body.price, currency: body.currency || 'EUR' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PUT update route
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase
    .from('route_price')
    .update({ from: body.from, to: body.to, price: body.price, currency: body.currency })
    .eq('id', body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE route
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const { error } = await supabase.from('route_price').delete().eq('id', parseInt(id));
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
