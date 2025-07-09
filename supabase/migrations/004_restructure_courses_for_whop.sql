-- Restructure courses to match Whop content organization

-- First, let's create new courses that better match the Whop structure
INSERT INTO public.courses (title, slug, description, duration_hours, order_index, level, category, estimated_weeks, is_published) VALUES
  -- Foundation Course (combines Watch First + Getting Started)
  ('Foundation: Remote Operations Mastery', 'foundation-remote-ops', 'Master the core principles of building a location-independent business. Learn delegation, decision-making, and the Pareto principle that drives 7-figure operations.', 16, 1, 'Beginner', 'foundation', 2, true),
  
  -- The Setup (Tech Stack + Branding + Site)
  ('Business Infrastructure Setup', 'business-infrastructure', 'Build your complete business infrastructure from scratch. Logo design, website development, CRM setup, and essential tech stack implementation.', 20, 2, 'Beginner', 'technology', 3, true),
  
  -- Client Acquisition Mastery (Outbound + Inbound Marketing)
  ('Client Acquisition Mastery', 'client-acquisition', 'Master both inbound and outbound marketing strategies. From cold calling and FB ads to SEO and strategic partnerships.', 32, 3, 'Intermediate', 'client-acquisition', 6, true),
  
  -- Operations Excellence (Estimating + Material + Production)
  ('Operations & Fulfillment Systems', 'operations-fulfillment', 'Build scalable fulfillment systems. Master estimating, vendor relationships, material ordering, and production management.', 28, 4, 'Intermediate', 'operations', 5, true),
  
  -- Team & Subcontractor Management
  ('Scaling with Teams & Subcontractors', 'team-scaling', 'Build and manage high-performing remote teams. Hiring, onboarding, managing expectations, and payment systems.', 16, 5, 'Advanced', 'team-building', 4, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration_hours = EXCLUDED.duration_hours,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  estimated_weeks = EXCLUDED.estimated_weeks;

-- Now let's create the detailed module structure for the Foundation course
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops');

INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video'
FROM public.courses c
CROSS JOIN (VALUES
  -- Watch First section
  ('Doing Less by Delegation', 'delegation-mastery', 'Learn how to delegate effectively and focus on high-value activities', 12, 1),
  ('The Power of Decision Making', 'decision-making', 'Master rapid decision-making frameworks for business growth', 10, 2),
  ('Building a Successful Business Strategy', 'business-strategy', 'Create a winning strategy for your remote operation', 8, 3),
  
  -- Getting Started section
  ('The Pareto Principle', 'pareto-principle', 'Apply the 80/20 rule to maximize your business impact', 5, 4),
  ('Quick Wins Strategy', 'quick-wins', 'Identify and execute quick wins for immediate momentum', 8, 5),
  ('Be Resourceful', 'be-resourceful', 'Develop the resourcefulness mindset of successful operators', 7, 6)
) AS m(title, slug, description, duration, order_index)
WHERE c.slug = 'foundation-remote-ops';

-- Create modules for Business Infrastructure Setup
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'business-infrastructure');

INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  m.type
FROM public.courses c
CROSS JOIN (VALUES
  ('Choosing Your Service & Niche', 'choose-service', 'Select the perfect service offering for your market', 25, 1, 'video'),
  ('Tech Stack Selection', 'tech-stack', 'Choose the right tools for your operation', 30, 2, 'workshop'),
  ('Brand Building Essentials', 'brand-building', 'Create a professional brand identity', 20, 3, 'video'),
  ('Logo Design Workshop', 'logo-design', 'Design a professional logo for your business', 16, 4, 'workshop'),
  ('Website Development', 'site-build', 'Build and launch your business website', 45, 5, 'video'),
  ('Domain & Hosting Setup', 'site-domain', 'Set up your domain and hosting infrastructure', 18, 6, 'video'),
  ('CRM Implementation', 'crm-setup', 'Implement a CRM system for your business', 35, 7, 'workshop'),
  ('Backend Systems Setup', 'backend-setup', 'Configure essential backend systems', 40, 8, 'video')
) AS m(title, slug, description, duration, order_index, type)
WHERE c.slug = 'business-infrastructure';

-- Create a sample learning path
INSERT INTO public.learning_paths (title, slug, description, course_ids, target_audience, estimated_duration_weeks)
SELECT 
  'Zero to $10K/Month Path',
  'zero-to-10k',
  'The complete roadmap from startup to $10K monthly recurring revenue',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition')
  ]::UUID[],
  'New entrepreneurs starting their remote operations journey',
  12
WHERE NOT EXISTS (SELECT 1 FROM public.learning_paths WHERE slug = 'zero-to-10k');