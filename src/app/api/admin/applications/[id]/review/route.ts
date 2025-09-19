import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
  sendApplicationApprovedEmail, 
  sendApplicationRejectedEmail 
} from '@/lib/email/service';

// POST /api/admin/applications/[id]/review
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { id: applicationId } = params;
    const body = await req.json();
    const { action, territory, calendarLink, rejectionReason } = body;

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      );
    }

    // Get application details
    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .eq('conversation_id', applicationId)
      .single();

    if (fetchError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Check if already processed
    if (application.status !== 'qualified' && application.status !== 'in_progress') {
      return NextResponse.json(
        { error: 'Application already processed' },
        { status: 400 }
      );
    }

    // Update application status
    const updateData: any = {
      status: action === 'approve' ? 'approved' : 'rejected',
      decision: action === 'approve' ? 'accepted' : 'rejected',
      decision_at: new Date().toISOString(),
      decision_notes: action === 'approve' 
        ? `Territory: ${territory}` 
        : rejectionReason,
    };

    if (action === 'approve' && territory) {
      updateData.assigned_territory = territory;
    }

    const { error: updateError } = await supabase
      .from('applications')
      .update(updateData)
      .eq('conversation_id', applicationId);

    if (updateError) {
      console.error('Failed to update application:', updateError);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }

    // Send appropriate email
    if (application.email) {
      if (action === 'approve') {
        if (!territory || !calendarLink) {
          return NextResponse.json(
            { error: 'Territory and calendar link required for approval' },
            { status: 400 }
          );
        }

        await sendApplicationApprovedEmail({
          to: application.email,
          firstName: application.name?.split(' ')[0],
          territory,
          calendarLink,
        });
      } else {
        await sendApplicationRejectedEmail({
          to: application.email,
          firstName: application.name?.split(' ')[0],
          rejectionReason,
        });
      }
    }

    return NextResponse.json({
      success: true,
      action,
      applicationId,
      message: `Application ${action}ed successfully`,
    });

  } catch (error) {
    console.error('Error reviewing application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}