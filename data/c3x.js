// Course 3 expansion: every remaining note + bonus stages on prompting Claude, Claude Code and the API.
VAQ.extend('c3s1', {
  learn: [
    'Plans: Free (limited usage, extended thinking, up to 5 Projects), Pro (~$20/mo or $17/mo yearly: Opus, unlimited Projects, Claude Code, Research), Max ($100-$200, 5x-20x Pro), Team/Enterprise (per-user billing, admin controls, SSO). Prices change - check claude.com/pricing.',
    'Models: Opus = most capable, slower and pricier. Sonnet = balanced default. Haiku = fastest and cheapest.',
    'Switch models with the selector at the top of the chat.',
    'Left sidebar: chat history, Projects, Artifacts library. Right panel: Artifacts previews.',
    'Settings: themes, response length, Custom Instructions (apply to all chats), Memory (pin, edit, clear).'
  ],
  qs: [
    { t: 'match', q: 'Match the Claude plan.', p: [['Free', 'Limited daily messages, up to 5 Projects'], ['Pro', '~$20/month, Opus access, unlimited Projects'], ['Max', '$100-$200/month, 5x-20x Pro limits'], ['Team/Enterprise', 'Per-user billing, admin controls, SSO']], x: 'Pro is the best fit for most individuals.' },
    { t: 'mc', q: 'Where do you switch between Opus, Sonnet and Haiku?', a: 'The model selector at the top of the chat', w: ['Only in the API', 'By emailing support', 'In Projects only'], x: 'Switch per chat depending on the job.' },
    { t: 'match', q: 'Where is it in the Claude.ai interface?', p: [['Left sidebar', 'Chat history, Projects, Artifacts library'], ['Main window', 'Where you type prompts'], ['Right panel', 'Artifact previews']], x: 'Settings sit behind the gear icon.' },
    { t: 'mc', q: 'Trade-off of using Opus for everything?', a: 'More tokens/cost and slower responses', w: ['Worse quality', 'No file uploads', 'No Projects'], x: 'Right-size the model, like Course 1 taught.' },
    { t: 'mc', q: 'Tip from the lesson for your very first chat:', a: 'Ask Claude to introduce itself and explore features together', w: ['Paste your passwords', 'Upload 100 files', 'Only use Opus'], x: 'Start simple.' },
    { t: 'tf', q: 'All Claude models support large context windows (200K up to 1M depending on plan and model).', a: true, x: 'Per the lesson notes.' }
  ]
});

VAQ.extend('c3s2', {
  learn: [
    'Text and reasoning: emails, essays, code, copy, brainstorming. "Think step by step" helps hard problems.',
    'Analysis: upload reports and ask for takeaways or executive summaries.',
    'Translation in dozens of languages with context and nuance.',
    'Vision: screenshots, charts, diagrams, photos, PDFs - describe, extract data, analyse designs.',
    'Web search with cited sources; file uploads (PDF, Word, Excel/CSV, code, images); structured output (JSON, tables, markdown).'
  ],
  qs: [
    { t: 'sort', q: 'Which file types can you drop into Claude.ai?', b: ['Supported', 'Not in the list'], i: [['PDF', 0], ['Word doc', 0], ['Excel / CSV', 0], ['Code files', 0], ['Images', 0], ['A physical USB stick', 1]], x: 'Limits vary by plan.' },
    { t: 'mc', q: 'A client sends a screenshot of a messy chart. Claude can...', a: 'Read it and extract the numbers', w: ['Only describe the colours', 'Nothing - images aren\'t supported', 'Only translate it'], x: 'Vision handles charts, diagrams, photos and PDFs.' },
    { t: 'mc', q: 'You need today\'s news in an answer. Turn on...', a: 'Web search', w: ['Artifacts', 'Custom Instructions', 'Haiku'], x: 'Claude cites sources when it searches.' },
    { t: 'mc', q: 'Turn a 40-page report into what a busy CEO reads:', a: 'Upload it and ask for an executive summary with key takeaways', w: ['Retype it', 'Ask for a poem', 'Translate it to Latin'], x: 'Analysis & summarisation.' },
    { t: 'tf', q: 'Claude can translate with contextual nuance, not just word-for-word.', a: true, x: 'Dozens of languages.' }
  ]
});

VAQ.extend('c3s3', {
  learn: [
    'Artifacts: websites/apps (HTML/CSS/JS), React components, dashboards, documents, diagrams (Mermaid, SVG), slide decks, prototypes.',
    'Iterate in chat ("Improve the UI", "Add dark mode"). Version history and forking keep old versions.',
    'Share public or private links. Some Artifacts can connect to data and refresh.',
    'Projects: New Project in the sidebar > name, description, custom instructions > upload knowledge files.',
    'Projects keep context across sessions, with their own chat history and search; Team plans can share them.'
  ],
  qs: [
    { t: 'sort', q: 'Can you build it as an Artifact?', b: ['Yes', 'No'], i: [['Task management dashboard in React', 0], ['Mermaid flowchart of a workflow', 0], ['Simple slide deck', 0], ['Landing page in HTML/CSS/JS', 0], ['A physical printed poster', 1]], x: 'Artifacts turn Claude into a creative workspace.' },
    { t: 'mc', q: 'You want to try a risky redesign but keep the current Artifact. Use...', a: 'Version history / forking', w: ['Delete and restart', 'Screenshots only', 'A new account'], x: 'Iterate safely.' },
    { t: 'ord', q: 'Create a client Project:', s: ['Click New Project in the sidebar', 'Name it and add a description', 'Add custom instructions', 'Upload knowledge files', 'Start chatting inside it'], x: 'Claude now always references those files there.' },
    { t: 'mc', q: 'Great use of an Artifact for a VA:', a: 'A quick process-map diagram or client dashboard prototype', w: ['Storing client passwords', 'Sending emails', 'Running a Zap'], x: 'Rapid prototyping without leaving the browser.' },
    { t: 'tf', q: 'Artifacts can be shared with a link.', a: true, x: 'Public or private.' }
  ]
});

VAQ.extend('c3s4', {
  learn: [
    'Connectors: Slack (bot in channels), Google Workspace (Gmail, Docs, Drive, Calendar), Microsoft (Teams, Outlook, 365), and 50+ more in the directory (Notion, Linear...).',
    'Connectors and MCP servers let Claude read and write data in your tools - review what access you grant.',
    'Skills: packaged instructions (and scripts) Claude loads when a task needs them.',
    'Browser extension and desktop app extend what Claude can reach.',
    'API: build your own apps with the Messages API; keys come from the Anthropic Console.'
  ],
  qs: [
    { t: 'match', q: 'Match the connector to what it helps with.', p: [['Google Workspace', 'Meeting prep, email drafts, doc analysis'], ['Slack', 'In-channel help and summaries'], ['Notion / Linear', 'Read and write notes, tasks, tickets']], x: 'Find them in the connectors directory.' },
    { t: 'mc', q: 'A Claude "Skill" is...', a: 'A package of instructions (and optional scripts) Claude loads for a type of task', w: ['A paid model', 'A type of Artifact', 'A Zapier step'], x: 'e.g. a frontend design skill for better-looking websites.' },
    { t: 'mc', q: 'Where do developers get an API key?', a: 'The Anthropic Console', w: ['claude.ai chat', 'Custom Instructions', 'A Project file'], x: 'Then call the Messages API.' }
  ]
});

VAQ.addStage('c3', 'c3s2', { id: 'c3s5', name: 'Prompting Claude Like a Pro', enemy: 'ghost', bonus: true, lessons: ['Bonus: prompt techniques that work especially well with Claude'],
  learn: [
    'Be clear and direct: say exactly what you want, who it is for, and what done looks like.',
    'Use XML tags to separate parts: <document>...</document>, <instructions>...</instructions>, <example>...</example>.',
    'Give examples (multishot): 2-3 good outputs teach format and tone fast.',
    'Let Claude think: ask it to reason first for hard tasks.',
    'Long documents go at the TOP, with your question at the end.',
    'Ask Claude to quote the relevant parts of a document before answering - fewer made-up answers.'
  ],
  qs: [
    { t: 'mc', q: 'Why wrap a pasted contract in <contract>...</contract>?', a: 'So Claude clearly separates the document from your instructions', w: ['It encrypts the text', 'It is required to upload', 'It makes Claude faster'], x: 'XML tags are a Claude favourite for structure.' },
    { t: 'mc', q: 'Where should a long document go in your prompt?', a: 'At the top, with the question at the end', w: ['At the very end after the question', 'Split randomly', 'In the system prompt only'], x: 'Long context first, query last tends to work better.' },
    { t: 'mc', q: 'To reduce made-up answers from a long report, ask Claude to...', a: 'First quote the relevant passages, then answer', w: ['Answer from memory', 'Be more creative', 'Skip the report'], x: 'Grounding in quotes keeps it honest.' },
    { t: 'sort', q: 'Helps or hurts a Claude prompt?', b: ['Helps', 'Hurts'], i: [['2-3 examples of the output', 0], ['XML tags around data', 0], ['"Make it good" with no details', 1], ['Stating the audience and goal', 0], ['Mixing instructions inside the pasted data', 1]], x: 'Clarity beats cleverness.' },
    { t: 'mc', q: 'Giving Claude a role ("You are a senior HR consultant") mainly...', a: 'Shapes expertise, vocabulary and tone', w: ['Unlocks hidden models', 'Lowers price', 'Turns on web search'], x: 'Role prompting is strongest in the system prompt.' },
    { t: 'ord', q: 'A clean Claude prompt layout:', s: ['Role and context', '<document> with the data', '<instructions> for the task', '<example> of a good output', 'Output format request'], x: 'Structure = predictable results.' }
  ]
});

VAQ.addStage('c3', 'c3s4', { id: 'c3s6', name: 'Claude Code Basics', enemy: 'robot', bonus: true, lessons: ['Bonus: Claude Code for VAs and builders'],
  learn: [
    'Claude Code is an agent that works in your project folder: it reads files, edits code, runs commands. It runs in the terminal, IDEs, the desktop app and the web.',
    'CLAUDE.md = project instructions it reads every session. /init creates one for you.',
    'It asks permission before editing files or running commands (you can allow trusted actions).',
    'Plan mode: it plans first and changes nothing until you approve. Toggle with Shift+Tab.',
    'Useful commands: /clear (fresh start), /compact (summarise long chats). Esc interrupts.',
    'Extend it with MCP servers, Skills, subagents and hooks.'
  ],
  qs: [
    { t: 'mc', q: 'What is CLAUDE.md?', a: 'A file of project instructions Claude Code reads every session', w: ['A Claude subscription', 'A log of errors', 'A website template'], x: 'Put your build commands, style rules and gotchas there.' },
    { t: 'mc', q: 'Which command creates a starter CLAUDE.md for your project?', a: '/init', w: ['/start', '/help', '/compact'], x: 'Then edit it with your own rules.' },
    { t: 'mc', q: 'You want Claude Code to think through a big change before touching files. Use...', a: 'Plan mode', w: ['Turn off permissions', '/clear', 'A higher temperature'], x: 'It proposes a plan; nothing changes until you approve.' },
    { t: 'match', q: 'Match the Claude Code command or key.', p: [['/clear', 'Start a fresh conversation'], ['/compact', 'Summarise a long conversation to save context'], ['Esc', 'Interrupt what it is doing'], ['Shift+Tab', 'Switch modes (e.g. plan mode)']], x: 'Small commands, big control.' },
    { t: 'tf', q: 'Claude Code asks before running commands or editing files unless you allow those actions.', a: true, x: 'Permissions keep you in control.' },
    { t: 'sort', q: 'Ways to extend Claude Code?', b: ['Extension', 'Not one'], i: [['MCP servers (e.g. n8n, databases)', 0], ['Skills', 0], ['Subagents', 0], ['Hooks (run commands at set events)', 0], ['Changing your monitor brightness', 1]], x: 'MCP is how it talks to your n8n workflows.' },
    { t: 'mc', q: 'Great VA use of Claude Code + n8n:', a: 'Describe a workflow in plain English and let it build or fix the n8n JSON', w: ['Replacing the n8n server', 'Writing Upwork reviews', 'Editing videos'], x: 'From the "Setting up Claude Code for n8n" lesson.' }
  ]
});

VAQ.addStage('c3', 'c3s6', { id: 'c3s7', name: 'Claude API & Automations', enemy: 'bug', bonus: true, lessons: ['Bonus: using Claude inside Zapier, Make and n8n'],
  learn: [
    'Every automation platform has a Claude/Anthropic step: n8n (Anthropic Chat Model), Make (Anthropic Claude app), Zapier (Anthropic integration). They all use your API key.',
    'The Messages API needs: model, max_tokens, messages. The system prompt is a separate "system" field.',
    'Messages alternate user / assistant.',
    'Tool use: give tools (name, description, input_schema). Claude replies with a tool call (stop reason "tool_use"); you run it and send back the result.',
    'Save money: right-size the model, prompt caching for repeated long prompts, the Batch API for big non-urgent jobs (about half price).'
  ],
  qs: [
    { t: 'sort', q: 'Required in a basic Messages API call?', b: ['Required', 'Optional'], i: [['model', 0], ['max_tokens', 0], ['messages', 0], ['system', 1], ['temperature', 1]], x: 'System and temperature are optional.' },
    { t: 'mc', q: 'Where does the system prompt go in the Claude API?', a: 'The top-level "system" field', w: ['A message with role "system"', 'The URL', 'The API key'], x: 'Messages use roles user and assistant.' },
    { t: 'mc', q: 'Claude\'s response has stop reason "tool_use". What next?', a: 'Run the requested tool and send the result back', w: ['Show it to the user as final', 'Delete the request', 'Retry with Haiku'], x: 'The tool-calling loop.' },
    { t: 'mc', q: '50,000 product descriptions to classify by tomorrow, cheapest way?', a: 'Haiku via the Batch API', w: ['Opus one by one in chat', 'Copy-paste into Claude.ai', 'Hire 50 people'], x: 'Batch = async and about half price; Haiku = cheap and fast.' },
    { t: 'mc', q: 'Prompt caching helps when...', a: 'You send the same long instructions or documents again and again', w: ['Every prompt is different and tiny', 'You use images only', 'Never'], x: 'Cached input is cheaper and faster.' },
    { t: 'ord', q: 'Add Claude to an n8n workflow:', s: ['Get an API key from the Anthropic Console', 'Add an Anthropic credential in n8n', 'Add the Anthropic chat model / LLM node', 'Write the prompt with mapped fields', 'Test with a real input'], x: 'Same pattern in Make and Zapier.' },
    { t: 'mc', q: 'Classifying support emails in an automation - which model is usually enough?', a: 'Haiku', w: ['Opus every time', 'No model needed', 'The biggest one possible'], x: 'Simple, high-volume classification = Haiku. Hard reasoning = Opus.' },
    { t: 'mc', q: 'Your Claude step must return data the next node can use. Ask for...', a: 'JSON with exact field names', w: ['A friendly paragraph', 'Markdown art', 'A long story'], x: 'Structured output for structured workflows.' }
  ]
});
