import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { answer } = await request.json();
    
    const db = await getDatabase();
    const collection = db.collection('responses');
    
    const result = await collection.insertOne({
      answer,
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Response saved successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error saving response:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection('responses');
    
    const responses = await collection.find({}).sort({ timestamp: -1 }).limit(10).toArray();
    
    return NextResponse.json({ 
      success: true, 
      responses 
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}
