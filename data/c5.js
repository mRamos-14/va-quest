// Course 5 - Set Up your Profiles  ->  District: Upwork Plaza
// The portal's 5 lessons are all Upwork and video-only; questions follow the lesson topics.
VAQ.district({
  id: 'c5', n: 5, name: 'Upwork Plaza', course: '5 - Set Up your Profiles',
  blurb: 'Build an Upwork profile that gets found, then apply smart (and sometimes free).',
  color: '#14a800', boss: { name: 'The Ghosting Client', hp: 7, sprite: 'phantom' },
  stages: [
    { id: 'c5s1', name: 'Profile That Gets Hired', enemy: 'ghost', general: true, lessons: ['Create an Upwork Profile and Account Set Up', 'Set Up Specialized Profiles'], qs: [
      { t: 'mc', q: 'Which profile title is strongest?', a: 'AI Automation Specialist | Zapier, Make & n8n Workflows', w: ['Virtual Assistant', 'Hardworking Filipino Freelancer', 'I can do anything'], x: 'Specific skills + tools = you show up in searches and clients get it instantly.' },
      { t: 'mc', q: 'Which part of your overview matters most?', a: 'The first 1-2 lines, because they show in search previews', w: ['The last paragraph', 'Your hobbies', 'A long list of every app ever'], x: 'Lead with the client problem you solve and the result you deliver.' },
      { t: 'sort', q: 'Helps or hurts your profile?', b: ['Helps', 'Hurts'], i: [['Clear, friendly, professional photo', 0], ['Portfolio with real automation demos', 0], ['Vague title like "VA"', 1], ['Overview that starts with the client\'s problem', 0], ['Typos and copy-paste generic text', 1]], x: 'Your profile is your sales page.' },
      { t: 'mc', q: 'What is a specialized profile on Upwork?', a: 'An extra version of your profile focused on one service', w: ['A second Upwork account', 'A paid ad', 'A client review'], x: 'e.g. one for AI Automation, one for GoHighLevel - each with its own title, overview and portfolio.' },
      { t: 'tf', q: 'Making a second Upwork account for a different niche is the right way to niche down.', a: false, x: 'Use specialized profiles. Multiple accounts break Upwork\'s rules.' },
      { t: 'mc', q: 'Best portfolio item for an automation VA:', a: 'A short demo of a real workflow with the problem, the build and the result', w: ['A screenshot of a certificate only', 'A blank Google Doc', 'Your resume as a photo'], x: 'Show the before and after. Clients buy outcomes.' }
    ] },
    { id: 'c5s2', name: 'Finding the Right Jobs', enemy: 'bug', general: true, lessons: ['Set Up Saved Searches', 'How to apply for Jobs', 'Apply to Jobs on Upwork Without Connects'], qs: [
      { t: 'mc', q: 'Why set up saved searches?', a: 'To jump straight to fresh jobs that match your niche', w: ['To get paid faster', 'To hide your profile', 'To skip writing proposals'], x: 'Saved searches with good keywords and filters = you see the right jobs first.' },
      { t: 'mc', q: 'What are Connects?', a: "Upwork's tokens you spend to send proposals", w: ['Your LinkedIn contacts', 'Client reviews', 'A type of webhook'], x: 'Each proposal costs Connects, so spend them on jobs you can actually win.' },
      { t: 'mc', q: 'A client invites you to their job. Do you need Connects to reply?', a: 'No - responding to an invite is free', w: ['Yes, double the usual', 'Yes, always 50', 'Only on weekends'], x: 'Invites come to you. A strong profile brings more invites, which saves Connects.' },
      { t: 'sort', q: 'Good proposal or weak proposal?', b: ['Good', 'Weak'], i: [['Opens by restating the client\'s exact problem', 0], ['Links ONE relevant demo', 0], ['"Dear Sir/Madam, I am hardworking..."', 1], ['Ends with a quick question about their setup', 0], ['Same copy-paste text for every job', 1]], x: 'Short, specific, about THEM. Then proof. Then a question.' },
      { t: 'ord', q: 'Order a winning proposal:', s: ['Hook: their problem in one line', 'How you would solve it', 'Proof: a similar project or demo', 'A question to start the conversation'], x: 'Clients skim. Lead with them, not you.' },
      { t: 'mc', q: 'Which job is the smarter one to spend Connects on?', a: 'Verified payment, clear scope, matches your niche, few proposals so far', w: ['Unverified payment, 50+ proposals', 'Vague "need help with stuff" post', 'A job outside your skills'], x: 'Filter jobs before you spend. Quality over volume.' }
    ] }
  ]
});
