-- Create the Blueprint Video course for video buyers
INSERT INTO courses (
  title,
  slug,
  description,
  tagline,
  thumbnail_url,
  created_at,
  updated_at,
  is_published,
  order_index
) VALUES (
  '20-Minute Blueprint',
  'blueprint-video',
  'The exact system our operators use to build location-independent contracting businesses. No fluff, no theory - just the proven blueprint that works.',
  'Your $30K/Month Remote Renovation Business',
  '/images/blueprint-thumbnail.jpg',
  now(),
  now(),
  true,
  999 -- Place at the end, we'll show it differently for video buyers
) ON CONFLICT (slug) DO NOTHING;

-- Get the course ID for the Blueprint course
DO $$
DECLARE
  blueprint_course_id uuid;
BEGIN
  SELECT id INTO blueprint_course_id FROM courses WHERE slug = 'blueprint-video';
  
  -- Only insert if course was created
  IF blueprint_course_id IS NOT NULL THEN
    -- Insert the main video module
    INSERT INTO modules (
      course_id,
      title,
      slug,
      description,
      tagline,
      video_url,
      thumbnail_url,
      order_index,
      created_at,
      updated_at
    ) VALUES (
      blueprint_course_id,
      'The 20-Minute Blueprint',
      'blueprint-main',
      'In this video, I reveal the exact system our operators use to build location-independent contracting businesses.',
      'The Complete System Revealed',
      'https://player.vimeo.com/video/YOUR_VIDEO_ID', -- Replace with actual video URL
      '/images/blueprint-video-thumbnail.jpg',
      1,
      now(),
      now()
    ) ON CONFLICT (course_id, slug) DO NOTHING;

    -- Insert resources module
    INSERT INTO modules (
      course_id,
      title,
      slug,
      description,
      tagline,
      video_url,
      thumbnail_url,
      order_index,
      created_at,
      updated_at
    ) VALUES (
      blueprint_course_id,
      'Resources & Templates',
      'blueprint-resources',
      'Download your complete resource pack including crew hiring scripts, pricing calculator, territory analysis, and 30-day launch plan.',
      'Everything You Need to Get Started',
      null, -- No video for this module
      '/images/resources-thumbnail.jpg',
      2,
      now(),
      now()
    ) ON CONFLICT (course_id, slug) DO NOTHING;

    -- Insert WhatsApp community module
    INSERT INTO modules (
      course_id,
      title,
      slug,
      description,
      tagline,
      video_url,
      thumbnail_url,
      order_index,
      created_at,
      updated_at
    ) VALUES (
      blueprint_course_id,
      'Join the Community',
      'blueprint-community',
      'Connect with other operators who are building with systems. Discuss AI, automation, hiring, and scaling strategies.',
      'Skip Years of Trial and Error',
      null, -- No video for this module
      '/images/community-thumbnail.jpg',
      3,
      now(),
      now()
    ) ON CONFLICT (course_id, slug) DO NOTHING;

    -- Insert upgrade module
    INSERT INTO modules (
      course_id,
      title,
      slug,
      description,
      tagline,
      video_url,
      thumbnail_url,
      order_index,
      created_at,
      updated_at
    ) VALUES (
      blueprint_course_id,
      'Upgrade to Full Implementation',
      'blueprint-upgrade',
      'Want us to implement everything FOR you? Get protected territory rights, done-for-you setup, personal coaching, and more.',
      'Your $497 Credits Toward the Full Program',
      null, -- No video for this module
      '/images/upgrade-thumbnail.jpg',
      4,
      now(),
      now()
    ) ON CONFLICT (course_id, slug) DO NOTHING;
  END IF;
END $$;

-- Add function to check if user is a video buyer
CREATE OR REPLACE FUNCTION get_user_purchase_type(user_email text)
RETURNS text AS $$
DECLARE
  purchase_type text;
BEGIN
  -- Check for full program purchase first
  SELECT 'full_program' INTO purchase_type
  FROM purchases
  WHERE purchases.user_email = get_user_purchase_type.user_email
  AND purchases.product_type = 'program'
  AND purchases.status = 'completed'
  LIMIT 1;
  
  IF purchase_type IS NOT NULL THEN
    RETURN purchase_type;
  END IF;
  
  -- Check for video purchase
  SELECT 'video_only' INTO purchase_type
  FROM purchases
  WHERE purchases.user_email = get_user_purchase_type.user_email
  AND purchases.product_type = 'video'
  AND purchases.status = 'completed'
  LIMIT 1;
  
  IF purchase_type IS NOT NULL THEN
    RETURN purchase_type;
  END IF;
  
  -- No purchase found
  RETURN 'none';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_modules_course_slug ON modules(course_id, slug);