-- Add remaining Remote Operations courses with comprehensive modules
-- This migration adds all 22 "Coming Soon" courses with detailed module structures

-- Foundation & Setup Courses
INSERT INTO public.courses (title, slug, description, category, level, estimated_weeks, order_index, is_published) VALUES
-- Market Selection & Entry
('Market Selection & Entry', 'market-selection-entry', 'Learn how to identify and enter profitable markets remotely. Master market research, competition analysis, and strategic entry planning for any service business.', 'foundation', 'Beginner', 2, 13, true),
-- Virtual Office Setup
('Virtual Office Setup', 'virtual-office-setup', 'Establish local presence without being there. Set up phone systems, local addresses, and virtual infrastructure that makes you appear local in any market.', 'foundation', 'Beginner', 1, 14, true),
-- Multi-State Licensing
('Multi-State Licensing', 'multi-state-licensing', 'Get licensed across multiple states efficiently. Navigate licensing requirements, reciprocity agreements, and compliance strategies for multi-market operations.', 'foundation', 'Intermediate', 3, 15, true),
-- Software Platform Setup
('[Your Software] Setup', 'software-platform-setup', 'Master the platform that runs your business. Complete setup guide for your chosen software platform with remote operations best practices.', 'foundation', 'Beginner', 1, 16, true),

-- Getting Customers Courses
-- Virtual Sales Mastery
('Virtual Sales Mastery', 'virtual-sales-mastery', 'Close deals remotely with proven scripts and techniques. Master video calls, virtual presentations, and remote trust-building strategies.', 'sales', 'Intermediate', 2, 17, true),
-- Local SEO Domination
('Local SEO Domination', 'local-seo-domination', 'Rank #1 in any market without living there. Advanced local SEO strategies, Google My Business optimization, and review generation systems.', 'client-acquisition', 'Intermediate', 4, 18, true),
-- Lead Management Software
('Lead Management in [Your Software]', 'lead-management-software', 'Track and convert leads using the platform. Master CRM features, automation, and lead nurturing specific to your software.', 'sales', 'Intermediate', 1, 19, true),

-- Running Jobs Remotely Courses
-- Remote Job Monitoring
('Remote Job Monitoring', 'remote-job-monitoring', 'Maintain quality control from anywhere. Build systems for real-time job tracking, photo documentation, and remote quality assurance.', 'operations', 'Intermediate', 2, 20, true),
-- Daily Accountability Systems
('Daily Accountability Systems', 'daily-accountability-systems', 'Know exactly what''s happening on every job. Create daily reporting, check-in systems, and performance tracking for remote teams.', 'operations', 'Intermediate', 2, 21, true),
-- Crisis Management Remote
('Crisis Management Remote', 'crisis-management-remote', 'Handle emergencies when you''re 1000 miles away. Build protocols for customer complaints, job site issues, and emergency response.', 'operations', 'Advanced', 2, 22, true),
-- Jobs & Scheduling Software
('Jobs & Scheduling in [Your Software]', 'jobs-scheduling-software', 'Manage projects efficiently through the platform. Master job creation, scheduling, dispatch, and tracking features.', 'operations', 'Intermediate', 1, 23, true),

-- Building Your Team Courses
-- Remote Recruiting & Hiring
('Remote Recruiting & Hiring', 'remote-recruiting-hiring', 'Build great crews without meeting in person. Master virtual interviews, skill assessments, and remote onboarding processes.', 'team-building', 'Advanced', 3, 24, true),
-- Finding Your Local Champion
('Finding Your Local Champion', 'finding-local-champion', 'Identify and develop your trusted ground person. Learn to find, vet, and empower the right local leader for each market.', 'team-building', 'Advanced', 2, 25, true),
-- Remote Training Systems
('Remote Training Systems', 'remote-training-systems', 'Ensure consistent quality across all crews. Build video training libraries, certification programs, and quality standards.', 'team-building', 'Advanced', 4, 26, true),
-- Supplier Network Building
('Supplier Network Building', 'supplier-network-building', 'Establish material suppliers and credit lines remotely. Build vendor relationships, negotiate terms, and manage accounts from afar.', 'operations', 'Intermediate', 2, 27, true),
-- Team Tools Software
('Team Tools in [Your Software]', 'team-tools-software', 'Track crew productivity and manage permissions. Master team management features, time tracking, and performance analytics.', 'team-building', 'Intermediate', 1, 28, true),

-- Scaling Up Courses
-- Multi-Market Expansion
('Multi-Market Expansion', 'multi-market-expansion', 'Replicate your success in new cities. Master expansion strategies, market prioritization, and systematic rollout processes.', 'growth', 'Advanced', 6, 29, true),
-- Remote Financial Controls
('Remote Financial Controls', 'remote-financial-controls', 'Track money across multiple markets. Build financial systems, controls, and reporting for multi-location operations.', 'finance', 'Advanced', 3, 30, true),
-- Reporting Software
('Reporting in [Your Software]', 'reporting-software', 'See everything at a glance with powerful dashboards. Master reporting features, KPIs, and data-driven decision making.', 'operations', 'Intermediate', 1, 31, true),

-- Exit Ready Courses
-- Building Sellable Value
('Building Sellable Value', 'building-sellable-value', 'Create systems that buyers will pay premium for. Learn what makes a service business valuable and how to maximize sale price.', 'growth', 'Advanced', 8, 32, true),
-- Preparing for Sale
('Preparing for Sale', 'preparing-for-sale', 'Get your books and operations investor-ready. Master due diligence preparation, financial cleanup, and valuation strategies.', 'finance', 'Advanced', 6, 33, true),
-- Sale Process & Handoff
('Sale Process & Handoff', 'sale-process-handoff', 'Find buyers and transition smoothly. Navigate the sale process, negotiations, and successful business transition.', 'growth', 'Advanced', 4, 34, true);

-- Now add comprehensive modules for each new course

-- Market Selection & Entry modules
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
  ('Market Research Framework', 'market-research-framework', 'Systematic approach to evaluating new markets for profitability', 25, 1, 'Find gold mines, avoid ghost towns'),
  ('Competition Analysis Remote', 'competition-analysis-remote', 'Analyze competitors without stepping foot in the market', 20, 2, 'Know your enemies from afar'),
  ('Demographic Deep Dive', 'demographic-deep-dive', 'Use data to identify your ideal customer concentrations', 30, 3, 'Fish where the fish are'),
  ('Market Entry Strategies', 'market-entry-strategies', 'Choose between soft launch, aggressive entry, or partnership models', 35, 4, 'Enter smart, dominate fast'),
  ('Remote Market Testing', 'remote-market-testing', 'Validate demand before full commitment', 25, 5, 'Test small, scale big'),
  ('Multi-Market Prioritization', 'multi-market-prioritization', 'Rank and sequence market expansion for maximum ROI', 20, 6, 'Expand strategically, not randomly')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'market-selection-entry';

-- Virtual Office Setup modules
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
  ('Local Phone System Setup', 'local-phone-setup', 'Get local numbers and professional call handling in any market', 20, 1, 'Sound local, work global'),
  ('Virtual Address Solutions', 'virtual-address-solutions', 'Establish business addresses for licensing and marketing', 15, 2, 'Be everywhere without being there'),
  ('Mail Handling Systems', 'mail-handling-systems', 'Manage physical mail digitally across all markets', 15, 3, 'Never miss important mail again'),
  ('Local Banking Remote', 'local-banking-remote', 'Set up business banking in markets you don''t live in', 25, 4, 'Bank like a local, manage remotely'),
  ('Virtual Reception Services', 'virtual-reception-services', 'Professional call answering that sounds in-house', 20, 5, 'First impressions matter'),
  ('Digital Office Integration', 'digital-office-integration', 'Connect all virtual services into seamless operations', 30, 6, 'One system, many locations')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'virtual-office-setup';

-- Multi-State Licensing modules
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
  ('License Requirements Map', 'license-requirements-map', 'Navigate licensing requirements for all 50 states', 40, 1, 'Know before you go'),
  ('Reciprocity Strategies', 'reciprocity-strategies', 'Leverage existing licenses to fast-track new states', 25, 2, 'Work smarter with reciprocity'),
  ('Application Process Mastery', 'application-process-mastery', 'Streamline applications across multiple jurisdictions', 30, 3, 'Apply once, get it right'),
  ('Compliance Tracking Systems', 'compliance-tracking-systems', 'Never miss renewals or requirements', 20, 4, 'Stay compliant automatically'),
  ('Multi-State Insurance', 'multi-state-insurance', 'Structure insurance for multi-state operations', 25, 5, 'Coverage that follows you'),
  ('Legal Entity Structuring', 'legal-entity-structuring', 'Set up business entities for multi-state operations', 35, 6, 'Structure for growth and protection')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'multi-state-licensing';

-- Software Platform Setup modules
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
  ('Initial Platform Configuration', 'initial-platform-config', 'Set up your account for remote operations success', 25, 1, 'Start right, scale easy'),
  ('User Roles & Permissions', 'user-roles-permissions', 'Structure access for remote team management', 20, 2, 'Right access for right people'),
  ('Workflow Automation Setup', 'workflow-automation-setup', 'Automate repetitive tasks and communications', 30, 3, 'Work less, accomplish more'),
  ('Integration Configuration', 'integration-configuration', 'Connect with other tools in your tech stack', 25, 4, 'Everything talks to everything'),
  ('Mobile App Deployment', 'mobile-app-deployment', 'Get your team set up on mobile devices', 15, 5, 'Your office in their pocket'),
  ('Custom Fields & Forms', 'custom-fields-forms', 'Tailor the platform to your business needs', 20, 6, 'Make it yours')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'software-platform-setup';

-- Virtual Sales Mastery modules
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
  ('Virtual Sales Psychology', 'virtual-sales-psychology', 'Build trust and rapport through a screen', 25, 1, 'Connect deeper, sell better'),
  ('Video Call Mastery', 'video-call-mastery', 'Professional setup and presence for video sales', 20, 2, 'Look like a million bucks'),
  ('Remote Estimation Walkthrough', 'remote-estimation-walkthrough', 'Conduct thorough estimates via video', 30, 3, 'See everything, miss nothing'),
  ('Digital Proposal Presentation', 'digital-proposal-presentation', 'Present and close deals remotely', 25, 4, 'Make your proposal irresistible'),
  ('Virtual Urgency Creation', 'virtual-urgency-creation', 'Create buying pressure without being there', 20, 5, 'Close deals faster remotely'),
  ('Follow-up Automation', 'follow-up-automation', 'Never let a lead go cold', 25, 6, 'Persistence pays, automation scales')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'virtual-sales-mastery';

-- Local SEO Domination modules
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
  ('GMB Advanced Optimization', 'gmb-advanced-optimization', 'Dominate Google My Business in every market', 35, 1, 'Own the map pack'),
  ('Local Citation Building', 'local-citation-building', 'Build authority in markets you don''t live in', 25, 2, 'Be everywhere consistently'),
  ('Review Generation Systems', 'review-generation-systems', 'Get 5-star reviews on autopilot', 30, 3, 'Reviews are the new referrals'),
  ('Local Content Strategy', 'local-content-strategy', 'Create location-specific content that ranks', 25, 4, 'Content that converts locally'),
  ('Competitor SEO Hijacking', 'competitor-seo-hijacking', 'Ethically outrank established competitors', 30, 5, 'Beat them at their own game'),
  ('Multi-Location SEO Management', 'multi-location-seo-management', 'Scale SEO across all your markets', 35, 6, 'Rank everywhere efficiently')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'local-seo-domination';

-- Lead Management Software modules
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
  ('Lead Capture Configuration', 'lead-capture-config', 'Set up all lead sources to feed the system', 20, 1, 'Catch every lead automatically'),
  ('Lead Scoring & Prioritization', 'lead-scoring-prioritization', 'Focus on leads most likely to convert', 25, 2, 'Work the hot ones first'),
  ('Automated Lead Nurturing', 'automated-lead-nurturing', 'Keep leads warm until they''re ready to buy', 30, 3, 'Never lose a lead to neglect'),
  ('Pipeline Management', 'pipeline-management', 'Track leads through every stage', 20, 4, 'Know where every dollar is'),
  ('Lead Analytics & Reporting', 'lead-analytics-reporting', 'Understand your lead sources and conversion', 25, 5, 'Measure everything that matters'),
  ('Team Lead Distribution', 'team-lead-distribution', 'Fairly distribute leads to sales team', 15, 6, 'Right lead to right rep')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'lead-management-software';

-- Remote Job Monitoring modules
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
  ('Photo Documentation Systems', 'photo-documentation-systems', 'Require and organize job site photos', 25, 1, 'See every job in real-time'),
  ('GPS Time Tracking', 'gps-time-tracking', 'Know when crews arrive and leave', 20, 2, 'Trust but verify location'),
  ('Daily Progress Reports', 'daily-progress-reports', 'Get detailed updates from every job', 20, 3, 'No surprises, ever'),
  ('Quality Checkpoints', 'quality-checkpoints', 'Build quality assurance into the process', 30, 4, 'Catch issues before customers do'),
  ('Customer Update Automation', 'customer-update-automation', 'Keep customers informed automatically', 25, 5, 'Happy customers stay informed'),
  ('Red Flag Monitoring', 'red-flag-monitoring', 'Early warning systems for job issues', 25, 6, 'Prevent fires, don''t fight them')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'remote-job-monitoring';

-- Daily Accountability Systems modules
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
  ('Morning Check-in Process', 'morning-checkin-process', 'Start every day with clarity and accountability', 20, 1, 'Start strong, finish stronger'),
  ('Task Assignment Systems', 'task-assignment-systems', 'Clear daily expectations for every team member', 25, 2, 'Everyone knows their job'),
  ('Progress Tracking Tools', 'progress-tracking-tools', 'Real-time visibility into daily progress', 20, 3, 'See progress as it happens'),
  ('End of Day Reports', 'end-of-day-reports', 'Systematic close-out for every work day', 20, 4, 'End every day with clarity'),
  ('Performance Scorecards', 'performance-scorecards', 'Track and improve team performance', 30, 5, 'What gets measured improves'),
  ('Accountability Partnerships', 'accountability-partnerships', 'Create peer accountability systems', 25, 6, 'Teams that check each other excel')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'daily-accountability-systems';

-- Crisis Management Remote modules
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
  ('Crisis Response Protocols', 'crisis-response-protocols', 'Step-by-step procedures for every emergency type', 35, 1, 'Plan for chaos, execute calmly'),
  ('Customer Complaint Resolution', 'customer-complaint-resolution', 'Turn angry customers into advocates remotely', 30, 2, 'Every complaint is an opportunity'),
  ('Emergency Vendor Network', 'emergency-vendor-network', 'Build backup solutions in every market', 25, 3, 'Always have a plan B'),
  ('Remote De-escalation', 'remote-deescalation', 'Calm situations from a distance', 25, 4, 'Cool heads prevail'),
  ('Insurance Claim Management', 'insurance-claim-management', 'Handle claims efficiently from anywhere', 20, 5, 'Get paid for problems'),
  ('Reputation Recovery', 'reputation-recovery', 'Bounce back from public issues', 30, 6, 'Turn setbacks into comebacks')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'crisis-management-remote';

-- Jobs & Scheduling Software modules
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
  ('Job Creation Workflow', 'job-creation-workflow', 'Efficiently create and set up new jobs', 20, 1, 'From lead to job in minutes'),
  ('Smart Scheduling Systems', 'smart-scheduling-systems', 'Optimize crew routes and capacity', 25, 2, 'Maximum jobs, minimum drive time'),
  ('Dispatch Automation', 'dispatch-automation', 'Get crews to jobs without manual work', 20, 3, 'Dispatch while you sleep'),
  ('Job Costing Setup', 'job-costing-setup', 'Track profitability on every job', 30, 4, 'Know your numbers live'),
  ('Mobile Crew Features', 'mobile-crew-features', 'Empower crews with mobile tools', 25, 5, 'Everything they need on-site'),
  ('Schedule Optimization', 'schedule-optimization', 'Maximize revenue per day', 25, 6, 'More jobs, same crews')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'jobs-scheduling-software';

-- Remote Recruiting & Hiring modules
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
  ('Remote Job Posting Strategy', 'remote-job-posting-strategy', 'Attract quality candidates in any market', 25, 1, 'Attract the best, filter the rest'),
  ('Virtual Interview Mastery', 'virtual-interview-mastery', 'Assess candidates effectively via video', 30, 2, 'Hire character, train skill'),
  ('Skill Testing Remote', 'skill-testing-remote', 'Verify abilities before hiring', 25, 3, 'Test before you invest'),
  ('Reference Check Systems', 'reference-check-systems', 'Thoroughly vet candidates from afar', 20, 4, 'Trust but verify everything'),
  ('Remote Onboarding Process', 'remote-onboarding-process', 'Get new hires productive fast', 35, 5, 'First week sets the tone'),
  ('Probation Period Management', 'probation-period-management', 'Ensure good fit before full commitment', 20, 6, 'Easy to start, prove to stay')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'remote-recruiting-hiring';

-- Finding Your Local Champion modules
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
  ('Champion Profile Definition', 'champion-profile-definition', 'Identify the traits of your ideal local leader', 20, 1, 'Know what you''re looking for'),
  ('Sourcing Local Leaders', 'sourcing-local-leaders', 'Where and how to find potential champions', 25, 2, 'Fish in the right ponds'),
  ('Vetting & Selection Process', 'vetting-selection-process', 'Choose the right person for this critical role', 30, 3, 'Choose wisely, succeed wildly'),
  ('Compensation Structures', 'compensation-structures', 'Pay packages that attract and retain champions', 25, 4, 'Pay for performance, retain talent'),
  ('Champion Empowerment', 'champion-empowerment', 'Give them authority to succeed', 20, 5, 'Empowered leaders deliver results'),
  ('Performance Management', 'performance-management', 'Keep champions accountable and motivated', 25, 6, 'Manage outcomes, not activities')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'finding-local-champion';

-- Remote Training Systems modules
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
  ('Training Video Production', 'training-video-production', 'Create professional training content efficiently', 30, 1, 'Show once, train forever'),
  ('Learning Management Setup', 'learning-management-setup', 'Organize and deliver training systematically', 25, 2, 'Netflix for your training'),
  ('Certification Programs', 'certification-programs', 'Build skills-based certification tracks', 30, 3, 'Prove skills, ensure quality'),
  ('Remote Skills Assessment', 'remote-skills-assessment', 'Verify learning and competency', 25, 4, 'Trust through verification'),
  ('Continuous Education Systems', 'continuous-education-systems', 'Keep teams learning and growing', 20, 5, 'Never stop improving'),
  ('Training ROI Tracking', 'training-roi-tracking', 'Measure the impact of training investments', 25, 6, 'Training that pays for itself')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'remote-training-systems';

-- Supplier Network Building modules
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
  ('Vendor Research Remote', 'vendor-research-remote', 'Find and vet suppliers in new markets', 25, 1, 'Find partners before you need them'),
  ('Account Setup Strategies', 'account-setup-strategies', 'Open trade accounts without local presence', 20, 2, 'Credit without credibility visits'),
  ('Pricing Negotiation Remote', 'pricing-negotiation-remote', 'Get best prices without face-to-face meetings', 30, 3, 'Negotiate like you''re local'),
  ('Delivery Coordination', 'delivery-coordination', 'Manage deliveries to job sites remotely', 25, 4, 'Right stuff, right place, right time'),
  ('Vendor Relationship Management', 'vendor-relationship-mgmt', 'Build strong partnerships from a distance', 20, 5, 'Partners, not just vendors'),
  ('Multi-Market Purchasing Power', 'multi-market-purchasing', 'Leverage scale across all markets', 25, 6, 'Buy like a chain, serve like local')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'supplier-network-building';

-- Team Tools Software modules
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
  ('Team Setup & Permissions', 'team-setup-permissions', 'Configure team access and roles properly', 20, 1, 'Right access for right roles'),
  ('Time Tracking Configuration', 'time-tracking-config', 'Accurate time and attendance tracking', 25, 2, 'Every minute counts'),
  ('Performance Dashboards', 'performance-dashboards', 'Real-time team performance visibility', 20, 3, 'See who''s crushing it'),
  ('Communication Tools', 'communication-tools', 'Keep teams connected and informed', 20, 4, 'Everyone on the same page'),
  ('Task Management Features', 'task-management-features', 'Assign and track team tasks efficiently', 25, 5, 'Nothing falls through cracks'),
  ('Payroll Integration', 'payroll-integration', 'Streamline pay with time tracking', 20, 6, 'Pay accurately and easily')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'team-tools-software';

-- Multi-Market Expansion modules
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
  ('Expansion Readiness Assessment', 'expansion-readiness', 'Know when you''re ready to expand', 30, 1, 'Expand from strength, not hope'),
  ('Market Selection Matrix', 'market-selection-matrix', 'Choose your next markets strategically', 35, 2, 'Pick winners, avoid losers'),
  ('Expansion Playbook Creation', 'expansion-playbook', 'Document your proven success formula', 40, 3, 'Replicate success systematically'),
  ('Multi-Market Operations', 'multi-market-operations', 'Manage multiple markets efficiently', 35, 4, 'One brain, many markets'),
  ('Cross-Market Synergies', 'cross-market-synergies', 'Leverage advantages across locations', 25, 5, 'Make markets help each other'),
  ('Expansion Financing', 'expansion-financing', 'Fund growth without going broke', 30, 6, 'Grow smart, not broke')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'multi-market-expansion';

-- Remote Financial Controls modules
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
  ('Multi-Entity Accounting', 'multi-entity-accounting', 'Structure finances for multiple markets', 35, 1, 'Clean books, clear picture'),
  ('Cash Flow Management Remote', 'cash-flow-management-remote', 'Control cash across all operations', 30, 2, 'Cash is king, visibility is power'),
  ('Expense Control Systems', 'expense-control-systems', 'Prevent runaway spending remotely', 25, 3, 'Control costs before they control you'),
  ('Financial Reporting Automation', 'financial-reporting-automation', 'Get real-time financial insights', 30, 4, 'Know your numbers instantly'),
  ('Fraud Prevention Remote', 'fraud-prevention-remote', 'Protect against internal and external theft', 25, 5, 'Trust systems, not people'),
  ('Profit Optimization', 'profit-optimization', 'Maximize margins across all markets', 35, 6, 'More profit, same revenue')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'remote-financial-controls';

-- Reporting Software modules
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
  ('Dashboard Configuration', 'dashboard-configuration', 'Build custom dashboards for your needs', 25, 1, 'See what matters most'),
  ('KPI Selection & Tracking', 'kpi-selection-tracking', 'Choose and monitor the right metrics', 30, 2, 'Measure what moves the needle'),
  ('Automated Report Generation', 'automated-report-generation', 'Schedule reports to run automatically', 20, 3, 'Reports without the work'),
  ('Data Analysis Tools', 'data-analysis-tools', 'Dig deeper into your business data', 25, 4, 'Find insights that drive growth'),
  ('Custom Report Building', 'custom-report-building', 'Create reports for specific needs', 30, 5, 'Any question, answered instantly'),
  ('Report Sharing & Access', 'report-sharing-access', 'Distribute insights to your team', 15, 6, 'Right data to right people')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'reporting-software';

-- Building Sellable Value modules
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
  ('Business Valuation Basics', 'business-valuation-basics', 'Understand how service businesses are valued', 35, 1, 'Know what you''re worth'),
  ('System Documentation', 'system-documentation', 'Create operations manuals that add value', 40, 2, 'Document it or it doesn''t exist'),
  ('Recurring Revenue Building', 'recurring-revenue-building', 'Add predictable income streams', 35, 3, 'Predictable revenue, premium price'),
  ('Management Team Development', 'management-team-development', 'Build a business that runs without you', 30, 4, 'Owners optional, value essential'),
  ('Customer Diversification', 'customer-diversification', 'Reduce dependency on any single client', 25, 5, 'Many customers, stable business'),
  ('Intellectual Property Creation', 'ip-creation', 'Build proprietary systems and methods', 30, 6, 'Own something worth buying')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'building-sellable-value';

-- Preparing for Sale modules
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
  ('Financial Cleanup Process', 'financial-cleanup-process', 'Get your books buyer-ready', 40, 1, 'Clean books sell businesses'),
  ('Due Diligence Preparation', 'due-diligence-prep', 'Organize everything buyers will request', 35, 2, 'Be ready before they ask'),
  ('Business Presentation Package', 'business-presentation', 'Tell your story compellingly', 30, 3, 'Sell the dream and the data'),
  ('Valuation Strategies', 'valuation-strategies', 'Maximize your business value legally', 35, 4, 'Get every dollar you deserve'),
  ('Tax Optimization Pre-Sale', 'tax-optimization-presale', 'Structure the sale for maximum after-tax proceeds', 30, 5, 'Keep more of what you sell for'),
  ('Buyer Qualification', 'buyer-qualification', 'Find serious buyers, avoid tire kickers', 25, 6, 'Right buyer, right price, right terms')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'preparing-for-sale';

-- Sale Process & Handoff modules
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
  ('Finding Buyers', 'finding-buyers', 'Locate and attract qualified purchasers', 30, 1, 'Buyers are everywhere if you look'),
  ('Negotiation Strategies', 'negotiation-strategies', 'Get the best price and terms', 35, 2, 'Win at the negotiation table'),
  ('Deal Structure Options', 'deal-structure-options', 'Understand earnouts, seller financing, and more', 30, 3, 'Structure deals that work for you'),
  ('Transition Planning', 'transition-planning', 'Ensure smooth handoff to new owners', 25, 4, 'Leave them set up for success'),
  ('Post-Sale Obligations', 'post-sale-obligations', 'Manage training and transition periods', 20, 5, 'Fulfill promises, collect payments'),
  ('Life After Exit', 'life-after-exit', 'Plan your next chapter before selling', 25, 6, 'Exit to something, not from something')
) AS m(title, slug, description, duration, order_index, tagline)
WHERE c.slug = 'sale-process-handoff';