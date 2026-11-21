// Course 1 expansion: every remaining bullet from the portal's written notes, quick-lesson cards,
// and bonus stages (marked bonus: true) that go beyond the course.

// ---------- AI Basics ----------
VAQ.extend('c1s1', {
  learn: [
    'AI = software doing "smart" tasks. Machine learning = it learns patterns from examples instead of hard-coded rules.',
    'An LLM is a very advanced autocomplete trained on huge amounts of text. It predicts, it does not "know".',
    'Inference = the moment it answers. Training = teaching it. Temperature = creativity dial (low = consistent).',
    'RAG = give AI your documents first (open-book exam). Embeddings turn text into numbers that capture meaning; a vector database stores them.',
    'Fine-tuning = retraining a model on your data to change its behaviour or style.',
    'Agent = completes tasks. Agentic = decides its own next steps. Multi-agent = a team. Orchestration = coordinating them.',
    'AI is leverage, not replacement: a 10-hour process becomes ~1 hour of finishing the last 10%.'
  ],
  qs: [
    { t: 'match', q: 'Match the foundation term.', p: [['Machine learning', 'Learns patterns from examples, not hard-coded rules'], ['LLM', 'A very advanced autocomplete trained on text'], ['Fine-tuning', 'Retraining a model on your own data'], ['Embeddings', 'Text turned into numbers that represent meaning']], x: 'Part 1 and Part 3 of the AI Automation Terms lesson.' },
    { t: 'mc', q: 'Where are embeddings stored and searched?', a: 'A vector database', w: ['A spreadsheet tab', 'The context window', 'Zap History'], x: 'Embeddings = meaning-numbers. Vector DB = where you search them by meaning.' },
    { t: 'match', q: 'Match the agent-era word.', p: [['Multi-agent', 'Several specialised agents working together'], ['Orchestration', 'Coordinating agents and steps so they run correctly'], ['MCP', 'Universal standard to plug AI into tools']], x: 'Part 4: The Agent Era.' },
    { t: 'match', q: 'Match the tool to its vibe from the lesson.', p: [['Zapier', 'Simplest, beginner-friendly'], ['Make', 'Visual and flexible'], ['n8n', 'Powerful, self-hostable, popular for AI agents']], x: 'No-code = visual blocks. Low-code = some code when needed.' },
    { t: 'mc', q: 'An AI model is best described as a...', a: 'Predictive model that learns patterns from training data', w: ['Database of correct answers', 'Search engine', 'Human typing fast'], x: 'It interprets your request and generates an output: text, a decision, a classification, a summary or an image.' },
    { t: 'mc', q: 'Why do GPT, Claude and Gemini feel different?', a: 'Each lab trains on different data, so each has a different "personality"', w: ['They are the same model with new logos', 'Only their price differs', 'They use different alphabets'], x: 'Pick by job, not by brand.' },
    { t: 'sort', q: 'Has this used AI for years already?', b: ['Yes, AI for years', 'Not an AI example'], i: [['Spam filters', 0], ['Netflix/YouTube recommendations', 0], ['Face ID', 0], ['Bank fraud detection', 0], ['A paper calendar', 1]], x: 'AI is not new. ChatGPT (Nov 2022) just made it conversational.' },
    { t: 'mc', q: 'What event made AI conversational and accessible to everyone?', a: 'ChatGPT launching in November 2022', w: ['The first iPhone', 'Zapier launching', 'The invention of email'], x: 'Since then the barrier keeps dropping. Most businesses still are not using it - that gap is the opportunity.' },
    { t: 'mc', q: 'Where does the real value (and learning curve) sit, per the lesson?', a: 'Automation tools, not chat tools', w: ['Chat tools only', 'Writing longer prompts', 'Buying more subscriptions'], x: 'Chat tools are easy. Automation tools have a real learning curve, and that is where the value is.' },
    { t: 'mc', q: '"The unlock": what did old automations need before LLMs?', a: 'A human to step in wherever reasoning or judgment was needed', w: ['Nothing, they were perfect', 'A faster computer', 'More filters'], x: 'Plug an LLM into that reasoning step and the flow keeps running.' },
    { t: 'mc', q: 'A client wants a custom build, but a $10/month tool already does it well. The lesson says...', a: 'Recommend the tool - solve problems, don\'t just build', w: ['Always build custom to charge more', 'Refuse the client', 'Build both'], x: 'Core idea: solve problems. Sometimes the answer is an existing tool.' },
    { t: 'tf', q: 'An LLM looks up facts in a database before every answer.', a: false, x: 'It predicts text from patterns. That is why it can hallucinate, and why RAG exists.' },
    { t: 'mc', q: 'What does "Think output, not headcount" mean?', a: 'AI lets the same people produce far more', w: ['Fire half the team', 'Hire more people', 'Count tokens instead of hours'], x: 'Leverage stacked over years is the payoff.' }
  ]
});

VAQ.addStage('c1', 'c1s1', { id: 'c1s9', name: 'Tokens & Model Choice', enemy: 'bug', lessons: ['Tokens and Context Windows', 'Open Source vs Closed Source Models'],
  learn: [
    'Tokens matter for 3 linked reasons: memory limits, cost, and model choice. There is no "best" model, only the right one for the job.',
    'A token can be a whole word, a word piece (ham|burger), punctuation or a space. ~3/4 of a word = 1 token.',
    'Common words = 1 token, rare words split into ~3, gibberish is about 1 token per character (byte-pair encoding).',
    'The context window holds your prompt + history + system instructions + the response.',
    'Windows have converged (~1M tokens on top models in 2026) but prices have not. Output costs 5-6x input.',
    'Closed models: frontier quality, managed, vendor support, but less control and data goes to a third party. Open models: full control and privacy, but you run GPUs and guardrails yourself.',
    'Hybrid usually wins: closed for general work, open/self-hosted for sensitive data.'
  ],
  qs: [
    { t: 'mc', q: 'How many tokens is "Hello world!"?', a: '3', w: ['2', '12', '1'], x: '"Hello", " world" (the space rides with the next word), "!".' },
    { t: 'mc', q: 'A 200K token window holds roughly...', a: '150,000 words - a long novel', w: ['200 words', '2,000 words', '200 million words'], x: '~3/4 word per token.' },
    { t: 'match', q: 'Match the rule of thumb.', p: [['30 tokens', '1-2 sentences'], ['100 tokens', 'About a paragraph'], ['75 words', 'About 100 tokens']], x: 'Estimates, not truth.' },
    { t: 'mc', q: 'Which text uses the MOST tokens per character?', a: 'Random gibberish like "xq7zv9"', w: ['"the"', '"you"', 'A common short word'], x: 'Byte-pair encoding: common words are 1 token, gibberish ~1 token per character.' },
    { t: 'sort', q: 'Does it fill the context window?', b: ['Fills the window', 'Does not'], i: [['Your prompt', 0], ['Conversation history', 0], ['System instructions', 0], ['The model\'s response', 0], ['Your computer\'s RAM', 1]], x: 'In n8n you see prompt tokens, completion tokens and total tokens.' },
    { t: 'mc', q: 'You split a huge document because it\'s too long. What\'s the trade-off?', a: 'The model sees one part at a time, so cross-part questions get weaker answers', w: ['None at all', 'It becomes free', 'The model gets faster and smarter'], x: 'That is why bigger windows are worth paying for.' },
    { t: 'mc', q: 'In the lesson\'s live test (10-min transcript + 1 question), which part was small but expensive?', a: 'The response', w: ['The prompt', 'The system prompt', 'The question mark'], x: '~4,500 prompt tokens, 4,953 total. The output is the small part, priced highest.' },
    { t: 'mc', q: 'In 2026, why does the context window rarely decide which model you pick?', a: 'Top models all hold roughly 1M tokens now; price and speed differ more', w: ['Windows don\'t exist anymore', 'All models cost the same', 'Only open models have windows'], x: 'Weigh speed, cost, window, and task type (coding, writing, classification, tool use).' },
    { t: 'mc', q: '"Tokenomics" takeaway:', a: 'Be concise and right-size the model', w: ['Always pick the largest model', 'Write the longest prompts possible', 'Ignore costs'], x: 'Tokens aren\'t words; cost follows usage; context is your memory limit.' },
    { t: 'mc', q: 'What was "the DeepSeek moment"?', a: 'An open model reached near-frontier quality, trained cheaper, downloadable for private hosting', w: ['A closed model went offline', 'Zapier added AI', 'Tokens became free'], x: 'It reset expectations of what closed vendors were charging for.' },
    { t: 'sort', q: 'Closed-source advantage or cost?', b: ['Advantage', 'Cost / drawback'], i: [['State-of-the-art capability', 0], ['Managed infrastructure, auto scaling', 0], ['Dependency risk (price/policy changes)', 1], ['Privacy issues with PII or health data', 1], ['Dedicated vendor support', 0], ['Limited control over the model', 1]], x: 'Everything you send passes to a third party - source of both the pros and cons.' },
    { t: 'sort', q: 'What does open source demand from you?', b: ['You must handle it', 'Vendor handles it'], i: [['GPUs and compute', 0], ['A skilled team to deploy and maintain', 0], ['Safety guardrails', 0], ['Nothing - it runs itself', 1]], x: 'Open = free model, but you pay for compute and expertise.' },
    { t: 'tf', q: 'n8n is open (self-hostable) while Make and Zapier are closed.', a: true, x: 'You already made the open vs closed choice when picking an automation platform.' },
    { t: 'mc', q: 'With a self-hosted open model, what do you pay for instead of per-call tokens?', a: 'Compute (servers/GPUs)', w: ['Nothing at all, ever', 'Zapier tasks', 'Per-word licences'], x: 'The one exception to "every token costs money" is a model you host yourself.' }
  ]
});

// ---------- Workflows vs Agents ----------
VAQ.extend('c1s2', {
  learn: [
    'A workflow is a sequence of steps with a clear start and end. If you can describe the order you do something in, you\'ve written an SOP - a workflow waiting to be automated.',
    'Five questions before you build: What problem? Does it need AI? What type of decisions? How will decisions be made? What data do I have?',
    'Decisions: structured (no AI), semi-structured (AI helps), unstructured (AI essential).',
    'Data: input data (what arrives), training data (examples of success in the prompt), validation data (correct outputs to check against).',
    'An agent decides its path at run time. Its tools ARE workflows, so name and describe them well.',
    'Tool calling: create the tool, bind it to a model, the model calls it, the tool executes.'
  ],
  qs: [
    { t: 'ord', q: 'The five questions before you build, in order:', s: ['What problem am I solving?', 'Does this need AI?', 'What type of decisions are made?', 'How will decisions be made?', 'What data do I have?'], x: 'Answer these before touching a platform.' },
    { t: 'match', q: 'Match the decision type to how much AI it needs.', p: [['Structured', 'AI not needed'], ['Semi-structured', 'AI is helpful'], ['Unstructured', 'AI is essential']], x: 'Question 3 of the five.' },
    { t: 'match', q: 'Match the data type.', p: [['Input data', 'What starts the process and exactly what arrives'], ['Training data', 'What success looks like, given in the prompt'], ['Validation data', 'Examples of correct outputs to check against']], x: 'Question 5: what data do I have?' },
    { t: 'mc', q: 'Classic moment AI automation "clicks":', a: 'An automation that emails a manager for yes/no and waits - an LLM can apply the criteria instead', w: ['Sending a newsletter', 'Adding a row to Sheets', 'Turning on a Zap'], x: 'Simple criteria no filter can apply, but a language model can.' },
    { t: 'sort', q: 'What does a good workflow buy you?', b: ['Benefit', 'Not a benefit'], i: [['Clarity and structure', 0], ['Consistency', 0], ['Scalability', 0], ['Accountability', 0], ['Unpredictable results', 1]], x: 'Plus efficiency.' },
    { t: 'ord', q: 'Forty years of workflow history, oldest first:', s: ['1980s workflow automation', 'ERP, CRM, RPA', 'Cloud and APIs', 'AI automates the judgment step'], x: 'AI finally automates the step that needed a human.' },
    { t: 'tf', q: 'Most beginners overestimate how unpredictable their process really is.', a: true, x: 'So most things should be workflows, not agents.' },
    { t: 'match', q: 'Remote-employee agent: match the perk to its small print.', p: [['Perfect memory', '...only within the memory you give it'], ['Obeys the prompt', '...but can still hallucinate'], ['Never sleeps', '...but needs compute, credentials, credits'], ['Far cheaper', '...but tokens and tools aren\'t free']], x: 'Anything you could hire a remote worker for, an agent can attempt.' },
    { t: 'ord', q: 'The support-agent example in n8n, in order:', s: ['Think: read the message', 'Gather: pull facts from a vector store', 'Draft: create a Gmail draft', 'Report: tell the human it\'s ready'], x: 'Notice the human still reviews the draft.' },
    { t: 'mc', q: 'Is n8n an agent framework like LangChain or CrewAI?', a: 'No - it\'s a visual no-code builder that runs LangChain JS inside some nodes', w: ['Yes, the biggest one', 'It is a model', 'It is a vector database'], x: 'Frameworks you\'ll hear: LangChain, Semantic Kernel, Azure AI Agent Service, CrewAI, Hugging Face.' },
    { t: 'mc', q: 'Early reasoning models like o1 had what limitation?', a: 'They could plan but not call tools', w: ['They could not write text', 'They were open source', 'They had no context window'], x: 'Current frontier models support tool calling as standard - check the docs.' },
    { t: 'mc', q: 'An agent path like tool 4 > 4 > 4 > 1 is...', a: 'Normal - agents are non-deterministic', w: ['A bug that must be fixed', 'Impossible', 'Only possible in Zapier'], x: 'Workflow = one fixed path. Agent = decides its own path each run.' },
    { t: 'mc', q: 'Without an API, how can an agent still do a task?', a: 'Browser automation that drives the mouse', w: ['It cannot', 'By guessing', 'Via a Digest'], x: 'Even without an API, browser automation can act like a person.' },
    { t: 'ord', q: 'Brushing-your-teeth agent analogy, in order:', s: ['Recognise the input', 'Decide which tools are needed', 'Consult memory (already brushed?)', 'Plan and execute', 'Return an output'], x: 'The agent loop in everyday life.' }
  ]
});

VAQ.addStage('c1', 'c1s2', { id: 'c1s10', name: 'Voice Agents & Ethics', enemy: 'ghost', lessons: ['AI Voice Agents', 'AI Ethics'],
  learn: [
    'A voice agent = an agent with a phone. Same brain, instructions, memory and tools - only the channel changes.',
    'Loop: listen > understand (meaning + tone) > respond > learn as it goes (so it never asks twice).',
    'Latency matters: a 2-second pause is fine in text, painful on a call.',
    'Always disclose it\'s an AI. Voice is where people feel deceived.',
    'Ethics is a set of choices by the people using AI - you write the instructions, choose the data, decide on human review.',
    'Challenges: bias, privacy, IP, the black box. Answers: test across inputs, keep humans on people-affecting decisions, log everything, read data policies.'
  ],
  qs: [
    { t: 'ord', q: 'The voice agent loop:', s: ['Listen (speech recognition)', 'Understand (meaning, tone, context)', 'Respond', 'Learn as it goes'], x: 'Step 4 is why you are not asked for your address twice.' },
    { t: 'mc', q: 'Why is latency a big deal for voice agents?', a: 'A 2-second pause feels awful on a call', w: ['It increases token cost', 'It changes the voice', 'It breaks MCP'], x: 'Unremarkable in text, excruciating on a call.' },
    { t: 'sort', q: 'Voice agents hear more than words. Signal or noise?', b: ['Useful signal', 'Ignore'], i: [['Frustration in the voice', 0], ['Urgency', 0], ['Hesitation', 0], ['Background hum of a fridge', 1]], x: 'Tone (frustration, urgency, hesitation) is signal, not noise.' },
    { t: 'mc', q: 'The plumber example: what does a voice agent fix?', a: 'Missed calls - callers who would just ring the next result', w: ['Plumbing parts pricing', 'Website speed', 'Invoice design'], x: 'Every missed call gets picked up and a visit or callback is booked.' },
    { t: 'mc', q: 'Where is voice AI adoption heaviest?', a: 'Customer support (mostly inbound)', w: ['Video editing', 'Graphic design', 'Spreadsheet formulas'], x: 'Also VAs (booking, reminders, follow-ups), workplace comms and accessibility.' },
    { t: 'mc', q: 'Market growth cited: roughly how fast is voice AI growing per year?', a: 'About 39%', w: ['About 2%', 'About 500%', 'It is shrinking'], x: '~$3.51B in 2026 forecast to ~$35B by 2033.' },
    { t: 'match', q: 'Match the ethics challenge.', p: [['Bias', 'Historical human bias reflected back'], ['Privacy', 'What it learns about you, what you hand it'], ['IP', 'Who owns work made "in the style of"'], ['Black box', 'Decisions nobody can explain']], x: 'Core challenges, parts one and two.' },
    { t: 'mc', q: 'Practical fix for the black box problem in your builds:', a: 'Execution logs / observability of what the model saw and did', w: ['Higher temperature', 'Hiding the logs', 'Using more tools'], x: 'Logs are the practical version of transparency.' },
    { t: 'mc', q: 'Building a product that imitates a famous living artist\'s style. The lesson says...', a: "Don't - describe a style in your own words instead", w: ['Go ahead, it\'s legal everywhere', 'Only if it sells well', 'Use their name in the ad'], x: 'IP questions are being argued in courts right now.' },
    { t: 'mc', q: 'Support reps in the AI era: what does the lesson predict?', a: 'They get promoted to managers of agents', w: ['They all get fired', 'Nothing changes', 'They become prompt tokens'], x: 'Whoever knows the process best designs the system.' },
    { t: 'sort', q: 'New AI-era role?', b: ['New role mentioned', 'Not mentioned'], i: [['AI trainer', 0], ['Ethics auditor', 0], ['AI architect', 0], ['Prompt engineer', 0], ['Fax machine repair', 1]], x: '...and jobs nobody has named yet.' },
    { t: 'ord', q: 'The four personal rules from the ethics lesson:', s: ['Be honest and disclose', 'Double-check (models hallucinate)', 'Speak up about unethical use', 'Stay informed'], x: '90% done is a gift - spend the last 10% verifying.' },
    { t: 'tf', q: 'Ethics comes pre-installed in AI tools, so builders don\'t need to think about it.', a: false, x: 'Nothing comes pre-installed: a person writes the instructions and decides on human review. That person is you.' }
  ]
});

// ---------- Zapier ----------
VAQ.extend('c1s3', {
  learn: [
    'Zap = one automation: 1 trigger at the top, then action steps top to bottom.',
    'Each step: choose app + event > configure connection/settings > test. A green check = tested with real sample data.',
    'The sample data defines which fields you can map later. Always prefer a real sample.',
    'Publishing turns the Zap on. Only NEW data after publishing is processed. Off = paused (events while off are generally not processed).',
    'Polling triggers check every 1-15 min depending on plan; instant triggers fire immediately.',
    'Zap History = your debugger: Data In vs Data Out per step, plus Replay.'
  ],
  qs: [
    { t: 'ord', q: 'Each Zap step goes through three phases:', s: ['Choose the app and event', 'Configure connection and settings', 'Test the step'], x: 'Test step by step before publishing.' },
    { t: 'mc', q: 'Why does a good trigger sample matter?', a: 'It defines the fields available for mapping in every later step', w: ['It sets your price', 'It speeds up polling', 'It names the Zap'], x: 'No sample found? Create a fresh one in the app instead of using placeholder data.' },
    { t: 'mc', q: 'Gmail trigger with search "from:client@example.com" - why filter at the trigger?', a: 'It saves tasks by never starting runs you don\'t want', w: ['Gmail requires it', 'It makes the Zap instant', 'It deletes other emails'], x: 'Filtering at the source is the cheapest filter of all.' },
    { t: 'mc', q: 'Can you mix typed text and mapped fields in one input?', a: 'Yes - e.g. "New email: " + the Subject field', w: ['No, never', 'Only in Paths', 'Only on paid plans'], x: 'Zapier shows real sample values inline as you map.' },
    { t: 'tf', q: 'Testing an action in the editor really performs it (e.g. creates a real row).', a: true, x: 'Check the destination app to confirm.' },
    { t: 'match', q: 'Match the trigger speed.', p: [['Polling trigger', 'Checks for new data every 1-15 minutes'], ['Instant trigger', 'Fires immediately']], x: 'Free plan polls every 15 minutes.' },
    { t: 'mc', q: 'You turn a Zap off for a day. What happens to events during that day?', a: 'Generally they are not processed when you turn it back on', w: ['They all run instantly on restart', 'They get emailed to you', 'Zapier charges double'], x: 'Off = paused.' },
    { t: 'mc', q: 'Best name for a Zap?', a: 'Invoice emails to tracking sheet', w: ['Untitled Zap', 'Zap 7', 'test test'], x: '"Untitled Zap" multiplies fast. Name it before publishing.' },
    { t: 'match', q: 'Match the Zapier product.', p: [['Tables', 'Built-in database Zaps read and write'], ['Interfaces', 'Forms and pages that trigger Zaps'], ['Canvas', 'Flow-diagramming tool'], ['Apps (connections)', 'Your authenticated accounts, reused across Zaps']], x: 'Plus Agents, Zapier\'s AI agents product.' },
    { t: 'mc', q: 'Data In looks right but Data Out is wrong. What does that point to?', a: 'A problem in that step\'s mapping or settings', w: ['A broken trigger app', 'Billing issue', 'Internet outage'], x: 'Compare Data In vs Data Out to spot mapping mistakes.' },
    { t: 'mc', q: 'You fixed a bug. How do you reprocess the runs that failed?', a: 'Replay them from Zap History', w: ['Rebuild the Zap', 'Ask the client to resend everything', 'Wait for next month'], x: 'Any run can be replayed.' },
    { t: 'tf', q: 'Zap History keeps logs forever on every plan.', a: false, x: 'Retention depends on plan. Export important logs.' },
    { t: 'mc', q: 'Where do you check your monthly task usage?', a: 'Settings > Billing and Usage (top-right menu)', w: ['Zap History filter', 'The trigger step', 'Canvas'], x: 'Tasks reset monthly.' },
    { t: 'tf', q: 'A Zap can have two triggers at the top.', a: false, x: 'Exactly one trigger per Zap.' }
  ]
});

VAQ.addStage('c1', 'c1s3', { id: 'c1s11', name: 'Zapier Actions, Delays & Paths', enemy: 'slime', lessons: ['Actions', 'Filter by Zapier', 'Paths by Zapier'],
  learn: [
    'Create actions add something new and return its data, including the new record\'s ID for later steps.',
    'Search actions (Find Row/Contact/User) look up a record by a field. Decide what happens when nothing is found.',
    'Search-or-create + update = upsert: the record is always current, never duplicated.',
    'Delay For (a set time), Delay Until (a date, can be mapped), Delay After Queue (one at a time - a rate limiter). Digest batches events into one summary.',
    'Filters: AND inside a group, OR between groups. Filters gate; Paths branch.',
    'Paths: each branch has a rule; several can match; always add a fallback; name them; ~2 nesting levels max.'
  ],
  qs: [
    { t: 'mc', q: 'Why do create actions return the record ID?', a: 'So later steps can update or reference that exact record', w: ['For decoration', 'To count tasks', 'To rename the Zap'], x: 'IDs are the glue between steps.' },
    { t: 'tf', q: 'Search actions count as tasks when they run successfully.', a: true, x: 'Factor them into task estimates.' },
    { t: 'mc', q: 'By default, what happens when a Search action finds nothing?', a: 'The Zap errors or stops - decide deliberately how to handle it', w: ['It creates 10 records', 'It keeps searching forever', 'It emails the client'], x: 'Or tick "create if not found".' },
    { t: 'mc', q: 'What does "idempotent" mean for a Zap?', a: 'Run it again with the same data and you still get one record', w: ['It runs only once ever', 'It never errors', 'It costs zero tasks'], x: 'Search-or-create makes Zaps idempotent.' },
    { t: 'match', q: 'Match the delay tool.', p: [['Delay For', 'Pause a set amount of time'], ['Delay Until', 'Pause until a (mapped) date/time'], ['Delay After Queue', 'Space runs out one at a time'], ['Digest', 'Collect events, release as a batch']], x: 'Delayed and digested runs show as paused in Zap History - not stuck.' },
    { t: 'mc', q: 'Send a reminder one day before a meeting date from the trigger data. Use...', a: 'Delay Until (meeting date minus one day)', w: ['Delay For 1 day', 'Paths', 'A filter'], x: 'Delay Until can use a mapped date.' },
    { t: 'mc', q: 'An API only allows one request at a time. Simplest Zapier fix?', a: 'Delay After Queue', w: ['Digest', 'Sub-Zap', 'Lookup Table'], x: 'It spaces runs out - a simple rate limiter.' },
    { t: 'sort', q: 'Zapier filter condition types:', b: ['Text conditions', 'Number conditions'], i: [['contains', 0], ['exactly matches', 0], ['starts with', 0], ['greater than', 1], ['less than', 1]], x: 'Also boolean and exists / does not exist.' },
    { t: 'mc', q: '(Status = approved AND Amount > 500) OR (Priority = high). Which run PASSES?', a: 'Status pending, Amount 100, Priority high', w: ['Status approved, Amount 100, Priority low', 'Status pending, Amount 900, Priority low', 'Status rejected, Amount 0, Priority low'], x: 'Group 2 alone (Priority high) is enough.' },
    { t: 'mc', q: 'How should you test a filter with 2 OR-groups?', a: 'One sample per group, plus one that fails everything', w: ['Just publish it', 'One sample total', 'Only test the failure'], x: 'Test each branch deliberately.' },
    { t: 'mc', q: 'Your filter logic needs 4+ groups. Better tool?', a: 'Paths', w: ['More filters', 'Digest', 'Delay'], x: 'Filters gate, Paths branch.' },
    { t: 'mc', q: 'Where should shared steps (one search all branches use) go?', a: 'Before the Paths block', w: ['Copied into every path', 'After all paths', 'In a separate account'], x: 'Do it once, reuse in every branch.' },
    { t: 'mc', q: 'A high-stakes branch (refunds). One Zap with paths or its own Zap?', a: 'Often its own Zap - easier to toggle and monitor', w: ['Always buried in paths', 'Neither - do it by hand', 'A Digest'], x: 'One Zap with paths = easier to see whole. Separate Zaps = easier to monitor.' },
    { t: 'sort', q: 'Paths best practice?', b: ['Do', "Don't"], i: [['Name every path descriptively', 0], ['Most common branch first', 0], ['Always keep a fallback path', 0], ['Nest paths 5 levels deep', 1], ['Leave names as Path A, Path B', 1]], x: 'Sketch 3+ branches in Canvas before building.' }
  ]
});

VAQ.addStage('c1', 'c1s11', { id: 'c1s12', name: 'Zapier Formatter & Loops', enemy: 'robot', lessons: ['Formatter by Zapier', 'Looping by Zapier'],
  learn: [
    'Formatter = Zapier\'s data-cleaning tool: Text, Numbers, Date/Time, Utilities. One transform per step; each step uses a task.',
    'Text: capitalize, trim, find/replace, truncate, Extract Email/URL/Number, Split Text.',
    'Numbers: Format Number, Format Currency, Perform Math, Spreadsheet-Style Formula (ROUND, IF, CONCAT). Do math BEFORE formatting.',
    'Dates: Format, Add/Subtract Time (+2 days), Compare Dates. Set timezones explicitly.',
    'Utilities: Lookup Table, Line Items to Text / Text to Line Items, Pick From List, Import CSV, Default Value.',
    'Line items are Zapier\'s arrays. To act once per item, use Looping by Zapier. Watch the task math.'
  ],
  qs: [
    { t: 'match', q: 'Match the Formatter category.', p: [['Text', 'Trim, capitalize, extract email'], ['Numbers', 'Format currency, do math'], ['Date/Time', 'Convert formats, add days'], ['Utilities', 'Lookup tables, line items, CSV']], x: 'Formatter by Zapier.' },
    { t: 'mc', q: 'Pull an email address out of a messy message body without regex:', a: 'Formatter > Text > Extract Email Address', w: ['Paths', 'Digest', 'Sub-Zap'], x: 'Also Extract URL and Extract Number.' },
    { t: 'mc', q: 'Quantity x unit price inside a Zap:', a: 'Numbers > Perform Math Operation', w: ['Text > Split', 'Date > Compare', 'Delay For'], x: 'Or Spreadsheet-Style Formula for ROUND, IF, CONCAT.' },
    { t: 'mc', q: 'Price arrives as "$1,299.00" text. Before math you should...', a: 'Format Number to strip symbols and commas', w: ['Format Currency', 'Do the math directly', 'Use a Digest'], x: 'Numbers often arrive as text.' },
    { t: 'mc', q: 'One app outputs 03/18/2026, the next needs 2026-03-18. Use...', a: 'Date/Time > Format', w: ['Numbers > Math', 'Paths', 'Webhooks'], x: 'Specify the from-format only when Zapier guesses wrong.' },
    { t: 'mc', q: 'Compute a due date 2 days after signup:', a: 'Date/Time > Add/Subtract Time with "+2 days"', w: ['Delay For', 'Lookup Table', 'Text > Truncate'], x: 'Compare Dates gives days-until-deadline and similar.' },
    { t: 'tf', q: 'Formatter steps are free and don\'t use tasks.', a: false, x: 'They consume tasks like any action.' },
    { t: 'mc', q: 'An order with 3 products arrives as ONE trigger event. The products are...', a: 'Line items (Zapier\'s arrays)', w: ['Three separate Zaps', 'Bundles', 'Paths'], x: 'Many actions accept line items natively, e.g. invoice line items.' },
    { t: 'match', q: 'Match the line-item tool.', p: [['Line Items to Text', 'Flatten a list into one string'], ['Text to Line Items', 'Turn a string into a list'], ['Pick From List', 'First, last or random item'], ['Import CSV', 'Parse a CSV into line items']], x: 'Line items + Looping = act on each item.' },
    { t: 'ord', q: 'Round-robin lead assignment pattern:', s: ['Lookup table of rep names', 'Pick From List (random)', 'Assign the lead'], x: 'Utilities solving real edge cases.' },
    { t: 'ord', q: 'CSV import pattern:', s: ['Email trigger with CSV attachment', 'Import CSV File', 'Loop over rows', 'Upsert each row into CRM or sheet'], x: 'Headers become field names.' },
    { t: 'mc', q: 'A field is sometimes empty and breaks later steps. Use...', a: 'Default Value', w: ['Delete the field', 'Paths x 10', 'Turn the Zap off'], x: 'A fallback keeps downstream steps from failing.' },
    { t: 'mc', q: 'Inside a loop, how do you send ONE summary after the last item?', a: 'Use the last-iteration flag', w: ['Add a second trigger', 'Use a Digest per item', 'Not possible'], x: 'The loop exposes an iteration counter and a last-iteration flag.' },
    { t: 'sort', q: 'Valid loop source?', b: ['Loop source', 'Not a source'], i: [['Line items', 0], ['A list of text values', 0], ['A number range', 0], ['A filter', 1]], x: 'Line items are the most common.' },
    { t: 'mc', q: 'Hundreds of items in a loop and you hit the plan limit. The lesson suggests...', a: 'Zapier Tables bulk features or an external tool', w: ['Loop twice', 'Ignore the limit', 'More Paths'], x: 'Iteration limits apply per plan.' }
  ]
});

VAQ.extend('c1s4', {
  learn: [
    'Sub-Zaps = callable Zaps (subflows in Make, sub-workflows in n8n). Start a Sub-Zap defines inputs; Return from a Sub-Zap sends outputs; the parent uses Call a Sub-Zap.',
    'Keep Sub-Zap contracts small: few inputs, few outputs, clear names - like a function.',
    'Catch Hook: unique URL, JSON parsed into fields (nested = customer__email). Catch Raw Hook: unparsed body for signatures.',
    'Webhooks by Zapier is premium. Actions: GET, POST, PUT, Custom Request (PATCH, DELETE).',
    'Decision order: shaped action > the app\'s API Request action (uses its OAuth) > Webhooks by Zapier.',
    'AI by Zapier: summarise, extract, classify, translate, generate. Ask for JSON; list categories; give examples. Copilot drafts Zaps - you verify.'
  ],
  qs: [
    { t: 'match', q: 'Match the Sub-Zap piece.', p: [['Start a Sub-Zap', 'Trigger that defines input fields'], ['Return from a Sub-Zap', 'Sends data back to the parent'], ['Call a Sub-Zap', 'Action the parent uses to run it']], x: 'Reuse saves maintenance, not tasks.' },
    { t: 'mc', q: 'Classic Sub-Zap use:', a: 'One "Notify Team" Sub-Zap called from ten parent Zaps', w: ['Saving tasks', 'Replacing triggers', 'Storing passwords'], x: 'Update the notification logic once, every Zap benefits.' },
    { t: 'mc', q: 'Nested JSON {"customer":{"email":"..."}} shows in Zapier as...', a: 'customer__email', w: ['customer.email.json', 'email_customer', 'It is ignored'], x: 'Nested objects become dotted/double-underscore field names.' },
    { t: 'mc', q: 'When would you use Catch Raw Hook?', a: 'When you need the unparsed body (e.g. signature verification)', w: ['Always, it is faster', 'To save tasks', 'For Gmail triggers'], x: 'Catch Hook parses; Catch Raw Hook keeps it raw.' },
    { t: 'mc', q: 'Before building actions on a new Catch Hook you should...', a: 'Send a test payload (webhook.site, curl or the app)', w: ['Publish immediately', 'Add a Digest', 'Delete the URL'], x: 'The sample defines your mappable fields.' },
    { t: 'tf', q: 'Webhooks by Zapier works on the free plan.', a: false, x: "It's a premium app - and the bridge to every app Zapier doesn't support natively." },
    { t: 'match', q: 'Match the Webhooks action.', p: [['GET', 'Read data'], ['POST', 'Send/create data (JSON payload)'], ['Custom Request', 'PATCH, DELETE, full body control']], x: 'Headers carry Authorization or API keys.' },
    { t: 'mc', q: 'Why prefer an app\'s own "API Request" action over Webhooks by Zapier?', a: 'It reuses the app connection\'s auth - no key management', w: ['It is always free', 'It is faster to type', 'It skips testing'], x: 'Check the app\'s API docs for the path and method.' },
    { t: 'sort', q: 'Good use of AI by Zapier, or should Formatter do it?', b: ['AI step', 'Formatter'], i: [['Summarise a long email', 0], ['Classify a support ticket by intent', 0], ['Lowercase an email address', 1], ['Add 2 days to a date', 1], ['Translate a message', 0]], x: 'AI steps consume tasks and have limits - use them only where fuzzy understanding beats Formatter.' }
  ]
});

// ---------- Make.com ----------
VAQ.extend('c1s5', {
  learn: [
    'Make (formerly Integromat): visual canvas. Scenario = one automation; data flows as bundles; each module run = 1 operation.',
    'Free: 1,000 ops/month, unlimited scenarios. Paid: Core, Pro, Teams, Enterprise.',
    'Runs on a schedule or real-time via webhooks. 1 trigger (leftmost), actions flow left to right.',
    'Action types: Create, Update, Send, Upload. Actions return data (e.g. the new contact ID). Always log IDs you\'ll need for updates.',
    'Get = by exact ID (0 or 1 result). Search = by a field (0, 1 or many bundles).',
    'Filters live on the line between modules and are free. Routers split into branches; a branch with no filter is the fallback.'
  ],
  qs: [
    { t: 'mc', q: 'Make.com used to be called...', a: 'Integromat', w: ['IFTTT', 'Zapier 2', 'Automate.io'], x: 'Same product, new name.' },
    { t: 'sort', q: 'How can a Make scenario start?', b: ['Valid way', 'Not a way'], i: [['On a schedule', 0], ['Real-time via webhook', 0], ['Run once manually', 0], ['By telepathy', 1]], x: 'You control when and how often scenarios run.' },
    { t: 'match', q: 'Match the Make action type.', p: [['Create', 'Add a new record'], ['Update', 'Modify an existing record'], ['Send', 'Email, message, notification'], ['Upload', 'File to cloud storage']], x: 'Actions are the "doing" part.' },
    { t: 'mc', q: 'An action module fails on one bundle. Without error handling...', a: 'Execution stops for that bundle', w: ['It retries forever', 'It deletes the scenario', 'It skips silently'], x: 'Add error handling for production scenarios.' },
    { t: 'mc', q: 'Gmail "Send an Email": how do you use branded templates with links?', a: 'Switch the body type to HTML', w: ['Use plain text only', 'Attach a PNG', 'Use a router'], x: 'CC/BCC/Reply-To are in advanced settings.' },
    { t: 'mc', q: 'Slack card with name, company and a "View in CRM" button:', a: 'Block Kit (Blocks mode)', w: ['Plain text mode', 'A filter', 'An iterator'], x: 'Sections, buttons, images and dividers.' },
    { t: 'sort', q: 'Google Sheets "Add a Row" field rules: correct or wrong?', b: ['Correct', 'Will cause problems'], i: [['Dates formatted correctly', 0], ['Numbers without currency symbols', 0], ['Checkboxes as true/false', 0], ['"$1,200" in a number column', 1]], x: 'Field types matter.' },
    { t: 'tf', q: 'Search returning many results passes them as separate bundles - which can cause duplicate actions.', a: true, x: 'Plan for 0, 1 and many.' },
    { t: 'mc', q: 'Route leads: Facebook > CRM, LinkedIn > email, Website > both. Use...', a: 'A Router with a filter per branch', w: ['One filter', 'An aggregator', 'Three accounts'], x: 'Routers for 3+ paths, simple filters for yes/no.' },
    { t: 'mc', q: 'Make free plan includes...', a: '1,000 operations/month and unlimited scenarios', w: ['100 tasks/month', 'Unlimited operations', 'Only 2 scenarios'], x: 'Ops are consumed per module run.' },
    { t: 'mc', q: 'Make supports roughly how many apps (per the lesson)?', a: '1,500+', w: ['15', '150', '1 million'], x: 'Google Workspace, Slack, HubSpot, Airtable, OpenAI and more.' }
  ]
});

VAQ.addStage('c1', 'c1s5', { id: 'c1s13', name: 'Make: Errors & HTTP', enemy: 'bug', lessons: ['Error Handling (Make)', 'HTTP Request', 'AI Agents'],
  learn: [
    'Error types: connection (expired token, bad key, app down), data (wrong type, missing field), processing (formula/regex fails), rate limit, timeout.',
    'Debug: Scenario History > failed run > failed module > read the message.',
    'Handlers (right-click > Add error handler): Break, Ignore, Resume (fallback value), Retry (up to 5x), Rollback. You can chain them.',
    'Incomplete executions keep the data so you can retry later. Turn on error notifications (email/Slack).',
    'HTTP module: method, URL, headers, query params, body. Use a reusable connection for keys; Make handles Basic Auth encoding and OAuth2 refresh.',
    'Make AI Agents reason, plan, use your scenarios as tools, show a reasoning panel, and accept text, docs, images and audio.'
  ],
  qs: [
    { t: 'match', q: 'Match the Make error type to its cause.', p: [['Connection error', 'Expired token, invalid key, app down'], ['Data error', 'Wrong type or missing required field'], ['Processing error', 'Formula or regex fails'], ['Timeout error', 'Request took too long']], x: 'Rate limit errors are retried automatically.' },
    { t: 'ord', q: 'Debug a failed Make run:', s: ['Open Scenario History', 'Click the failed run', 'Click the failed module', 'Read the error message'], x: 'Make shows exactly what went wrong and on which bundle.' },
    { t: 'mc', q: 'An API sometimes fails and "N/A" is fine as the value. Use...', a: 'Resume with a fallback value', w: ['Rollback', 'Break', 'Delete the module'], x: 'The scenario continues instead of stopping.' },
    { t: 'mc', q: 'Duplicate detection errors are expected and harmless. Use...', a: 'Ignore', w: ['Retry 5 times', 'Rollback', 'Break'], x: 'Skip that bundle silently and continue.' },
    { t: 'mc', q: 'Partial success would be worse than nothing (e.g. half a payment flow). Use...', a: 'Rollback', w: ['Ignore', 'Resume', 'Nothing'], x: 'Undo everything done in this run - transactional scenarios.' },
    { t: 'tf', q: 'You can chain handlers: retry 3 times, then resume with a fallback.', a: true, x: 'Directives can be combined.' },
    { t: 'mc', q: 'Where do you find runs that stopped mid-way with their data saved?', a: 'History, filtered by "Incomplete"', w: ['Trash', 'The Router', 'Settings > Billing'], x: 'Retry or resolve them later.' },
    { t: 'mc', q: 'Most important alert for production automations:', a: 'Email or Slack notification when any scenario fails', w: ['A daily joke', 'Token count emails', 'None needed'], x: 'Scenario Settings > Error notifications.' },
    { t: 'match', q: 'Match the auth method.', p: [['API key in header', 'Authorization: Bearer KEY or X-API-Key'], ['Basic Auth', 'Username + password, Make encodes it'], ['OAuth2', 'User consent, Make refreshes tokens']], x: 'Create a reusable connection for authenticated APIs.' },
    { t: 'mc', q: 'The new HTTP app handles APIs that return results in pages by...', a: 'Built-in pagination you configure once', w: ['Ignoring page 2+', 'Making you copy pages', 'Only reading the first item'], x: 'Built-in pagination.' },
    { t: 'tf', q: 'Rotating an API key in the Make connection updates every scenario using it.', a: true, x: 'Another reason never to hardcode keys.' },
    { t: 'sort', q: 'Make AI Agent feature?', b: ['Yes', 'No'], i: [['Reasoning panel shows its thinking', 0], ['Uses your scenarios as tools', 0], ['Accepts text, documents, images, audio', 0], ['Guarantees a fixed step order', 1]], x: 'It\'s a separate app from the scenario builder.' }
  ]
});

// ---------- n8n ----------
VAQ.extend('c1s6', {
  learn: [
    'n8n = "nodemation", founded 2019 by Jan Oberhauser. Fair-code (Sustainable Use License): free to self-host for personal/internal use; commercial resale needs a licence.',
    '400+ integrations, 500+ community templates, native AI built on LangChain.',
    'UI: Workflows, Credentials (add before building), Executions (node-level input/output), Templates, Settings.',
    'One trigger node (leftmost). Nodes connect left to right. IF has True/False outputs; Switch has many + a Fallback.',
    'Triggers: Manual, Schedule (simple or cron), Webhook (Test URL vs Production URL).',
    'Merge (Append, Merge By Field, Multiplex), Wait (time, date, or webhook resume), Loop Over Items (batches), HTTP Request (any API).'
  ],
  qs: [
    { t: 'mc', q: 'n8n\'s licence model is called...', a: 'Fair-code (Sustainable Use License)', w: ['Fully closed source', 'Public domain', 'Pay per task'], x: 'Free to self-host internally; commercial revenue use needs a paid licence.' },
    { t: 'match', q: 'Match the n8n UI area.', p: [['Credentials', 'Central store for app logins and API keys'], ['Executions', 'Log of runs with node-level input/output'], ['Templates', '500+ community workflows'], ['Mini-map', 'Navigate large workflows']], x: 'Always add credentials before building.' },
    { t: 'mc', q: 'Pan around the n8n canvas with...', a: 'Space + drag', w: ['Ctrl + Z', 'Right-click only', 'You can\'t'], x: 'Zoom with scroll; add nodes with + or double-click empty canvas.' },
    { t: 'match', q: 'Match the cron expression (minute hour ...).', p: [['0 9 * * 1-5', '9am Monday to Friday'], ['0 * * * *', 'Every hour'], ['*/15 * * * *', 'Every 15 minutes']], x: 'Schedule Trigger accepts simple settings or a cron expression.' },
    { t: 'mc', q: 'What happens if a Switch value matches no rule and Fallback isn\'t set?', a: 'The item drops silently', w: ['n8n crashes', 'It goes to every branch', 'It loops forever'], x: 'Always configure Fallback.' },
    { t: 'mc', q: 'Merge user profiles with orders by user_id:', a: 'Merge By Field', w: ['Append', 'Multiplex', 'Wait'], x: 'Like a database JOIN.' },
    { t: 'mc', q: 'Generate every T-shirt colour x size combo:', a: 'Multiplex', w: ['Append', 'Merge By Field', 'IF'], x: 'Every combination of both inputs.' },
    { t: 'sort', q: 'Good use of the Wait node?', b: ['Yes', 'No'], i: [['Delay between API calls', 0], ['Approval flow (resume by webhook)', 0], ['Time-delayed follow-up', 0], ['Storing passwords', 1]], x: 'Wait: a duration, a time, or a webhook call.' },
    { t: 'sort', q: 'HTTP Request body formats vs auth types:', b: ['Body format', 'Auth type'], i: [['JSON', 0], ['Form data', 0], ['Binary', 0], ['Bearer Token', 1], ['OAuth2', 1], ['Basic Auth', 1]], x: 'Choose the body format the API expects.' },
    { t: 'mc', q: 'Read the API\'s X-RateLimit-Remaining header in n8n:', a: 'Enable "Include Response Headers"', w: ['Use a Merge node', 'Read the Executions tab', 'Not possible'], x: 'Also useful for pagination tokens.' },
    { t: 'mc', q: 'How many outputs does the IF node have?', a: 'Two: True and False', w: ['One', 'Unlimited', 'Three'], x: 'Combine conditions with AND or OR.' },
    { t: 'tf', q: 'After a test run, clicking any node shows the exact data it produced.', a: true, x: 'Green connections = data flowed; red = error at that node.' }
  ]
});

VAQ.addStage('c1', 'c1s6', { id: 'c1s14', name: 'n8n: Agents, MCP & Hosting', enemy: 'robot', lessons: ['AI Agents and Human in the Loop', 'MCP Server / Client', 'RAG Agents', 'Set up your n8n Server'],
  learn: [
    'Tools Agent: an LLM that calls tools (nodes, APIs, sub-workflows). Conversational Agent: multi-turn chat with context.',
    'AI node types: LLMs, Memory (window buffer, Redis), Tools, Vector Stores, Embeddings.',
    'Credentials: OpenAI key from platform.openai.com, Anthropic key from console.anthropic.com. Test with a Basic LLM Chain.',
    'Settings: temperature 0 for extraction, 0.7-1.0 creative. Max tokens ~500 summaries, ~2,000 analysis, 4,000+ long content.',
    'System prompt: role + constraints ("Always be concise. Never share internal data.").',
    'Self-hosting on Render: n8n Docker image, port 5678, Postgres DB settings, WEBHOOK_URL, and an N8N_ENCRYPTION_KEY. 502 errors: raise NODE_OPTIONS memory.'
  ],
  qs: [
    { t: 'match', q: 'Match the n8n agent type.', p: [['Tools Agent', 'Decides which predefined tools to call'], ['Conversational Agent', 'Keeps context across chat messages']], x: 'Both built on LangChain.' },
    { t: 'sort', q: 'Agent or regular workflow?', b: ['AI Agent', 'Regular workflow'], i: [['Needs reasoning and tool choice', 0], ['Every step known upfront', 1], ['Guaranteed execution order needed', 1], ['Multi-step "it depends" decisions', 0]], x: 'Same rule as the AI Workflows lesson.' },
    { t: 'match', q: 'Match the AI node category.', p: [['Memory node', 'Window buffer, Redis'], ['Vector Store node', 'Searchable document chunks'], ['Embedding node', 'Turns text into vectors'], ['Tool node', 'HTTP, code, custom actions']], x: 'Plus LLM nodes (OpenAI, Anthropic, Google).' },
    { t: 'mc', q: 'Where do you get an Anthropic API key for n8n?', a: 'console.anthropic.com', w: ['claude.ai chat settings', 'zapier.com', 'n8n.io/templates'], x: 'Credentials > New > Anthropic > paste key.' },
    { t: 'mc', q: 'Fastest way to confirm a new LLM credential works:', a: 'A Basic LLM Chain node with a simple prompt', w: ['Build a 30-node agent first', 'Email support', 'Restart the server'], x: 'Verify you get a response.' },
    { t: 'match', q: 'Match max tokens to the job (lesson guidance).', p: [['~500', 'Summaries'], ['~2,000', 'Detailed analysis'], ['4,000+', 'Long content generation']], x: 'Set max tokens based on expected output length.' },
    { t: 'mc', q: 'Which system prompt is better?', a: '"You process customer emails. Always be concise. Never share internal data."', w: ['"Be helpful."', '"You are AI."', '(blank)'], x: 'Specific role + constraints.' },
    { t: 'mc', q: 'How do you make ANY n8n workflow usable by an agent?', a: 'Add it as a custom tool', w: ['Rename it "agent"', 'Turn it off', 'Export it as PDF'], x: 'The agent calls it when it judges it relevant.' },
    { t: 'mc', q: 'How should you test an agent?', a: 'Give it varied inputs and watch which tools it picks', w: ['One input is enough', 'Never test agents', 'Only test on production'], x: 'Check whether output meets expectations.' },
    { t: 'mc', q: 'Who created the MCP standard?', a: 'Anthropic', w: ['Zapier', 'n8n', 'Google Sheets'], x: 'Open standard for connecting AI to tools and data. n8n added two-way MCP in April 2025.' },
    { t: 'tf', q: 'If an app already has an MCP server, n8n can use it without building a custom API integration.', a: true, x: 'MCP replaces custom integrations in many cases.' },
    { t: 'mc', q: 'Your client asks "what was our revenue 5 minutes ago?" RAG or API?', a: 'API - RAG is for documents, not real-time data', w: ['RAG', 'Fine-tuning', 'Temperature 1'], x: "Don't use RAG for real-time data or simple lookups." },
    { t: 'sort', q: 'Render env var for self-hosted n8n?', b: ['Needed', 'Not an n8n setting'], i: [['N8N_PORT = 5678', 0], ['WEBHOOK_URL', 0], ['N8N_ENCRYPTION_KEY', 0], ['DB_TYPE = postgresdb', 0], ['ZAPIER_TASKS = 100', 1]], x: 'Image: docker.io/n8nio/n8n:latest.' },
    { t: 'mc', q: 'Your Render n8n shows Error 502. The lesson\'s fix:', a: 'Add NODE_OPTIONS = --max-old-space-size=1024', w: ['Delete all workflows', 'Change to Zapier', 'Lower the temperature'], x: 'Gives Node.js more memory.' },
    { t: 'mc', q: 'Why does n8n need N8N_ENCRYPTION_KEY?', a: 'To encrypt the credentials it stores', w: ['To speed up workflows', 'To name the instance', 'It doesn\'t'], x: 'Keep it safe - lose it and stored credentials can\'t be decrypted.' }
  ]
});

// ---------- Prompt Forge & Process Mapping (video-only lessons; bonus depth) ----------
VAQ.extend('c1s7', {
  learn: [
    'A strong prompt: Role, Task, Context, Format, Examples, Constraints.',
    'Zero-shot = no examples. Few-shot = 2-3 examples of the output you want.',
    'For automations: ask for strict JSON with named fields and say what to do when data is missing.',
    'Constraints tighten output: length, tone, "never invent facts", "say unknown if not in the text".',
    'Break big jobs into steps (prompt chaining): extract > analyse > write.',
    'Prompting is iterative: test with real inputs, fix what fails, save winners to your library.'
  ],
  qs: [
    { t: 'mc', q: 'What is prompt chaining?', a: 'Splitting a big task into several prompts, each feeding the next', w: ['Writing one giant prompt', 'Copying prompts from friends', 'Using a chain emoji'], x: 'e.g. extract facts > analyse > draft email. Easier to debug.' },
    { t: 'mc', q: 'Best line to reduce hallucinations when extracting from a document:', a: '"If the answer isn\'t in the text, reply UNKNOWN."', w: ['"Be creative."', '"Guess if unsure."', '"Make it longer."'], x: 'Give the model a safe way out.' },
    { t: 'mc', q: 'Why use delimiters like ### or <email>...</email> around pasted text?', a: 'So the AI can tell instructions apart from the data', w: ['Decoration', 'It is required by law', 'It lowers price'], x: 'Clear boundaries prevent the model following text inside the data.' },
    { t: 'ord', q: 'A solid prompt structure, top to bottom:', s: ['Role', 'Task', 'Context / data', 'Output format', 'Constraints'], x: 'Examples can sit before the format section.' },
    { t: 'mc', q: '"Think step by step before answering" helps most with...', a: 'Multi-step reasoning and maths', w: ['Spelling a name', 'Picking a colour', 'Nothing ever'], x: 'Chain-of-thought.' },
    { t: 'tf', q: 'For an automation that parses the AI output, temperature 0 is usually the right choice.', a: true, x: 'Consistent output = reliable parsing.' },
    { t: 'mc', q: 'A real-world prompt for lead emails should include...', a: 'The lead\'s data mapped in, your offer, tone, length and a call to action', w: ['Only "write an email"', 'Your API key', 'Every lead at once'], x: 'Specific inputs = specific outputs.' },
    { t: 'mc', q: 'Your prompt works 9/10 times. Next step?', a: 'Find the failing input, add a rule or example, retest', w: ['Ship it and hope', 'Start over from zero', 'Raise temperature'], x: 'Test with varied real inputs.' }
  ]
});

VAQ.extend('c1s8', {
  learn: [
    'Process mapping = drawing the current process before automating: who does what, when, with what data.',
    'Start with the trigger (the WHEN), then each step, each decision (yes/no diamonds), and the end.',
    'Note every data source (form, email, sheet, CRM) and every transformation it needs.',
    'Mark which steps are pure automation, which need AI, which need a human (60/30/10).',
    'Wireframe it (boxes and arrows) and get the client to agree before building.',
    'Map the unhappy paths too: missing data, API down, duplicates.'
  ],
  qs: [
    { t: 'mc', q: 'First thing to identify when mapping a process:', a: 'The trigger - what starts it', w: ['The final email text', 'The logo', 'The price'], x: 'Every workflow starts with exactly one trigger.' },
    { t: 'sort', q: 'Data source or transformation?', b: ['Data source', 'Transformation'], i: [['Typeform submission', 0], ['Gmail inbox', 0], ['Split full name into first/last', 1], ['Convert date format', 1], ['Google Sheet', 0], ['Format currency', 1]], x: 'Sources bring data in; transformations reshape it.' },
    { t: 'mc', q: 'Mapping "unhappy paths" means...', a: 'Planning what happens when data is missing or a step fails', w: ['Removing all errors forever', 'Only drawing successful runs', 'Making the client sad'], x: 'Fallbacks belong on the map.' },
    { t: 'mc', q: 'Why show the client a wireframe before building?', a: 'To confirm the flow and catch misunderstandings cheaply', w: ['To charge extra', 'Platforms require it', 'To skip testing'], x: 'Changing a diagram is cheaper than rebuilding.' },
    { t: 'sort', q: '60/30/10: which slice?', b: ['Automation or AI', 'Human (10%)'], i: [['Copy form data into CRM', 0], ['Draft a reply email', 0], ['Approve a refund over $1,000', 1], ['Final sign-off on a contract', 1], ['Classify ticket type', 0]], x: 'Humans keep the high-stakes judgment.' },
    { t: 'ord', q: 'Integrating AI into a mapped process:', s: ['Find the step that needs reading or writing', 'Define its input and output format', 'Add the AI step', 'Add a human review checkpoint'], x: 'Keep the human checkpoint until you trust it.' }
  ]
});

// ---------- Bonus stages ----------
VAQ.addStage('c1', 'c1s8', { id: 'c1s15', name: 'APIs, JSON & Webhooks Lab', enemy: 'robot', bonus: true, lessons: ['Bonus: how apps talk to each other'],
  learn: [
    'API = a menu of requests an app accepts. You send a request to an endpoint (URL) and get a response.',
    'Methods: GET read, POST create, PUT replace, PATCH update part, DELETE remove.',
    'Status codes: 2xx success (200 OK, 201 Created), 4xx your mistake (400 bad request, 401 not logged in, 403 not allowed, 404 not found, 429 too many requests), 5xx their server.',
    'JSON = labelled data: {"name": "Ana", "tags": ["vip"], "address": {"city": "Cebu"}}. Objects use {}, lists use [].',
    'Webhook = the other app calls YOUR URL when something happens (push). Polling = you keep asking (pull).',
    'Keys go in headers, never in shared docs. Paginated APIs return results in pages.'
  ],
  qs: [
    { t: 'match', q: 'Match the HTTP method.', p: [['GET', 'Read data'], ['POST', 'Create something new'], ['PATCH', 'Update part of a record'], ['DELETE', 'Remove a record']], x: 'PUT usually replaces the whole record.' },
    { t: 'match', q: 'Match the status code.', p: [['200', 'OK - it worked'], ['401', 'Not authenticated (bad/missing key)'], ['404', 'Not found'], ['429', 'Too many requests - slow down']], x: '201 = created, 403 = not allowed, 500 = their server broke.' },
    { t: 'mc', q: 'You get a 429 error. Best fix?', a: 'Add delays, batch requests, or retry with backoff', w: ['Change your password', 'Send requests faster', 'Delete the workflow'], x: '429 = rate limit. Use Retry in Make, Wait/Loop in n8n, Delay After Queue in Zapier.' },
    { t: 'mc', q: 'A 5xx error usually means...', a: 'The other app\'s server had a problem', w: ['Your JSON is wrong', 'Your key is wrong', 'Success'], x: '4xx = check your request. 5xx = retry later.' },
    { t: 'mc', q: 'In {"customer": {"email": "a@b.com"}}, email is...', a: 'Nested inside the customer object', w: ['A list', 'A number', 'Missing'], x: '{} = object, [] = list.' },
    { t: 'mc', q: 'Which is a JSON list?', a: '["vip", "lead", "ph"]', w: ['{"vip": true}', '"vip, lead"', 'vip=lead'], x: 'Square brackets = an array/list.' },
    { t: 'match', q: 'Push vs pull.', p: [['Webhook', 'The app sends you data instantly (push)'], ['Polling', 'You check for new data on a timer (pull)']], x: 'Webhooks are faster and use fewer requests.' },
    { t: 'mc', q: 'Where should an API key go in a request?', a: 'A header like Authorization: Bearer KEY', w: ['The email subject', 'A public Google Doc', 'The URL you post on social'], x: 'Some APIs use query params, but headers are standard and safer.' },
    { t: 'tf', q: 'An API endpoint is just a specific URL that does one job.', a: true, x: 'e.g. POST /contacts creates a contact.' },
    { t: 'mc', q: 'An API returns 100 contacts per call but there are 950. You need...', a: 'Pagination - request page after page', w: ['A bigger computer', 'Nothing - you got them all', 'A second API key'], x: 'Look for next_page tokens or page numbers.' },
    { t: 'sort', q: 'Request part:', b: ['Header', 'Body'], i: [['Authorization: Bearer ...', 0], ['Content-Type: application/json', 0], ['{"name": "Ana", "email": "..."}', 1], ['The data you want to create', 1]], x: 'Headers describe the request; the body carries the data.' }
  ]
});

VAQ.addStage('c1', 'c1s15', { id: 'c1s16', name: "Builder's Toolkit", enemy: 'slime', bonus: true, lessons: ['Bonus: habits of pro automation builders'],
  learn: [
    'Name everything clearly: workflows, steps, variables. Future-you and the client will thank you.',
    'Test with real samples, edge cases (empty fields, weird characters) and duplicates before going live.',
    'Add error alerts on every production automation. Silent failures cost clients money.',
    'Prevent duplicates with search-or-create / upsert and unique IDs.',
    'Watch costs: tasks, operations, tokens. Filter early.',
    'Hand over with a short doc or Loom: what it does, triggers, accounts used, how to turn it off.'
  ],
  qs: [
    { t: 'sort', q: 'Pro habit or rookie mistake?', b: ['Pro habit', 'Rookie mistake'], i: [['Error alerts on every live automation', 0], ['Testing only the happy path', 1], ['Clear names on every step', 0], ['Hardcoding API keys in steps', 1], ['Loom walkthrough at handover', 0], ['No filter until the end', 1]], x: 'Small habits, big trust.' },
    { t: 'mc', q: 'Which edge case should you test before launch?', a: 'An empty required field', w: ['Only perfect data', 'Nothing - just launch', 'Your own birthday'], x: 'Also duplicates, special characters, very long text.' },
    { t: 'mc', q: 'A client asks "how do I pause this if something goes wrong?" Your handover doc should...', a: 'Show exactly how to turn it off', w: ['Say "call me"', 'Hide the setting', 'Not mention it'], x: 'Clients feel safe when they control the off switch.' },
    { t: 'mc', q: 'Whose accounts should a client\'s automations run on?', a: 'The client\'s own accounts (you are invited as a user)', w: ['Your personal accounts', 'A shared free account', 'Random test accounts'], x: 'If you leave, their automations keep running.' },
    { t: 'mc', q: 'Best way to estimate monthly cost of a Zap?', a: 'Runs per month x action steps per run', w: ['Number of apps', 'Length of the Zap name', 'Guess'], x: 'Same idea for Make operations: runs x modules.' },
    { t: 'ord', q: 'Launch checklist order:', s: ['Build in test mode', 'Test happy path and edge cases', 'Add error alerts', 'Turn on / publish', 'Watch the first live runs'], x: 'Check history after the first live runs.' },
    { t: 'tf', q: 'Logging each run (e.g. to a sheet) makes debugging and client reporting easier.', a: true, x: 'Logs = proof of value and faster fixes.' }
  ]
});

VAQ.addStage('c1', 'c1s16', { id: 'c1s17', name: 'Real Client Builds', enemy: 'ghost', bonus: true, lessons: ['Bonus: picking tools and designing flows for real requests'],
  learn: [
    'Pick the tool by the job: Zapier for quick simple builds and huge app coverage; Make for visual multi-branch data work at lower cost; n8n for AI agents, self-hosting and privacy.',
    'Design: trigger > clean data > decide (filter/AI) > act > notify > log.',
    'Use AI only for reading, judging or writing. Everything else is plain automation.',
    'Always ask: what happens when it fails, and who gets told?'
  ],
  qs: [
    { t: 'mc', q: 'Clinic wants: new form lead > CRM > welcome SMS. Simple, few steps, non-technical owner. Best tool?', a: 'Zapier (or the CRM\'s own workflow)', w: ['A self-hosted n8n cluster', 'A custom Python server', 'Nothing can do this'], x: 'Simplest tool that does the job.' },
    { t: 'mc', q: 'Law firm wants AI on confidential documents, data must stay on their servers. Best fit?', a: 'Self-hosted n8n with a self-hosted/open model', w: ['Paste into any chatbot', 'Zapier free plan', 'Email the documents around'], x: 'Privacy + control = self-host.' },
    { t: 'ord', q: 'Design an AI email triage flow:', s: ['Trigger: new email', 'AI classifies: billing, support, sales', 'Route by category', 'Draft a reply for review', 'Log to a sheet'], x: 'Trigger > decide > act > log.' },
    { t: 'ord', q: 'Design an invoice reminder flow:', s: ['Schedule: every morning', 'Find unpaid invoices past due', 'Send a polite reminder email', 'Tag the contact "reminded"', 'Alert the owner if 30+ days late'], x: 'Scheduled triggers are perfect for reminders.' },
    { t: 'mc', q: 'Where does AI add value in a lead-capture flow?', a: 'Scoring the lead or drafting a personal reply', w: ['Copying the email field', 'Adding a timestamp', 'Saving a row'], x: 'Moving data needs no AI.' },
    { t: 'sort', q: 'Make or n8n is the better fit?', b: ['Make', 'n8n'], i: [['Client hates servers, wants managed SaaS', 0], ['Needs self-hosting for compliance', 1], ['Building multi-tool AI agents with memory', 1], ['Visual multi-branch scenario, pay per operation', 0]], x: 'Both are great; context decides.' },
    { t: 'tf', q: 'The most impressive solution is always the best one for the client.', a: false, x: 'Solve the problem simply and reliably. That is what clients pay for.' }
  ]
});
