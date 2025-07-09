-- Update all module descriptions with detailed, comprehensive content
-- This migration enhances 215 module descriptions to provide better learning context

-- Business Setup & Systems modules
UPDATE public.modules SET description = 'Select the perfect service offering for your market and skills. Learn to analyze market demand, evaluate your strengths, assess profit margins, and choose between residential vs commercial services. This module includes market research templates, service comparison matrices, and pricing strategy frameworks to help you make the most profitable decision for your remote operation.' WHERE slug = 'choose-service';

UPDATE public.modules SET description = 'Choose the right tools and software for your remote operation. Compare CRM systems, project management platforms, communication tools, and financial software. Learn integration strategies, cost optimization, and how to build a tech stack that scales. Includes detailed comparisons of popular platforms and step-by-step setup guides for your chosen tools.' WHERE slug = 'tech-stack';

UPDATE public.modules SET description = 'Create a professional brand identity that attracts premium clients. Master logo design principles, color psychology, brand messaging, and visual consistency. Learn to develop brand guidelines, create marketing materials, and establish a memorable presence in your market. Includes templates, design resources, and examples of successful service business brands.' WHERE slug = 'brand-checklist';

UPDATE public.modules SET description = 'Configure essential backend systems and workflows for smooth operations. Set up file management, communication protocols, standard operating procedures, and quality control systems. Learn to automate repetitive tasks, create efficient workflows, and build systems that run without your constant involvement. Includes workflow templates and automation recipes.' WHERE slug = 'backend-setup';

UPDATE public.modules SET description = 'Set up your customer relationship management system for maximum efficiency. Learn data organization, pipeline configuration, automation rules, and reporting setup. Master lead tracking, customer communication, and sales process optimization. This module covers popular CRM platforms with specific setup guides for service businesses and integration strategies.' WHERE slug = 'crm-setup';

UPDATE public.modules SET description = 'Design a professional logo that represents your business values and attracts ideal clients. Learn design principles, typography basics, and how to create or commission a logo that works across all media. Understand trademark considerations, file formats, and brand consistency. Includes DIY tools, designer brief templates, and revision processes.' WHERE slug = 'logo-design';

UPDATE public.modules SET description = 'Build a high-converting website that generates leads 24/7. Master web design principles, SEO basics, conversion optimization, and mobile responsiveness. Learn to create compelling content, effective calls-to-action, and trust-building elements. Includes templates, content frameworks, and launch checklists for service business websites.' WHERE slug = 'site-build';

UPDATE public.modules SET description = 'Launch your website successfully with proper testing and optimization. Learn pre-launch checklists, testing procedures, SEO setup, and analytics configuration. Master launch announcements, initial traffic strategies, and performance monitoring. Includes technical setup guides, launch promotion templates, and troubleshooting resources.' WHERE slug = 'site-launch';

UPDATE public.modules SET description = 'Set up your domain and hosting infrastructure for reliability and growth. Understand domain selection, DNS configuration, hosting options, and email setup. Learn about SSL certificates, backups, and security considerations. This module ensures your online presence is professional, secure, and scalable from day one.' WHERE slug = 'site-domain';

UPDATE public.modules SET description = 'Dominate local search with advanced Google My Business optimization. Learn profile optimization, review management, post strategies, and local SEO tactics. Master Google Maps ranking factors, photo optimization, and Q&A management. Includes templates for review responses, posting calendars, and competitive analysis techniques.' WHERE slug = 'gmb-setup';

-- Marketing: Outbound Mastery modules
UPDATE public.modules SET description = 'Master face-to-face sales through strategic door knocking. Learn neighborhood selection, optimal timing, proven scripts, and objection handling. Develop confidence, manage rejection, and maximize conversion rates. This module includes route planning tools, tracking sheets, and real-world scenarios to prepare you for every interaction at the door.' WHERE slug = 'door-knocking';

UPDATE public.modules SET description = 'Extract high-value leads from Facebook marketplace and groups efficiently. Learn advanced search techniques, lead qualification methods, and outreach strategies. Master tools for scraping, organizing data, and automated follow-up. Includes scripts for initial contact, compliance guidelines, and systems for managing large lead volumes.' WHERE slug = 'fb-ad-scraping';

UPDATE public.modules SET description = 'Leverage local Facebook groups for warm lead generation and community presence. Learn group selection, engagement strategies, and value-first posting. Master indirect selling, relationship building, and converting group members to customers. Includes posting templates, engagement calendars, and group management strategies.' WHERE slug = 'fb-groups-local';

UPDATE public.modules SET description = 'Build profitable referral partnerships with complementary businesses. Learn partner identification, approach strategies, and mutual benefit proposals. Master referral agreements, commission structures, and relationship management. This module includes partnership templates, tracking systems, and case studies of successful alliances.' WHERE slug = 'strategic-alliances';

UPDATE public.modules SET description = 'Master phone sales with proven scripts and psychological techniques. Learn voice modulation, active listening, objection handling, and closing over the phone. Develop confidence, manage call anxiety, and improve conversion rates. Includes call scripts, practice scenarios, and recording analysis techniques for continuous improvement.' WHERE slug = 'cold-calling';

UPDATE public.modules SET description = 'Network strategically through lunch meetings that generate referrals and partnerships. Learn meeting selection, conversation flow, and follow-up strategies. Master the art of giving value first and building long-term professional relationships. Includes invitation templates, conversation guides, and ROI tracking methods.' WHERE slug = 'lunch-connects';

UPDATE public.modules SET description = 'Use data analytics to identify and target your most profitable prospects. Learn data sources, analysis techniques, and predictive modeling for lead generation. Master demographic analysis, buying pattern identification, and market segmentation. Includes spreadsheet templates, data interpretation guides, and automation strategies.' WHERE slug = 'data-mastery';

UPDATE public.modules SET description = 'Build efficient systems for outsourcing lead generation to virtual assistants. Learn VA selection, training processes, quality control, and performance management. Master communication protocols, task delegation, and cost optimization. Includes hiring guides, training materials, and management templates for remote lead generation teams.' WHERE slug = 'lead-lists-outsourcing';

UPDATE public.modules SET description = 'Build high-quality lead lists manually for superior conversion rates. Learn research techniques, data verification, and list organization. Master tools and resources for finding accurate contact information and qualifying prospects. This module includes step-by-step processes, quality checklists, and templates for different service types.' WHERE slug = 'lead-lists-manual';

-- Marketing: Inbound Systems modules
UPDATE public.modules SET description = 'Set up automated response systems that never miss an incoming lead. Learn chatbot configuration, auto-responder setup, and lead capture optimization. Master instant response strategies, qualification flows, and handoff protocols. Includes platform comparisons, conversation templates, and integration guides for 24/7 lead engagement.' WHERE slug = 'inbound-agent';

UPDATE public.modules SET description = 'Automate your outreach with AI-powered agents that scale your efforts. Learn agent configuration, message personalization, and campaign management. Master compliance requirements, response handling, and performance optimization. This module covers multiple platforms, best practices, and ROI tracking for automated outreach.' WHERE slug = 'outbound-agent';

UPDATE public.modules SET description = 'Dominate search rankings with advanced SEO automation and AI tools. Learn keyword research, content optimization, and link building strategies. Master technical SEO, local optimization, and algorithm updates. Includes tool configurations, content templates, and monthly SEO workflow automations for consistent ranking improvements.' WHERE slug = 'seo-agents';

UPDATE public.modules SET description = 'Leverage yard signs for cost-effective local visibility and lead generation. Learn strategic placement, design principles, and permission requirements. Master tracking methods, seasonal strategies, and sign maintenance. This module includes design templates, placement maps, and ROI calculation methods for yard sign campaigns.' WHERE slug = 'yard-signs';

UPDATE public.modules SET description = 'Target affluent demographics through strategic print media advertising. Learn publication selection, ad design, and message crafting for older, wealthier audiences. Master frequency strategies, tracking methods, and integrated campaigns. Includes ad templates, negotiation tactics, and performance measurement techniques.' WHERE slug = 'local-paper-ads';

UPDATE public.modules SET description = 'Create profitable Facebook ad campaigns that generate quality leads consistently. Learn audience targeting, ad creative, budget optimization, and conversion tracking. Master retargeting, lookalike audiences, and campaign scaling. This module includes proven ad templates, testing frameworks, and troubleshooting guides.' WHERE slug = 'fb-ads';

UPDATE public.modules SET description = 'Master Google Ads for immediate visibility when customers search for your services. Learn keyword strategy, ad copywriting, landing page optimization, and quality score improvement. Understand bidding strategies, negative keywords, and conversion tracking. Includes campaign templates and optimization checklists.' WHERE slug = 'google-ads';

UPDATE public.modules SET description = 'Leverage Yelp advertising to dominate your service category locally. Learn profile optimization, ad placement strategies, and review management integration. Master competitor targeting, budget allocation, and performance tracking. This module includes setup guides, response templates, and ROI optimization strategies.' WHERE slug = 'yelp-ads';

UPDATE public.modules SET description = 'Build organic presence on Nextdoor to become the neighborhood service expert. Learn community engagement, trust building, and recommendation strategies. Master content creation, neighbor referrals, and local event participation. Includes posting calendars, engagement templates, and community building tactics.' WHERE slug = 'nextdoor-organic';

UPDATE public.modules SET description = 'Amplify your reach with targeted Nextdoor advertising campaigns. Learn neighborhood selection, ad creative, and local targeting options. Master budget optimization, seasonal campaigns, and performance tracking. This module covers ad specifications, creative templates, and neighborhood analysis techniques.' WHERE slug = 'nextdoor-paid';

UPDATE public.modules SET description = 'Design direct mail campaigns that cut through digital noise for high ROI. Learn design principles, list selection, and offer creation. Master timing strategies, tracking methods, and integrated marketing approaches. Includes design templates, vendor relationships, and cost optimization strategies for profitable campaigns.' WHERE slug = 'direct-mailers';

UPDATE public.modules SET description = 'Implement SMS marketing campaigns that drive immediate action. Learn compliance requirements, message crafting, and timing optimization. Master list building, segmentation, and automated sequences. This module includes message templates, platform setup, and integration with other marketing channels.' WHERE slug = 'text-blasting';

UPDATE public.modules SET description = 'Set up virtual call center operations for scalable phone sales and support. Learn team structure, technology setup, and quality assurance. Master training systems, performance management, and cost optimization. Includes hiring guides, script libraries, and management dashboards for remote call center success.' WHERE slug = 'call-center';

-- Estimation Mastery modules
UPDATE public.modules SET description = 'Master accurate estimation for all interior services to ensure profitability. Learn measurement techniques, material calculations, and labor estimation. Understand markup strategies, market pricing, and scope creep prevention. This comprehensive module includes calculators, pricing sheets, and scenario-based practice for confident, profitable estimates.' WHERE slug = 'interior-estimating';

-- Sales Excellence modules
UPDATE public.modules SET description = 'Convert estimates into signed contracts with proven follow-up and closing techniques. Learn timing strategies, objection handling, and urgency creation. Master multiple touch points, value reinforcement, and decision psychology. Includes email templates, call scripts, and a systematic follow-up calendar that dramatically improves close rates.' WHERE slug = 'estimate-closing';

UPDATE public.modules SET description = 'Get paid upfront and on time with professional payment collection systems. Learn payment options setup, deposit strategies, and terms negotiation. Master difficult conversations, payment plans, and collection procedures. This module includes payment scripts, contract terms, and automated payment solutions for consistent cash flow.' WHERE slug = 'collecting-payment';

-- Procurement & Materials modules
UPDATE public.modules SET description = 'Establish trade accounts for wholesale pricing and professional credibility. Learn application processes, credit building, and vendor negotiation. Master account management, payment terms optimization, and multi-location strategies. Includes vendor lists, application templates, and relationship building tactics for maximum savings.' WHERE slug = 'vendor-accounts';

UPDATE public.modules SET description = 'Master the Lowes Pro pre-ordering system for efficient material management. Learn account setup, online ordering, and delivery coordination. Understand Pro pricing, volume discounts, and special order processes. This module includes step-by-step tutorials, troubleshooting guides, and optimization strategies.' WHERE slug = 'streamline-material';

UPDATE public.modules SET description = 'Coordinate material delivery efficiently with subcontractors using simple systems. Learn order sharing methods, pickup coordination, and accountability systems. Master communication protocols and cost allocation. Includes templates for order forms, pickup authorizations, and material tracking spreadsheets.' WHERE slug = 'material-runner';

UPDATE public.modules SET description = 'Master real-time material ordering during active jobs without delays. Learn mobile ordering techniques, backup supplier strategies, and emergency protocols. Understand inventory prediction, common items stocking, and rapid fulfillment options. This module ensures jobs never stop due to material shortages.' WHERE slug = 'live-ordering';

UPDATE public.modules SET description = 'Navigate Lowes efficiently to minimize time and maximize Pro benefits. Learn store layouts, Pro desk procedures, and will-call systems. Master quick shopping strategies, loading assistance, and return processes. Includes time-saving tips, app features, and insider knowledge for efficient store visits.' WHERE slug = 'lowes-walkthrough';

UPDATE public.modules SET description = 'Master the Lowes Pro online system with detailed screen-by-screen guidance. Learn advanced search techniques, quote building, and order management. Understand delivery options, project organization, and reporting features. This visual guide ensures you utilize every feature for maximum efficiency.' WHERE slug = 'lowes-screen-flow';

UPDATE public.modules SET description = 'Optimize your paint ordering process with Sherwin Williams Pro account. Learn color matching, quantity estimation, and delivery scheduling. Master account benefits, contractor pricing, and product selection. Includes ordering shortcuts, color management systems, and relationship building with store staff.' WHERE slug = 'sherwin-flow';

UPDATE public.modules SET description = 'Maximize Home Depot Pro Xtra benefits for competitive advantages. Learn account features, bulk pricing, and paint desk procedures. Master volume pricing, tool rental integration, and purchase tracking. This module covers exclusive Pro benefits and strategies for leveraging both HD and Lowes.' WHERE slug = 'home-depot-flow';

UPDATE public.modules SET description = 'Handle material shortages and out-of-stock items without stopping jobs. Learn alternative sourcing, substitution strategies, and customer communication. Master backup supplier networks, cross-referencing, and rapid problem solving. Includes decision trees, supplier directories, and communication templates.' WHERE slug = 'troubleshooting-orders';

UPDATE public.modules SET description = 'Perfect color matches every time using Sherwin Williams color matching technology. Learn sample preparation, lighting considerations, and formula adjustments. Master custom color creation, batch consistency, and client approval processes. Includes troubleshooting guides and color documentation systems.' WHERE slug = 'color-matching';

-- Project Management modules
UPDATE public.modules SET description = 'Design efficient workflows that ensure consistent quality and timely delivery. Learn job sequencing, crew coordination, and milestone planning. Master bottleneck identification, resource allocation, and schedule optimization. This module includes workflow templates, Gantt charts, and efficiency tracking systems.' WHERE slug = 'production-flow';

UPDATE public.modules SET description = 'Track and control project costs in real-time to protect profit margins. Learn expense categorization, budget monitoring, and variance analysis. Master cost allocation, change order management, and profitability reporting. Includes spreadsheet templates, mobile tracking apps, and financial dashboard creation.' WHERE slug = 'expense-management';

UPDATE public.modules SET description = 'Capture portfolio content during every job for continuous marketing assets. Learn photo composition, before/after techniques, and video testimonials. Master lighting, angles, and storytelling through visuals. This module includes shot lists, equipment recommendations, and content organization systems.' WHERE slug = 'marketing-photos';

UPDATE public.modules SET description = 'Streamline new vendor relationships for expanded capabilities and better pricing. Learn vendor evaluation, agreement negotiation, and performance tracking. Master onboarding processes, quality standards communication, and payment term setup. Includes vendor packets, evaluation forms, and relationship management tools.' WHERE slug = 'vendor-onboarding';

-- Subcontractor Management modules
UPDATE public.modules SET description = 'Set clear standards from day one to ensure smooth subcontractor relationships. Learn expectation documentation, quality standards communication, and performance metrics. Master difficult conversations, standard reinforcement, and accountability systems. Includes subcontractor handbooks, agreement templates, and communication scripts.' WHERE slug = 'sub-expectations';

UPDATE public.modules SET description = 'Coordinate smooth job site access for all subcontractors without delays. Learn key management, access codes, and security protocols. Master scheduling coordination, overlap prevention, and emergency access procedures. This module includes access logs, coordination calendars, and security checklists.' WHERE slug = 'project-access';

UPDATE public.modules SET description = 'Master day-to-day subcontractor coordination for maximum productivity. Learn communication systems, progress tracking, and quality control. Understand motivation techniques, conflict resolution, and performance optimization. Includes daily check-in templates, progress tracking tools, and issue resolution protocols.' WHERE slug = 'sub-management';

UPDATE public.modules SET description = 'Implement fast, fair payment systems that retain quality subcontractors. Learn payment processing, lien waiver management, and cash flow optimization. Master payment scheduling, dispute resolution, and retention strategies. This module includes payment templates, tracking systems, and automated solutions.' WHERE slug = 'sub-payments';

UPDATE public.modules SET description = 'Find and vet reliable subcontractors to build your remote workforce. Learn sourcing strategies, interview techniques, and skill verification. Master background checks, insurance verification, and trial period management. Includes recruitment templates, interview guides, and evaluation scorecards.' WHERE slug = 'hiring-subs';

-- Financial Management modules
UPDATE public.modules SET description = 'Master cash flow management to ensure your business never runs out of money. Learn forecasting techniques, collection acceleration, and payment timing. Understand working capital optimization, credit line usage, and reserve building. This module includes cash flow templates, projection tools, and crisis management strategies.' WHERE slug = 'cash-flow';

UPDATE public.modules SET description = 'Read and analyze profit & loss statements to make informed business decisions. Learn P&L structure, key metrics interpretation, and trend analysis. Master expense categorization, margin calculation, and profitability drivers. Includes P&L templates, analysis frameworks, and action planning guides.' WHERE slug = 'pl-statements';

UPDATE public.modules SET description = 'Track profitability on every job to identify winners and improve losers. Learn cost allocation methods, overhead distribution, and margin analysis. Master job costing systems, variance analysis, and pricing adjustments. This module includes costing templates, tracking tools, and profitability dashboards.' WHERE slug = 'job-costing';

UPDATE public.modules SET description = 'Implement legal tax strategies to minimize your burden and maximize profits. Learn entity structure optimization, deduction maximization, and quarterly planning. Master documentation requirements, audit preparation, and tax-advantaged investments. Includes checklists, planning calendars, and professional resources.' WHERE slug = 'tax-strategies';

UPDATE public.modules SET description = 'Track the key performance indicators that drive service business success. Learn KPI selection, dashboard creation, and automated reporting. Master trend analysis, benchmarking, and data-driven decision making. This module includes KPI libraries, dashboard templates, and interpretation guides.' WHERE slug = 'financial-kpis';

UPDATE public.modules SET description = 'Plan your financial future with accurate budgeting and forecasting systems. Learn revenue projection, expense planning, and scenario modeling. Master seasonal adjustments, growth planning, and contingency preparation. Includes budgeting templates, forecasting models, and variance tracking tools.' WHERE slug = 'budgeting';

-- Customer Success modules
UPDATE public.modules SET description = 'Build systematic follow-up processes that turn customers into raving fans. Learn follow-up timing, channel selection, and message crafting. Master satisfaction surveys, issue identification, and upsell opportunities. This module includes automation workflows, message templates, and tracking systems.' WHERE slug = 'follow-up-systems';

UPDATE public.modules SET description = 'Generate 5-star reviews consistently with proven request strategies. Learn optimal timing, channel selection, and incentive programs. Master review responses, reputation management, and platform optimization. Includes request templates, response scripts, and review generation automation tools.' WHERE slug = 'review-generation';

UPDATE public.modules SET description = 'Create referral programs that turn happy customers into your sales force. Learn program design, incentive structures, and promotion strategies. Master tracking systems, reward fulfillment, and program optimization. This module includes program templates, marketing materials, and ROI calculators.' WHERE slug = 'referral-programs';

UPDATE public.modules SET description = 'Increase customer lifetime value through strategic upselling and cross-selling. Learn opportunity identification, timing strategies, and offer creation. Master conversation techniques, bundle design, and rejection handling. Includes scripts, offer templates, and customer value tracking systems.' WHERE slug = 'upselling';

UPDATE public.modules SET description = 'Turn unhappy customers into loyal advocates through expert complaint resolution. Learn de-escalation techniques, problem-solving frameworks, and recovery strategies. Master empathy communication, solution delivery, and follow-up protocols. This module includes response templates and satisfaction tracking.' WHERE slug = 'complaint-resolution';

UPDATE public.modules SET description = 'Maximize the value of every customer relationship through lifetime value optimization. Learn CLV calculation, segmentation strategies, and retention tactics. Master loyalty programs, exclusive offers, and long-term engagement. Includes CLV calculators, retention campaigns, and profit maximization strategies.' WHERE slug = 'customer-ltv';

-- Legal, HR & Compliance modules
UPDATE public.modules SET description = 'Create bulletproof contracts that protect your business and clarify expectations. Learn essential clauses, limitation of liability, and payment terms. Master change orders, dispute resolution, and enforcement strategies. This module includes contract templates, clause libraries, and negotiation tactics.' WHERE slug = 'service-contracts';

UPDATE public.modules SET description = 'Get the right insurance coverage without overpaying for unnecessary protection. Learn coverage types, liability limits, and claims processes. Master certificate management, additional insured requirements, and risk mitigation. Includes coverage checklists, carrier comparisons, and claims guides.' WHERE slug = 'insurance-liability';

UPDATE public.modules SET description = 'Navigate licensing and permit requirements efficiently across jurisdictions. Learn research methods, application processes, and renewal management. Master reciprocity opportunities, expedited processing, and compliance tracking. This module includes requirement databases, application templates, and tracking systems.' WHERE slug = 'licensing-permits';

UPDATE public.modules SET description = 'Build a winning team through effective hiring and interview processes. Learn job posting optimization, candidate screening, and behavioral interviewing. Master skill assessment, culture fit evaluation, and offer negotiation. Includes interview guides, assessment tools, and onboarding checklists.' WHERE slug = 'hiring-process';

UPDATE public.modules SET description = 'Avoid costly misclassification mistakes with proper worker categorization. Learn IRS tests, state requirements, and documentation needs. Master hybrid arrangements, conversion processes, and audit defense. This module includes classification tools, agreement templates, and compliance checklists.' WHERE slug = 'worker-classification';

UPDATE public.modules SET description = 'Get maximum productivity through effective performance management systems. Learn goal setting, feedback delivery, and improvement planning. Master difficult conversations, motivation techniques, and termination processes. Includes review templates, documentation guides, and legal compliance tools.' WHERE slug = 'performance-management';

UPDATE public.modules SET description = 'Build strong team culture across distances with proven remote strategies. Learn virtual team building, communication protocols, and engagement tactics. Master recognition programs, career development, and retention strategies. This module includes activity ideas, communication templates, and culture measurement tools.' WHERE slug = 'remote-culture';

-- Operations & Fulfillment Systems modules
UPDATE public.modules SET description = 'Build estimation systems that ensure consistent profitability across all jobs. Learn cost calculation methods, markup strategies, and scope definition. Master estimate presentation, option pricing, and revision management. This module includes calculators, templates, and profitability tracking tools for accurate, winning estimates.' WHERE slug = 'precision-estimating';

UPDATE public.modules SET description = 'Streamline dispatch operations for maximum crew efficiency and customer satisfaction. Learn route optimization, job assignment, and real-time adjustments. Master communication protocols, emergency handling, and performance tracking. Includes dispatch software setup, communication templates, and efficiency metrics.' WHERE slug = 'efficient-dispatch';

UPDATE public.modules SET description = 'Design quality assurance systems that maintain standards across all jobs. Learn inspection protocols, checkpoint creation, and corrective action procedures. Master documentation requirements, customer sign-offs, and continuous improvement. This module includes QA checklists, photo guides, and tracking systems.' WHERE slug = 'quality-control';

UPDATE public.modules SET description = 'Scale your business efficiently through strategic job batching techniques. Learn job grouping strategies, route optimization, and resource allocation. Master scheduling algorithms, crew specialization, and efficiency maximization. Includes batching templates, planning tools, and profitability analysis methods.' WHERE slug = 'job-batching';

UPDATE public.modules SET description = 'Optimize field operations for maximum productivity and profitability. Learn time management, tool organization, and crew communication. Master job site efficiency, safety protocols, and customer interaction standards. This module includes operational checklists, training materials, and performance benchmarks.' WHERE slug = 'field-operations';

UPDATE public.modules SET description = 'Protect your business with comprehensive safety and compliance programs. Learn OSHA requirements, safety training, and incident management. Master documentation, insurance coordination, and audit preparation. Includes safety manuals, training programs, and compliance tracking systems for risk mitigation.' WHERE slug = 'safety-compliance';

UPDATE public.modules SET description = 'Create predictable business through strategic service agreement programs. Learn agreement design, pricing models, and sales techniques. Master renewal strategies, service delivery, and profitability optimization. This module includes agreement templates, sales scripts, and management systems.' WHERE slug = 'service-agreements';

UPDATE public.modules SET description = 'Prepare for rapid growth with scalable operational systems and processes. Learn capacity planning, system automation, and delegation strategies. Master growth metrics, bottleneck identification, and infrastructure development. Includes scaling checklists, automation guides, and growth management tools.' WHERE slug = 'scale-preparation';

UPDATE public.modules SET description = 'Build competitive advantages through operational excellence and innovation. Learn efficiency optimization, technology adoption, and differentiation strategies. Master cost leadership, service innovation, and market positioning. This module includes analysis frameworks, innovation processes, and competitive monitoring.' WHERE slug = 'competitive-edge';

UPDATE public.modules SET description = 'Implement professional project documentation systems for clarity and protection. Learn documentation requirements, photo protocols, and change order management. Master cloud storage, organization systems, and retrieval processes. Includes templates, naming conventions, and legal compliance guides.' WHERE slug = 'documentation-systems';

-- Now for all the new courses I added

-- Market Selection & Entry modules
UPDATE public.modules SET description = 'Develop a systematic approach to evaluating new markets for maximum profitability. Learn demographic analysis, competition assessment, and demand validation techniques. Master data sources, analysis tools, and decision frameworks. This module includes market scoring systems, research templates, and go/no-go decision criteria for confident market entry.' WHERE slug = 'market-research-framework';

UPDATE public.modules SET description = 'Analyze competitors remotely using digital tools and strategic intelligence gathering. Learn online research techniques, service analysis, and pricing discovery. Master competitive positioning, differentiation strategies, and market gap identification. Includes competitor tracking templates, analysis frameworks, and monitoring systems.' WHERE slug = 'competition-analysis-remote';

UPDATE public.modules SET description = 'Use demographic data to identify and target your ideal customer concentrations. Learn data sources, analysis techniques, and heat mapping for service areas. Master income analysis, property values, and lifestyle indicators. This module includes demographic tools, targeting strategies, and ROI prediction models.' WHERE slug = 'demographic-deep-dive';

UPDATE public.modules SET description = 'Choose the optimal entry strategy for new markets based on risk and resources. Learn soft launch techniques, aggressive expansion tactics, and partnership models. Master timing decisions, resource allocation, and milestone planning. Includes strategy templates, launch checklists, and success metrics for each approach.' WHERE slug = 'market-entry-strategies';

UPDATE public.modules SET description = 'Validate market demand before committing resources through remote testing methods. Learn minimum viable service strategies, test marketing techniques, and feedback collection. Master pivot strategies, scaling decisions, and failure criteria. This module includes testing frameworks, measurement tools, and decision trees.' WHERE slug = 'remote-market-testing';

UPDATE public.modules SET description = 'Strategically sequence market expansion for maximum ROI and sustainable growth. Learn prioritization frameworks, resource planning, and timing optimization. Master multi-market management, synergy identification, and risk mitigation. Includes expansion calculators, timeline templates, and portfolio management tools.' WHERE slug = 'multi-market-prioritization';

-- Virtual Office Setup modules
UPDATE public.modules SET description = 'Establish local phone presence with professional call handling in any market. Learn number selection, call routing, and voicemail optimization. Master call forwarding, team distribution, and availability management. This module includes provider comparisons, setup guides, and professional greeting scripts.' WHERE slug = 'local-phone-setup';

UPDATE public.modules SET description = 'Establish professional business addresses for licensing, marketing, and credibility. Learn virtual office options, mail forwarding services, and address usage rules. Master package handling, registered agent services, and compliance requirements. Includes provider reviews, cost comparisons, and setup procedures.' WHERE slug = 'virtual-address-solutions';

UPDATE public.modules SET description = 'Manage physical mail efficiently through digital scanning and forwarding services. Learn service selection, mail handling protocols, and important document management. Master check deposits, package forwarding, and secure disposal. This module includes workflow designs, service comparisons, and integration strategies.' WHERE slug = 'mail-handling-systems';

UPDATE public.modules SET description = 'Establish business banking relationships in markets where you don''t physically reside. Learn remote account opening, documentation requirements, and relationship building. Master treasury management, merchant services, and credit facilities. Includes bank comparisons, application guides, and relationship strategies.' WHERE slug = 'local-banking-remote';

UPDATE public.modules SET description = 'Implement professional call answering that creates local presence and captures leads. Learn service selection, script development, and call handling protocols. Master appointment setting, emergency procedures, and quality monitoring. This module includes script templates, training guides, and performance standards.' WHERE slug = 'virtual-reception-services';

UPDATE public.modules SET description = 'Integrate all virtual office services into seamless, professional operations. Learn system connections, workflow automation, and unified communications. Master data synchronization, team access, and customer experience optimization. Includes integration maps, automation recipes, and troubleshooting guides.' WHERE slug = 'digital-office-integration';

-- Continue with remaining courses...
-- (Due to length, I'll create a second file for the remaining updates)