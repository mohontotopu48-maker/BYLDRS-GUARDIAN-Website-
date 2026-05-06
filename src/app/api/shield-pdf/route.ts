import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  try {
    const scripts = [
      { num: 1, title: 'Safety Equity', hook: 'Protecting your home equity.', caption: "Safety isn't just a buzzword; it's a standard. Here is how we ensure your investment is protected from day one.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! When you're planning a project, the most important thing is protecting your home's equity. One way we do that is by maintaining a Gold-Level standing for Workers' Comp. It's about making sure everyone on your property is fully covered, so you can enjoy the process with peace of mind. Hey, thanks for checking out our checklist. To see how we prioritize your safety, visit S. New. Roof. Dot Com. I'll see you for the next tip!", category: 'SAFETY', color: '#3257C2' },
      { num: 2, title: 'Decision Comfort', hook: 'Take your time to decide.', caption: 'You should never feel rushed into a major home decision. We honor your right to reflect and choose with confidence.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Choosing a roof is a big decision, and you deserve time to feel confident about it. We believe in the 'Reflection Period'—honoring your legal right to take a few days to review everything. We're here to be a resource, not a rush. Hey, thanks for checking out our checklist. For more info on your rights as a homeowner, head over to S. New. Roof. Dot Com. See you next time!", category: 'COMMUNICATION', color: '#3ED1B8' },
      { num: 3, title: 'Price Certainty', hook: 'How to get an accurate quote.', caption: 'Surprises belong at birthday parties, not on your roof. Here is how we ensure your project stays on budget.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We want the price you're quoted to be the price you actually pay. That's why our standard is a detailed 'Pre-Flight' inspection. We look into the structural details before we start, so we can give you a clear, honest budget with no surprises. Hey, thanks for checking out our checklist. For more on how we plan for success, visit S. New. Roof. Dot Com. I'll see you soon!", category: 'FINANCIAL', color: '#F5A623' },
      { num: 4, title: 'Warranty Integrity', hook: 'Making your warranty count.', caption: "A warranty is only as good as the certification behind it. Let's talk about why factory training matters for you.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! A roof is a long-term investment, and the warranty is your safety net. To keep that thirty-year protection valid, we maintain strict factory certifications. It means the manufacturer stands behind our work because we've been trained to their highest standards. Hey, thanks for checking out our checklist. See our certifications at S. New. Roof. Dot Com. See you for the next tip!", category: 'QUALITY', color: '#3257C2' },
      { num: 5, title: 'Restoration Focus', hook: 'Fixing it right the first time.', caption: "We don't just patch leaks; we restore the integrity of your home. It's about a solution that lasts for decades.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in solving problems, not just patching them. If there's a leak, we look for the root cause—like structural rot or poor drainage. Fixing the source ensures your new roof stays strong for its entire lifespan. Hey, thanks for checking out our checklist. See our restoration process at S. New. Roof. Dot Com. I'll see you next time!", category: 'QUALITY', color: '#3ED1B8' },
      { num: 6, title: 'Energy Efficiency', hook: 'Lowering your energy bills.', caption: 'A cool home starts with a breathable roof. Here is how a ventilation audit can save you money this summer.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your roof does more than stop rain; it helps your home breathe. Proper ventilation keeps your attic cool, which lowers your AC bills and prevents shingles from 'cooking' in the sun. We include a full ventilation audit with every project. Hey, thanks for checking out our checklist. Learn more at S. New. Roof. Dot Com. I'll see you soon!", category: 'QUALITY', color: '#F5A623' },
      { num: 7, title: 'Curb Appeal Design', hook: 'Performance meets style.', caption: "You shouldn't have to choose between a dry home and a beautiful one. Let's talk about Aesthetic Engineering.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We care about your home's curb appeal just as much as you do. We use 'Aesthetic Engineering' to place vents and accessories where they are most effective but least visible from the street. It keeps your Southern California style looking sharp. Hey, thanks for checking out our checklist. See our design gallery at S. New. Roof. Dot Com. See you next time!", category: 'QUALITY', color: '#3257C2' },
      { num: 8, title: 'Communication Standards', hook: 'Stay in the loop.', caption: 'Transparency is the foundation of trust. Here is how we keep you informed during every step of your project.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in total transparency. If something unexpected comes up during a project, like a cracked tile or a hidden pipe, we notify you immediately. No excuses, just honest communication and a plan to fix it. Hey, thanks for checking out our checklist. See our honesty standard at S. New. Roof. Dot Com. I'll see you for the next tip!", category: 'COMMUNICATION', color: '#3ED1B8' },
      { num: 9, title: 'Technology Respect', hook: 'Respecting your home tech.', caption: 'From WiFi to Satellites, your home tech matters. Here is how we protect your equipment during an install.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your roof is home to a lot of tech these days, like satellite dishes and antennas. We make it a priority to handle that equipment professionally, ensuring your signal stays strong and your equipment is secure during the installation. Hey, thanks for checking out our checklist. For more on how we protect your home, visit S. New. Roof. Dot Com. See you soon!", category: 'PROCESS', color: '#F5A623' },
      { num: 10, title: 'Permit Professionalism', hook: 'Building future value.', caption: "Doing things by the book today makes selling your home easier tomorrow. Let's talk about local compliance.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We treat every project as a contribution to your home's future resale value. That means ensuring one hundred percent compliance with LA and Orange County building codes. Proper permits aren't just a rule; they're your proof of quality. Hey, thanks for checking out our checklist. See our compliance guide at S. New. Roof. Dot Com. See you next time!", category: 'PROCESS', color: '#3257C2' },
      { num: 11, title: 'Team Specialization', hook: 'Meet the experts.', caption: "We believe in the power of specialized craft. Meet the dedicated team behind your S. New. Roof.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Excellence comes from specialization. Instead of general crews, we use dedicated in-house experts for every stage of your roof. It ensures that the person working on your project is a master of that specific craft. Hey, thanks for checking out our checklist. Meet our team at S. New. Roof. Dot Com. I'll see you for the next tip!", category: 'QUALITY', color: '#3ED1B8' },
      { num: 12, title: 'Digital Partnership', hook: 'Real-time project updates.', caption: 'No more wondering "what\'s next?" We use technology to keep you in the driver\'s seat of your project.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We know your time is valuable. That's why we use digital partnership tools to give you real-time updates on your phone. You'll know exactly when the materials arrive and when the final inspection is scheduled. Hey, thanks for checking out our checklist. Stay connected at S. New. Roof. Dot Com. I'll see you soon!", category: 'COMMUNICATION', color: '#F5A623' },
      { num: 13, title: 'Modern Materials', hook: 'The new standard in protection.', caption: "Moving beyond old-school felt paper. Let's look at why synthetic underlayment is the modern choice.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Technology has changed roofing for the better. Instead of traditional felt paper, we use high-performance synthetic underlayment. It's a tear-resistant, waterproof barrier that acts as a second roof for your home's protection. Hey, thanks for checking out our checklist. See the tech we use at S. New. Roof. Dot Com. See you next time!", category: 'QUALITY', color: '#3257C2' },
      { num: 14, title: 'Garden Guardianship', hook: 'Protecting your property.', caption: "A new roof shouldn't come at the cost of your landscaping. Here is our plan to protect your yard.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We treat your entire property with respect. Our 'Garden Guardianship' plan uses specialized shields and covers to protect your expensive landscaping and irrigation systems while we work. We want to leave your yard exactly how we found it. Hey, thanks for checking out our checklist. See our safety plans at S. New. Roof. Dot Com. I'll see you soon!", category: 'SAFETY', color: '#3ED1B8' },
      { num: 15, title: 'Detail Excellence', hook: 'The importance of the details.', caption: "It's the small things that prevent the big leaks. Why we prioritize brand-new flashing every time.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! In roofing, the details are everything. That's why we always use brand-new, high-grade metal flashing around chimneys and vents. Reusing old metal is a shortcut we just don't take, because your home deserves a fresh start. Hey, thanks for checking out our checklist. See our craftsmanship at S. New. Roof. Dot Com. See you for the next tip!", category: 'QUALITY', color: '#F5A623' },
      { num: 16, title: 'Site Stewardship', hook: 'A cleaner workspace.', caption: "We believe a safe job site is a clean job site. Here is our daily routine for your family's safety.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We know your home is a sanctuary, even during construction. Our 'Site Stewardship' means we perform a meticulous magnetic sweep and clean-up every single day. We want your driveway and yard to be safe for your kids and pets tonight. Hey, thanks for checking out our checklist. See our safety standards at S. New. Roof. Dot Com. I'll see you soon!", category: 'SAFETY', color: '#3257C2' },
      { num: 17, title: 'Foundation First', hook: 'Building on a solid base.', caption: "What's under your shingles is just as important as what's on top. Let's talk about structural integrity.", script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! A great roof starts with a great foundation. We always recommend a full tear-off so we can inspect your home's wooden deck. It's the only way to ensure the structure is solid, rot-free, and ready to support your new investment. Hey, thanks for checking out our checklist. Learn more about our process at S. New. Roof. Dot Com. See you next time!", category: 'PROCESS', color: '#3ED1B8' },
      { num: 18, title: 'Financial Clarity', hook: 'Transparency in your budget.', caption: 'No verbal guesses, just digital clarity. Here is how we manage project updates and approvals.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! We believe in total financial clarity. If we ever need to adjust the project, we provide a digital change order for your approval right on your phone. It keeps the budget clear and ensures you are always in control. Hey, thanks for checking out our checklist. See how we work at S. New. Roof. Dot Com. I'll see you for the next tip!", category: 'FINANCIAL', color: '#F5A623' },
      { num: 19, title: 'Craftsmanship Precision', hook: 'Storm-ready craftsmanship.', caption: 'Precision is the key to longevity. Let\'s look at the factory specs that keep your roof secure.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Long-lasting roofs come down to precision. Our crews follow exact factory nailing patterns to ensure maximum wind resistance and to keep your warranty fully intact. It's about doing the job the right way, every single time. Hey, thanks for checking out our checklist. See our detail work at S. New. Roof. Dot Com. See you soon!", category: 'QUALITY', color: '#3257C2' },
      { num: 20, title: 'Investment Control', hook: 'Safe and fair payments.', caption: 'Keeping your investment secure. Here is how we follow CSLB guidelines for your peace of mind.', script: "What's up, neighbor? Sam here, with your S. New. Roof. Homeowner Tip! Your peace of mind is our priority, especially when it comes to payments. We follow California state guidelines for progress payments, so you only pay as work is completed. It's a fair, professional way to keep you in total control. Hey, thanks for checking out our checklist. Learn about safe investing at S. New. Roof. Dot Com. I'll see you for the next tip!", category: 'FINANCIAL', color: '#3ED1B8' },
    ];

    const scriptsHtml = scripts.map((s) => `
      <div style="break-inside: avoid; margin-bottom: 28px; padding: 18px 22px; background: #ffffff; border-radius: 10px; border-left: 4px solid ${s.color}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 7px; background: ${s.color}15; color: ${s.color}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0;">${String(s.num).padStart(2, '0')}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #1A1D2E; font-family: Inter, -apple-system, sans-serif;">${s.title}</h3>
              <span style="font-size: 8px; font-weight: 700; color: ${s.color}; background: ${s.color}12; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.05em; text-transform: uppercase;">${s.category}</span>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <span style="font-size: 8px; font-weight: 700; color: ${s.color}; text-transform: uppercase; letter-spacing: 0.1em; font-family: Inter, -apple-system, sans-serif;">Hook</span>
          <p style="margin: 3px 0 0; font-size: 12px; color: #1A1D2E; font-style: italic; line-height: 1.5; font-family: Inter, -apple-system, sans-serif;">"${s.hook}"</p>
        </div>
        <div style="margin-bottom: 8px;">
          <span style="font-size: 8px; font-weight: 700; color: ${s.color}; text-transform: uppercase; letter-spacing: 0.1em; font-family: Inter, -apple-system, sans-serif;">Caption</span>
          <p style="margin: 3px 0 0; font-size: 11px; color: #4A5568; line-height: 1.55; font-family: Inter, -apple-system, sans-serif;">${s.caption}</p>
        </div>
        <div>
          <span style="font-size: 8px; font-weight: 700; color: ${s.color}; text-transform: uppercase; letter-spacing: 0.1em; font-family: Inter, -apple-system, sans-serif;">Full Video Script</span>
          <div style="margin-top: 5px; padding: 10px 14px; background: #F8F9FB; border-radius: 7px; border: 1px solid #E5E7EB;">
            <p style="margin: 0; font-size: 11px; color: #4A5568; line-height: 1.65; font-family: Inter, -apple-system, sans-serif;">${s.script}</p>
          </div>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #f0f2f5; font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; }
    .page { width: 210mm; min-height: 297mm; margin: 0 auto; }
    .cover { background: linear-gradient(135deg, #0F1219 0%, #1A1D2E 50%, #0F1219 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; height: 297mm; position: relative; overflow: hidden; }
    .cover::before { content: ''; position: absolute; top: -100px; left: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(50,87,194,0.15), transparent 70%); }
    .cover::after { content: ''; position: absolute; bottom: -100px; right: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(62,209,184,0.1), transparent 70%); }
    .cover-content { position: relative; z-index: 1; text-align: center; padding: 40px; }
    .body-page { background: #f0f2f5; padding: 28px 36px; }
  </style>
</head>
<body>
  <div class="page cover">
    <div class="cover-content">
      <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 36px; padding: 7px 18px; border-radius: 20px; background: rgba(62,209,184,0.08); border: 1px solid rgba(62,209,184,0.2);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ED1B8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span style="font-size: 10px; font-weight: 700; color: #3ED1B8; letter-spacing: 0.15em; text-transform: uppercase;">Marketer's Pack</span>
      </div>
      <h1 style="font-size: 44px; font-weight: 900; color: #ffffff; line-height: 1.05; margin-bottom: 6px; letter-spacing: -0.02em;">The 20-Point Shield</h1>
      <p style="font-size: 26px; font-weight: 700; line-height: 1.3; margin-bottom: 22px;">
        <span style="background: linear-gradient(135deg, #3ED1B8, #3257C2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Scripts &amp; Captions</span>
      </p>
      <p style="font-size: 13px; color: rgba(255,255,255,0.45); max-width: 380px; margin: 0 auto 36px; line-height: 1.7;">20 ready-to-use video scripts with hooks, captions, and full narration for social media, email campaigns, and community outreach.</p>
      <div style="display: flex; gap: 28px; justify-content: center;">
        <div style="text-align: center;"><div style="font-size: 26px; font-weight: 900; color: #fff;">20</div><div style="font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 600; margin-top: 2px;">VIDEO SCRIPTS</div></div>
        <div style="text-align: center;"><div style="font-size: 26px; font-weight: 900; color: #fff;">20</div><div style="font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 600; margin-top: 2px;">SOCIAL CAPTIONS</div></div>
        <div style="text-align: center;"><div style="font-size: 26px; font-weight: 900; color: #fff;">20</div><div style="font-size: 9px; color: rgba(255,255,255,0.35); font-weight: 600; margin-top: 2px;">CUSTOM HOOKS</div></div>
      </div>
      <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06);">
        <p style="font-size: 10px; color: rgba(255,255,255,0.2); font-weight: 500;">BYLDRS GUARDIAN &middot; S. New. Roof &middot; California Edition</p>
      </div>
    </div>
  </div>
  <div class="page body-page">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <h2 style="font-size: 18px; font-weight: 800; color: #1A1D2E;">All 20 Scripts</h2>
      <span style="font-size: 9px; color: #9CA3AF; font-weight: 600;">BYLDRS GUARDIAN &middot; Marketer's Pack</span>
    </div>
    ${scriptsHtml}
    <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid #E5E7EB; text-align: center;">
      <span style="font-size: 8px; color: #9CA3AF;">&copy; ${new Date().getFullYear()} BYLDRS GUARDIAN &middot; All rights reserved. &middot; S. New. Roof &middot; California Edition</span>
    </div>
  </div>
</body>
</html>`;

    const { chromium } = await import('playwright');

    const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        displayHeaderFooter: false,
      });

      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="BYLDRS_GUARDIAN_20_Point_Shield_Marketers_Pack.pdf"',
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
