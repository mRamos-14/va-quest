// Course 2 - AI Agents  ->  District: Agent Harbor
// The portal's lessons here are video-only (no written notes), so these levels are built from the
// lesson topics + the agent concepts taught in Course 1 + Hermes Agent's public docs.
VAQ.district({
  id: 'c2', n: 2, name: 'Agent Harbor', course: '2 - AI Agents',
  blurb: 'Set up your own AI agent from scratch: server, memory, MCP, skills, bots, security.',
  color: '#b388ff', boss: { name: 'The Rogue Agent', hp: 8, sprite: 'rogue' },
  stages: [
    { id: 'c2s1', name: 'Agent Fundamentals', enemy: 'ghost', general: true, lessons: ['What is an AI Agent?', 'AI Agent Fundamentals'], qs: [
      { t: 'mc', q: 'What makes an AI agent different from a chatbot?', a: 'It completes tasks with tools, not just answers', w: ['It types faster', 'It never uses an LLM', 'It only works offline'], x: 'A chat tool drafts the email; an agent with Gmail as a tool drafts AND sends it.' },
      { t: 'tf', q: 'An agent decides its own path at run time, so two runs can take different steps.', a: true, x: 'That is the source of both its flexibility and its unpredictability.' },
      { t: 'match', q: 'Rebuild the agent: match part to role.', p: [['LLM', 'The brain'], ['System prompt', 'The instructions'], ['Memory', 'What it remembers'], ['Tools', 'What it can do']], x: 'Brain + instructions + memory + tools.' },
      { t: 'mc', q: '"Agentic" means...', a: 'Able to decide its own next steps', w: ['Uses a phone tree', 'Has no memory', 'Runs only on a schedule'], x: 'From the AI Automation Terms lesson.' },
      { t: 'mc', q: 'An agent "never sleeps" - what is the small print?', a: 'It still needs compute, credentials and credits', w: ['It must reboot every hour', 'It can only work weekdays', 'There is no small print'], x: 'Every perk of the "remote employee" comes with small print.' },
      { t: 'tf', q: 'An agent can only act to the extent you have given it credentials and permissions.', a: true, x: 'Like a remote employee - no access, no action.' }
    ] },
    { id: 'c2s2', name: 'Server & Setup', enemy: 'robot', general: true, lessons: ['Set up your AI Agent Server', 'Access your AI Agent', 'Hermes Desktop'], qs: [
      { t: 'mc', q: 'Why run your agent on a server (e.g. a Hostinger VPS) instead of your laptop?', a: 'It stays online 24/7 even when your laptop is off', w: ['Servers make the LLM smarter', 'It is the only legal way', 'Laptops cannot run software'], x: 'An always-on agent needs an always-on machine.' },
      { t: 'mc', q: 'The course\'s agent, Hermes, is...', a: 'An open-source, self-hosted agent by Nous Research', w: ['A Zapier feature', 'A closed model by Google', 'A phone tree'], x: 'Self-hosted = you run it on your own server.' },
      { t: 'tf', q: 'Self-hosting means your agent\'s memory and files live on a machine you control.', a: true, x: "Hermes keeps its memory locally (in ~/.hermes/) on the machine it runs on." },
      { t: 'mc', q: 'You set up a server for an agent. What do you still need to plug in so it can think?', a: 'An LLM (model + API key or local model)', w: ['A Zapier task', 'A phone tree', 'Nothing'], x: 'The server hosts the agent; the LLM is its brain.' },
      { t: 'sort', q: 'Self-hosted vs vendor-hosted?', b: ['Self-hosted', 'Vendor-hosted'], i: [['Hermes on your VPS', 0], ['n8n on Render', 0], ['Zapier', 1], ['Make.com', 1]], x: 'Same open vs closed trade-off as Course 1.' }
    ] },
    { id: 'c2s3', name: 'Memory & Training', enemy: 'ghost', general: true, lessons: ['Memory', 'Train your Agent'], qs: [
      { t: 'match', q: 'Match the memory type.', p: [['Short-term memory', 'The current conversation'], ['Long-term memory', 'Facts kept across sessions']], x: 'Agents can have one or both.' },
      { t: 'mc', q: 'Agent memory helps because...', a: "It doesn't ask the same things twice and keeps your preferences", w: ['It makes tokens free', 'It removes the need for tools', 'It blocks hallucinations 100%'], x: '"Perfect memory - but only within the memory you give it."' },
      { t: 'mc', q: 'In Hermes, a "skill" is...', a: 'A saved, reusable procedure the agent can repeat', w: ['A paid plan', 'A webhook URL', 'A type of server'], x: 'Skills are procedural memory: how to do a job, written down once.' },
      { t: 'mc', q: 'Best way to "train" your agent for a client job:', a: 'Give clear instructions, examples and documents it can reference', w: ['Retrain the LLM from scratch', 'Raise temperature to max', 'Give it every password'], x: 'Instructions + examples + knowledge beat fine-tuning for most VA work.' },
      { t: 'tf', q: 'Training your own agent usually means fine-tuning the model weights.', a: false, x: 'For most agents it means instructions, memory, skills and documents - no retraining.' }
    ] },
    { id: 'c2s4', name: 'Tools, MCP & Bots', enemy: 'robot', general: true, lessons: ['Put your Agent to Work', 'Connect to MCP', 'Automate your Task', 'Bots'], qs: [
      { t: 'mc', q: 'MCP lets your agent...', a: 'Plug into tools and apps through one standard', w: ['Run without an LLM', 'Skip security', 'Make phone calls only'], x: 'MCP = "USB-C for AI".' },
      { t: 'mc', q: 'Your agent should send a report every Monday 8am. You need...', a: 'A scheduled task (cron)', w: ['A Merge node', 'More memory', 'A new LLM'], x: 'Agents can run on a schedule, not just when you chat.' },
      { t: 'mc', q: 'A "bot" in this course lets you...', a: 'Talk to your agent from apps like Telegram, Discord or Slack', w: ['Mine crypto', 'Replace the server', 'Skip prompts'], x: 'Hermes has a messaging gateway for Telegram, Discord, Slack and WhatsApp.' },
      { t: 'tf', q: 'Connecting more MCP tools is always better - load them all.', a: false, x: 'Too many tools = tool confusion. Only load the tools the job needs.' },
      { t: 'ord', q: 'Put an agent to work, in order:', s: ['Give it a goal', 'It plans', 'It uses tools', 'It reports back'], x: 'Think -> gather -> act -> report.' }
    ] },
    { id: 'c2s5', name: 'Security', enemy: 'bug', general: true, lessons: ['Security and Maintenance'], qs: [
      { t: 'sort', q: 'Safe or risky?', b: ['Safe', 'Risky'], i: [['Give the agent only the permissions it needs', 0], ['Share your bot token in a group chat', 1], ['Keep the server and agent updated', 0], ['Let anyone message your bot with full tool access', 1], ['Review logs of what it did', 0]], x: 'Least privilege, updates, and logs.' },
      { t: 'mc', q: 'Your agent can send emails. What should you add before it emails clients?', a: 'A human approval step', w: ['Higher temperature', 'More tools', 'Nothing'], x: 'Keep the human checkpoint until you trust the output.' },
      { t: 'tf', q: 'API keys belong in the agent\'s config/credentials, never pasted in chats or prompts.', a: true, x: 'Keys are secrets. Rotate them if exposed.' },
      { t: 'mc', q: 'Maintenance for a self-hosted agent includes...', a: 'Updates, backups and checking logs', w: ['Nothing - it maintains itself', 'Deleting memory daily', 'Turning off security'], x: 'Self-hosted = you are the IT department.' }
    ] }
  ]
});
