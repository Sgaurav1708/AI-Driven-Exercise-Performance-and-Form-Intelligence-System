export default async (request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const apiKey = Netlify.env.get('OPENAI_API_KEY');
  if (!apiKey) return Response.json({ error: 'Atlas AI is not configured yet.' }, { status: 503 });
  try {
    const body = await request.json();
    const question = String(body.question || '').slice(0, 500);
    const context = body.context || {};
    const prompt = `You are Atlas, a concise AI fitness coach inside a student computer-vision exercise project.
Use the supplied pose-analysis metrics as observations, not medical facts. Never diagnose injuries or medical conditions.
Give practical, encouraging exercise guidance in 2-4 short sentences. If the pose data is insufficient, say what camera/body information is needed.
Exercise: ${context.exercise || 'unknown'}
Reps/hold: ${context.metric || 'unknown'}
Phase: ${context.phase || 'unknown'}
Tracking confidence: ${context.confidence || 'unknown'}
Current rule-based feedback: ${context.feedback || 'none'}
User question: ${question || 'Give me a short coaching summary.'}`;
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-5.6-luna', input: prompt, max_output_tokens: 180 })
    });
    const data = await response.json();
    if (!response.ok) return Response.json({ error: data?.error?.message || 'AI coach request failed.' }, { status: 502 });
    const text = (data.output || []).flatMap(x => x.content || []).find(x => x.type === 'output_text')?.text;
    return Response.json({ text: text || 'Atlas could not generate feedback this time.' });
  } catch {
    return Response.json({ error: 'Atlas AI could not process the request.' }, { status: 500 });
  }
};