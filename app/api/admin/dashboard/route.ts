import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Admin credentials not configured' },
        { status: 500 }
      );
    }

    // Verify admin credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const responsesCollection = db.collection('responses');
    const usersCollection = db.collection('users');

    // Get all responses
    const responses = await responsesCollection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Get user statistics
    const totalUsers = await usersCollection.countDocuments();
    const usersWithYes = await responsesCollection.countDocuments({ answer: 'yes' });

    return NextResponse.json({
      success: true,
      data: {
        responses,
        stats: {
          totalUsers,
          totalResponses: responses.length,
          yesCount: usersWithYes,
        },
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in admin dashboard:', error);
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      { 
        success: false, 
        message: `Failed to fetch dashboard data: ${errorMessage}`,
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
