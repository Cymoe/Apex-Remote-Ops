-- Add index on email for fast lookups of returning visitors
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);

-- Also add a compound index for email + status for efficient filtering
CREATE INDEX IF NOT EXISTS idx_applications_email_status ON applications(email, status);