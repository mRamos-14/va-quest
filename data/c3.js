// Course 3 - Claude AI  ->  District: Claude Lighthouse
VAQ.district({
  id: 'c3', n: 3, name: 'Claude Lighthouse', course: '3 - Claude AI',
  blurb: 'Claude.ai models, Artifacts, Projects, connectors and Claude Code.',
  color: '#ff8a5b', boss: { name: 'The Context Kraken', hp: 8, sprite: 'kraken' },
  stages: [
    { id: 'c3s1', name: 'Plans & Models', enemy: 'ghost', lessons: ['Introduction - Navigation - Models'], qs: [
      { t: 'match', q: 'Match each Claude model to its best use.', p: [['Opus', 'Complex reasoning, deep analysis, hard coding'], ['Sonnet', 'Balanced everyday default'], ['Haiku', 'Fastest and cheapest, high volume']], x: 'Pick by job: Opus for the hardest work, Haiku for simple bulk tasks.' },
      { t: 'mc', q: 'Client needs 10,000 short product descriptions summarised cheaply. Which model?', a: 'Haiku', w: ['Opus', 'The biggest model available', 'None - do it by hand'], x: 'Haiku = fastest and cheapest for simple, high-volume work.' },
      { t: 'mc', q: 'Do you need a credit card for the Claude.ai free tier?', a: 'No', w: ['Yes', 'Only on weekends', 'Only for Haiku'], x: 'Sign up with email or Google/Apple; no card for free.' },
      { t: 'sort', q: 'Free or Pro?', b: ['Free', 'Pro and up'], i: [['Limited daily messages', 0], ['Up to 5 Projects', 0], ['Access to Opus', 1], ['Extended thinking', 1], ['Unlimited Projects', 1]], x: 'Pro is about $20/month (or $17/month billed yearly).' },
      { t: 'mc', q: 'Where do you set "Always respond in a professional tone with bullet points" for ALL chats?', a: 'Custom Instructions in Settings', w: ['In every single prompt', 'In the Artifacts panel', 'You cannot'], x: 'Custom Instructions apply across chats unless overridden.' },
      { t: 'tf', q: 'You can edit or clear what Claude remembers about you.', a: true, x: 'Memory can be pinned, edited or cleared for privacy.' }
    ] },
    { id: 'c3s2', name: 'Core Powers', enemy: 'bug', lessons: ['Core Capabilities'], qs: [
      { t: 'mc', q: 'Adding "Think step by step" to a hard problem is called...', a: 'Chain-of-thought prompting', w: ['Few-shot', 'Fine-tuning', 'RAG'], x: 'It helps on complex reasoning.' },
      { t: 'sort', q: 'Can Claude.ai do it?', b: ['Yes', 'Not a Claude.ai feature'], i: [['Read a chart from a screenshot', 0], ['Search the web and cite sources', 0], ['Analyse an uploaded PDF or CSV', 0], ['Return JSON or tables', 0], ['Physically print your files', 1]], x: 'Vision, web search, file analysis and structured outputs are all built in.' },
      { t: 'mc', q: 'You need output another app will parse. Ask Claude for...', a: 'JSON (structured output)', w: ['A poem', 'An Artifact game', 'A long essay'], x: 'Structured outputs make integration easy.' },
      { t: 'mc', q: 'Best-practice prompt from the lesson:', a: '"Act as a senior marketing strategist. Write 3 ad hooks under 12 words for..."', w: ['"Write something good"', '"Ads?"', '"Do marketing"'], x: 'Be specific: role, examples, constraints.' }
    ] },
    { id: 'c3s3', name: 'Artifacts & Projects', enemy: 'slime', lessons: ['Artifacts', 'Projects', 'Sample Project'], qs: [
      { t: 'mc', q: 'An Artifact is...', a: 'A live, interactive preview Claude builds in a side panel', w: ['A file you must download to see', 'A paid add-on model', 'A Zapier trigger'], x: 'Websites, dashboards, React apps, docs, diagrams and more.' },
      { t: 'mc', q: 'The Artifact works but looks plain. Fastest move?', a: 'Say "Improve the UI" or "Add dark mode"', w: ['Start a new account', 'Copy it into Word', 'Switch to Haiku'], x: 'Iterate in the conversation - Artifacts have version history too.' },
      { t: 'mc', q: 'Projects solve which problem?', a: 'Context loss between regular chats', w: ['High token prices', 'Slow typing', 'Image generation'], x: 'Persistent workspace with knowledge files and instructions.' },
      { t: 'sort', q: 'Project or one-off chat?', b: ['Project', 'One-off chat'], i: [['Ongoing client with brand guidelines', 0], ['Monthly content calendar', 0], ['Quick translation of one sentence', 1], ['Personal knowledge base', 0], ['"What is 15% of 80?"', 1]], x: 'Ongoing work with shared files = Project.' },
      { t: 'tf', q: 'Files uploaded to a Project are referenced by Claude in every chat inside that Project.', a: true, x: 'That is what makes it a specialised assistant for that domain.' }
    ] },
    { id: 'c3s4', name: 'Connectors & Claude Code', enemy: 'robot', lessons: ['Skills / Plugins / Connectors', 'Setting up Claude Code for n8n', 'How to Create a Portfolio Website in Claude Code (Na HINDI GENERIC)'], qs: [
      { t: 'mc', q: 'Connectors / MCPs let Claude...', a: 'Read and write data in tools like Notion, Gmail or Linear', w: ['Run without internet', 'Train a new model', 'Skip permissions'], x: 'The directory lists 50+ integrations.' },
      { t: 'mc', q: 'Developers build custom apps with Claude using...', a: 'The Messages API (keys from the Anthropic Console)', w: ['Custom Instructions', 'Artifacts only', 'A Zapier filter'], x: 'Console -> API key -> Messages API.' },
      { t: 'tf', q: 'Connected integrations respect permissions, but you should still review what data they can access.', a: true, x: 'Security note from the lesson.' },
      { t: 'mc', q: 'Claude Code + n8n: why combine them?', a: 'Claude Code can build and edit automations for you from plain English', w: ['n8n stops needing triggers', 'It makes n8n free', 'It replaces the n8n server'], x: 'n8n can also expose workflows to Claude through MCP.' },
      { t: 'mc', q: 'Building a portfolio site with Claude Code - how do you avoid a generic look?', a: 'Use strong master prompts, design skills and real inspiration sites', w: ['Accept the first draft', 'Use only default colours', 'Skip prompts entirely'], x: 'The lesson ships master prompts plus Frontend and Taste skills.' }
    ] }
  ]
});
