export default async function handler(req, res) {
  // Read backend URLs from Vercel environment variables
  const backendUrl = process.env.VITE_API_URL;
  const pythonUrl = process.env.VITE_PYTHON_API_URL;

  const results = [];

  // Ping Node.js Backend
  if (backendUrl) {
    try {
      const resp1 = await fetch(`${backendUrl}/`);
      results.push({ name: 'Node Backend', status: resp1.status });
    } catch (err) {
      results.push({ name: 'Node Backend', error: err.message });
    }
  }

  // Ping Python Backend (if exists)
  if (pythonUrl) {
    try {
      // Just ping the root or /docs to wake it up
      const resp2 = await fetch(`${pythonUrl}/docs`);
      results.push({ name: 'Python Backend', status: resp2.status });
    } catch (err) {
      results.push({ name: 'Python Backend', error: err.message });
    }
  }

  // Vercel Serverless Function response
  return res.status(200).json({ 
    success: true, 
    message: "Keep-alive ping executed", 
    timestamp: new Date().toISOString(), 
    results 
  });
}
