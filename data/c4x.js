// Course 4 expansion: HighLevel lessons are video-only on the portal, so this goes deep with
// core GoHighLevel knowledge an agency VA uses daily. Plans and prices change; check the HighLevel site.
VAQ.extend('c4s1', {
  learn: [
    'HighLevel (GHL) is an all-in-one platform agencies use to run clients\' marketing and sales: CRM, funnels, calendars, workflows, SMS/email, reviews, payments, courses and AI.',
    'Agency account = your top level. Each client business = a sub-account (also called a "location").',
    'Agency view: manage all sub-accounts, snapshots, billing, white-label settings. Sub-account view: one client\'s tools.',
    'Main plans: Starter (limited sub-accounts), Unlimited (unlimited sub-accounts), Agency Pro (adds SaaS mode). Free trials are available.',
    'The mobile app (LeadConnector) lets you and clients reply to leads, manage contacts and get notifications on the go.'
  ],
  qs: [
    { t: 'mc', q: 'Another name for a sub-account in HighLevel:', a: 'Location', w: ['Pipeline', 'Snapshot', 'Funnel'], x: 'You\'ll see "location" in the API and settings.' },
    { t: 'sort', q: 'Agency level or sub-account level?', b: ['Agency level', 'Sub-account level'], i: [['Create a new client account', 0], ['Build the client\'s booking calendar', 1], ['Manage snapshots', 0], ['Reply to a lead\'s SMS', 1], ['White-label/branding settings', 0], ['Edit the client\'s pipeline', 1]], x: 'Agency = manage clients. Sub-account = do the client\'s work.' },
    { t: 'mc', q: 'Which HighLevel plan unlocks SaaS mode (reselling HighLevel under your brand)?', a: 'Agency Pro', w: ['Starter', 'Free trial only', 'Every plan'], x: 'Starter < Unlimited < Agency Pro.' },
    { t: 'tf', q: 'One HighLevel agency account can manage many client businesses.', a: true, x: 'That is the whole point of sub-accounts.' }
  ]
});

VAQ.extend('c4s2', {
  learn: [
    'Contacts: every lead/customer with details, tags, notes, tasks, conversations and activity.',
    'Tags label contacts (e.g. "facebook-lead", "paid"). They power filters and trigger workflows.',
    'Pipelines show deals (opportunities) moving through stages. Each opportunity has a value, status (open/won/lost/abandoned) and owner.',
    'Smart Lists = saved filtered views of contacts (e.g. "Tagged hot-lead, no appointment").',
    'Custom fields store extra info per contact (budget, service wanted). Import contacts by CSV.'
  ],
  qs: [
    { t: 'match', q: 'Match the opportunity status.', p: [['Open', 'Still in progress'], ['Won', 'Deal closed - customer'], ['Lost', 'They said no'], ['Abandoned', 'Went cold / no response']], x: 'Status is separate from the pipeline stage.' },
    { t: 'mc', q: 'Save a filtered view "hot leads with no appointment" to reuse daily:', a: 'A Smart List', w: ['A snapshot', 'A funnel', 'A new sub-account'], x: 'Smart Lists remember your filters.' },
    { t: 'mc', q: 'Store each lead\'s budget so workflows can use it:', a: 'A custom field', w: ['The contact\'s name field', 'A tag named "$5000"', 'A pipeline name'], x: 'Custom fields hold structured data per contact.' },
    { t: 'mc', q: 'Client has 2,000 old leads in a spreadsheet. How do they get into HighLevel?', a: 'Import contacts from CSV', w: ['Type them one by one', 'Email them to support', 'They can\'t'], x: 'Map columns to fields during import.' },
    { t: 'tf', q: 'Moving an opportunity to a new pipeline stage can trigger a workflow.', a: true, x: '"Pipeline stage changed" is a common trigger.' },
    { t: 'mc', q: 'What does a pipeline give the business owner at a glance?', a: 'Where every deal is and its total value per stage', w: ['Their website speed', 'Their tax report', 'Their social posts'], x: 'Visual sales tracking.' }
  ]
});

VAQ.extend('c4s3', {
  learn: [
    'Funnels: step-by-step pages toward one goal (opt-in > thank you > booking). Websites: multi-page with navigation. Both use the drag-and-drop builder.',
    'Forms collect info on one page; Surveys are multi-step with conditional logic. Both create/update contacts.',
    'Calendars: set availability, booking rules, reminders and confirmations. Types include personal, round-robin (spread across a team), class/event, and collective.',
    'Connect a custom domain so pages live on the client\'s own web address.',
    'Embed forms and calendars on any site, not just HighLevel pages.'
  ],
  qs: [
    { t: 'mc', q: 'Spread new bookings evenly across 3 sales reps. Use a...', a: 'Round-robin calendar', w: ['Personal calendar', 'Survey', 'Smart List'], x: 'Round-robin rotates appointments across team members.' },
    { t: 'ord', q: 'A classic lead funnel:', s: ['Opt-in page (form)', 'Thank-you page', 'Booking page (calendar)', 'Confirmation'], x: 'One goal per funnel.' },
    { t: 'mc', q: 'Survey vs form: the survey advantage is...', a: 'Multiple steps with conditional logic', w: ['It cannot collect emails', 'It is only for payments', 'Nothing'], x: 'Show different questions based on earlier answers.' },
    { t: 'mc', q: 'The client has an existing WordPress site. Can they still use HighLevel forms?', a: 'Yes - embed the form or calendar code on the site', w: ['No, never', 'Only screenshots', 'Only via email'], x: 'Embeds send data straight into the CRM.' },
    { t: 'sort', q: 'Funnel or website?', b: ['Funnel', 'Website'], i: [['Free guide opt-in > thank you page', 0], ['Home, About, Services, Contact pages', 1], ['Webinar sign-up flow', 0], ['Company site with a menu', 1]], x: 'Funnels lead to one action; websites inform.' },
    { t: 'tf', q: 'Calendar reminders can go out automatically by SMS and email.', a: true, x: 'Fewer no-shows.' }
  ]
});

VAQ.extend('c4s4', {
  learn: [
    'Workflows = trigger(s) + actions. Triggers: form submitted, appointment booked, tag added, pipeline stage changed, call status, inbound message, and more.',
    'Common actions: send SMS/email, add/remove tag, create/update opportunity, wait, If/Else, internal notification, add to another workflow, webhook.',
    'If/Else branches by conditions. Wait pauses for time or until an event. Goal Event jumps ahead when the goal happens (e.g. they booked).',
    'Trigger filters narrow who enters (e.g. form = "Free Quote").',
    'Marketing tab: email campaigns/templates, Social Planner, SMS, and trigger links that track clicks.'
  ],
  qs: [
    { t: 'mc', q: 'Stop a follow-up sequence the moment the lead books. Use...', a: 'A Goal Event (appointment booked)', w: ['Wait 30 days', 'Delete the contact', 'A Smart List'], x: 'Goal Event skips the rest when the goal is reached.' },
    { t: 'mc', q: 'Different messages for leads with budget over $5,000 vs under:', a: 'If/Else on the budget custom field', w: ['Two separate sub-accounts', 'A survey', 'Social Planner'], x: 'Branch inside one workflow.' },
    { t: 'mc', q: 'Only run a workflow for the "Free Quote" form, not the "Newsletter" form:', a: 'Add a trigger filter for that form', w: ['Make two websites', 'Use a Smart List', 'Nothing - it\'s impossible'], x: 'Filters on the trigger control who enters.' },
    { t: 'mc', q: 'Notify the business owner by SMS when a hot lead arrives:', a: 'Internal notification action', w: ['Social Planner', 'Reputation request', 'A funnel'], x: 'Internal notifications go to your team, not the contact.' },
    { t: 'mc', q: 'Track who clicked a link in a text and tag them:', a: 'Trigger links', w: ['Custom values', 'Round robin', 'Surveys'], x: '"Trigger link clicked" can start a workflow.' },
    { t: 'ord', q: 'New lead nurture workflow:', s: ['Trigger: form submitted', 'Add tag "new-lead"', 'Send welcome SMS', 'Wait 1 day', 'If not booked: send follow-up email'], x: 'Speed-to-lead wins deals.' },
    { t: 'sort', q: 'Workflow action or trigger?', b: ['Trigger', 'Action'], i: [['Inbound message received', 0], ['Pipeline stage changed', 0], ['Create opportunity', 1], ['Send webhook', 1], ['Appointment status changed', 0], ['Remove from workflow', 1]], x: 'The webhook action connects HighLevel to Make, n8n or Zapier.' }
  ]
});

VAQ.extend('c4s5', {
  learn: [
    'Reputation: send review requests by SMS/email after a job; manage and reply to Google reviews in one place.',
    'Payments: connect Stripe (or other processors), create products, send invoices, payment links, and text-to-pay.',
    'Memberships/Courses host online courses; Communities host member groups (like this Tara AI portal - which runs on HighLevel!).',
    'AI: Conversation AI replies to chats/SMS and books appointments; Voice AI answers calls; Content AI helps write copy.'
  ],
  qs: [
    { t: 'mc', q: 'This Tara AI members portal itself runs on...', a: 'HighLevel memberships and communities', w: ['Zapier Interfaces', 'Make.com', 'A Claude Artifact'], x: 'You\'ve been using a HighLevel community all along.' },
    { t: 'mc', q: 'Best moment to send a review request?', a: 'Right after a happy, completed job or appointment', w: ['Before they buy', 'At 3am', 'Only once a year'], x: 'Automate it with a workflow.' },
    { t: 'mc', q: 'Customer wants to pay by tapping a link in a text:', a: 'Text-to-pay / payment link', w: ['A survey', 'A Smart List', 'A snapshot'], x: 'Payments tab.' },
    { t: 'tf', q: 'HighLevel needs a payment processor like Stripe connected to collect card payments.', a: true, x: 'Connect it in Payments settings.' }
  ]
});

VAQ.addStage('c4', 'c4s1', { id: 'c4s6', name: 'Snapshots & SaaS Mode', enemy: 'slime', bonus: true, lessons: ['Bonus: how agencies scale with HighLevel'],
  learn: [
    'A snapshot is a template copy of a sub-account\'s setup: funnels, workflows, pipelines, calendars, forms, custom fields/values, templates.',
    'Load a snapshot into a new sub-account to launch a client in minutes instead of days.',
    'Snapshots copy the build, not the client\'s contacts or conversations.',
    'White-label: your logo, domain and brand colours instead of HighLevel\'s.',
    'SaaS mode (Agency Pro): sell HighLevel as your own software with monthly plans, and rebill usage like SMS and email.'
  ],
  qs: [
    { t: 'mc', q: 'You built a perfect dental-clinic setup. To reuse it for 10 more clinics:', a: 'Save it as a snapshot and load it into each new sub-account', w: ['Rebuild by hand 10 times', 'Copy-paste screenshots', 'Share your login'], x: 'Snapshots = agency superpower.' },
    { t: 'sort', q: 'Copied by a snapshot?', b: ['Copied', 'Not copied'], i: [['Workflows', 0], ['Funnels and websites', 0], ['Pipelines', 0], ['Custom fields', 0], ['The client\'s contacts', 1], ['Past SMS conversations', 1]], x: 'Snapshots copy the build, not the data.' },
    { t: 'mc', q: 'White-labelling means...', a: 'Clients see your brand, logo and domain instead of HighLevel\'s', w: ['Everything turns white', 'Free hosting', 'Deleting HighLevel branding from the law'], x: 'Your agency looks like the software owner.' },
    { t: 'mc', q: 'SaaS mode lets an agency...', a: 'Resell HighLevel as its own software with monthly plans', w: ['Get HighLevel free', 'Skip sub-accounts', 'Use Zapier inside GHL'], x: 'Including rebilling of SMS/email usage.' },
    { t: 'tf', q: 'After loading a snapshot you still need to update client-specific details like name, phone and branding.', a: true, x: 'Custom values make this fast.' }
  ]
});

VAQ.addStage('c4', 'c4s2', { id: 'c4s7', name: 'Custom Fields, Values & Lists', enemy: 'bug', bonus: true, lessons: ['Bonus: the data layer of HighLevel'],
  learn: [
    'Custom FIELD = extra info stored on each contact (or opportunity). Different for every contact. e.g. {{contact.budget}}.',
    'Custom VALUE = one account-wide setting reused everywhere. Same for the whole sub-account. e.g. {{custom_values.business_phone}}.',
    'Merge fields like {{contact.first_name}} personalise emails, SMS and pages.',
    'Custom values + snapshots: change the value once and every page, email and workflow updates.',
    'Smart Lists filter contacts by tags, fields and activity, and allow bulk actions.'
  ],
  qs: [
    { t: 'match', q: 'Custom field or custom value?', p: [['Custom field', 'Different per contact (e.g. budget)'], ['Custom value', 'Same across the whole account (e.g. business phone)']], x: 'Fields = per person. Values = per business.' },
    { t: 'sort', q: 'Custom field or custom value?', b: ['Custom field', 'Custom value'], i: [['Lead\'s preferred service', 0], ['Clinic address', 1], ['Lead\'s pet name', 0], ['Booking link', 1], ['Business hours', 1], ['Lead\'s budget', 0]], x: 'If it is the same for every contact, make it a custom value.' },
    { t: 'mc', q: 'What does {{contact.first_name}} do in an SMS?', a: 'Inserts each contact\'s first name', w: ['Prints the text literally', 'Sends to everyone named "contact"', 'Deletes the name'], x: 'Merge fields personalise at send time.' },
    { t: 'mc', q: 'The clinic changes its phone number. With custom values you...', a: 'Update one custom value and every page and message updates', w: ['Edit 40 emails by hand', 'Rebuild the funnel', 'Create a new sub-account'], x: 'That is why snapshot builders use custom values everywhere.' },
    { t: 'mc', q: 'Send an SMS blast only to "tagged webinar, not booked" contacts:', a: 'Filter a Smart List, then bulk action', w: ['Text every contact', 'Create a funnel', 'Use a round robin'], x: 'Smart Lists support bulk actions.' }
  ]
});

VAQ.addStage('c4', 'c4s4', { id: 'c4s8', name: 'Phone, SMS & Email Setup', enemy: 'robot', bonus: true, lessons: ['Bonus: getting messages delivered'],
  learn: [
    'LC Phone = HighLevel\'s built-in phone system (calls and SMS). LC Email = its built-in email sending.',
    'US business texting needs A2P 10DLC registration (brand + campaign) or messages get blocked or filtered.',
    'Email: use a dedicated sending domain with SPF, DKIM and DMARC set up so emails land in inboxes, not spam.',
    'Conversations = one inbox for SMS, email, Facebook, Instagram, WhatsApp and webchat.',
    'Missed-call text-back is a top quick win for local businesses.'
  ],
  qs: [
    { t: 'mc', q: 'Your client\'s US texts are getting blocked. Most likely missing?', a: 'A2P 10DLC registration', w: ['A new funnel', 'A Smart List', 'A survey'], x: 'US carriers require registered business texting.' },
    { t: 'sort', q: 'Helps emails reach the inbox?', b: ['Helps', 'Hurts'], i: [['Dedicated sending domain', 0], ['SPF record', 0], ['DKIM record', 0], ['DMARC record', 0], ['Blasting 10,000 cold contacts on day one', 1]], x: 'Authentication + warming up = deliverability.' },
    { t: 'mc', q: 'Where do you reply to SMS, email, Facebook and Instagram messages in one place?', a: 'Conversations', w: ['Pipelines', 'Reputation', 'Snapshots'], x: 'A unified inbox per sub-account.' },
    { t: 'mc', q: 'LC Phone is...', a: 'HighLevel\'s built-in calling and SMS system', w: ['A mobile game', 'A Zapier app', 'A type of funnel'], x: 'Buy numbers and call/text from inside HighLevel.' },
    { t: 'mc', q: 'Best quick-win automation for a busy plumber who misses calls:', a: 'Missed-call text-back', w: ['A monthly newsletter', 'A course portal', 'A new logo'], x: 'Instantly texts the caller so the lead isn\'t lost.' }
  ]
});

VAQ.addStage('c4', 'c4s5', { id: 'c4s9', name: 'HighLevel AI Employees', enemy: 'ghost', bonus: true, lessons: ['Bonus: HighLevel\'s built-in AI'],
  learn: [
    'Conversation AI answers chats, SMS and social DMs, and can book appointments.',
    'Modes: Suggestive (drafts replies for a human to send) or Auto-pilot (replies by itself). Start suggestive, move to auto-pilot once you trust it.',
    'Train the bot with clear instructions, FAQs and a knowledge base (your website, documents).',
    'Voice AI answers inbound calls, captures details and books appointments.',
    'Always set guardrails: what it must not promise (prices, guarantees) and when to hand off to a human.'
  ],
  qs: [
    { t: 'match', q: 'Match the Conversation AI mode.', p: [['Suggestive', 'Drafts a reply for a human to approve'], ['Auto-pilot', 'Replies to contacts by itself']], x: 'Human-in-the-loop first, autonomy later.' },
    { t: 'mc', q: 'Launching a bot for a new client. Which mode first?', a: 'Suggestive, until you trust the replies', w: ['Auto-pilot on day one, no testing', 'Off forever', 'Random'], x: 'Keep the human checkpoint until you trust the output.' },
    { t: 'mc', q: 'The bot invents a discount that doesn\'t exist. Fix?', a: 'Add a rule: never offer prices or discounts - book a call instead', w: ['Raise temperature', 'Give it more tools', 'Ignore it'], x: 'Guardrails in the instructions.' },
    { t: 'sort', q: 'Good knowledge for a clinic\'s AI bot?', b: ['Feed it', "Don't"], i: [['Services and opening hours', 0], ['FAQ about parking and insurance', 0], ['Booking rules', 0], ['Patients\' private medical records', 1]], x: 'Give it what customers ask about, never private data.' },
    { t: 'mc', q: 'Voice AI is most valuable for businesses that...', a: 'Miss inbound calls during busy hours', w: ['Never get calls', 'Only use email', 'Sell nothing'], x: 'Same plumber logic from Course 1.' }
  ]
});

VAQ.addStage('c4', 'c4s9', { id: 'c4s10', name: 'HighLevel Client Builds', enemy: 'slime', bonus: true, lessons: ['Bonus: putting it all together for a real client'],
  learn: [
    'Typical local-business setup: sub-account > custom values > calendar > funnel with form > pipeline > workflows (speed-to-lead, reminders, review requests) > reporting.',
    'Speed-to-lead: reply within minutes, not hours.',
    'Every workflow should tag contacts so you can see where they are.',
    'Connect HighLevel to Make/n8n/Zapier with the webhook action or inbound webhook trigger when you need tools GHL doesn\'t have.'
  ],
  qs: [
    { t: 'ord', q: 'Order a new client onboarding build in HighLevel:', s: ['Create the sub-account (or load a snapshot)', 'Set custom values (name, phone, links)', 'Build calendar and funnel', 'Set up pipeline', 'Turn on workflows and test'], x: 'Foundation first, automation last.' },
    { t: 'ord', q: 'Order the appointment reminder sequence:', s: ['Appointment booked', 'Send confirmation SMS', 'Wait until 1 day before', 'Send reminder', 'Wait until 2 hours before', 'Send final reminder'], x: 'Reminders cut no-shows.' },
    { t: 'mc', q: 'Client wants new GHL leads sent to an n8n AI agent for scoring. Connect using...', a: 'The workflow webhook action pointing to an n8n webhook', w: ['Email forwarding', 'A screenshot', 'A survey'], x: 'Webhooks bridge HighLevel and your automation tools.' },
    { t: 'mc', q: '"Speed-to-lead" means...', a: 'Contacting new leads within minutes', w: ['Typing fast', 'Fast website loading only', 'Sending invoices quickly'], x: 'The first business to reply often wins the customer.' },
    { t: 'sort', q: 'Belongs in a "happy customer" automation?', b: ['Yes', 'No'], i: [['Thank-you message after the visit', 0], ['Review request', 0], ['Referral offer', 0], ['Delete the contact', 1]], x: 'Turn happy customers into reviews and referrals.' }
  ]
});
