import { NextRequest, NextResponse } from 'next/server';
import { getViews, incrementViews } from '@/utils/views-counter';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }
  
  const views = getViews(slug);
  
  return NextResponse.json({ views });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }
    
    incrementViews(slug);
    const updatedViews = getViews(slug);
    
    return NextResponse.json({ success: true, views: updatedViews });
  } catch (error) {
    console.log('Error updating views:', error);
    return NextResponse.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    );
  }
}