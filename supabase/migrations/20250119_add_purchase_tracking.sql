-- Add purchase tracking fields to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS purchase_type text DEFAULT 'application',
ADD COLUMN IF NOT EXISTS purchase_amount numeric,
ADD COLUMN IF NOT EXISTS is_video_buyer boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS video_purchased_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS upgrade_eligible boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS original_purchase_id uuid;

-- Create index for purchase type queries
CREATE INDEX IF NOT EXISTS idx_applications_purchase_type ON applications(purchase_type);
CREATE INDEX IF NOT EXISTS idx_applications_is_video_buyer ON applications(is_video_buyer);

-- Create a purchases table for better tracking
CREATE TABLE IF NOT EXISTS purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  first_name text,
  last_name text,
  product_type text NOT NULL, -- 'video', 'program', 'upgrade'
  amount numeric NOT NULL,
  territory text,
  stripe_payment_id text,
  status text DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for purchases table
CREATE INDEX IF NOT EXISTS idx_purchases_user_email ON purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_purchases_product_type ON purchases(product_type);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);

-- Add RLS policies for purchases table
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Allow insert for anonymous users (for checkout)
CREATE POLICY "Anyone can create purchases" ON purchases
  FOR INSERT WITH CHECK (true);

-- Allow read for authenticated users  
CREATE POLICY "Authenticated users can view purchases" ON purchases
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Allow update for service role only
CREATE POLICY "Service role can update purchases" ON purchases
  FOR UPDATE USING (auth.jwt()->>'role' = 'service_role');

-- Function to check if email is a video buyer
CREATE OR REPLACE FUNCTION is_video_buyer(check_email text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM purchases 
    WHERE user_email = check_email 
    AND product_type = 'video' 
    AND status = 'completed'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get video purchase credit
CREATE OR REPLACE FUNCTION get_video_purchase_credit(check_email text)
RETURNS numeric AS $$
DECLARE
  credit numeric;
BEGIN
  SELECT amount INTO credit
  FROM purchases
  WHERE user_email = check_email
  AND product_type = 'video'
  AND status = 'completed'
  ORDER BY created_at DESC
  LIMIT 1;
  
  RETURN COALESCE(credit, 0);
END;
$$ LANGUAGE plpgsql;