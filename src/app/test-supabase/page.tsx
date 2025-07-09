export default async function TestSupabasePage() {
  try {
    // First check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!hasUrl || !hasKey) {
      return (
        <div>
          <h1>Environment Variables Missing</h1>
          <p>URL: {hasUrl ? 'Set' : 'Missing'}</p>
          <p>Key: {hasKey ? 'Set' : 'Missing'}</p>
        </div>
      );
    }
    
    // Try to import createClient
    const { createClient } = await import('@/lib/supabase/server');
    
    // Try to create client
    const supabase = createClient();
    
    // Try to get user
    const { data: { user }, error } = await supabase.auth.getUser();
    
    return (
      <div>
        <h1>Supabase Test</h1>
        <p>Environment: OK</p>
        <p>Client: Created</p>
        <p>Auth: {error ? `Error - ${error.message}` : user ? 'Authenticated' : 'Not authenticated'}</p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Error in Supabase Test</h1>
        <pre>{error instanceof Error ? error.stack : String(error)}</pre>
      </div>
    );
  }
}