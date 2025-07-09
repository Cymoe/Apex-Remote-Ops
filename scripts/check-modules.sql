-- Check your existing modules to get their IDs
SELECT 
  m.id as module_id,
  m.title as module_title,
  m.slug as module_slug,
  c.title as course_title,
  m.order_index
FROM modules m
JOIN courses c ON m.course_id = c.id
ORDER BY c.id, m.order_index;