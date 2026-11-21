// Course 7 - Client-Getting Playbook  ->  District: Client Quarter
// The portal's 18 lessons are video-only; questions follow the lesson topics with standard freelance practice.
VAQ.district({
  id: 'c7', n: 7, name: 'Client Quarter', course: '7 - Client-Getting Playbook',
  blurb: 'From your first client to onboarding to getting paid.',
  color: '#ffd166', boss: { name: 'The Scope Creep Titan', hp: 10, sprite: 'titan' },
  stages: [
    { id: 'c7s1', name: 'Your First Client', enemy: 'ghost', general: true, lessons: ['Start your Portfolio', 'Getting your First Client is the Hardest', 'Cold vs Warm Outreach', 'Why Upwork, OnlineJobsPH, LinkedIn for Getting Clients?'], qs: [
      { t: 'match', q: 'Cold or warm?', p: [['Warm outreach', 'People who already know you or were referred'], ['Cold outreach', "Strangers who don't know you yet"]], x: 'Warm usually converts faster; cold scales further.' },
      { t: 'sort', q: 'Warm or cold outreach?', b: ['Warm', 'Cold'], i: [['Messaging a former boss about automation help', 0], ['A referral from a happy client', 0], ['DMing a random agency owner on LinkedIn', 1], ['Emailing a business you found on Google Maps', 1], ['A friend who runs a small shop', 0]], x: 'Start warm while your portfolio is small.' },
      { t: 'mc', q: 'Why is the first client the hardest?', a: 'No reviews or track record yet, so trust is low', w: ['Platforms block beginners', 'Automation is illegal for new people', 'Clients only hire agencies'], x: 'A portfolio of demo projects closes that trust gap.' },
      { t: 'mc', q: 'No clients yet - what goes in your portfolio?', a: 'Demo projects that solve realistic business problems', w: ['Nothing until you get hired', 'Fake client logos', 'Other people\'s work'], x: 'Build for imaginary (or friendly) clients and show the results honestly.' },
      { t: 'match', q: 'Match the platform.', p: [['Upwork', 'Global freelance marketplace with proposals'], ['OnlineJobsPH', 'Job board focused on Filipino talent'], ['LinkedIn', 'Professional network for outreach and authority']], x: 'Three channels, three ways clients find you.' }
    ] },
    { id: 'c7s2', name: 'Proposals That Get Opened', enemy: 'bug', general: true, lessons: ['Optimize your Profiles', 'Job Selection', 'Proposals that Get Opened', 'The Loom Video', 'Submit your Proposals'], qs: [
      { t: 'mc', q: 'Why do the first lines of a proposal matter so much?', a: 'Clients only see a preview before deciding to open it', w: ['They are the only lines saved', 'They set your rate', 'They are read by a bot only'], x: 'The opener has to be about THEIR problem.' },
      { t: 'mc', q: 'What is a Loom video in a proposal?', a: 'A short screen-recorded walkthrough made just for that client', w: ['A paid Upwork ad', 'A contract template', 'A type of invoice'], x: 'A 1-2 minute personal video stands out from text-only proposals.' },
      { t: 'sort', q: 'Good Loom video habit?', b: ['Do', "Don't"], i: [['Say their name and their problem in the first seconds', 0], ['Show a quick sketch of how you would solve it', 0], ['Keep it around 1-2 minutes', 0], ['Read your resume for 10 minutes', 1], ['Send the same video to everyone', 1]], x: 'Personal, short, solution-first.' },
      { t: 'mc', q: 'Which job should you pick?', a: 'One that matches your niche with a clear problem you can solve', w: ['Any job with the biggest budget', 'Jobs outside your skills to stretch', 'The one with 50+ proposals'], x: 'Job selection = higher win rate, fewer wasted Connects.' },
      { t: 'ord', q: 'Order the proposal routine:', s: ['Pick a fitting job', 'Read the post twice', 'Record a short Loom', 'Write a short, specific proposal', 'Submit and follow up'], x: 'Quality beats volume.' }
    ] },
    { id: 'c7s3', name: 'Niche & Brand', enemy: 'slime', general: true, lessons: ['Finding your NIche', 'Digital Identity and Branding', 'Your Website'], qs: [
      { t: 'mc', q: 'Which is a niche?', a: 'GoHighLevel automations for dental clinics', w: ['I do everything for everyone', 'Virtual assistant', 'Online work'], x: 'Niche = a specific service for a specific type of client.' },
      { t: 'tf', q: 'Niching down means fewer clients will hire you.', a: false, x: 'It makes you the obvious choice for the right clients, so you win more of them.' },
      { t: 'mc', q: 'Digital identity and branding means...', a: 'Consistent name, photo, headline and message across your profiles and site', w: ['A different photo on every platform', 'Hiding your real name', 'Only having a logo'], x: 'Clients should recognise you everywhere they look.' },
      { t: 'mc', q: 'Your website\'s main job for client-getting:', a: 'Show proof and make booking a call easy', w: ['Host your blog only', 'Sell merch', 'Replace your Upwork profile entirely'], x: 'See Portfolio Pier: clear, simple, one call to action.' }
    ] },
    { id: 'c7s4', name: 'Packaging & Pricing', enemy: 'robot', general: true, lessons: ['Projects Packaging', 'Retainers and Maintenance', 'Pricing Mistakes'], qs: [
      { t: 'mc', q: 'Packaging a project means...', a: 'Offering a defined service with a clear scope, deliverables and price', w: ['Charging per minute only', 'Wrapping files in a zip', 'Never giving a price'], x: 'e.g. "Lead capture to CRM automation: 3 workflows, 1 week, fixed price."' },
      { t: 'mc', q: 'A retainer is...', a: 'A recurring monthly fee for ongoing support and maintenance', w: ['A one-time refund', 'A late fee', 'A free trial'], x: 'Automations need monitoring and updates. Retainers turn projects into steady income.' },
      { t: 'sort', q: 'Pricing mistake or smart move?', b: ['Mistake', 'Smart'], i: [['Pricing super low just to get any client', 0], ['Unlimited revisions for free', 0], ['Pricing on the value and time you save them', 1], ['Clear scope, extras quoted separately', 1], ['Not counting tool subscription costs', 0]], x: 'Underpricing and fuzzy scope are the classic traps.' },
      { t: 'mc', q: 'Client asks for "just one more small automation" mid-project. Best move?', a: 'Quote it as a change request or add-on', w: ['Do it free, every time', 'Ignore the message', 'Cancel the contract'], x: 'Clear scope protects both of you from scope creep.' }
    ] },
    { id: 'c7s5', name: 'Contracts to Cash', enemy: 'ghost', general: true, lessons: ['Contracts and Legal Protection', 'Client Onboarding', 'Invoicing and Getting Paid'], qs: [
      { t: 'sort', q: 'Should it be in the contract?', b: ['Yes', 'No need'], i: [['Scope and deliverables', 0], ['Payment terms and due dates', 0], ['Revision limits', 0], ['Who owns the work after payment', 0], ['Your favourite colour', 1]], x: 'A contract is protection for both sides.' },
      { t: 'ord', q: 'Order a smooth client onboarding:', s: ['Signed contract and deposit', 'Welcome message and kickoff call', 'Collect access and credentials securely', 'Confirm timeline and milestones', 'Start building'], x: 'Onboarding sets expectations before the first workflow.' },
      { t: 'mc', q: 'Safest way to get client app access?', a: 'Ask them to invite you as a user or use a password manager share', w: ['Ask them to email passwords in plain text', 'Guess their password', 'Use your own account for their data'], x: 'Credentials are sensitive. Use invites and secure sharing.' },
      { t: 'mc', q: 'Best payment practice for a new client project?', a: 'Take a deposit upfront, the rest on milestones or delivery', w: ['Do everything first, invoice later and hope', 'Never invoice', 'Only accept cash'], x: 'Deposits filter out unserious clients and protect your time.' },
      { t: 'tf', q: 'On Upwork, keeping payments inside the platform gives you payment protection.', a: true, x: 'Taking Upwork clients off-platform breaks the rules and loses that protection.' }
    ] }
  ]
});
