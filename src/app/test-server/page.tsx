export default async function TestServerPage() {
  // Simple server component without any dependencies
  const data = { message: "Server component is working", timestamp: new Date().toISOString() };
  
  return (
    <div>
      <h1>Test Server Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}