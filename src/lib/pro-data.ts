/* ──────────────────────────────────────────────────────────────────────
   BYLDRS GUARDIAN — Pro Database
   20 service categories + detailed Pro profiles
   ────────────────────────────────────────────────────────────────────── */

export const SERVICE_CATEGORIES = [
  'Plumbing',
  'Roofing',
  'HVAC',
  'Electrical',
  'General Contractor',
  'Solar',
  'Remodeling',
  'Landscaping',
  'Painting',
  'Flooring',
  'Window & Door',
  'Kitchen & Bath',
  'Waterproofing',
  'Concrete & Masonry',
  'Pest Control',
  'Insulation',
  'Drywall',
  'Fencing',
  'Tree Service',
  'Pool & Spa',
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

/* ───────────────────────── Types ────────────────────────────────────── */

export type Tier = 'certified' | 'vetted' | 'verified';

export interface ProReview {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface ProProfile {
  id: number;
  name: string;
  company: string;
  category: ServiceCategory;
  location: string;
  zip: string;
  rating: number;
  reviewCount: number;
  tier: Tier;
  avatar: string;
  verified: boolean;
  responseTime: string;
  yearsExperience: number;
  projectCount: number;
  sanctuaryScore: number;
  licenseNumber: string;
  licenseStatus: 'Active' | 'Expired';
  licenseVerifiedDate: string;
  insuranceVerifiedDate: string;
  lastAuditedDate: string;
  nextAuditDate: string;
  workersComp: boolean;
  bondValid: boolean;
  about: string;
  specialty: string;
  coverPhoto: string;
  headshot: string;
  gallery: string[];
  reviews: ProReview[];
  services: string[];
}

/* ───────────────────────── Tier Config ──────────────────────────────── */

export const tierConfig: Record<
  Tier,
  {
    label: string;
    metal: string;
    bg: string;
    text: string;
    border: string;
    badge: string;
    gradient: string;
    ring: string;
  }
> = {
  certified: {
    label: 'Certified Guardian',
    metal: 'Gold',
    bg: 'bg-[#F5A623]/[0.08]',
    text: 'text-[#F5A623]',
    border: 'border-[#F5A623]/20',
    badge: '🥇',
    gradient: 'from-[#F5A623] to-[#e09518]',
    ring: 'ring-[#F5A623]/30',
  },
  vetted: {
    label: 'Vetted Partner',
    metal: 'Silver',
    bg: 'bg-[#9CA3AF]/[0.08]',
    text: 'text-[#9CA3AF]',
    border: 'border-[#9CA3AF]/20',
    badge: '🥈',
    gradient: 'from-[#6B7280] to-[#9CA3AF]',
    ring: 'ring-[#9CA3AF]/30',
  },
  verified: {
    label: 'Verified Pro',
    metal: 'Bronze',
    bg: 'bg-[#CD7F32]/[0.08]',
    text: 'text-[#CD7F32]',
    border: 'border-[#CD7F32]/20',
    badge: '🥉',
    gradient: 'from-[#CD7F32] to-[#A0612B]',
    ring: 'ring-[#CD7F32]/30',
  },
};

/* ───────────────────────── Pro Profiles Database ────────────────────── */

export const proProfiles: ProProfile[] = [
  {
    id: 1,
    name: 'Marcus Rivera',
    company: 'Rivera Roofing & Solar',
    category: 'Roofing',
    location: 'Los Angeles, CA',
    zip: '90001',
    rating: 4.9,
    reviewCount: 324,
    tier: 'certified',
    avatar: 'MR',
    verified: true,
    responseTime: '< 2 hours',
    yearsExperience: 15,
    projectCount: 520,
    sanctuaryScore: 96,
    licenseNumber: 'CSLB #958241',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Dec 1, 2024',
    insuranceVerifiedDate: 'Dec 1, 2024',
    lastAuditedDate: 'Dec 10, 2024',
    nextAuditDate: 'Jan 9, 2025',
    workersComp: true,
    bondValid: true,
    about:
      'Marcus Rivera founded Rivera Roofing & Solar in 2009 with one mission: protect California homeowners from the contractors who cut corners. Born and raised in East LA, Marcus saw firsthand how families lost their savings to unlicensed roofers. After earning his CSLB license and working 8 years under a master roofer, he launched his own company — and hasn\'t looked back. Today, Rivera Roofing & Solar has completed over 500 projects with a 4.9-star average, making it one of the most trusted names in Southern California. Marcus personally oversees every project and insists on daily site cleanup, magnetic nail sweeps, and documented progress photos stored in the homeowner\'s Vault.',
    specialty: 'Residential roofing, solar panel installation, tile-to-shingle conversions, and emergency storm damage repair.',
    coverPhoto: '/pro-images/marcus-cover.png',
    headshot: '/pro-images/marcus-headshot.png',
    gallery: [
      '/pro-images/marcus-gallery-1.png',
      '/pro-images/marcus-cover.png',
      '/pro-images/marcus-headshot.png',
    ],
    reviews: [
      { name: 'Linda M.', location: 'Pasadena, CA', rating: 5, text: 'Marcus replaced our entire roof in 4 days. His crew was professional, clean, and respectful of our property. The magnetic sweep at the end was a game-changer — not a single nail left behind.', date: 'December 2024' },
      { name: 'Robert K.', location: 'Glendale, CA', rating: 5, text: 'We got 5 quotes. Marcus was the only one who explained the deposit law and never asked for more than $1,000 upfront. That told us everything we needed to know.', date: 'November 2024' },
      { name: 'Patricia V.', location: 'Burbank, CA', rating: 5, text: 'Solar installation was flawless. Marcus\'s team handled permits, inspections, and even helped us apply for the federal tax credit. Incredible service from start to finish.', date: 'October 2024' },
      { name: 'Daniel S.', location: 'Los Angeles, CA', rating: 4, text: 'Very professional and transparent. Only reason for 4 stars instead of 5 is a minor scheduling delay due to material supply issues. Otherwise, perfect.', date: 'September 2024' },
    ],
    services: ['Roof Replacement', 'Solar Installation', 'Roof Repair', 'Storm Damage', 'Tile Roofing', 'Shingle Roofing', 'Flat Roof Systems', 'Gutter Installation'],
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'Chen Plumbing Solutions',
    category: 'Plumbing',
    location: 'San Diego, CA',
    zip: '92101',
    rating: 4.8,
    reviewCount: 218,
    tier: 'vetted',
    avatar: 'SC',
    verified: true,
    responseTime: '< 1 hour',
    yearsExperience: 8,
    projectCount: 340,
    sanctuaryScore: 82,
    licenseNumber: 'CSLB #876543',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Nov 28, 2024',
    insuranceVerifiedDate: 'Nov 28, 2024',
    lastAuditedDate: 'Dec 5, 2024',
    nextAuditDate: 'Jan 4, 2025',
    workersComp: true,
    bondValid: true,
    about:
      'Sarah Chen grew up watching her father run a plumbing business in San Diego\'s North Park neighborhood. After earning her degree in Mechanical Engineering from UCSD, she chose to follow in his footsteps — but with a modern twist. Sarah built Chen Plumbing Solutions on three principles: transparency, cleanliness, and communication. She was one of the first Pros on BYLDRS GUARDIAN, and her consistent 4.8-star rating comes from 218 verified reviews. Her team wears branded uniforms, uses shoe covers inside homes, and provides photo documentation of every repair. Sarah is passionate about empowering homeowners and volunteers at local DIY workshops teaching basic plumbing maintenance.',
    specialty: 'Emergency plumbing, water heater installation, bathroom remodeling, and whole-house repiping.',
    coverPhoto: '/pro-images/sarah-cover.png',
    headshot: '/pro-images/sarah-headshot.png',
    gallery: [
      '/pro-images/sarah-gallery-1.png',
      '/pro-images/sarah-cover.png',
      '/pro-images/sarah-headshot.png',
    ],
    reviews: [
      { name: 'Maria T.', location: 'San Diego, CA', rating: 5, text: 'Sarah fixed our burst pipe in under 2 hours on a Sunday. Incredible service and very fair pricing. She even followed up the next day to make sure everything was working.', date: 'December 2024' },
      { name: 'David K.', location: 'La Mesa, CA', rating: 5, text: 'Professional, clean work area, and transparent pricing. Would absolutely hire again for any plumbing needs. Her team wore shoe covers — such a nice touch.', date: 'November 2024' },
      { name: 'Jennifer M.', location: 'Chula Vista, CA', rating: 4, text: 'Explained the issue thoroughly before starting any work. No surprises on the bill. Highly recommended.', date: 'October 2024' },
    ],
    services: ['Emergency Repair', 'Water Heater', 'Bathroom Remodel', 'Repiping', 'Drain Cleaning', 'Sewer Line', 'Gas Lines', 'Fixture Installation'],
  },
  {
    id: 3,
    name: 'James Okafor',
    company: 'Okafor Electrical',
    category: 'Electrical',
    location: 'San Francisco, CA',
    zip: '94102',
    rating: 4.9,
    reviewCount: 156,
    tier: 'certified',
    avatar: 'JO',
    verified: true,
    responseTime: '< 3 hours',
    yearsExperience: 12,
    projectCount: 410,
    sanctuaryScore: 94,
    licenseNumber: 'CSLB #765432',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Dec 2, 2024',
    insuranceVerifiedDate: 'Dec 2, 2024',
    lastAuditedDate: 'Dec 12, 2024',
    nextAuditDate: 'Jan 11, 2025',
    workersComp: true,
    bondValid: true,
    about:
      'James Okafor is a second-generation electrician who learned the trade from his father in Oakland before earning his electrical engineering degree from San Francisco State. He launched Okafor Electrical in 2012 with a focus on residential electrical safety — specifically, upgrading older homes to meet modern code. James has become one of the most sought-after electricians in the Bay Area, known for his meticulous attention to detail and his refusal to cut corners. He was the second Pro to achieve Certified Guardian status on BYLDRS GUARDIAN, and his 4.9-star rating across 156 reviews speaks for itself. James believes that electrical work is the most dangerous trade in home improvement, and he treats every job — from a simple outlet replacement to a full panel upgrade — with the same level of care.',
    specialty: 'Panel upgrades, EV charger installation, whole-house rewiring, smart home automation, and generator systems.',
    coverPhoto: '/pro-images/james-cover.png',
    headshot: '/pro-images/james-headshot.png',
    gallery: [
      '/pro-images/james-gallery-1.png',
      '/pro-images/james-cover.png',
      '/pro-images/james-headshot.png',
    ],
    reviews: [
      { name: 'Michael R.', location: 'Oakland, CA', rating: 5, text: 'James upgraded our 1950s electrical panel to 200 amps. His explanation of what was needed and why was clearer than any inspector\'s report. Absolute professional.', date: 'December 2024' },
      { name: 'Lisa W.', location: 'San Francisco, CA', rating: 5, text: 'Installed a Level 2 EV charger in our garage. Clean installation, properly permitted, and he even helped us apply for the PG&E rebate. Worth every penny.', date: 'November 2024' },
      { name: 'Tom H.', location: 'Berkeley, CA', rating: 5, text: 'Whole-house rewiring of a 1940s Craftsman. James documented everything with photos, explained every code requirement, and left the house cleaner than he found it.', date: 'October 2024' },
    ],
    services: ['Panel Upgrade', 'EV Charger', 'Whole-House Rewiring', 'Smart Home', 'Generator', 'Code Corrections', 'Recessed Lighting', 'Ceiling Fans'],
  },
  {
    id: 4,
    name: 'Maria Gonzalez',
    company: 'MG Home Remodeling',
    category: 'Remodeling',
    location: 'Sacramento, CA',
    zip: '95814',
    rating: 4.7,
    reviewCount: 189,
    tier: 'vetted',
    avatar: 'MG',
    verified: true,
    responseTime: '< 4 hours',
    yearsExperience: 10,
    projectCount: 275,
    sanctuaryScore: 78,
    licenseNumber: 'CSLB #843291',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Nov 15, 2024',
    insuranceVerifiedDate: 'Nov 15, 2024',
    lastAuditedDate: 'Nov 28, 2024',
    nextAuditDate: 'Dec 28, 2024',
    workersComp: true,
    bondValid: true,
    about:
      'Maria Gonzalez brings a designer\'s eye to the remodeling world. With a degree in Interior Design from Sacramento State and a CSLB General Contractor license, she bridges the gap between beautiful design and solid construction. Her specialty is kitchen and bathroom remodels, and she\'s known for completing projects on time and on budget — a rarity in the remodeling industry. Maria insists on written change orders, daily progress photos, and a final walkthrough checklist signed by the homeowner before payment.',
    specialty: 'Kitchen remodels, bathroom renovations, ADU construction, and open-concept floor plan conversions.',
    coverPhoto: '',
    headshot: '',
    gallery: [],
    reviews: [
      { name: 'Karen L.', location: 'Sacramento, CA', rating: 5, text: 'Maria transformed our 1970s kitchen into a modern masterpiece. Every detail was perfect and she stayed within budget.', date: 'November 2024' },
      { name: 'Steve P.', location: 'Elk Grove, CA', rating: 4, text: 'Good communication throughout the project. The daily progress photos in the Vault were a great touch.', date: 'October 2024' },
    ],
    services: ['Kitchen Remodel', 'Bathroom Remodel', 'ADU Construction', 'Floor Plan Changes', 'Custom Cabinets', 'Countertops'],
  },
  {
    id: 5,
    name: 'David Park',
    company: 'Park HVAC Services',
    category: 'HVAC',
    location: 'San Jose, CA',
    zip: '95110',
    rating: 4.8,
    reviewCount: 142,
    tier: 'verified',
    avatar: 'DP',
    verified: true,
    responseTime: '< 2 hours',
    yearsExperience: 6,
    projectCount: 180,
    sanctuaryScore: 71,
    licenseNumber: 'CSLB #901234',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Dec 5, 2024',
    insuranceVerifiedDate: 'Dec 5, 2024',
    lastAuditedDate: 'Dec 8, 2024',
    nextAuditDate: 'Jan 7, 2025',
    workersComp: true,
    bondValid: true,
    about:
      'David Park is a rising star in the HVAC industry. After completing his training at Lincoln Tech and working for 3 years under a senior technician, he launched Park HVAC Services in 2018. David focuses on energy-efficient systems and smart thermostat integration, helping homeowners reduce their utility bills while staying comfortable year-round. His response time is consistently under 2 hours, and he\'s building a reputation as one of San Jose\'s most reliable HVAC pros.',
    specialty: 'Central AC installation, furnace replacement, ductwork repair, and smart thermostat integration.',
    coverPhoto: '',
    headshot: '',
    gallery: [],
    reviews: [
      { name: 'Amy C.', location: 'San Jose, CA', rating: 5, text: 'David installed a new Lennox system in one day. Our energy bill dropped 30% the first month. Incredible.', date: 'December 2024' },
      { name: 'Rick T.', location: 'Santa Clara, CA', rating: 4, text: 'Fast response to our AC emergency on a 100-degree day. Fair price, quality work.', date: 'November 2024' },
    ],
    services: ['AC Installation', 'Furnace Replacement', 'Ductwork', 'Smart Thermostat', 'Maintenance Plans', 'Emergency Repair'],
  },
  {
    id: 6,
    name: 'Emily Watson',
    company: 'Watson Landscaping',
    category: 'Landscaping',
    location: 'Orange County, CA',
    zip: '92612',
    rating: 4.6,
    reviewCount: 98,
    tier: 'verified',
    avatar: 'EW',
    verified: true,
    responseTime: '< 5 hours',
    yearsExperience: 5,
    projectCount: 120,
    sanctuaryScore: 68,
    licenseNumber: 'CSLB #912345',
    licenseStatus: 'Active',
    licenseVerifiedDate: 'Nov 20, 2024',
    insuranceVerifiedDate: 'Nov 20, 2024',
    lastAuditedDate: 'Dec 1, 2024',
    nextAuditDate: 'Dec 31, 2024',
    workersComp: false,
    bondValid: true,
    about:
      'Emily Watson turned her passion for California native plants into a thriving landscaping business. With a degree in Landscape Architecture from Cal Poly Pomona, she specializes in drought-tolerant designs, outdoor living spaces, and sustainable irrigation systems. Emily\'s approach is collaborative — she works closely with homeowners to create outdoor spaces that are both beautiful and water-efficient. She\'s currently working toward Vetted Partner status.',
    specialty: 'Drought-tolerant landscaping, outdoor kitchens, paver installation, and irrigation system design.',
    coverPhoto: '',
    headshot: '',
    gallery: [],
    reviews: [
      { name: 'Diane F.', location: 'Irvine, CA', rating: 5, text: 'Emily transformed our backyard into an outdoor oasis. The drought-tolerant design cut our water bill in half.', date: 'November 2024' },
      { name: 'Paul M.', location: 'Newport Beach, CA', rating: 4, text: 'Great design eye and professional crew. Paver patio looks amazing. Minor delay on delivery of materials.', date: 'October 2024' },
    ],
    services: ['Landscape Design', 'Paver Installation', 'Irrigation', 'Outdoor Kitchens', 'Sod Installation', 'Tree Trimming'],
  },
];

/* ───────────────────────── Helper ───────────────────────────────────── */

export function getProById(id: number): ProProfile | undefined {
  return proProfiles.find((p) => p.id === id);
}

export function filterPros(
  category: string,
  location: string,
): ProProfile[] {
  return proProfiles.filter((pro) => {
    const matchCategory = !category || pro.category === category;
    const matchLocation =
      !location ||
      pro.location.toLowerCase().includes(location.toLowerCase()) ||
      pro.zip.startsWith(location);
    return matchCategory && matchLocation;
  });
}
