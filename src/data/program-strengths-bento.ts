export interface StrengthsBentoItem {
  title: string;
  description: string;
  icon: string;
}

export interface ProgramStrengthsBentoData {
  kicker: string;
  title: string;
  description: string;
  hint: string;
  stageMinHeightClass?: string;
  featured: StrengthsBentoItem[];
  iconMap: Record<string, string>;
}

const defaultStageMinHeightClass = "min-h-[320px] md:min-h-[520px]";

const biomedicalIcons: Record<string, string> = {
  dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.5-2.5 3.5-2.5 5 0"/><path d="M15 2c-1.5 2.5-3.5 2.5-5 0"/><path d="M22 9c-6.667 6-13.333 0-20 6"/>',
  flask: '<path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
};

export const biomedicalStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Biomedical Science at APU?",
  description:
    "A curriculum combining molecular biology, information technology, and sustainable industrial engineering to tackle global challenges.",
  hint: "Click the items below!",
  featured: [
    {
      title: "Interdisciplinary",
      description: "biology + informatics + green technology.",
      icon: "dna",
    },
    {
      title: "Modern Facilities",
      description: "GLP/GMP-standard (SCCR) laboratory with complete and cutting-edge equipment.",
      icon: "flask",
    },
    {
      title: "International Educators",
      description: "Globally qualified lecturers active in research and publication.",
      icon: "globe",
    },
    {
      title: "Industry Orientation",
      description: "Internships, applied projects, and collaboration with biomedical science or industrial partners.",
      icon: "factory",
    },
  ],
  iconMap: biomedicalIcons,
};

const biotechnologyIcons: Record<string, string> = {
  dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.5-2.5 3.5-2.5 5 0"/><path d="M15 2c-1.5 2.5-3.5 2.5-5 0"/><path d="M22 9c-6.667 6-13.333 0-20 6"/>',
  mountain: '<path d="m8 21 4-7 4 7"/><path d="M3 21h18"/><path d="m3 21 9-18 9 18"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  brain: '<path d="M9.5 2A3.5 3.5 0 0 0 6 5.5v.2A4.5 4.5 0 0 0 3 10a4.5 4.5 0 0 0 3 4.24V18a4 4 0 0 0 4 4h1V2Z"/><path d="M14.5 2A3.5 3.5 0 0 1 18 5.5v.2A4.5 4.5 0 0 1 21 10a4.5 4.5 0 0 1-3 4.24V18a4 4 0 0 1-4 4h-1V2Z"/><path d="M7 8h4"/><path d="M13 8h4"/><path d="M7 14h4"/><path d="M13 14h4"/>',
  sparkles: '<path d="M12 3 10.5 8.5 5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
};

export const biotechnologyStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Biotechnology at APU?",
  description:
    "A future-focused curriculum combining molecular science, bioinformatics, and modern laboratory practice to prepare students for innovation in health, food, industry, and the environment.",
  hint: "Select a strength below to explore what makes Biotechnology at APU stand out.",
  featured: [
    {
      title: "Adaptable",
      description: "Able to respond to rapid changes in the world.",
      icon: "dna",
    },
    {
      title: "Persistence",
      description: "Resilient and determined to never give up.",
      icon: "mountain",
    },
    {
      title: "Unity / Universal",
      description: "Globally minded and guided by universal values of goodness.",
      icon: "globe",
    },
    {
      title: "Smart",
      description: "Intelligent and intellectually progressive.",
      icon: "brain",
    },
    {
      title: "Creative",
      description: "Continuously innovates and carefully seeks new opportunities.",
      icon: "sparkles",
    },
    {
      title: "Collaborative",
      description: "Works and communicates effectively in teams, both as a capable leader and an active participant.",
      icon: "users",
    },
    {
      title: "Responsible",
      description: "Carries social responsibility toward society, the nation, and God.",
      icon: "shield",
    },
  ],
  iconMap: biotechnologyIcons,
};

const communicationLawIcons: Record<string, string> = {
  newspaper:
    '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  handshake:
    '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.25-3.25a1 1 0 0 0-1.3-.17l-1.1.73a1 1 0 0 1-1.3 0l-1.1-.73a1 1 0 0 0-1.3.17L7.5 16.5a1 1 0 1 0 3 3l2.5-2.5Z"/><path d="m18.5 19.5 1-1a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1 1"/><path d="m5.5 19.5-1-1a1 1 0 0 1 0-1.4l2.5-2.5a1 1 0 0 1 1.4 0l1 1"/><path d="M12 12v.01"/>',
};

export const communicationStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Communication Science at APU?",
  description:
    "A future-oriented curriculum that combines communication theory, digital media practice, public relations, journalism, branding, and creative content development to prepare students for today’s dynamic communication industry.",
  hint: "Click the items below!",
  featured: [
    {
      title: "Programs According to Student Potential",
      description:
        "Students can choose the program that best aligns with their interests, talents, and career aspirations. Two programs are available: the Digital and New Media Communication program, which emphasizes creativity in designing, producing, and managing digital content for cross-platform mass communication needs. The Strategic Business Communication program integrates communication strategies with principles for building and growing businesses while strengthening brands and fostering public trust in the products and services they produce.",
      icon: "newspaper",
    },
    {
      title: "Industry-Relevant Curriculum",
      description:
        "The curriculum is designed to align with current industry needs. In the Digital and New Media Communication program, courses such as Digital Filmmaking, Digital Broadcast Journalism, and Media in the Making: Podcasting provide students with opportunities to learn directly from professional practitioners. Meanwhile, in the Strategic Business Communication program, courses such as Event Management in Business Communication, Brand Storytelling and Narrative, and Brand Management train students in business events, persuasive brand narratives, and managing compelling brands that integrate identity, audience, and industry trends.",
      icon: "monitor",
    },
    {
      title: "Innovative Learning System",
      description:
        "The learning system is structured, integrating academic foundations with practical experiences that support student competency development. In semesters 1 through 5, students undergo intensive on-campus lectures. In semesters 6 and 7, students enter an enrichment program. This program includes student exchanges and internships in the industrial sector.",
      icon: "users",
    },
    {
      title: "Collaborative Partners Support the Learning Process",
      description:
        "Collaborations with media organizations, agencies, and companies make learning more relevant and aligned with the needs of the workplace. Through these partnerships, students can learn directly in the field through internships, guest lectures, research, and other practical activities.",
      icon: "handshake",
    },
  ],
  iconMap: communicationLawIcons,
};

export const lawStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Law at APU?",
  description:
    "A future-ready curriculum that combines legal knowledge, critical thinking, advocacy, ethics, and practical law experience to prepare students for professional careers in justice, governance, business, and society.",
  hint: "Click the items below!",
  featured: [
    {
      title: "Innovative Learning",
      description:
        "Our education implements research- and practice-based learning, as well as intensive collaboration with leading institutions. This equips students with sharp and accurate legal analysis that aligns with the latest regulations, ensuring a solid understanding of the law from the outset.",
      icon: "newspaper",
    },
    {
      title: "Character Building",
      description:
        "All academic activities are directed towards strengthening students' legal character. We implement orderly good governance, uphold integrity and accountability, and promote an honest academic culture.",
      icon: "monitor",
    },
    {
      title: "Real Contribution",
      description:
        "Our institutional responsibility is realized through our drive to produce accurate and relevant legal research outputs. This contribution provides significant added value to national legal development, in line with our research focus on the Pancasila-based philosophy.",
      icon: "users",
    },
  ],
  iconMap: communicationLawIcons,
};

const managementIcons: Record<string, string> = {
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>',
  globeNetwork:
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><circle cx="17" cy="7" r="1.5"/><circle cx="7" cy="17" r="1.5"/><path d="M15.8 8.2 8.2 15.8"/>',
  map: '<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15"/><path d="M15 6v15"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
};

export const managementStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Management at APU?",
  description:
    "A future-focused curriculum that builds leadership, entrepreneurship, strategic thinking, and digital business skills to prepare students for the modern business world.",
  hint: "Select a strength below to explore what makes Management at APU stand out.",
  stageMinHeightClass: "min-h-[420px] sm:min-h-[460px] md:min-h-[520px]",
  featured: [
    {
      title: "Developing Excellent Graduates",
      description:
        "The Management Study Program is designed to develop competent, adaptive, and globally competitive graduates through two main focuses: International Business Management and Digital Business Management. These areas complement each other in preparing students to manage cross-border business and utilize digital technology for the future of business.",
      icon: "award",
    },
    {
      title: "Industry-Based Curriculum",
      description:
        "A curriculum aligned with industry needs, focusing on the use of digital technology in business management and strategic decision-making.",
      icon: "briefcase",
    },
    {
      title: "Global Business Digitalization",
      description:
        "Integrates global business digitalization into the learning process, preparing students to contribute to economic growth through technology-driven business development.",
      icon: "globeNetwork",
    },
    {
      title: "Field-Based Learning",
      description:
        "Encourages students to actively engage in business projects, field activities, and cross-border research experiences.",
      icon: "map",
    },
    {
      title: "Enrichment Program",
      description:
        "The Enrichment Program connects students with the professional world through internship opportunities and real industry exposure.",
      icon: "users",
    },
  ],
  iconMap: managementIcons,
};

const midwiferyIcons: Record<string, string> = {
  newspaper:
    '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  handshake:
    '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.25-3.25a1 1 0 0 0-1.3-.17l-1.1.73a1 1 0 0 1-1.3 0l-1.1-.73a1 1 0 0 0-1.3.17L7.5 16.5a1 1 0 1 0 3 3l2.5-2.5Z"/><path d="m18.5 19.5 1-1a1 1 0 0 0 0-1.4l-2.5-2.5a1 1 0 0 0-1.4 0l-1 1"/><path d="m5.5 19.5-1-1a1 1 0 0 1 0-1.4l2.5-2.5a1 1 0 0 1 1.4 0l1 1"/><path d="M12 12v.01"/>',
};

export const midwiferyAssociateStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Midwifery at APU?",
  description:
    "A future-oriented curriculum that equips students with knowledge and practical skills in pregnancy care, childbirth, newborn care, reproductive health, clinical practice, and community health — preparing graduates to become competent and compassionate midwives.",
  hint: "Click the items below!",
  featured: [
    {
      title: "Teaching Staff & Competency Strengthening",
      description:
        "Supported by professional teaching staff from both domestic and international graduates with clinical and academic experience, and strengthened through competency certification and collaboration with practitioners to enhance graduate competitiveness.",
      icon: "newspaper",
    },
    {
      title: "Modern Learning & Practice Facilities",
      description:
        "Providing comprehensive facilities and infrastructure to support learning, clinical practice, student development, and campus comfort, including an Integrated Midwifery Laboratory, teaching hospital, language laboratory, student activity unit (UKM) room, auditorium, sports facilities, ICT, smart classrooms, dormitories, and campus security and support infrastructure.",
      icon: "monitor",
    },
    {
      title: "Professional Language & Communication Proficiency",
      description:
        "Equipping students with professional foreign language skills, including Japanese and English for Academic Purposes, as well as skills in public speaking, translation, academic and creative writing, and English debate.",
      icon: "users",
    },
    {
      title: "National & International Partnerships",
      description:
        "Developing collaborations with national and international partners to support active, contextual, and relevant learning that addresses the needs of the healthcare world and the development of the midwifery profession.",
      icon: "users",
    },
    {
      title: "Career Readiness in the Global Healthcare Industry",
      description:
        "Preparing graduates to work in midwifery and healthcare services, both domestically and internationally, by strengthening professional competencies and global career opportunities.",
      icon: "users",
    },
    {
      title: "Innovation, Professionalism & Midwifery Entrepreneurship",
      description:
        "Developing additional competencies through evidence-based midwifery care, the use of digital technology, leading innovations such as stem cell technology, global educational values, professional character, and strengthening the entrepreneurial spirit as an Entrepreneurial Midwife.",
      icon: "users",
    },
  ],
  iconMap: midwiferyIcons,
};

export const midwiferyBachelorStrengthsBento: ProgramStrengthsBentoData = {
  kicker: "WHY US",
  title: "Why Study Midwifery at APU?",
  description:
    "A future-oriented curriculum that equips students with knowledge and practical skills in pregnancy care, childbirth, newborn care, reproductive health, clinical practice, and community health — preparing graduates to become competent and compassionate midwives.",
  hint: "Click the items below!",
  featured: [
    {
      title: "Characteristics of 'Women's Health & Beauty Care'",
      description:
        "Integrating the concepts of women's health, fitness, and beauty into the learning process, so that graduates understand women holistically – from a physical, psychological, and aesthetic perspective.",
      icon: "newspaper",
    },
    {
      title: "Competency-Based and Technology-Based Curriculum",
      description:
        "Learning is designed to align with developments in modern obstetrics and the use of digital technology, including the application of information systems, clinical simulations, and research-based innovation.",
      icon: "monitor",
    },
    {
      title: "Collaboration and Extensive Networking",
      description:
        "Forming collaborations with hospitals, clinics, educational institutions, and professional organizations at the national and international levels to strengthen students' learning experiences and career opportunities.",
      icon: "users",
    },
    {
      title: "Professional and Experienced Lecturers",
      description:
        "Supported by competent teaching staff, experienced in clinical practice, research, and community service, and active in scientific activities and professional organizations.",
      icon: "users",
    },
    {
      title: "Developing Global and Entrepreneurial Character",
      description:
        "Instilling the values ​​of scientists, entrepreneurs, and leaders, enabling graduates to innovate, create business opportunities in the women's health sector, and contribute globally.",
      icon: "users",
    },
    {
      title: "Humanistic and Holistic Approach",
      description:
        "Emphasizes woman-centered midwifery services that are ethical, empathetic, and respectful of the cultural, spiritual, and emotional well-being of mothers and children.",
      icon: "users",
    },
    {
      title: "Modern and Inspiring Learning Environment",
      description:
        "Equipped with state-of-the-art obstetrics laboratories, comfortable practice rooms, and an academic atmosphere that supports creativity, research, and collaboration among students.",
      icon: "users",
    },
  ],
  iconMap: midwiferyIcons,
};

export const defaultStrengthsBentoStageMinHeightClass = defaultStageMinHeightClass;
