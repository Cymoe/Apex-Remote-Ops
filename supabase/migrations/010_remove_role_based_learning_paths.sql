-- Remove role-based learning paths, keeping only the 4 progressive entrepreneur paths
-- This simplifies the learning path structure to focus on revenue progression

DELETE FROM public.learning_paths 
WHERE slug IN ('sales-professional', 'operations-professional', 'marketing-professional');

-- Optional: Update the order_index for remaining paths to be sequential
UPDATE public.learning_paths SET order_index = 1 WHERE slug = 'first-10k-fast';
UPDATE public.learning_paths SET order_index = 2 WHERE slug = 'scale-to-100k';
UPDATE public.learning_paths SET order_index = 3 WHERE slug = 'building-machine';
UPDATE public.learning_paths SET order_index = 4 WHERE slug = 'multi-market';