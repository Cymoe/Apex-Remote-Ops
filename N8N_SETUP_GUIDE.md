# N8N Multi-Agent Sales System Setup Guide

## Overview
This guide sets up a sophisticated 6-agent sales system in n8n that replaces the basic Python chatbot with Fortune 500-level intelligence.

## System Architecture

### 🏗️ Workflow Structure
```
Webhook → Context Analyzer → Agent Router → 6 Specialized Agents → Response Synthesizer → Database Update → API Response
```

### 🤖 The 6 Specialized Agents

1. **🛡️ Gatekeeper Agent** - Filters trolls and low-quality prospects
2. **🎯 Positioning Agent** - Establishes premium positioning and collects names
3. **🧠 Intelligence Agent** - Sophisticated qualification data gathering
4. **📊 Qualification Agent** - Prospect scoring and motivation analysis
5. **⚡ Objection Handler** - Intelligent objection detection and reframing
6. **🏆 Closing Agent** - Next steps and program enrollment

## Setup Instructions

### 1. N8N Installation
```bash
# Install n8n globally
npm install -g n8n

# Or run with Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
```

### 2. Environment Variables
Add these to your n8n environment:
```
OPENAI_API_KEY=your_openai_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Import Workflow
1. Open n8n at `http://localhost:5678`
2. Click "Import from File"
3. Select `n8n-multi-agent-workflow.json`
4. Configure credentials (OpenAI, Supabase)

### 4. Configure OpenAI Credentials
- Go to Settings → Credentials
- Add OpenAI API Key
- Test connection

### 5. Configure Supabase Integration
- Add Supabase URL and anon key
- Test database connection
- Ensure conversations table exists

### 6. Activate Webhook
- Click on "Chat Message Webhook" node
- Note the webhook URL (e.g., `http://localhost:5678/webhook/apex-chat`)
- Set this as your AGENT_SERVICE_URL in Next.js

## Integration with Next.js

### Update .env.local
```
AGENT_SERVICE_URL=http://localhost:5678/webhook/apex-chat
```

### Update API Route
The existing `/src/app/api/sales-agent/route.ts` will work with the webhook - just ensure the request format matches:

```typescript
// The webhook expects:
{
  "message": "user message",
  "history": "conversation history",
  "prospect": { existing prospect data }
}
```

## Agent Capabilities

### 🛡️ Gatekeeper Agent
- **Purpose**: Quality filtering and troll detection
- **Triggers**: First message, suspicious content
- **Actions**: Continue/exit decision
- **Intelligence**: Fake name detection, quality assessment

### 🎯 Positioning Agent
- **Purpose**: Premium positioning and name collection
- **Triggers**: New prospects, name collection needed
- **Actions**: Establishes exclusivity, collects real names
- **Intelligence**: Authority-based conversation, fake name challenges

### 🧠 Intelligence Agent
- **Purpose**: Sophisticated qualification data gathering
- **Triggers**: After name collection, information gaps
- **Actions**: Collects email, role, company, revenue, team size
- **Intelligence**: Professional validation, credibility assessment

### 📊 Qualification Agent
- **Purpose**: Prospect scoring and motivation analysis
- **Triggers**: After basic info collection
- **Actions**: Determines fit, urgency, and qualification score
- **Intelligence**: Executive-level assessment, investment readiness

### ⚡ Objection Handler
- **Purpose**: Intelligent objection detection and reframing
- **Triggers**: Resistance, concerns, hesitation
- **Actions**: Professional objection handling, reframing
- **Intelligence**: Sales psychology, trust building

### 🏆 Closing Agent
- **Purpose**: Next steps and program enrollment
- **Triggers**: Qualified prospects, conversation completion
- **Actions**: Strategy session booking, program invitations
- **Intelligence**: High-ticket closing psychology

## Performance Expectations

### ⚡ Speed Improvements
- **Current Python**: 5-6 seconds
- **N8N Multi-Agent**: 2-4 seconds
- **Pipedream**: 21+ seconds (eliminated)

### 🧠 Intelligence Improvements
- **Quality Filtering**: No more "Yio" or "sup playa"
- **Sophisticated Responses**: Fortune 500 executive-level
- **Objection Handling**: Real-time intelligent responses
- **Conversation Flow**: Natural, consultative approach

### 📊 Conversation Quality
- **Premium Positioning**: Exclusive, invitation-only framing
- **Executive Language**: Professional, authoritative tone
- **Intelligent Routing**: Right agent for each conversation stage
- **Context Awareness**: Maintains conversation state

## Testing

### 1. Webhook Testing
```bash
curl -X POST http://localhost:5678/webhook/apex-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "history": "", "prospect": {}}'
```

### 2. Agent Flow Testing
Test each agent individually:
- Gatekeeper: Send troll messages
- Positioning: Test name collection
- Intelligence: Qualification questions
- Objection: Send objections
- Closing: Qualified prospect flow

### 3. Integration Testing
- Test via Next.js chat interface
- Verify database updates
- Check response times
- Validate conversation quality

## Monitoring

### N8N Execution Logs
- Monitor workflow executions
- Check for errors or failures
- Review response times

### Database Tracking
- Track conversation progression
- Monitor qualification scores
- Analyze agent performance

## Troubleshooting

### Common Issues
1. **OpenAI API Errors**: Check API key and quota
2. **Webhook Timeout**: Increase execution timeout
3. **Database Connection**: Verify Supabase credentials
4. **Agent Routing**: Check switch node conditions

### Performance Optimization
- Adjust OpenAI temperature settings
- Optimize prompt lengths
- Monitor token usage
- Cache frequent responses

## Next Steps

1. ✅ Import and configure workflow
2. ✅ Test individual agents
3. ✅ Integrate with Next.js app
4. ✅ Deploy to production
5. ✅ Monitor and optimize performance

This system transforms your basic chatbot into a sophisticated, multi-agent sales professional capable of handling Fortune 500 executive conversations with intelligence and authority.