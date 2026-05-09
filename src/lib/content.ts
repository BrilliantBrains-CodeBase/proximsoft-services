/**
 * src/lib/content.ts
 *
 * Single source of truth for all visible content on the site.
 * Ported from reobiz-reference/home/index11.html — Consulting Business template.
 */
import type { SchemaType } from './schema'

export interface FAQItem {
  question: string
  answer: string
}

export interface ServiceItem {
  icon: string        // font-awesome class (e.g. "fa-diamond")
  image: string       // path under /images/
  title: string
  description: string
  href?: string
}

export interface TestimonialItem {
  name: string
  text: string
  role?: string
  avatar?: string
}

export interface PartnerItem {
  name: string
  logo: string        // path under /images/
}

export interface ProjectItem {
  title: string
  category: string
  image: string
  href?: string
}

export interface BlogItem {
  title: string
  description: string
  image: string
  date: string
  href?: string
}

export interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  cta: {
    text: string
    href: string
  }
  image: string
  cutout?: string
  shape?: string
  variant: 'dark' | 'light' | 'light-left'
}

export const siteConfig = {
  // ─── Business identity ──────────────────────────────────────────────────────
  name: 'Proximsoft Solutions',

  // ─── Contact details ────────────────────────────────────────────────────────
  contact: {
    phone: '(848) 288-2855',
    phoneSecondary: '',
    email: 'info@proximsoftsolutions.com',
    address: {
      streetAddress: '254 Chapman Rd',
      addressLocality: 'Newark',
      addressRegion: 'DE',
      postalCode: '19702',
      addressCountry: 'US',
    },
    addressDisplay: '254 Chapman Rd, Newark, Delaware 19702, USA',
    directionsNote: 'Open Mon–Fri 9:00–18:00',
    mapsUrl: 'https://maps.google.com/?q=254+Chapman+Rd,+Newark+DE+19702',
    openingHours: ['Mo-Fr 09:00-18:00'],
    whatsapp: '',
  },

  // ─── Meta tags ───────────────────────────────────────────────────────────────
  meta: {
    title: 'Proximsoft Solutions — Enterprise IT Consulting | SAP · Salesforce · AI',
    description: 'Proximsoft Solutions delivers end-to-end enterprise IT consulting across SAP, Salesforce, Oracle, Microsoft, and AI-powered platforms. From strategy to go-live — done right.',
    canonicalUrl: 'https://proximsoftsolutions.com',
  },

  // ─── JSON-LD schema ──────────────────────────────────────────────────────────
  schema: {
    type: 'ProfessionalService' as SchemaType,
  },

  // ─── Hero slides ─────────────────────────────────────────────────────────────
  hero: {
    headline: 'Enterprise IT, Delivered Right.',
    subheadline: 'Proximsoft Solutions helps enterprises unlock value through SAP, Salesforce, Oracle, Microsoft, and AI-powered platforms — from strategy to go-live.',
    ctaPrimary: { text: 'Schedule a Call', href: '#contact-form' },
    ctaSecondary: { text: 'Our Services', href: '#services' },
    imageAlt: 'Enterprise IT consulting illustration',
    slides: [
      {
        id: 'slide1',
        eyebrow: 'BEST IT SOLUTION PROVIDER',
        title: 'Enterprise IT, Delivered Right.',
        description: 'Proximsoft Solutions helps enterprises unlock value through SAP, Salesforce, Oracle, Microsoft, and AI-powered platforms — from strategy to go-live.',
        cta: { text: 'Schedule a Call', href: '#contact-form' },
        image: '/images/slider/h11.jpg',
        cutout: '/images/slider/sl11-ly1.png',
        shape: '/images/slider/sl11-ly3.png',
        variant: 'light',
      },
      {
        id: 'slide2',
        eyebrow: 'YOUR DIGITAL TRANSFORMATION PARTNER',
        title: 'From Legacy Systems to Modern Platforms.',
        description: '10+ years of enterprise implementation experience. We modernise, integrate, and optimise the technology that runs your business.',
        cta: { text: 'Schedule a Call', href: '#contact-form' },
        image: '/images/slider/h11.jpg',
        cutout: '/images/slider/sl11-ly2.png',
        shape: '/images/slider/sl11-ly3.png',
        variant: 'light-left',
      },
    ] as HeroSlide[],
  },

  // ─── Services ────────────────────────────────────────────────────────────────
  services: {
    subTitle: 'What We Do',
    headline: 'Our Core Services',
    description: 'From ERP migrations to AI-powered analytics, we deliver end-to-end technology solutions that help enterprises modernise, scale, and stay ahead of the curve.',
    items: [
      {
        icon: 'sap',
        image: '/images/services/style13/1.jpg',
        title: 'SAP Services',
        description: 'End-to-end SAP implementations, S/4HANA migrations, AMS support, and custom ABAP development tailored to your unique business processes.',
        href: '/services/sap-services',
      },
      {
        icon: 'oracle',
        image: '/images/services/style13/2.jpg',
        title: 'Oracle Services',
        description: 'Database administration, performance tuning, and full Oracle Cloud migrations — from EBS and JD Edwards to Fusion Cloud Applications.',
        href: '/services/oracle-services',
      },
      {
        icon: 'salesforce',
        image: '/images/services/style13/3.jpg',
        title: 'Salesforce Services',
        description: 'Salesforce Sales & Service Cloud implementations, customisations, CPQ, and cross-platform integrations that drive measurable revenue outcomes.',
        href: '/services/salesforce-services',
      },
      {
        icon: 'data',
        image: '/images/services/style13/1.jpg',
        title: 'Data Science & Analytics',
        description: 'End-to-end data engineering, BI dashboards, and predictive analytics that transform raw enterprise data into clear, actionable intelligence.',
        href: '/services/data-science-services',
      },
      {
        icon: 'ai',
        image: '/images/services/style13/2.jpg',
        title: 'AI & Machine Learning',
        description: 'Custom AI models, NLP pipelines, and intelligent automation solutions built to solve real operational problems across your enterprise.',
        href: '/services/ai-machine-learning',
      },
      {
        icon: 'appdev',
        image: '/images/services/style13/3.jpg',
        title: 'Application Development',
        description: 'Scalable, cloud-native applications built on modern frameworks — from requirements through CI/CD deployment and long-term managed support.',
        href: '/services/application-development',
      },
      {
        icon: 'web',
        image: '/images/services/style13/1.jpg',
        title: 'Web, Portal & Mobile Apps',
        description: 'Responsive web platforms, enterprise portals, and cross-platform mobile apps that deliver seamless experiences across every device.',
        href: '/services/web-portal-mobile-apps',
      },
    ] as ServiceItem[],
  },

  // ─── Trust signals / About ────────────────────────────────────────────────
  trust: {
    subTitle: 'Welcome to Proximsoft',
    headline: 'Enterprise Technology, Delivered With Precision',
    description: 'Proximsoft Solutions is a US-based IT consulting firm helping enterprises modernize, scale, and compete in a rapidly changing landscape. From SAP and Salesforce to Oracle, Microsoft, and custom-built platforms, we combine deep technical expertise with proven delivery frameworks to turn complex technology programs into measurable business outcomes.',
    image: '/images/about/about11.png',
    imageAlt: 'Proximsoft Solutions consulting team at work',
    stats: [
      { value: 10, suffix: '+', label: 'Years of Experience' },
      { value: 8, suffix: '', label: 'Service Lines' },
    ],
    statDescriptions: [
      'Over a decade of delivering enterprise-grade IT solutions across SAP, Salesforce, Oracle, Microsoft, and custom-built platforms for clients across the US and beyond.',
      'Eight specialized practice areas — spanning ERP, CRM, data, AI, cloud infrastructure, custom development, and managed services.',
    ],
    headline2: 'Trusted by Enterprise Leaders',
    badges: [] as string[],
  },

  // ─── About dark section (style6) ─────────────────────────────────────────
  aboutDark: {
    subTitle: 'About Proximsoft',
    headline: 'A Reliable Technology Partner for Your Enterprise',
    description: 'We are more than an IT vendor — we are a long-term partner invested in your success. Our consultants bring hands-on experience across complex enterprise environments, combining global best practices with a deep understanding of your industry to deliver outcomes that last.',
    image: '/images/about/about11-2.png',
    imageAlt: 'Proximsoft Solutions company overview',
    videoUrl: 'https://www.youtube.com/',
    videoLabel: 'See How We Work',
  },

  // ─── Insurance / Partners ─────────────────────────────────────────────────
  insurance: {
    subTitle: 'Technology Partners',
    headline: 'Certified on the Platforms That Matter',
    subheadline: 'We hold certifications and partnerships across the leading enterprise technology platforms, so you can be confident our recommendations are backed by real expertise.',
    providers: [] as string[],
    cashless: false,
    ctaText: 'Become a Partner',
    partners: [
      { name: 'SAP',        logo: '/images/partner/gray2/1.png' },
      { name: 'Salesforce', logo: '/images/partner/gray2/2.png' },
      { name: 'Oracle',     logo: '/images/partner/gray2/3.png' },
      { name: 'Microsoft',  logo: '/images/partner/gray2/4.png' },
      { name: 'AWS',        logo: '/images/partner/gray2/5.png' },
      { name: 'Azure',      logo: '/images/partner/gray2/6.png' },
    ] as PartnerItem[],
  },

  // ─── Testimonials ────────────────────────────────────────────────────────
  testimonials: {
    subTitle: 'Client Stories',
    headline: 'What Our Clients Say',
    description: 'We measure success by the outcomes our clients achieve. Here is what enterprise leaders across manufacturing, healthcare, financial services, and logistics have to say about working with Proximsoft.',
    quoteIcon: '',
    items: [
      {
        name: 'James Hoffman',
        text: 'Proximsoft handled our SAP S/4HANA migration from start to finish. Their team understood our business processes deeply and delivered on time without disruption to day-to-day operations. I would not hesitate to work with them again.',
        role: 'VP of IT, Global Manufacturing Co.',
        avatar: '/images/testimonial/avatar/1.jpg',
      },
      {
        name: 'Sarah Chen',
        text: 'The Salesforce and SAP integration Proximsoft built for us eliminated weeks of manual data reconciliation. Their solution was elegant, well-documented, and the support after go-live has been outstanding.',
        role: 'CTO, Regional Healthcare Network',
        avatar: '/images/testimonial/avatar/2.jpg',
      },
      {
        name: 'David Park',
        text: 'We brought Proximsoft in to rescue a stalled ERP project. Within four weeks they had a clear plan, rebuilt stakeholder confidence, and delivered a fully working system three months later. Exceptional recovery.',
        role: 'Director of Operations, Retail Group',
        avatar: '/images/testimonial/avatar/3.jpg',
      },
      {
        name: 'Lisa Thompson',
        text: "Proximsoft's data and AI team built us a real-time reporting dashboard that our executives actually use. The insights we now have were simply not possible before. It has genuinely changed how we make decisions.",
        role: 'SVP Technology, Financial Services Firm',
        avatar: '/images/testimonial/avatar/1.jpg',
      },
      {
        name: 'Michael Rivera',
        text: 'After a difficult experience with a previous vendor, we were cautious. Proximsoft restored our faith in IT consulting. Transparent communication, realistic timelines, and a team that truly knows SAP inside out.',
        role: 'IT Manager, National Logistics Company',
        avatar: '/images/testimonial/avatar/2.jpg',
      },
      {
        name: 'Priya Sharma',
        text: 'Proximsoft implemented our Microsoft Dynamics 365 rollout across five business units simultaneously. Their programme management was first-rate and every milestone was hit. A trusted partner for our digital transformation.',
        role: 'Chief Digital Officer, Energy Corporation',
        avatar: '/images/testimonial/avatar/3.jpg',
      },
    ] as TestimonialItem[],
  },

  // ─── FAQ ─────────────────────────────────────────────────────────────────
  faq: [
    {
      question: 'What enterprise platforms does Proximsoft specialise in?',
      answer: 'We specialise in SAP (including S/4HANA), Salesforce, Oracle EBS, and Microsoft Dynamics 365, alongside custom application development, data engineering, and AI-powered analytics. Our eight service lines cover the full enterprise technology stack.',
    },
    {
      question: 'How do you approach SAP S/4HANA migrations?',
      answer: 'We follow a structured, phased approach: business process assessment, system landscape design, data migration strategy, custom code remediation, testing, and hypercare support post-go-live. Every migration is tailored to minimise disruption and risk.',
    },
    {
      question: 'Can you integrate Salesforce with our existing SAP system?',
      answer: 'Yes. Cross-platform integration is one of our core strengths. We have delivered Salesforce–SAP integrations using MuleSoft, SAP Integration Suite, and custom middleware, eliminating data silos and enabling real-time bi-directional sync.',
    },
    {
      question: 'Do you offer managed services and ongoing support?',
      answer: 'Absolutely. We provide Application Management Services (AMS) for SAP and Salesforce environments, including incident management, system monitoring, enhancement requests, and regular health checks — available in flexible support tiers.',
    },
    {
      question: 'How long does a typical enterprise implementation take?',
      answer: 'Timelines vary by scope and complexity. A focused Salesforce Sales Cloud deployment can be live in 8–12 weeks; a full SAP S/4HANA greenfield implementation typically runs 9–18 months. We will give you a realistic estimate after an initial scoping call.',
    },
    {
      question: 'How do I get started with Proximsoft?',
      answer: 'Schedule a discovery call using the form on this page. We will learn about your business, your current technology landscape, and your goals — then propose the right engagement model, whether that is a fixed-scope project, a time-and-materials retainer, or a managed services agreement.',
    },
  ] as FAQItem[],

  // ─── Latest Projects ──────────────────────────────────────────────────────
  projects: {
    subTitle: 'Case Studies',
    headline: 'Recent Client Projects',
    description: 'From large-scale ERP migrations to AI-powered analytics platforms, our work speaks for itself. Here are some of the enterprise engagements we are proud to have delivered.',
    items: [
      { title: 'SAP S/4HANA Migration',         category: 'SAP Consulting',    image: '/images/project/style2/1.jpg', href: '/services' },
      { title: 'Salesforce + SAP Integration',   category: 'CRM Integration',   image: '/images/project/style2/2.jpg', href: '/services' },
      { title: 'AI-Powered Reporting Dashboard', category: 'Data & AI',         image: '/images/project/style2/3.jpg', href: '/services' },
      { title: 'Oracle EBS Modernisation',       category: 'ERP Modernisation', image: '/images/project/style2/4.jpg', href: '/services' },
    ] as ProjectItem[],
  },

  // ─── Call to Action ────────────────────────────────────────────────────────
  cta: {
    headline: "Ready to Modernise Your Enterprise Technology?",
    ctaText: 'Schedule a Call',
    ctaHref: '#contact-form',
  },

  // ─── Blog ─────────────────────────────────────────────────────────────────
  blog: {
    subTitle: 'Insights & Updates',
    headline: 'From Our Experts',
    description: 'Stay ahead with practical insights on enterprise technology — from SAP best practices and Salesforce innovations to AI strategy and digital transformation trends.',
    items: [
      {
        title: 'SAP S/4HANA 2025: What You Need to Know Before You Migrate',
        description: 'SAP has set a firm deadline for ECC support. Here is what enterprise IT leaders must assess before committing to a migration path.',
        image: '/images/blog/1.jpg',
        date: '15 Apr 2026',
        href: '/blog/sap-s4hana-2025-migration',
      },
      {
        title: 'Salesforce Einstein AI: Turning CRM Data Into Revenue',
        description: 'How enterprise sales and service teams are using Salesforce Einstein to surface the right insights at exactly the right moment in the customer journey.',
        image: '/images/blog/2.jpg',
        date: '28 Mar 2026',
        href: '/blog/salesforce-einstein-ai-revenue',
      },
      {
        title: 'Building an AI-Ready Data Platform: A Practical Roadmap',
        description: 'Most enterprises have the data — but not the architecture. Here is how to move from fragmented data silos to a modern, AI-ready data platform.',
        image: '/images/blog/3.jpg',
        date: '10 Mar 2026',
        href: '/blog/ai-ready-data-platform-roadmap',
      },
    ] as BlogItem[],
  },

  // ─── Contact form ─────────────────────────────────────────────────────────
  contactForm: {
    subTitle: "Let's Talk",
    headline: 'Request a Consultation',
    subheadline: "Tell us about your project or challenge and we will come back to you within one business day with a tailored approach.",
    submitText: 'Send Request',
    sideImage: '/images/quote/left-img11.png',
    sideImageAlt: 'Proximsoft Solutions consulting team',
  },

  // ─── Careers ─────────────────────────────────────────────────────────────
  careers: {
    meta: {
      title: 'Careers | Proximsoft Solutions',
      description: 'Join Proximsoft Solutions and help shape the future of enterprise technology. Explore open roles in SAP, Salesforce, Data & AI, and project management.',
    },
    whyWorkWithUs: [
      { icon: 'Rocket',    heading: 'Accelerated Growth',    body: 'Fast-track your career with hands-on experience across Fortune 500 enterprise projects from day one.' },
      { icon: 'Users',     heading: 'Collaborative Culture',  body: 'Work alongside certified experts in a team that values knowledge-sharing, mentorship, and mutual respect.' },
      { icon: 'Globe',     heading: 'Remote-First',           body: 'Work from anywhere with flexible hours. We trust our team to deliver results, not manage attendance.' },
      { icon: 'Award',     heading: 'Competitive Benefits',   body: 'Market-rate salaries, performance bonuses, health coverage, and full support for professional certifications.' },
      { icon: 'BookOpen',  heading: 'Learning & Development', body: 'Dedicated learning budgets, SAP and Salesforce certification pathways, and access to the latest industry training.' },
      { icon: 'Briefcase', heading: 'Impactful Work',         body: 'Every project solves real challenges for real businesses. Our consultants make decisions that matter from day one.' },
    ] as { icon: string; heading: string; body: string }[],
  },

  // ─── Footer ──────────────────────────────────────────────────────────────
  footer: {
    tagline: 'Enterprise IT consulting across SAP, Salesforce, Oracle, Microsoft, and AI platforms. From strategy to go-live — we deliver outcomes that last.',
    copyrightYear: 2026,
    logo: '/images/logo-proximsoft-white.png',
    serviceLinks: [
      { text: 'SAP Services',            href: '/services/sap-services' },
      { text: 'Oracle Services',         href: '/services/oracle-services' },
      { text: 'Salesforce Services',     href: '/services/salesforce-services' },
      { text: 'Data Science Services',   href: '/services/data-science-services' },
      { text: 'AI & Machine Learning',   href: '/services/ai-machine-learning' },
      { text: 'Application Development', href: '/services/application-development' },
      { text: 'Web, Portal & Mobile',    href: '/services/web-portal-mobile-apps' },
    ],
    navLinks: [
      { text: 'Home',         href: '/' },
      { text: 'About Us',     href: '/about' },
      { text: 'Services',     href: '/services' },
      { text: 'Careers',      href: '/careers' },
      { text: 'Blogs',        href: '/blog' },
      { text: 'Contact Us',   href: '/contact' },
    ],
    socialLinks: [
      { platform: 'Facebook', href: '#', icon: 'fa-facebook' },
      { platform: 'Twitter',  href: '#', icon: 'fa-twitter' },
      { platform: 'LinkedIn', href: '#', icon: 'fa-linkedin' },
    ],
  },
}
