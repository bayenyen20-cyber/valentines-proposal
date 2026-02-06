import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { getAuthUser } from '@/lib/auth';
import { sendEmailNotification, sendConsoleNotification } from '@/lib/notifications';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'You must be logged in' },
        { status: 401 }
      );
    }

    const { answer } = await request.json();
    
    const db = await getDatabase();
    const responsesCollection = db.collection('responses');
    const usersCollection = db.collection('users');
    
    // Save response
    const result = await responsesCollection.insertOne({
      userId: new ObjectId(user.userId),
      userName: user.name,
      userEmail: user.email,
      answer,
      timestamp: new Date(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // Update user status
    await usersCollection.updateOne(
      { _id: new ObjectId(user.userId) },
      { 
        $set: { 
          hasRespondedToProposal: true,
          proposalAnswer: answer,
          proposalAnsweredAt: new Date(),
        } 
      }
    );

    // Send notifications if she said YES!
    if (answer === 'yes') {
      // Console notification (always sent)
      await sendConsoleNotification(user.name, user.email);
      
      // Email notification (only if configured)
      await sendEmailNotification(user.name, user.email);
    }
    
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
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('responses');
    
    const responses = await collection.find({}).sort({ timestamp: -1 }).limit(50).toArray();
    
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
