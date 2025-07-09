-- Add modules for "Scaling with Teams & Subcontractors" course
-- This course was missing modules causing it to show as "Coming Soon"

-- Get the course ID
DO $$
DECLARE
    v_course_id UUID;
BEGIN
    -- Get the course ID for "Scaling with Teams & Subcontractors"
    SELECT id INTO v_course_id 
    FROM public.courses 
    WHERE slug = 'team-scaling';

    -- Insert modules for this course
    INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index) VALUES
    (v_course_id, 'Building Your First Remote Team', 'building-first-team', 'Learn the fundamentals of assembling your initial remote workforce. Master recruitment strategies, vetting processes, and onboarding systems. Understand team structure, communication protocols, and performance expectations. This module includes hiring templates, interview guides, and team building exercises specifically designed for remote contracting teams.', 45, 1),
    
    (v_course_id, 'Subcontractor vs Employee Decisions', 'subcontractor-vs-employee', 'Navigate the critical decision between subcontractors and employees for your business model. Learn legal implications, cost comparisons, and management differences. Master classification rules, hybrid models, and scaling considerations. This module includes decision matrices, cost calculators, and compliance checklists for making the right choice.', 35, 2),
    
    (v_course_id, 'Remote Team Communication Systems', 'team-communication-systems', 'Establish effective communication channels that keep remote teams connected and productive. Learn platform selection, meeting cadences, and asynchronous workflows. Master status updates, project coordination, and culture building from afar. Includes communication templates, tool configurations, and engagement strategies.', 40, 3),
    
    (v_course_id, 'Performance Management at Scale', 'performance-management-scale', 'Implement systems to track and improve team performance as you grow. Learn KPI selection, scorecarding systems, and feedback delivery. Master remote coaching, improvement plans, and recognition programs. This module includes performance templates, tracking dashboards, and management frameworks.', 50, 4),
    
    (v_course_id, 'Building Team Leaders', 'building-team-leaders', 'Develop crew chiefs and team leaders who can manage others effectively. Learn leadership identification, development programs, and delegation strategies. Master remote leadership skills, accountability systems, and succession planning. Includes leadership curricula, promotion criteria, and mentorship programs.', 45, 5),
    
    (v_course_id, 'Scaling Team Operations', 'scaling-team-operations', 'Scale from one crew to multiple teams across markets efficiently. Learn organizational structures, resource sharing, and cross-team coordination. Master scheduling optimization, equipment management, and quality consistency. This module includes scaling blueprints, operational templates, and growth management tools.', 55, 6);

END $$;

-- Update module descriptions with comprehensive content
UPDATE public.modules SET 
  tagline = 'Start your remote workforce journey',
  key_topics = ARRAY['Remote recruitment', 'Team structure', 'Onboarding systems', 'Communication setup', 'Performance expectations'],
  learning_outcomes = ARRAY['Recruit and vet remote team members', 'Design effective team structures', 'Create onboarding processes', 'Set clear expectations', 'Build team culture remotely']
WHERE slug = 'building-first-team';

UPDATE public.modules SET 
  tagline = 'Make the right classification choice',
  key_topics = ARRAY['Legal classifications', 'Cost analysis', 'Management models', 'Compliance requirements', 'Hybrid approaches'],
  learning_outcomes = ARRAY['Choose optimal worker classification', 'Understand legal implications', 'Calculate true costs', 'Implement compliant systems', 'Scale with the right model']
WHERE slug = 'subcontractor-vs-employee';

UPDATE public.modules SET 
  tagline = 'Keep remote teams connected',
  key_topics = ARRAY['Communication platforms', 'Meeting rhythms', 'Async workflows', 'Status reporting', 'Team engagement'],
  learning_outcomes = ARRAY['Select right communication tools', 'Establish effective cadences', 'Build async workflows', 'Maintain team connection', 'Foster remote culture']
WHERE slug = 'team-communication-systems';

UPDATE public.modules SET 
  tagline = 'Track and improve team results',
  key_topics = ARRAY['KPI development', 'Scorecard systems', 'Remote coaching', 'Feedback delivery', 'Recognition programs'],
  learning_outcomes = ARRAY['Design performance metrics', 'Implement tracking systems', 'Deliver remote feedback', 'Coach for improvement', 'Recognize achievements']
WHERE slug = 'performance-management-scale';

UPDATE public.modules SET 
  tagline = 'Develop your management layer',
  key_topics = ARRAY['Leader identification', 'Skill development', 'Delegation mastery', 'Accountability systems', 'Succession planning'],
  learning_outcomes = ARRAY['Identify leadership potential', 'Train effective leaders', 'Delegate successfully', 'Build accountability', 'Plan for growth']
WHERE slug = 'building-team-leaders';

UPDATE public.modules SET 
  tagline = 'Grow from one crew to many',
  key_topics = ARRAY['Organizational design', 'Resource optimization', 'Cross-team coordination', 'Quality consistency', 'Operational efficiency'],
  learning_outcomes = ARRAY['Structure for growth', 'Share resources effectively', 'Coordinate multiple teams', 'Maintain quality standards', 'Optimize operations']
WHERE slug = 'scaling-team-operations';