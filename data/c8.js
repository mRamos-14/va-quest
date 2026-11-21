// Course 8 - Zoom Meetings  ->  District: Community Café
// Recorded community calls. Only the Feb 28 2026 mindset session has written takeaways;
// the rest are built from each call's title.
VAQ.district({
  id: 'c8', n: 8, name: 'Community Café', course: '8 - Zoom Meetings',
  blurb: 'Mindset, interviews and real stories from community Zoom calls.',
  color: '#ef476f', boss: { name: 'The Self-Doubt Gremlin', hp: 8, sprite: 'gremlin' },
  stages: [
    { id: 'c8s1', name: 'Mindset Training', enemy: 'ghost', lessons: ['Mindset Training with Ante Tracey | Client Getting Strategies (Feb 28 2026)', 'Mindset Training (October 11, 2025)', 'Mindset Training - (Aug 16, 2025)'], qs: [
      { t: 'mc', q: 'Per the Feb 2026 mindset call, success in freelancing needs skills plus...', a: 'A strong mindset: direction, emotional control, logic and a money plan', w: ['Only more certificates', 'Luck', 'A bigger laptop'], x: 'Skills are crucial, but mindset carries you through the instability.' },
      { t: 'mc', q: 'The discipline habit suggested in the session:', a: '1 hour of mock interviews with ChatGPT every day for 30 days', w: ['Apply to 100 jobs a day', 'Watch videos all night', 'Wait for motivation to show up'], x: 'Motivation comes from within; discipline is built with daily habits.' },
      { t: 'mc', q: 'How should you treat a rejection?', a: 'Record and review the interview, then improve', w: ['Quit freelancing', 'Blame the client', 'Never interview again'], x: 'Rejections are learning steps, not verdicts.' },
      { t: 'tf', q: 'Freelancing is unstable, so the session advises preparing backups.', a: true, x: 'Accept the reality, plan for it, filter mismatched clients early.' },
      { t: 'mc', q: 'Your Unique Value Proposition (UVP) is...', a: 'What makes you different, like a specialised stack or measurable results', w: ['Your lowest price', 'Your number of followers', 'Your job title only'], x: 'Be ready to explain it in one or two sentences.' },
      { t: 'mc', q: 'No years of experience yet. What should you highlight?', a: 'Project outcomes and results', w: ['Apologise for being new', 'Your age', 'Nothing - stay quiet'], x: 'Outcomes over years. Emphasise strengths, not weaknesses.' }
    ] },
    { id: 'c8s2', name: 'Interviews & Discovery Calls', enemy: 'robot', lessons: ['Zoom Meeting - Jan 12, 2025 (Interview Tips)', 'Mindset Training with Ante Tracey | Client Getting Strategies (Feb 28 2026)'], qs: [
      { t: 'ord', q: 'Run a discovery call like the session teaches:', s: ['Open with a relevant case study', 'Ask the client questions about their process', 'Discuss solutions together', 'Agree on next steps, scope and rate'], x: 'Take control: it is a collaborative negotiation, not a one-sided interrogation.' },
      { t: 'tf', q: 'A discovery call should feel like a one-sided interview where only the client asks.', a: false, x: 'Ask your own questions. Show case studies first.' },
      { t: 'mc', q: 'Best way to explain your skills to a client?', a: 'Simple, clear English, framed as outcomes like time saved', w: ['Lots of jargon to sound smart', 'Long technical monologues', 'Reading your resume'], x: 'Translate soft skills into technical terms the client cares about.' },
      { t: 'mc', q: 'When should pay and rates be made clear?', a: 'From the start', w: ['After the project is done', 'Never', 'Only if they ask twice'], x: 'Clear expectations up front prevent awkward surprises.' },
      { t: 'mc', q: 'When can you negotiate a higher rate?', a: 'After you have delivered strong results', w: ['On day one, before any work', 'Never', 'Only by threatening to leave'], x: 'Negotiate rate increases based on performance.' }
    ] },
    { id: 'c8s3', name: 'Stories & Tips', enemy: 'slime', lessons: ['How Jer Denn transitioned from BPO to Freelancing working as a Technical VA', 'Zoom Meeting (Aug 2, 2025) - How Bill Ryan got his client', "Zoom Meeting (Aug 2, 2025) - Mark's Progress and Tips", 'Zoom Meeting - 05-04-2025 (All About GHL Certified Admin)', 'Zoom Meeting - 11/24/2024 - Optmize OnlineJobsPH Profile', 'Zoom Meeting 08182024 - Domain / Hosting Set Up, Boosting your Confidence', 'Tech VAs Anniversary Kamustahan!'], qs: [
      { t: 'sort', q: 'Client-getting move from the community calls?', b: ['Yes', 'No'], i: [['Check in with past clients for referrals', 0], ['Search targeted Facebook groups for prospects', 0], ['Turn learning into action right away', 0], ['Accept every role even if it is a mismatch', 1], ['Wait until you feel 100% ready', 1]], x: 'Referrals, targeted groups, fast execution, and filtering bad-fit clients.' },
      { t: 'mc', q: 'Members who moved from BPO jobs into Tech VA freelancing mostly show that...', a: 'Your existing work habits transfer; the new tools can be learned', w: ['You need a computer science degree', 'Only agencies can freelance', 'BPO skills are useless'], x: 'Communication, process thinking and reliability carry over.' },
      { t: 'mc', q: 'One community call covered the GHL Certified Admin. What is it?', a: 'A HighLevel certification that proves your GHL skills', w: ['A Zapier plan', 'An Upwork badge you buy', 'A type of webhook'], x: 'Certifications add trust for HighLevel-focused clients.' },
      { t: 'mc', q: 'Domain and hosting set-up matters because...', a: 'Your portfolio needs its own address to look professional', w: ['Upwork requires it', 'It speeds up Zapier', 'It replaces your profile'], x: 'yourname.com beats a long free subdomain on a proposal.' },
      { t: 'tf', q: 'Using the community and AI tools for ongoing learning is part of the plan.', a: true, x: 'Keep improving: community calls, AI practice partners, real projects.' }
    ] }
  ]
});
