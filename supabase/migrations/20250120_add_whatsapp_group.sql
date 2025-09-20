-- Add WhatsApp group tracking to purchases table
ALTER TABLE purchases 
ADD COLUMN IF NOT EXISTS whatsapp_group_joined boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS whatsapp_joined_at timestamp with time zone;

-- Create index for tracking WhatsApp joins
CREATE INDEX IF NOT EXISTS idx_purchases_whatsapp_joined ON purchases(whatsapp_group_joined);