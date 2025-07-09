-- Complete Role-Based Course Structure with Learning Paths
-- This migration reorganizes all content into 12 role-based courses

-- First, update existing courses to match new structure
UPDATE public.courses SET
  title = 'Foundation for Leaders',
  description = 'Master the core mindset and strategic principles of building a location-independent service business. Learn delegation, decision-making, and the mental frameworks that drive 7-figure operations.',
  category = 'foundation',
  level = 'Beginner',
  estimated_weeks = 1
WHERE slug = 'foundation-remote-ops';

UPDATE public.courses SET
  title = 'Business Setup & Systems',
  description = 'Build your complete business infrastructure from scratch. Choose your service, set up essential tech stack, create professional branding, and establish the systems that run your operation.',
  category = 'technology',
  level = 'Beginner',
  estimated_weeks = 2
WHERE slug = 'business-infrastructure';

UPDATE public.courses SET
  title = 'Marketing: Outbound Mastery',
  description = 'Master proactive client acquisition strategies that deliver immediate results. From door knocking to strategic alliances, learn the outbound tactics that consistently generate leads.',
  category = 'client-acquisition',
  level = 'Intermediate',
  estimated_weeks = 3
WHERE slug = 'client-acquisition';

-- Create new course for Inbound Marketing (splitting from client-acquisition)
INSERT INTO public.courses (title, slug, description, category, level, estimated_weeks, order_index, is_published) VALUES
  ('Marketing: Inbound Systems', 'marketing-inbound', 'Build automated lead generation systems that work 24/7. Master SEO, paid ads, and digital strategies that bring qualified prospects to you.', 'client-acquisition', 'Intermediate', 3, 4, true),
  ('Estimation Mastery', 'estimation-mastery', 'Learn to accurately scope and price any service job. Build estimation systems that ensure profitability while winning more deals.', 'operations', 'Intermediate', 1, 5, true),
  ('Sales Excellence', 'sales-excellence', 'Convert leads into paying customers with proven sales processes. Master the art of presenting, closing, and collecting payment.', 'sales', 'Intermediate', 1, 6, true),
  ('Procurement & Materials', 'procurement-materials', 'Master vendor relationships and material management. Build systems for ordering, tracking, and optimizing material costs.', 'operations', 'Intermediate', 2, 7, true),
  ('Project Management', 'project-management', 'Deliver exceptional service consistently. Learn to manage jobs, maintain quality, and keep customers informed throughout the process.', 'operations', 'Intermediate', 2, 8, true),
  ('Subcontractor Management', 'subcontractor-management', 'Build and manage a reliable network of subcontractors. Learn hiring, management, and payment systems that scale.', 'team-building', 'Advanced', 2, 9, true),
  ('Financial Management & Reporting', 'financial-management', 'Master the numbers that drive your business. Understand cash flow, profitability, and financial planning for service businesses.', 'finance', 'Advanced', 3, 10, true),
  ('Customer Success & Retention', 'customer-success', 'Turn one-time clients into lifetime customers. Build systems for follow-up, reviews, referrals, and repeat business.', 'sales', 'Advanced', 2, 11, true),
  ('Legal, HR & Compliance', 'legal-hr-compliance', 'Protect and scale your business properly. Master contracts, insurance, hiring, and compliance for service businesses.', 'operations', 'Advanced', 3, 12, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  estimated_weeks = EXCLUDED.estimated_weeks;

-- Now let's clear and reorganize all modules according to the Whop content

-- Foundation for Leaders (keep existing 6 modules)
-- Already set up correctly in previous migrations

-- Business Setup & Systems modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'business-infrastructure');

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
  ('Choose Your Service', 'choose-service', 'Select the perfect service offering for your market and skills', 15, 1),
  ('Tech Stack', 'tech-stack', 'Choose the right tools and software for your operation', 20, 2),
  ('Brand Building Checklist', 'brand-checklist', 'Create a professional brand identity that attracts premium clients', 15, 3),
  ('Backend Setup', 'backend-setup', 'Configure essential backend systems and workflows', 25, 4),
  ('CRM Implementation', 'crm-setup', 'Set up your customer relationship management system', 20, 5),
  ('Branding - Logo Design', 'logo-design', 'Design a professional logo for your business', 16, 6),
  ('Site Build', 'site-build', 'Build a high-converting website for your service business', 23, 7),
  ('Site Launch', 'site-launch', 'Launch your website and ensure everything works perfectly', 40, 8),
  ('Site Domain', 'site-domain', 'Set up your domain and hosting infrastructure', 18, 9),
  ('GMB (Google My Business)', 'gmb-setup', 'Dominate local search with Google My Business optimization', 25, 10)
) AS m(title, slug, description, duration, order_index)
WHERE c.slug = 'business-infrastructure';

-- Marketing: Outbound Mastery modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'client-acquisition');

INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Door Knocking', 'door-knocking', 'Master face-to-face sales in targeted neighborhoods', 20, 1, 'The oldest method that still converts at 30%+'),
  ('FB Ad Scraping', 'fb-ad-scraping', 'Extract high-value leads from Facebook marketplace and groups', 3, 2, 'Find buyers already looking for your service'),
  ('FB Groups (Local Communities)', 'fb-groups-local', 'Leverage local Facebook groups for warm lead generation', 9, 3, 'Tap into community trust for easy sales'),
  ('Strategic Alliances', 'strategic-alliances', 'Build referral partnerships with complementary businesses', 15, 4, 'Let other businesses send you customers'),
  ('Cold Calling', 'cold-calling', 'Master phone sales with proven scripts and techniques', 25, 5, 'Turn cold calls into warm conversations'),
  ('Lunch Connects', 'lunch-connects', 'Network strategically over lunch meetings', 10, 6, 'One lunch can equal 10 referrals'),
  ('Mastering Data for Success', 'data-mastery', 'Use data to identify and target your best prospects', 2, 7, 'Work smarter with data-driven targeting'),
  ('Lead Lists - Outsourcing', 'lead-lists-outsourcing', 'Outsource lead generation to virtual assistants', 10, 8, 'Build lists while you sleep'),
  ('Lead Lists - Manually Pulling Data', 'lead-lists-manual', 'Build high-quality lead lists manually for better conversion', 15, 9, 'Quality over quantity wins every time')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'client-acquisition';

-- Marketing: Inbound Systems modules
INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Inbound Agent', 'inbound-agent', 'Set up automated response systems for incoming leads', 15, 1, 'Never miss a lead again'),
  ('Outbound Agent', 'outbound-agent', 'Automate your outreach with AI-powered agents', 15, 2, 'Scale your outreach 10x with automation'),
  ('SEO Agents', 'seo-agents', 'Dominate search rankings with SEO automation', 20, 3, 'Rank #1 and stay there'),
  ('Yard Signs', 'yard-signs', 'Strategic yard sign placement for local visibility', 10, 4, 'Old school marketing that still works'),
  ('Local Paper Ads', 'local-paper-ads', 'Target affluent demographics through print media', 15, 5, 'Reach the customers others ignore'),
  ('FB Ads', 'fb-ads', 'Create profitable Facebook ad campaigns', 30, 6, 'Turn $1 into $10 with proven ad strategies'),
  ('Google Ad Network', 'google-ads', 'Master Google Ads for immediate lead flow', 25, 7, 'Show up when customers search for you'),
  ('Yelp Ads', 'yelp-ads', 'Leverage Yelp for service business growth', 15, 8, 'Dominate your local service category'),
  ('Next Door Organic', 'nextdoor-organic', 'Build presence on Nextdoor without paying', 12, 9, 'Become the neighborhood expert'),
  ('Next Door Paid', 'nextdoor-paid', 'Amplify reach with Nextdoor advertising', 10, 10, 'Hyper-local targeting that converts'),
  ('Direct Mailers', 'direct-mailers', 'Design direct mail campaigns that generate ROI', 20, 11, 'Physical mail cuts through digital noise'),
  ('Text Blasting', 'text-blasting', 'SMS marketing campaigns that drive action', 15, 12, 'Open rates that email marketers dream of'),
  ('Call Center', 'call-center', 'Set up virtual call center operations', 25, 13, 'Scale your phone sales globally')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'marketing-inbound';

-- Estimation Mastery modules
INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Interior Estimating', 'interior-estimating', 'Master accurate estimation for interior services', 30, 1, 'Price it right, win more jobs')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'estimation-mastery';

-- Sales Excellence modules
INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Sending Estimate & Closing', 'estimate-closing', 'Convert estimates into signed contracts', 6, 1, 'The fortune is in the follow-up'),
  ('Collecting Payment', 'collecting-payment', 'Get paid upfront and on time, every time', 7, 2, 'No money, no honey - get paid first')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'sales-excellence';

-- Procurement & Materials modules
INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Opening Vendor Accounts', 'vendor-accounts', 'Establish trade accounts for better pricing and terms', 4, 1, 'Buy wholesale, profit retail'),
  ('Streamline Material (Lowes Pre-order)', 'streamline-material', 'Master Lowes Pro pre-ordering system', 5, 2, 'Order today, deliver tomorrow'),
  ('Send Order # to Subs (Material runner)', 'material-runner', 'Coordinate material delivery with subcontractors', 1, 3, 'Keep jobs moving without delays'),
  ('Live Material Ordering', 'live-ordering', 'Real-time ordering strategies during active jobs', 28, 4, 'Never stop a job for materials'),
  ('Lowes Flow (Walk through)', 'lowes-walkthrough', 'Navigate Lowes like a pro contractor', 9, 5, 'In and out in 10 minutes'),
  ('Lowes Screen Flow (Follow along)', 'lowes-screen-flow', 'Master the Lowes Pro online system', 4, 6, 'Click by click ordering mastery'),
  ('Sherwin Williams Flow', 'sherwin-flow', 'Optimize your paint ordering process', 3, 7, 'Professional paint, professional results'),
  ('Home Depot Flow', 'home-depot-flow', 'Maximize Home Depot Pro benefits', 3, 8, 'Orange bucket, green money'),
  ('Trouble Shooting (out of order items)', 'troubleshooting-orders', 'Handle material shortages without stopping jobs', 17, 9, 'Always have a Plan B ready'),
  ('Custom Color Matching (Sherwin)', 'color-matching', 'Perfect color matches every time', 4, 10, 'Match any color like a pro')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'procurement-materials';

-- Project Management modules
INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Production Flow', 'production-flow', 'Design efficient workflows for consistent delivery', 6, 1, 'Smooth operations equal happy customers'),
  ('Managing Expenses & Budget', 'expense-management', 'Track and control project costs in real-time', 15, 2, 'Know your numbers or lose your profits'),
  ('Marketing Photos (before & afters)', 'marketing-photos', 'Capture portfolio content during every job', 13, 3, 'Every job is a marketing opportunity'),
  ('Vendor onboarding', 'vendor-onboarding', 'Streamline new vendor relationships', 10, 4, 'More vendors, more options, better prices')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'project-management';

-- Subcontractor Management modules
DELETE FROM public.modules WHERE course_id IN (SELECT id FROM public.courses WHERE slug = 'team-scaling');

INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type, tagline)
SELECT 
  c.id,
  m.title,
  m.slug,
  m.description,
  m.duration,
  m.order_index,
  'video',
  m.tagline
FROM public.courses c
CROSS JOIN (VALUES
  ('Managing Subcontractor Expectations', 'sub-expectations', 'Set clear standards from day one', 5, 1, 'Clear expectations prevent conflicts'),
  ('Ensuring Access to Projects', 'project-access', 'Coordinate smooth job site access', 3, 2, 'No access, no progress'),
  ('Sub Management', 'sub-management', 'Day-to-day subcontractor coordination', 6, 3, 'Manage people, not just projects'),
  ('Paying Out Subcontractors', 'sub-payments', 'Fast, fair payment systems that retain talent', 3, 4, 'Pay fast, keep the best'),
  ('Hiring Subs', 'hiring-subs', 'Find and vet reliable subcontractors', 5, 5, 'Your subs are your reputation')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'subcontractor-management';

-- Financial Management modules (placeholder content)
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
  ('Cash Flow Management', 'cash-flow', 'Master the lifeblood of your business', 30, 1),
  ('Understanding P&L Statements', 'pl-statements', 'Read and analyze your profit & loss like a CFO', 25, 2),
  ('Job Costing & Profitability', 'job-costing', 'Know exactly how much you make on every job', 35, 3),
  ('Service Business Tax Strategies', 'tax-strategies', 'Legal strategies to minimize your tax burden', 40, 4),
  ('Financial KPIs & Dashboards', 'financial-kpis', 'Track the numbers that matter most', 20, 5),
  ('Budgeting & Forecasting', 'budgeting', 'Plan your financial future with confidence', 30, 6)
) AS m(title, slug, description, duration, order_index)
WHERE c.slug = 'financial-management';

-- Customer Success modules (placeholder content)
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
  ('Post-Service Follow-up Systems', 'follow-up-systems', 'Turn every customer into a raving fan', 20, 1),
  ('Review Generation Strategies', 'review-generation', 'Get 5-star reviews on autopilot', 25, 2),
  ('Building Referral Programs', 'referral-programs', 'Make your customers your sales force', 30, 3),
  ('Upselling & Cross-selling', 'upselling', 'Increase customer lifetime value by 300%', 25, 4),
  ('Complaint Resolution', 'complaint-resolution', 'Turn unhappy customers into loyal advocates', 20, 5),
  ('Customer Lifetime Value', 'customer-ltv', 'Maximize the value of every relationship', 25, 6)
) AS m(title, slug, description, duration, order_index)
WHERE c.slug = 'customer-success';

-- Legal, HR & Compliance modules (placeholder content)
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
  ('Service Contracts & Agreements', 'service-contracts', 'Bulletproof contracts that protect your business', 35, 1),
  ('Insurance & Liability', 'insurance-liability', 'Get the right coverage without overpaying', 30, 2),
  ('Licensing & Permits', 'licensing-permits', 'Navigate regulatory requirements with ease', 25, 3),
  ('Hiring & Interview Process', 'hiring-process', 'Build a winning team from day one', 40, 4),
  ('Employee vs Contractor Classification', 'worker-classification', 'Avoid costly misclassification mistakes', 25, 5),
  ('Performance Management', 'performance-management', 'Get the best from your team consistently', 30, 6),
  ('Remote Culture Building', 'remote-culture', 'Build team cohesion across distances', 35, 7)
) AS m(title, slug, description, duration, order_index)
WHERE c.slug = 'legal-hr-compliance';

-- Update course order for logical flow
UPDATE public.courses SET order_index = 1 WHERE slug = 'foundation-remote-ops';
UPDATE public.courses SET order_index = 2 WHERE slug = 'business-infrastructure';
UPDATE public.courses SET order_index = 3 WHERE slug = 'client-acquisition';
UPDATE public.courses SET order_index = 4 WHERE slug = 'marketing-inbound';
UPDATE public.courses SET order_index = 5 WHERE slug = 'estimation-mastery';
UPDATE public.courses SET order_index = 6 WHERE slug = 'sales-excellence';
UPDATE public.courses SET order_index = 7 WHERE slug = 'procurement-materials';
UPDATE public.courses SET order_index = 8 WHERE slug = 'project-management';
UPDATE public.courses SET order_index = 9 WHERE slug = 'subcontractor-management';
UPDATE public.courses SET order_index = 10 WHERE slug = 'financial-management';
UPDATE public.courses SET order_index = 11 WHERE slug = 'customer-success';
UPDATE public.courses SET order_index = 12 WHERE slug = 'legal-hr-compliance';

-- Delete old learning paths
DELETE FROM public.learning_paths;

-- Create new progressive learning paths
INSERT INTO public.learning_paths (title, slug, description, course_ids, target_audience, estimated_duration_weeks, order_index)
VALUES
(
  'First $10K Fast Track',
  'first-10k-fast',
  'The fastest path to your first $10,000. Focus only on what matters: mindset, basic setup, one marketing method, and closing deals.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'sales-excellence')
  ]::UUID[],
  'Complete beginners who want to start earning quickly',
  6,
  1
),
(
  'Scale to $100K Path',
  'scale-to-100k',
  'Build repeatable systems to reach $100K. Add inbound marketing, proper estimation, and basic operations to your foundation.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'marketing-inbound'),
    (SELECT id FROM public.courses WHERE slug = 'estimation-mastery'),
    (SELECT id FROM public.courses WHERE slug = 'sales-excellence'),
    (SELECT id FROM public.courses WHERE slug = 'project-management')
  ]::UUID[],
  'Entrepreneurs ready to build consistent revenue',
  12,
  2
),
(
  'Building the Machine',
  'building-machine',
  'Create a self-running operation. Master all marketing channels, operations, team building, and financial management.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'marketing-inbound'),
    (SELECT id FROM public.courses WHERE slug = 'estimation-mastery'),
    (SELECT id FROM public.courses WHERE slug = 'sales-excellence'),
    (SELECT id FROM public.courses WHERE slug = 'procurement-materials'),
    (SELECT id FROM public.courses WHERE slug = 'project-management'),
    (SELECT id FROM public.courses WHERE slug = 'subcontractor-management'),
    (SELECT id FROM public.courses WHERE slug = 'financial-management'),
    (SELECT id FROM public.courses WHERE slug = 'customer-success')
  ]::UUID[],
  'Business owners ready to scale beyond themselves',
  26,
  3
),
(
  'Multi-Market Domination',
  'multi-market',
  'Scale to multiple cities and markets. Complete mastery of all business systems plus geographic expansion strategies.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'business-infrastructure'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'marketing-inbound'),
    (SELECT id FROM public.courses WHERE slug = 'estimation-mastery'),
    (SELECT id FROM public.courses WHERE slug = 'sales-excellence'),
    (SELECT id FROM public.courses WHERE slug = 'procurement-materials'),
    (SELECT id FROM public.courses WHERE slug = 'project-management'),
    (SELECT id FROM public.courses WHERE slug = 'subcontractor-management'),
    (SELECT id FROM public.courses WHERE slug = 'financial-management'),
    (SELECT id FROM public.courses WHERE slug = 'customer-success'),
    (SELECT id FROM public.courses WHERE slug = 'legal-hr-compliance')
  ]::UUID[],
  'Experienced operators ready to build an empire',
  52,
  4
);

-- Add role-based learning paths for team training
INSERT INTO public.learning_paths (title, slug, description, course_ids, target_audience, estimated_duration_weeks, order_index)
VALUES
(
  'Sales Professional Track',
  'sales-professional',
  'Complete training for sales team members. Learn the foundation, master sales techniques, and understand basic operations.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'sales-excellence'),
    (SELECT id FROM public.courses WHERE slug = 'estimation-mastery'),
    (SELECT id FROM public.courses WHERE slug = 'customer-success')
  ]::UUID[],
  'Sales representatives and closers',
  4,
  5
),
(
  'Operations Professional Track',
  'operations-professional',
  'Training for operations team members. Master estimation, procurement, project management, and quality control.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'estimation-mastery'),
    (SELECT id FROM public.courses WHERE slug = 'procurement-materials'),
    (SELECT id FROM public.courses WHERE slug = 'project-management'),
    (SELECT id FROM public.courses WHERE slug = 'subcontractor-management')
  ]::UUID[],
  'Project managers and operations staff',
  6,
  6
),
(
  'Marketing Professional Track',
  'marketing-professional',
  'Complete marketing training for team members. Master both inbound and outbound strategies to generate consistent leads.',
  ARRAY[
    (SELECT id FROM public.courses WHERE slug = 'foundation-remote-ops'),
    (SELECT id FROM public.courses WHERE slug = 'client-acquisition'),
    (SELECT id FROM public.courses WHERE slug = 'marketing-inbound')
  ]::UUID[],
  'Marketing managers and lead generation specialists',
  5,
  7
);