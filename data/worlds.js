// Each course is its own world: own scene, own areas, own boss. Worlds never lock each other.
// Areas list stage ids in play order (must match the order in VAQ.D). Any stage not listed
// lands in a trailing "More" area, so new stages still show up.
VAQ.WORLDS = {
  c1: { theme: 'valley', group: 'tech', icon: '⚙️', areas: [
    { name: 'AI Basics Meadow', theme: 'valley', color: '#4cc9f0', ids: ['c1s1', 'c1s9', 'c1s2', 'c1s10'] },
    { name: 'Zapier Fields', theme: 'valley', color: '#ff7a3d', ids: ['c1s3', 'c1s11', 'c1s12', 'c1s4'] },
    { name: 'Make Mines', theme: 'mine', color: '#a66bff', ids: ['c1s5', 'c1s13'] },
    { name: 'n8n Forest', theme: 'forest', color: '#ff6d8a', ids: ['c1s6', 'c1s14'] },
    { name: 'Prompt Forge', theme: 'mine', color: '#ffb547', ids: ['c1s7', 'c1s8'] },
    { name: 'Builder Labs ⭐', theme: 'quarter', color: '#3ddc97', ids: ['c1s15', 'c1s16', 'c1s17'] }
  ] },
  c2: { theme: 'harbor', group: 'tech', icon: '🤖', areas: [
    { name: 'The Docks', theme: 'harbor', color: '#b388ff', ids: ['c2s1', 'c2s6', 'c2s7'] },
    { name: 'Engine Room', theme: 'mine', color: '#7aa2ff', ids: ['c2s2', 'c2s3', 'c2s8'] },
    { name: 'Signal Tower', theme: 'harbor', color: '#5ee6c8', ids: ['c2s4', 'c2s9'] },
    { name: 'The Sea Wall', theme: 'harbor', color: '#ff6b8b', ids: ['c2s5', 'c2s10'] }
  ] },
  c3: { theme: 'lighthouse', group: 'tech', icon: '💡', areas: [
    { name: 'The Shore', theme: 'lighthouse', color: '#ff8a5b', ids: ['c3s1', 'c3s2', 'c3s5'] },
    { name: 'The Lamp Room', theme: 'lighthouse', color: '#ffc15e', ids: ['c3s3', 'c3s4'] },
    { name: 'Code Cove', theme: 'harbor', color: '#e07a5f', ids: ['c3s6', 'c3s7'] }
  ] },
  c4: { theme: 'heights', group: 'tech', icon: '⛰️', areas: [
    { name: 'Base Camp', theme: 'forest', color: '#06d6a0', ids: ['c4s1', 'c4s6'] },
    { name: 'CRM Ridge', theme: 'heights', color: '#4cc9f0', ids: ['c4s2', 'c4s7'] },
    { name: 'Funnel Falls', theme: 'heights', color: '#3a86ff', ids: ['c4s3', 'c4s4', 'c4s8'] },
    { name: 'The Summit', theme: 'heights', color: '#ffd166', ids: ['c4s5', 'c4s9', 'c4s10'] }
  ] },
  c5: { theme: 'plaza', group: 'career', icon: '🛒', areas: [
    { name: 'Market Square', theme: 'plaza', color: '#14a800', ids: ['c5s1', 'c5s2'] }
  ] },
  c6: { theme: 'pier', group: 'career', icon: '🎡', areas: [
    { name: 'The Boardwalk', theme: 'pier', color: '#f15bb5', ids: ['c6s1', 'c6s2'] }
  ] },
  c7: { theme: 'quarter', group: 'career', icon: '🏙️', areas: [
    { name: 'Main Street', theme: 'quarter', color: '#ffd166', ids: ['c7s1', 'c7s2', 'c7s3'] },
    { name: 'Deal Row', theme: 'quarter', color: '#ff9f1c', ids: ['c7s4', 'c7s5'] }
  ] },
  c8: { theme: 'cafe', group: 'career', icon: '☕', areas: [
    { name: 'The Café', theme: 'cafe', color: '#ef476f', ids: ['c8s1', 'c8s2', 'c8s3'] }
  ] }
};
