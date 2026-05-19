import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Ensure bucket exists or just try uploading
    // Supabase needs to have a bucket named 'gallery' set to public
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      // If bucket doesn't exist, try to create it first (requires admin key, which we have)
      if (error.message.includes('Bucket not found')) {
        await supabase.storage.createBucket('gallery', { public: true });
        
        // Retry upload
        const retry = await supabase.storage
          .from('gallery')
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false
          });
          
        if (retry.error) {
           console.error("Storage upload error after bucket creation:", retry.error);
           return NextResponse.json({ error: 'Görsel yüklenemedi.' }, { status: 500 });
        }
      } else {
        console.error("Storage upload error:", error);
        return NextResponse.json({ error: 'Görsel yüklenemedi: ' + error.message }, { status: 500 });
      }
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 });
  }
}
