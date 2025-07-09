-- Complete Whop module structure for remaining courses

-- Client Acquisition Mastery modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'client-acquisition');

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
  -- Outbound Marketing section
  ('Cold Calling Masterclass', 'cold-calling', 'Master the art of cold calling for B2B client acquisition', 45, 1, 'video'),
  ('Objection Handling Scripts', 'objection-handling', 'Learn proven scripts to overcome common objections', 20, 2, 'workshop'),
  ('LinkedIn Outreach Automation', 'linkedin-automation', 'Automate and scale your LinkedIn lead generation', 30, 3, 'video'),
  ('Door-to-Door Sales Strategy', 'door-to-door', 'Leverage in-person sales for high-ticket contracts', 25, 4, 'video'),
  
  -- Inbound Marketing section
  ('Facebook Ads Mastery', 'facebook-ads', 'Create profitable Facebook ad campaigns for service businesses', 40, 5, 'workshop'),
  ('SEO for Service Businesses', 'seo-mastery', 'Rank #1 for your service keywords in local markets', 35, 6, 'video'),
  ('Google Ads & PPC', 'google-ads', 'Master Google Ads for immediate lead flow', 30, 7, 'workshop'),
  ('Strategic Partnerships', 'partnerships', 'Build win-win partnerships that generate referrals', 20, 8, 'video'),
  
  -- Closing & Sales Process
  ('Sales Psychology', 'sales-psychology', 'Understand buyer psychology to close more deals', 25, 9, 'video'),
  ('High-Ticket Closing', 'high-ticket-closing', 'Close $10K+ contracts with confidence', 30, 10, 'workshop')
) AS m(title, slug, description, duration, order_index, type)
WHERE c.slug = 'client-acquisition';

-- Operations & Fulfillment Systems modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'operations-fulfillment');

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
  -- Estimating section
  ('Precision Estimating Systems', 'estimating-systems', 'Build accurate estimating systems for consistent profits', 40, 1, 'workshop'),
  ('Market Pricing Research', 'pricing-research', 'Research and set competitive yet profitable pricing', 25, 2, 'video'),
  ('Quote Delivery Process', 'quote-delivery', 'Create professional quotes that convert', 20, 3, 'video'),
  
  -- Material & Vendor Management
  ('Supplier Relationship Building', 'supplier-relations', 'Build strong vendor relationships for better terms', 25, 4, 'video'),
  ('Material Cost Optimization', 'cost-optimization', 'Reduce material costs without sacrificing quality', 30, 5, 'workshop'),
  ('Just-in-Time Ordering', 'jit-ordering', 'Implement JIT systems to reduce inventory costs', 20, 6, 'video'),
  
  -- Production & Quality Control
  ('Production System Design', 'production-design', 'Design scalable production systems', 35, 7, 'workshop'),
  ('Quality Control Processes', 'quality-control', 'Implement QC to ensure consistent delivery', 25, 8, 'video'),
  ('Customer Communication Systems', 'customer-comms', 'Keep customers informed throughout production', 20, 9, 'video'),
  ('Project Management Tools', 'project-management', 'Use PM tools to track and optimize operations', 30, 10, 'workshop')
) AS m(title, slug, description, duration, order_index, type)
WHERE c.slug = 'operations-fulfillment';

-- Scaling with Teams & Subcontractors modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'team-scaling');

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
  -- Hiring & Onboarding
  ('Hiring Virtual Assistants', 'hiring-vas', 'Find and hire top-tier virtual assistants globally', 30, 1, 'video'),
  ('Onboarding Systems', 'onboarding-systems', 'Create bulletproof onboarding for new team members', 25, 2, 'workshop'),
  ('Performance Expectations', 'performance-expectations', 'Set clear expectations and KPIs for remote teams', 20, 3, 'video'),
  
  -- Managing Subcontractors
  ('Subcontractor Sourcing', 'subcontractor-sourcing', 'Find reliable subcontractors for scalable fulfillment', 25, 4, 'video'),
  ('Contract Negotiation', 'contract-negotiation', 'Negotiate win-win contracts with subs', 20, 5, 'workshop'),
  ('Quality Assurance Systems', 'qa-systems', 'Ensure consistent quality from all subcontractors', 25, 6, 'video'),
  
  -- Payment & Legal
  ('Payment Processing Systems', 'payment-systems', 'Set up automated payment systems for teams', 20, 7, 'video'),
  ('Legal Protection Strategies', 'legal-protection', 'Protect your business with proper contracts and insurance', 30, 8, 'workshop'),
  ('Scaling Team Culture', 'team-culture', 'Build a strong culture in a remote environment', 15, 9, 'video')
) AS m(title, slug, description, duration, order_index, type)
WHERE c.slug = 'team-scaling';

-- Create additional learning paths
INSERT INTO public.learning_paths (title, slug, description, course_ids, target_audience, estimated_duration_weeks)
SELECT 
  'Operations Excellence Path',
  'operations-excellence',
  'Master the operational side of running a remote business',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'operations-fulfillment'),
    (SELECT id FROM public.courses WHERE slug = 'team-scaling')
  ]::UUID[],
  'Business owners ready to scale their operations',
  10
WHERE NOT EXISTS (SELECT 1 FROM public.learning_paths WHERE slug = 'operations-excellence');

INSERT INTO public.learning_paths (title, slug, description, course_ids, target_audience, estimated_duration_weeks)
SELECT 
  'Complete Business Mastery',
  'complete-mastery',
  'The complete curriculum for building a 7-figure remote operation',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'operations-fulfillment'),
    (SELECT id FROM public.courses WHERE slug = 'team-scaling')
  ]::UUID[],
  'Ambitious entrepreneurs committed to building a location-independent empire',
  20
WHERE NOT EXISTS (SELECT 1 FROM public.learning_paths WHERE slug = 'complete-mastery');