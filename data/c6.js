// Course 6 - Build your Website/Portfolio  ->  District: Portfolio Pier
VAQ.district({
  id: 'c6', n: 6, name: 'Portfolio Pier', course: '6 - Build your Website/Portfolio',
  blurb: "Build a portfolio site with Lovable.dev in 5 prompts, without overwhelming clients.",
  color: '#f15bb5', boss: { name: 'The Blank Page Mimic', hp: 7, sprite: 'mimic' },
  stages: [
    { id: 'c6s1', name: 'The 5-Prompt Build', enemy: 'robot', lessons: ['Lovable.dev Website Portfolio Creation', 'Lovable.dev Website Portfolio Creation (Zoom)'], qs: [
      { t: 'ord', q: 'Put the 5 Lovable.dev prompts in the order the lesson uses them.', s: ['Structure', 'UI/UX', 'Content', 'Overall design', 'Fix issues'], x: 'Build the skeleton first, then style, then words, then polish, then fix.' },
      { t: 'match', q: 'Match each prompt stage to what it does.', p: [['Structure', 'Add sections: services, experience, works, testimonials, contact'], ['UI/UX', 'Main colour plus click and scroll effects'], ['Content', 'Swap specific text and add portfolio images'], ['Fix issues', 'Describe the problem and ask it to fix it']], x: 'One job per prompt keeps the AI from breaking what already works.' },
      { t: 'sort', q: 'Which sections does the Structure prompt ask for?', b: ['In the prompt', 'Not in it'], i: [['Services', 0], ['Work experience', 0], ['Previous works', 0], ['Testimonials', 0], ['Contact', 0], ['Blog with 50 posts', 1], ['Pricing calculator', 1]], x: 'Plus: "Make my name as a logo" and your resume details.' },
      { t: 'mc', q: 'In the Structure prompt, what becomes the logo?', a: 'Your name', w: ['A stock icon', 'The Lovable logo', 'Nothing - no logo'], x: '"Make my name as a logo."' },
      { t: 'mc', q: 'Changing one line of text safely. Best prompt shape?', a: 'On the "About" section, change "old text" to "new text"', w: ['Make the text better', 'Rewrite the whole site', 'Fix everything'], x: 'Name the section, quote the old text, give the new text.' },
      { t: 'mc', q: 'Using a Pinterest design as inspiration, what must you also say?', a: "Don't change my content and don't copy the content from the image", w: ['Copy everything exactly', 'Use their brand name', 'Nothing else'], x: 'You want the LOOK, not their words. Keep your own content.' },
      { t: 'tf', q: 'If something breaks, the lesson\'s fix prompt is to describe the issue and ask Lovable to fix it.', a: true, x: 'Prompt 5: "[issues], please fix it."' }
    ] },
    { id: 'c6s2', name: 'Portfolio That Converts', enemy: 'slime', general: true, lessons: ['A well-converting portfolio website that won\'t overwhelm clients', 'How to Create a Portfolio Website in Claude Code (Course 3)'], qs: [
      { t: 'mc', q: 'The course goal for your portfolio site is...', a: "Well-converting and doesn't overwhelm clients", w: ['As many pages as possible', 'Every animation available', 'Text-only'], x: 'Clear, simple, proof-heavy. One obvious next step.' },
      { t: 'sort', q: 'Keep it or cut it?', b: ['Keep', 'Cut'], i: [['Clear headline: what you do and for whom', 0], ['3-4 strong automation case studies', 0], ['Testimonials', 0], ['One clear "Book a call" button', 0], ['Autoplaying music', 1], ['Walls of tiny text', 1]], x: "Clients skim. Make the value obvious in seconds." },
      { t: 'mc', q: 'Best portfolio "previous works" item for an AI automation VA:', a: 'Problem > workflow screenshot or video > time or money saved', w: ['A list of every app you have heard of', 'Your school grades', 'A generic stock photo'], x: 'Outcome-focused case studies convert.' },
      { t: 'mc', q: 'How do you avoid the generic AI-website look?', a: 'Use a clear design direction and real inspiration, then iterate', w: ['Accept the first draft', 'Add more gradients', 'Use only default colours'], x: 'Course 3 adds master prompts and Frontend/Taste skills for Claude Code too.' }
    ] }
  ]
});
