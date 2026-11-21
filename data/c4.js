// Course 4 - HighLevel  ->  District: HighLevel Heights
// Portal lessons are video-only; questions are built from the lesson topics and core GoHighLevel concepts.
VAQ.district({
  id: 'c4', n: 4, name: 'HighLevel Heights', course: '4 - HighLevel',
  blurb: "GoHighLevel's key features: CRM, pipelines, funnels, calendars, workflows and more.",
  color: '#06d6a0', boss: { name: 'The Pipeline Hydra', hp: 9, sprite: 'hydra' },
  stages: [
    { id: 'c4s1', name: 'Agency vs Sub-Account', enemy: 'bug', general: true, lessons: ['What is HighLevel?', 'Sign Up for Trial Account', 'Agency Dashboard', 'Sub Account View', 'Gray Labeled Mobile App Setup'], qs: [
      { t: 'mc', q: 'What is HighLevel (GHL)?', a: 'An all-in-one CRM and marketing platform built for agencies', w: ['A video editing app', 'A single-purpose email tool', 'An AI model like Claude'], x: 'CRM, funnels, calendars, automations, payments, reviews and more in one place.' },
      { t: 'match', q: 'Agency level or sub-account level?', p: [['Agency account', 'Your top-level account that manages all clients'], ['Sub-account', "One client's business workspace"]], x: 'You create one sub-account per client business.' },
      { t: 'mc', q: 'You sign a new dental clinic client. In HighLevel you create...', a: 'A new sub-account for the clinic', w: ['A new agency account', 'A new pipeline only', 'A new email address'], x: "Each client gets its own sub-account with its own contacts, calendars and automations." },
      { t: 'tf', q: 'Sub-accounts keep each client\'s contacts and data separate.', a: true, x: 'That separation is why agencies use them.' },
      { t: 'mc', q: 'HighLevel\'s mobile app that clients can use (and you can brand) is commonly called...', a: 'LeadConnector', w: ['Zapier Mobile', 'Make Go', 'n8n Pocket'], x: 'The gray-labeled app lets clients reply to leads and manage their CRM on the go.' },
      { t: 'mc', q: 'Where do you see an overview of ALL your client sub-accounts?', a: 'The Agency dashboard / agency view', w: ['Inside one contact record', 'In a funnel page', 'In a form'], x: 'Agency view = the bird\'s-eye view; sub-account view = one client.' }
    ] },
    { id: 'c4s2', name: 'CRM & Pipelines', enemy: 'slime', general: true, lessons: ['CRM and Pipeline Management', '(Addtl) CRM & Contacts'], qs: [
      { t: 'mc', q: 'In HighLevel, a deal moving through sales stages is called an...', a: 'Opportunity', w: ['Operation', 'Bundle', 'Task'], x: 'Opportunities sit in pipeline stages like New Lead > Contacted > Booked > Won.' },
      { t: 'ord', q: 'Order this simple sales pipeline:', s: ['New Lead', 'Contacted', 'Appointment Booked', 'Proposal Sent', 'Won'], x: 'Pipelines show where every deal is at a glance.' },
      { t: 'mc', q: 'Best way to group contacts like "webinar-attendee" or "hot-lead"?', a: 'Tags', w: ['Renaming contacts', 'A new sub-account per group', 'Deleting old ones'], x: 'Tags power filters, smart lists and workflow triggers.' },
      { t: 'sort', q: 'Contact record or pipeline?', b: ['Contact record', 'Pipeline'], i: [['Phone number and email', 0], ['Notes and conversation history', 0], ['Which sales stage the deal is in', 1], ['Deal value', 1], ['Tags', 0]], x: 'Contacts = who. Opportunities in pipelines = where the deal is.' },
      { t: 'tf', q: 'One contact can have an opportunity in a pipeline.', a: true, x: 'Opportunities are linked to contacts.' }
    ] },
    { id: 'c4s3', name: 'Funnels, Forms & Calendars', enemy: 'robot', general: true, lessons: ['Sales Funnels / Website Builder', 'Forms and Surveys', 'Bookings and Appointments', '(Addtl) Funnels & Websites'], qs: [
      { t: 'mc', q: 'A funnel is...', a: 'A series of pages that guide a visitor to one action (opt-in, book, buy)', w: ['A CRM tag', 'A payment processor', 'A type of email'], x: 'Landing page > thank-you page > booking page, for example.' },
      { t: 'match', q: 'Match the HighLevel builder to its job.', p: [['Funnel', 'Step-by-step pages to one goal'], ['Website', 'Multi-page site with navigation'], ['Form', 'Collect lead info'], ['Survey', 'Multi-step questions with logic']], x: 'All of them feed contacts straight into the CRM.' },
      { t: 'mc', q: 'A lead should book a call without emailing back and forth. Use...', a: 'A HighLevel calendar booking link', w: ['A survey', 'A pipeline stage', 'A tag'], x: 'Calendars handle availability, bookings, confirmations and reminders.' },
      { t: 'tf', q: 'When someone submits a HighLevel form, they become a contact in the CRM.', a: true, x: 'Forms create or update contacts automatically.' },
      { t: 'mc', q: 'Biggest reason to embed a form on a funnel page instead of a plain email link:', a: 'Lead data lands in the CRM and can trigger workflows', w: ['It looks older', 'It costs more', 'It disables tracking'], x: 'Structured data in = automation possible.' }
    ] },
    { id: 'c4s4', name: 'Workflows & Marketing', enemy: 'ghost', general: true, lessons: ['Automations', 'Marketing', '(Addtl Portfolio) Workflow Automations'], qs: [
      { t: 'mc', q: 'HighLevel automations are built in...', a: 'Workflows (a trigger plus actions)', w: ['Spreadsheets', 'Funnels only', 'The contact notes'], x: 'Same trigger -> action idea as Zapier, Make and n8n.' },
      { t: 'sort', q: 'Workflow trigger or action?', b: ['Trigger', 'Action'], i: [['Form submitted', 0], ['Send SMS', 1], ['Appointment booked', 0], ['Add tag', 1], ['Wait 1 day', 1], ['Contact tag added', 0]], x: 'Trigger = when. Actions = what happens next (including waits).' },
      { t: 'ord', q: 'Build a missed-call text-back workflow:', s: ['Trigger: call status = missed', 'Action: send SMS "Sorry we missed you!"', 'Action: create a follow-up task', 'Action: add tag "missed-call"'], x: 'A classic HighLevel automation that saves leads.' },
      { t: 'match', q: 'Match the marketing tool.', p: [['Email campaigns', 'Send newsletters and sequences'], ['Social Planner', 'Schedule social media posts'], ['SMS', 'Text messages to contacts']], x: 'All inside the Marketing tab.' },
      { t: 'tf', q: 'A "Wait" step can delay the next workflow action by hours or days.', a: true, x: 'Great for follow-up sequences.' }
    ] },
    { id: 'c4s5', name: 'Reviews, Payments & AI', enemy: 'bug', general: true, lessons: ['Courses, Products, Communities', 'Reputation Management', 'Payments', 'AI Agents'], qs: [
      { t: 'mc', q: 'Reputation Management in HighLevel mainly helps a business...', a: 'Request and manage online reviews (like Google reviews)', w: ['Build pipelines', 'Host videos', 'Write code'], x: 'Send review requests automatically after a job is done.' },
      { t: 'mc', q: 'A coach wants to sell an online course and host a member group. Which features?', a: 'Courses/Memberships and Communities', w: ['Pipelines only', 'Reputation only', 'Forms only'], x: 'HighLevel can host courses, products and communities.' },
      { t: 'mc', q: 'Send a client an invoice they can pay online. Use...', a: 'Payments (invoices + a connected processor like Stripe)', w: ['A survey', 'A tag', 'The social planner'], x: 'Payments covers invoices, products and payment links.' },
      { t: 'mc', q: 'HighLevel AI agents (e.g. Conversation AI) can...', a: 'Reply to leads and book appointments automatically', w: ['Replace the CRM', 'Edit videos', 'Only translate text'], x: 'Same agent idea from Course 1, built into the CRM.' },
      { t: 'ord', q: 'Order a "happy customer" flow:', s: ['Appointment completed', 'Wait 2 hours', 'Send review request SMS', 'Thank them when they leave a review'], x: 'Automated review requests grow reputation on autopilot.' }
    ] }
  ]
});
