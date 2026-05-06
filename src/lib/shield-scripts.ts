/* ═══════════════════════════════════════════════════════════════════════
   BYLDRS GUARDIAN — 20-Point Shield Marketer's Pack
   All 20 video scripts with hooks, captions, and full scripts
   ═══════════════════════════════════════════════════════════════════════ */

export interface ShieldScript {
  num: number;
  title: string;
  hook: string;
  caption: string;
  script: string;
  category: 'safety' | 'process' | 'quality' | 'communication' | 'financial';
  accentColor: string;
  icon: string;
}

export const shieldScripts: ShieldScript[] = [
  {
    num: 1,
    title: 'Safety Equity',
    hook: 'Protecting your home equity.',
    caption:
      "Safety isn't just a buzzword; it's a standard. Here is how we ensure your investment is protected from day one.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! When you're planning a project, the most important thing is protecting your home's equity. One way we do that is by maintaining a Gold-Level standing for Workers' Comp. It's about making sure everyone on your property is fully covered, so you can enjoy the process with peace of mind. Hey, thanks for checking out our checklist. To see how we prioritize your safety, visit S. New. Roof. Dot Com. I'll see you for the next tip!"`,
    category: 'safety',
    accentColor: '#3257C2',
    icon: 'Shield',
  },
  {
    num: 2,
    title: 'Decision Comfort',
    hook: 'Take your time to decide.',
    caption:
      'You should never feel rushed into a major home decision. We honor your right to reflect and choose with confidence.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Choosing a roof is a big decision, and you deserve time to feel confident about it. We believe in the 'Reflection Period'—honoring your legal right to take a few days to review everything. We're here to be a resource, not a rush. Hey, thanks for checking out our checklist. For more info on your rights as a homeowner, head over to S. New. Roof. Dot Com. See you next time!"`,
    category: 'communication',
    accentColor: '#3ED1B8',
    icon: 'Clock',
  },
  {
    num: 3,
    title: 'Price Certainty',
    hook: 'How to get an accurate quote.',
    caption:
      'Surprises belong at birthday parties, not on your roof. Here is how we ensure your project stays on budget.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We want the price you're quoted to be the price you actually pay. That's why our standard is a detailed 'Pre-Flight' inspection. We look into the structural details before we start, so we can give you a clear, honest budget with no surprises. Hey, thanks for checking out our checklist. For more on how we plan for success, visit S. New. Roof. Dot Com. I'll see you soon!"`,
    category: 'financial',
    accentColor: '#F5A623',
    icon: 'DollarSign',
  },
  {
    num: 4,
    title: 'Warranty Integrity',
    hook: 'Making your warranty count.',
    caption:
      'A warranty is only as good as the certification behind it. Let\'s talk about why factory training matters for you.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! A roof is a long-term investment, and the warranty is your safety net. To keep that thirty-year protection valid, we maintain strict factory certifications. It means the manufacturer stands behind our work because we've been trained to their highest standards. Hey, thanks for checking out our checklist. See our certifications at S. New. Roof. Dot Com. See you for the next tip!"`,
    category: 'quality',
    accentColor: '#3257C2',
    icon: 'Award',
  },
  {
    num: 5,
    title: 'Restoration Focus',
    hook: 'Fixing it right the first time.',
    caption:
      "We don't just patch leaks; we restore the integrity of your home. It's about a solution that lasts for decades.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in solving problems, not just patching them. If there's a leak, we look for the root cause—like structural rot or poor drainage. Fixing the source ensures your new roof stays strong for its entire lifespan. Hey, thanks for checking out our checklist. See our restoration process at S. New. Roof. Dot Com. I'll see you next time!"`,
    category: 'quality',
    accentColor: '#3ED1B8',
    icon: 'Wrench',
  },
  {
    num: 6,
    title: 'Energy Efficiency',
    hook: 'Lowering your energy bills.',
    caption:
      'A cool home starts with a breathable roof. Here is how a ventilation audit can save you money this summer.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your roof does more than stop rain; it helps your home breathe. Proper ventilation keeps your attic cool, which lowers your AC bills and prevents shingles from 'cooking' in the sun. We include a full ventilation audit with every project. Hey, thanks for checking out our checklist. Learn more at S. New. Roof. Dot Com. I'll see you soon!"`,
    category: 'quality',
    accentColor: '#F5A623',
    icon: 'Thermometer',
  },
  {
    num: 7,
    title: 'Curb Appeal Design',
    hook: 'Performance meets style.',
    caption:
      "You shouldn't have to choose between a dry home and a beautiful one. Let's talk about Aesthetic Engineering.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We care about your home's curb appeal just as much as you do. We use 'Aesthetic Engineering' to place vents and accessories where they are most effective but least visible from the street. It keeps your Southern California style looking sharp. Hey, thanks for checking out our checklist. See our design gallery at S. New. Roof. Dot Com. See you next time!"`,
    category: 'quality',
    accentColor: '#3257C2',
    icon: 'Palette',
  },
  {
    num: 8,
    title: 'Communication Standards',
    hook: 'Stay in the loop.',
    caption:
      'Transparency is the foundation of trust. Here is how we keep you informed during every step of your project.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in total transparency. If something unexpected comes up during a project, like a cracked tile or a hidden pipe, we notify you immediately. No excuses, just honest communication and a plan to fix it. Hey, thanks for checking out our checklist. See our honesty standard at S. New. Roof. Dot Com. I'll see you for the next tip!"`,
    category: 'communication',
    accentColor: '#3ED1B8',
    icon: 'MessageSquare',
  },
  {
    num: 9,
    title: 'Technology Respect',
    hook: 'Respecting your home tech.',
    caption:
      'From WiFi to Satellites, your home tech matters. Here is how we protect your equipment during an install.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your roof is home to a lot of tech these days, like satellite dishes and antennas. We make it a priority to handle that equipment professionally, ensuring your signal stays strong and your equipment is secure during the installation. Hey, thanks for checking out our checklist. For more on how we protect your home, visit S. New. Roof. Dot Com. See you soon!"`,
    category: 'process',
    accentColor: '#F5A623',
    icon: 'Wifi',
  },
  {
    num: 10,
    title: 'Permit Professionalism',
    hook: 'Building future value.',
    caption:
      'Doing things by the book today makes selling your home easier tomorrow. Let\'s talk about local compliance.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We treat every project as a contribution to your home's future resale value. That means ensuring one hundred percent compliance with LA and Orange County building codes. Proper permits aren't just a rule; they're your proof of quality. Hey, thanks for checking out our checklist. See our compliance guide at S. New. Roof. Dot Com. See you next time!"`,
    category: 'process',
    accentColor: '#3257C2',
    icon: 'ClipboardCheck',
  },
  {
    num: 11,
    title: 'Team Specialization',
    hook: 'Meet the experts.',
    caption:
      "We believe in the power of specialized craft. Meet the dedicated team behind your S. New. Roof.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Excellence comes from specialization. Instead of general crews, we use dedicated in-house experts for every stage of your roof. It ensures that the person working on your project is a master of that specific craft. Hey, thanks for checking out our checklist. Meet our team at S. New. Roof. Dot Com. I'll see you for the next tip!"`,
    category: 'quality',
    accentColor: '#3ED1B8',
    icon: 'Users',
  },
  {
    num: 12,
    title: 'Digital Partnership',
    hook: 'Real-time project updates.',
    caption:
      'No more wondering "what\'s next?" We use technology to keep you in the driver\'s seat of your project.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We know your time is valuable. That's why we use digital partnership tools to give you real-time updates on your phone. You'll know exactly when the materials arrive and when the final inspection is scheduled. Hey, thanks for checking out our checklist. Stay connected at S. New. Roof. Dot Com. I'll see you soon!"`,
    category: 'communication',
    accentColor: '#F5A623',
    icon: 'Smartphone',
  },
  {
    num: 13,
    title: 'Modern Materials',
    hook: 'The new standard in protection.',
    caption:
      'Moving beyond old-school felt paper. Let\'s look at why synthetic underlayment is the modern choice.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Technology has changed roofing for the better. Instead of traditional felt paper, we use high-performance synthetic underlayment. It's a tear-resistant, waterproof barrier that acts as a second roof for your home's protection. Hey, thanks for checking out our checklist. See the tech we use at S. New. Roof. Dot Com. See you next time!"`,
    category: 'quality',
    accentColor: '#3257C2',
    icon: 'Layers',
  },
  {
    num: 14,
    title: 'Garden Guardianship',
    hook: 'Protecting your property.',
    caption:
      "A new roof shouldn't come at the cost of your landscaping. Here is our plan to protect your yard.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We treat your entire property with respect. Our 'Garden Guardianship' plan uses specialized shields and covers to protect your expensive landscaping and irrigation systems while we work. We want to leave your yard exactly how we found it. Hey, thanks for checking out our checklist. See our safety plans at S. New. Roof. Dot Com. I'll see you soon!"`,
    category: 'safety',
    accentColor: '#3ED1B8',
    icon: 'TreePine',
  },
  {
    num: 15,
    title: 'Detail Excellence',
    hook: 'The importance of the details.',
    caption:
      "It's the small things that prevent the big leaks. Why we prioritize brand-new flashing every time.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! In roofing, the details are everything. That's why we always use brand-new, high-grade metal flashing around chimneys and vents. Reusing old metal is a shortcut we just don't take, because your home deserves a fresh start. Hey, thanks for checking out our checklist. See our craftsmanship at S. New. Roof. Dot Com. See you for the next tip!"`,
    category: 'quality',
    accentColor: '#F5A623',
    icon: 'Star',
  },
  {
    num: 16,
    title: 'Site Stewardship',
    hook: 'A cleaner workspace.',
    caption:
      "We believe a safe job site is a clean job site. Here is our daily routine for your family's safety.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We know your home is a sanctuary, even during construction. Our 'Site Stewardship' means we perform a meticulous magnetic sweep and clean-up every single day. We want your driveway and yard to be safe for your kids and pets tonight. Hey, thanks for checking out our checklist. See our safety standards at S. New. Roof. Dot Com. I'll see you soon!"`,
    category: 'safety',
    accentColor: '#3257C2',
    icon: 'Sparkles',
  },
  {
    num: 17,
    title: 'Foundation First',
    hook: 'Building on a solid base.',
    caption:
      "What's under your shingles is just as important as what's on top. Let's talk about structural integrity.",
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! A great roof starts with a great foundation. We always recommend a full tear-off so we can inspect your home's wooden deck. It's the only way to ensure the structure is solid, rot-free, and ready to support your new investment. Hey, thanks for checking out our checklist. Learn more about our process at S. New. Roof. Dot Com. See you next time!"`,
    category: 'process',
    accentColor: '#3ED1B8',
    icon: 'Home',
  },
  {
    num: 18,
    title: 'Financial Clarity',
    hook: 'Transparency in your budget.',
    caption:
      'No verbal guesses, just digital clarity. Here is how we manage project updates and approvals.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in total financial clarity. If we ever need to adjust the project, we provide a digital change order for your approval right on your phone. It keeps the budget clear and ensures you are always in control. Hey, thanks for checking out our checklist. See how we work at S. New. Roof. Dot Com. I'll see you for the next tip!"`,
    category: 'financial',
    accentColor: '#F5A623',
    icon: 'Receipt',
  },
  {
    num: 19,
    title: 'Craftsmanship Precision',
    hook: 'Storm-ready craftsmanship.',
    caption:
      'Precision is the key to longevity. Let\'s look at the factory specs that keep your roof secure.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Long-lasting roofs come down to precision. Our crews follow exact factory nailing patterns to ensure maximum wind resistance and to keep your warranty fully intact. It's about doing the job the right way, every single time. Hey, thanks for checking out our checklist. See our detail work at S. New. Roof. Dot Com. See you soon!"`,
    category: 'quality',
    accentColor: '#3257C2',
    icon: 'Target',
  },
  {
    num: 20,
    title: 'Investment Control',
    hook: 'Safe and fair payments.',
    caption:
      'Keeping your investment secure. Here is how we follow CSLB guidelines for your peace of mind.',
    script: `"What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your peace of mind is our priority, especially when it comes to payments. We follow California state guidelines for progress payments, so you only pay as work is completed. It's a fair, professional way to keep you in total control. Hey, thanks for checking out our checklist. Learn about safe investing at S. New. Roof. Dot Com. I'll see you for the next tip!"`,
    category: 'financial',
    accentColor: '#3ED1B8',
    icon: 'Lock',
  },
];

export const scriptCategories = [
  { key: 'all' as const, label: 'All Scripts', count: 20 },
  { key: 'safety' as const, label: 'Safety & Protection', count: 3 },
  { key: 'quality' as const, label: 'Quality & Craft', count: 8 },
  { key: 'communication' as const, label: 'Communication', count: 3 },
  { key: 'process' as const, label: 'Process & Standards', count: 3 },
  { key: 'financial' as const, label: 'Financial Clarity', count: 3 },
];

export const categoryColors: Record<string, string> = {
  safety: '#3257C2',
  quality: '#3ED1B8',
  communication: '#F5A623',
  process: '#9333EA',
  financial: '#CD7F32',
};
