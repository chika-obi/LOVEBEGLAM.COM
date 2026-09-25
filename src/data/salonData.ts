import { ServiceItem, GalleryItem, TestimonialItem, VideoItem, FAQItem } from '../types';

export const SALON_CONTACT = {
  name: 'LoveDeGlam',
  tagline: 'Luxury · Confidence · Transformation',
  motto: 'Glam that tells your story.',
  address: 'No 11 Ebony Road, Oroazi, Port Harcourt, Rivers State, Nigeria',
  phones: [
    '+234 907 373 3455',
    '+234 916 264 8527',
    '+234 809 529 4480',
  ],
  primaryPhone: '+234 809 529 4480',
  whatsappNumber: '2348095294480',
  whatsappMessage: 'Hello LoveDeGlam! I would like to book a luxury beauty session.',
  email: 'lovedeglam@gmail.com',
  hours: 'Monday – Saturday: 9:00 AM – 6:00 PM',
  sundayHours: 'Sunday: VIP By Appointment Only',
  socials: {
    whatsapp: 'https://wa.me/2348095294480?text=Hello%20LoveDeGlam!%20I%20would%20like%20to%20book%20a%20session.',
    instagram: 'https://www.instagram.com/lovedeglam?igsh=YWYzYmcydDJyZGg0&utm_source=qr',
    tiktok: 'https://www.tiktok.com/@love.de.glam?_t=ZS-90MDaXhYsc5&_r=1',
    facebook: 'https://www.facebook.com/share/1A4atmAeEw/?mibextid=wwXIfr',
    youtube: 'https://youtube.com/@lovedeglam?si=Tva3S1B6eR4VljjR',
    email: 'mailto:lovedeglam@gmail.com',
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'makeup-artistry',
    category: 'makeup',
    title: 'All Kinds (Makeup Artistry)',
    subtitle: 'Flawless, sweat-proof, long-wear luxury makeup',
    description:
      'Bridal, editorial, photoshoots, birthdays, and everyday glam. We use world-class, skin-safe cosmetic brands meticulously tailored to your unique skin tone and undertone for an unforgettable glow.',
    priceStartingAt: 35000,
    duration: '1h 30m - 2h 30m',
    popular: true,
    image: '/image1.jpg',
    features: [
      'Bespoke bridal & luxury photoshoot artistry',
      'Advanced skin prep tailored to your skin type & texture',
      'Flawless 18-hour sweat-proof & tear-proof longevity',
      'Simple to bold eyeshadow transitions & cut-creases',
      'High-definition mink lash integration & sculpting',
      'Touch-up kit consultation for all-day radiance',
    ],
  },
  {
    id: 'frontal-installation',
    category: 'frontal',
    title: 'Frontal Installation',
    subtitle: 'Seamless natural hairline & melted lace perfection',
    description:
      'Masterful frontal installations with undetectable natural hairlines. Includes custom lace bleaching, precision plucking, tinting to match your exact scalp shade, and secure hold.',
    priceStartingAt: 30000,
    duration: '2h - 3h',
    popular: true,
    image: '/image2.jpg',
    features: [
      'Glued & Glueless frontal wig installations',
      'Undetectable scalp melting & micro-knot bleaching',
      'Custom pre-plucked baby hairs or clean hairline finish',
      '5x5, 6x6, 7x6 closures and 13x4 / 13x6 HD lace',
      '360 frontal & double frontal wig customization',
      'Scalp protection & comprehensive aftercare coaching',
    ],
  },
  {
    id: 'hair-revamping',
    category: 'revamp',
    title: 'Hair Revamping & Wig Care',
    subtitle: 'Breathe brand-new life into old wigs & bundles',
    description:
      'Cutting-edge restyles, extensions revival, color refresh, and deep restorative treatments to transform dull or worn hair into silky, lustrous salon-grade perfection.',
    priceStartingAt: 25000,
    duration: '24h - 48h turnaround',
    image: '/image3.jpg',
    features: [
      'Signature premium silk infusion & hydration treatment',
      'Curl rejuvenation, deep coil definition & moisture lock',
      'Glueless reconstruction & custom cap resizing',
      'Precision cutting, layering, and thermal styling',
      'Color correction, jet black tinting & highlights',
      'Tangle elimination and friction-free detangling',
    ],
  },
  {
    id: 'hair-training',
    category: 'training',
    title: 'Hair Installation Masterclass',
    subtitle: 'Hands-on intensive master training with certificate',
    description:
      'Step-by-step master certification training designed for both beginners and experienced stylists looking to master modern luxury wig installation and revamping techniques.',
    priceStartingAt: 150000,
    duration: '2 Weeks / 4 Weeks options',
    popular: false,
    image: '/image5.jpg',
    features: [
      'Glued & Glueless frontal wig installation protocols',
      'Frontal ponytails, half-up styles & luxury sew-ins',
      '5x5, 6x6, 7x6 HD closure & 360 double frontal mastery',
      'Natural & relaxed hair pony styling & braid patterns',
      'Premium wig revamping, silk press & curl restoration',
      'Professional certificate of completion + vendor list',
    ],
  },
  {
    id: 'makeup-training',
    category: 'training',
    title: 'Makeup Artistry Masterclass',
    subtitle: 'Learn the secrets of high-demand bridal & editorial glam',
    description:
      'From beginner techniques to advanced bridal mastery, learn the business and artistry of glam that builds a six-figure beauty career.',
    priceStartingAt: 160000,
    duration: '2 Weeks / 4 Weeks options',
    image: '/image8.jpg',
    features: [
      'Flawless long-wear bridal glam on diverse skin types',
      'Switching from soft neutral to bold editorial eyeshadows',
      'Skin prep chemistry for oily, dry & combination skins',
      'Studio lighting setup & phone editing (photo & video reels)',
      'Industry-standard product recommendations & budget hacks',
      'Deep discussions on pricing, client retention & beauty business',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    src: '/image1.jpg',
    title: 'Bridal Royalty Glam',
    category: 'makeup',
    description: 'High-definition bridal makeup with glowing skin finish and sculptured brows.',
    tag: 'Bridal Artistry',
  },
  {
    id: 'g2',
    src: '/image2.jpg',
    title: 'Flawless Melted Frontal',
    category: 'frontal',
    description: 'Glueless 13x6 HD lace installation with natural plucked baby hairs.',
    tag: 'Frontal Install',
  },
  {
    id: 'g3',
    src: '/image3.jpg',
    title: 'Silk Infusion Revamp',
    category: 'revamp',
    description: 'Bone straight silk press and deep restorative conditioning treatment.',
    tag: 'Hair Revamp',
  },
  {
    id: 'g4',
    src: '/image4.jpg',
    title: 'Soft Radiance Everyday Glam',
    category: 'makeup',
    description: 'Dewy complexion with subtle warm tones for an effortless finish.',
    tag: 'Soft Glam',
  },
  {
    id: 'g5',
    src: '/image5.jpg',
    title: '360 Frontal & Curl Sculpting',
    category: 'frontal',
    description: 'Voluminous bouncy curls on custom installed 360 frontal unit.',
    tag: 'Frontal Install',
  },
  {
    id: 'g6',
    src: '/image6.jpg',
    title: 'Bespoke Wig Construction',
    category: 'revamp',
    description: 'Custom machine-made wig with tailored cap fitting and styled layers.',
    tag: 'Wig Making',
  },
  {
    id: 'g7',
    src: '/image7.jpg',
    title: 'Masterclass Student Practice',
    category: 'training',
    description: 'Hands-on frontal installation training session at LoveDeGlam Academy.',
    tag: 'Academy',
  },
  {
    id: 'g8',
    src: '/image8.jpg',
    title: 'Editorial Cut-Crease Eyeshadow',
    category: 'makeup',
    description: 'Vibrant artistic eyeshadow technique demonstrating seamless blending.',
    tag: 'Masterclass Demo',
  },
  {
    id: 'g9',
    src: '/image9.jpg',
    title: 'Luxury Frontal Ponytail',
    category: 'frontal',
    description: 'Sleek high frontal ponytail install with melted hairline precision.',
    tag: 'Frontal Install',
  },
  {
    id: 'g10',
    src: '/image10.jpg',
    title: 'Deep Wave Coil Rejuvenation',
    category: 'revamp',
    description: 'Defined coil pattern restored with signature botanical moisture bath.',
    tag: 'Hair Revamp',
  },
  {
    id: 'g11',
    src: '/image11.jpg',
    title: 'Red Carpet Evening Glam',
    category: 'makeup',
    description: 'Bold pout with shimmer lid highlights for milestone celebrations.',
    tag: 'Evening Glam',
  },
  {
    id: 'g12',
    src: '/image12.jpg',
    title: 'Glueless 6x6 Closure Install',
    category: 'frontal',
    description: 'Natural hairline closure install without adhesive for everyday comfort.',
    tag: 'Closure Install',
  },
  {
    id: 'g13',
    src: '/image13.jpg',
    title: 'Academy Graduation Showcase',
    category: 'training',
    description: 'Certified graduates showcasing live models during their final assessments.',
    tag: 'Academy',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Amaka O.',
    role: 'Bride (Port Harcourt)',
    location: 'GRA Phase 2',
    rating: 5,
    comment:
      'LoveDeGlam made my wedding look effortless. The makeup stayed fresh all day through the dancing, tears of joy, and heat — not a single smudge! I felt like royalty.',
    service: 'Bridal Artistry & Frontal Install',
    date: 'February 2026',
  },
  {
    id: 't2',
    name: 'Jade N.',
    role: 'Fashion Model & Content Creator',
    location: 'Old GRA',
    rating: 5,
    comment:
      'The frontal install was absolutely flawless. Natural hairline, invisible lace even on high-def 4K camera, and she gave me top-tier aftercare advice that kept it lasting for weeks.',
    service: 'Glueless Frontal Installation',
    date: 'January 2026',
  },
  {
    id: 't3',
    name: 'Sarah T.',
    role: 'Corporate Executive',
    location: 'Trans Amadi',
    rating: 5,
    comment:
      'Hair revamp gave me a brand-new wig! I had almost given up on a 3-year-old virgin wig; LoveDeGlam gave it that fresh factory silk infusion and bounce.',
    service: 'Silk Infusion Hair Revamp',
    date: 'March 2026',
  },
  {
    id: 't4',
    name: 'Chioma E.',
    role: 'Beauty Academy Graduate',
    location: 'Rumuola',
    rating: 5,
    comment:
      'The 4-week academy training transformed my life. Chika patiently taught me everything from undertone chemistry to filming viral TikToks and pricing my services. I now run my own studio!',
    service: 'Hair & Makeup Masterclass',
    date: 'November 2025',
  },
  {
    id: 't5',
    name: 'Blessing M.',
    role: 'Birthday Queen',
    location: 'Peter Odili Road',
    rating: 5,
    comment:
      'The customer service at LoveDeGlam is unmatched. Cozy VIP private atmosphere, complimentary tea, and my birthday shoot pictures turned out like a luxury magazine cover.',
    service: 'Photoshoot Glam Package',
    date: 'December 2025',
  },
];

export const VIDEO_SHOWCASES: VideoItem[] = [
  {
    id: 'v1',
    title: 'Bridal Transformation: Traditional to White Wedding',
    description: 'Watch the step-by-step transition from traditional coral attire to modern bridal glow.',
    duration: '3:45',
    category: 'Bridal Glam',
    thumbnail: '/image1.jpg',
  },
  {
    id: 'v2',
    title: 'Melted Glueless Frontal Installation Live Session',
    description: 'Close-up demonstration of lace knot bleaching, tint matching, and custom hairline plucking.',
    duration: '4:20',
    category: 'Frontal Install',
    thumbnail: '/image2.jpg',
  },
  {
    id: 'v3',
    title: 'Revamping 4-Year-Old Dry Bundles into Silky Hair',
    description: 'Before & after silk infusion treatment revealing effortless movement and mirror shine.',
    duration: '2:50',
    category: 'Hair Revamping',
    thumbnail: '/image3.jpg',
  },
];

export const FAQS: FAQItem[] = [
  {
    category: 'Booking & Consultation',
    question: 'How early should I book for bridal makeup or major events?',
    answer:
      'We recommend booking at least 3 to 8 weeks in advance for brides to guarantee your desired wedding date and accommodate your pre-wedding trial session. For regular events or photoshoot glam, 48 to 72 hours notice is preferred.',
  },
  {
    category: 'Hair Services',
    question: 'Can you install hair that was not purchased from LoveDeGlam?',
    answer:
      'Yes! We work with clients who bring their own virgin human hair or raw hair bundles. We recommend bringing your wig or lace at least 24–48 hours prior to your appointment so we can custom bleach knots and tint the lace to your exact scalp shade.',
  },
  {
    category: 'Hair Revamping',
    question: 'What types of wigs and hair can be revamped?',
    answer:
      'We revamp 100% human hair wigs, closures, frontals, and raw hair bundles regardless of where they were originally bought. Our services include deep detoxification, silk infusion, lace repairs, cap resizing, and curl restoration.',
  },
  {
    category: 'Location & Travel',
    question: 'Do you provide on-location / home services outside Port Harcourt?',
    answer:
      'Yes, we offer VIP destination and on-location travel services across Nigeria and internationally for brides and VIP events. Travel, accommodation, and logistics fees apply based on your location.',
  },
  {
    category: 'Training Academy',
    question: 'What does the LoveDeGlam Academy training package include?',
    answer:
      'Our masterclasses include intensive practical live-model hands-on training, training manual, product vendor contact lists, certificate of completion, business coaching on client acquisition and social media content creation.',
  },
];

export const PRICING_OPTIONS = {
  services: [
    { id: 'soft-glam', name: 'Everyday / Soft Glam Makeup', basePrice: 35000, duration: '1h 15m' },
    { id: 'photoshoot-glam', name: 'Birthday & Photoshoot Glam', basePrice: 45000, duration: '1h 45m' },
    { id: 'bridal-traditional', name: 'Bridal Traditional Wedding Glam', basePrice: 120000, duration: '2h 30m' },
    { id: 'bridal-white', name: 'Bridal White Wedding Glam', basePrice: 150000, duration: '3h' },
    { id: 'frontal-install', name: 'Frontal Wig Installation (Glued/Glueless)', basePrice: 30000, duration: '2h' },
    { id: 'closure-install', name: 'HD Closure Installation', basePrice: 25000, duration: '1h 30m' },
    { id: 'silk-revamp', name: 'Signature Silk Infusion Revamp', basePrice: 25000, duration: '24h - 48h' },
    { id: 'wig-construction', name: 'Custom Wig Making & Styling', basePrice: 35000, duration: '48h' },
    { id: 'hair-masterclass', name: 'Hair Installation Masterclass (2 Weeks)', basePrice: 150000, duration: '2 Weeks' },
    { id: 'makeup-masterclass', name: 'Bridal Makeup Masterclass (2 Weeks)', basePrice: 160000, duration: '2 Weeks' },
  ],
  addons: [
    { id: 'home-service', name: 'VIP Home / Hotel Location Service (Within PH)', price: 30000 },
    { id: 'mink-lashes', name: 'Luxury 3D/5D Reusable Mink Lashes', price: 8000 },
    { id: 'knot-bleach', name: 'Emergency Same-Day Knot Bleaching & Plucking', price: 10000 },
    { id: 'touchup-kit', name: 'Personalized Bridal Touch-Up Glam Kit', price: 15000 },
    { id: 'scalp-care', name: 'Pre-Install Scalp Detox & Braid Down', price: 10000 },
  ],
};
