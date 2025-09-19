import { NextRequest, NextResponse } from 'next/server';
import { sendSimpleEmail } from '@/lib/email/simple-service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') || '2mylescameron@gmail.com';
  const name = searchParams.get('name') || 'Test';

  const result = await sendSimpleEmail(email, name);
  
  return NextResponse.json(result);
}