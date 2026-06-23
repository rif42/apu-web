export interface FacultyMember {
  name: string;
  title: string;
  photo?: string;
  nidn: string;
  link?: string;
}

export interface ProgramFacultyData {
  sectionClass: string;
  kicker: string;
  title: string;
  description: string;
  gridClass: string;
  cardClass: string;
  nameClass: string;
  contentWrapper: boolean;
  nidnClass: string;
  linkClass: string;
  facultyMembers: FacultyMember[];
}

const commonAvatarGradientClasses = [
  "from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-apu-navy))]",
  "from-[rgb(var(--color-brand-primary))] to-[rgb(var(--color-brand-primary-deep))]",
  "from-[rgb(var(--color-apu-navy))] to-[rgb(var(--color-brand-primary))]",
  "from-[rgb(var(--color-brand-primary-soft))] to-[rgb(var(--color-apu-accent))]",
  "from-[rgb(var(--color-apu-accent))] to-[rgb(98_6_112)]",
];

const baseSectionClass = "apu-section-shell bg-brand-surface-alt py-24 md:py-32";
const baseKicker = "FACULTY";
const baseTitle = "Our Faculty";

const simpleCardClass =
  "apu-glass-card p-5 md:p-6 text-center h-full flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]";
const interactiveCardClass =
  "apu-glass-card apu-interactive-card p-5 md:p-6 text-center h-full flex flex-col items-center";

const simpleNameClass =
  "text-body font-semibold text-brand-text leading-snug mb-1";
const responsiveNameClass =
  "text-body-s md:text-body font-semibold text-brand-text leading-snug mb-1 break-words";

const simpleNidnClass = "text-mono text-[10px] text-brand-text-muted/70";
const responsiveNidnClass =
  "text-mono text-[10px] text-brand-text-muted/70 break-all";

const simpleLinkClass =
  "mt-3 text-caption text-brand-primary-deep hover:text-[rgb(var(--color-apu-accent))] transition-colors duration-220";
const pinnedLinkClass =
  "mt-auto pt-3 text-caption text-brand-primary-deep hover:text-[rgb(var(--color-apu-accent))] transition-colors duration-220";

export const biomedicalFaculty: ProgramFacultyData = {
  sectionClass: `${baseSectionClass} relative overflow-hidden`,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6",
  cardClass: simpleCardClass,
  nameClass: simpleNameClass,
  contentWrapper: false,
  nidnClass: simpleNidnClass,
  linkClass: simpleLinkClass,
  facultyMembers: [
    {
      name: "Nadya Audina NS. S.Si., M.Biomed",
      title: "Head of Study Program",
      nidn: "-",
    },
  ],
};

export const biotechnologyFaculty: ProgramFacultyData = {
  sectionClass: `${baseSectionClass} relative overflow-hidden`,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  gridClass: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6",
  cardClass: simpleCardClass,
  nameClass: simpleNameClass,
  contentWrapper: false,
  nidnClass: simpleNidnClass,
  linkClass: simpleLinkClass,
  facultyMembers: [
    {
      name: "Fauziah Novita Putri Rifai, S.Si, M.Biotech",
      title: "Head of Study Program",
      nidn: "-",
    },
    {
      name: "Nurul Hidayah S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Salindri Prawitasari, S.Si, M.Si.",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Dini Cahyani, S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Iffan Alif, S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Waheni Rizki Aprilia, S.Si., Ph.D.",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Adzani Gaisani Arda M.Sc",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Fikriya Novita Sari, S.Si., M.Si",
      title: "Lecturer",
      nidn: "-",
    },
  ],
};

export const communicationFaculty: ProgramFacultyData = {
  sectionClass: baseSectionClass,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in communication science",
  gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6",
  cardClass: interactiveCardClass,
  nameClass: responsiveNameClass,
  contentWrapper: true,
  nidnClass: responsiveNidnClass,
  linkClass: pinnedLinkClass,
  facultyMembers: [
    {
      name: "Muhamad Agung Setiawan, S.Sos., M.Sos",
      title: "lecturer",
      nidn: "0610089602",
    },
    {
      name: "Lakna Tulas'un, S.Sos., M.I.Kom.",
      title: "lecturer",
      nidn: "0626099702",
    },
    {
      name: "Sutinnarto,S.I.Kom.,M.I.Kom",
      title: "Lecturer",
      nidn: "0614028102",
    },
    {
      name: "Najmi Rizki Khairani, S.Sos., M.I.Kom",
      title: "Lecturer",
      nidn: "0610048605",
    },
    {
      name: "Rif'atul Himmah, S.Sos., M.I.Kom",
      title: "Lecturer",
      nidn: "2461772673230292",
    },
  ],
};

export const lawFaculty: ProgramFacultyData = {
  sectionClass: baseSectionClass,
  kicker: baseKicker,
  title: baseTitle,
  description: "Internationally qualified faculty guiding students in law",
  gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6",
  cardClass: interactiveCardClass,
  nameClass: responsiveNameClass,
  contentWrapper: true,
  nidnClass: responsiveNidnClass,
  linkClass: pinnedLinkClass,
  facultyMembers: [
    {
      name: "dr. Erwin, S.H., M.H",
      title: "lecturer",
      nidn: "6965892",
    },
    {
      name: "Zain Arfin Utama S.H.,M.H.",
      title: "lecturer",
      nidn: "0615119301",
    },
    {
      name: "Muhamad Chabib F.S.HI.,M.H.",
      title: "Lecturer",
      nidn: "0613059402",
    },
    {
      name: "Pandam Bayu Seto Aji, M.H.",
      title: "Lecturer",
      nidn: "2734775676130202",
    },
    {
      name: "Eko Setiyo Ary Wibowo S.H.I, M.H.",
      title: "Lecturer",
      nidn: "0608119001",
    },
  ],
};

export const managementFaculty: ProgramFacultyData = {
  sectionClass: `${baseSectionClass} relative overflow-hidden`,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  gridClass: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6",
  cardClass: simpleCardClass,
  nameClass: simpleNameClass,
  contentWrapper: false,
  nidnClass: simpleNidnClass,
  linkClass: simpleLinkClass,
  facultyMembers: [
    {
      name: "Reni Nur Arifah, S.E., M.M.",
      title: "Head of Study Program",
      nidn: "-",
    },
    {
      name: "Yetty Yuliany K, S.E., M.M",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Putri Aryo Jelang Fitri Khothimah, S.E., M.M.",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Randika Shafly Fawwaz, S.M., M.M",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Anindya Putri Utami, S.M., M.M.",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Eva Fachria, S.E., M.S.M",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Dr. Ir. Agus F. Abdillah, MBA, ERMAP",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "dr. Suharto Abdul Majid, M.M",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Dr. Mohammad Annas, S. Tr.Par, M.M.",
      title: "Lecturer",
      nidn: "-",
    },
  ],
};

export const midwiferyAssociateFaculty: ProgramFacultyData = {
  sectionClass: baseSectionClass,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in midwifery",
  gridClass: "grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6",
  cardClass: interactiveCardClass,
  nameClass: responsiveNameClass,
  contentWrapper: true,
  nidnClass: responsiveNidnClass,
  linkClass: pinnedLinkClass,
  facultyMembers: [
    {
      name: "Bdn, Titik Kurniawati, S.SiT., M.Kes., M.Keb",
      title: "lecturer",
      nidn: "0622058101",
    },
    {
      name: "Dewi Elliana, SKM., S.Tr.Keb., M.Kes",
      title: "lecturer",
      nidn: "0611027703",
    },
    {
      name: "dr. Rita Agustina, M.Biomed",
      title: "Lecturer",
      nidn: "NUPK 4133752653230133",
    },
    {
      name: "Diah Widiyatun, S.ST., M.Tr.Keb",
      title: "Lecturer",
      nidn: "0617069002",
    },
    {
      name: "Erna Setyaningsih, SST., M.Tr.Keb",
      title: "Lecturer",
      nidn: "-",
    },
  ],
};

export const midwiferyBachelorFaculty: ProgramFacultyData = {
  sectionClass: baseSectionClass,
  kicker: baseKicker,
  title: baseTitle,
  description:
    "Internationally qualified faculty guiding students in midwifery",
  gridClass: "grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6",
  cardClass: interactiveCardClass,
  nameClass: responsiveNameClass,
  contentWrapper: true,
  nidnClass: responsiveNidnClass,
  linkClass: pinnedLinkClass,
  facultyMembers: [
    {
      name: "Bd. Rizqitha, S.Tr.Keb., M.Tr.Keb",
      title: "lecturer",
      nidn: "0608049401",
    },
    {
      name: "Rizki Muji Lestari, S.SiT., M.Kes",
      title: "lecturer",
      nidn: "1124088901",
    },
    {
      name: "Rizqi Dian Pratiwi, S.Tr.Keb., M.Tr.Keb",
      title: "Lecturer",
      nidn: "0616089605",
    },
    {
      name: "Bd. Mariza Mustika Dewi, S.Tr.Keb., M.Tr.Keb",
      title: "Lecturer",
      nidn: "0618039302",
    },
    {
      name: "Bdn. Sri Mularsih, S.SiT., M.Kes",
      title: "Lecturer",
      nidn: "0618048001",
    },
    {
      name: "Bdn. Lia Ayu Kusumaningrum, S.ST., M.Tr.Keb",
      title: "Lecturer",
      nidn: "9990626978",
    },
    {
      name: "Endah Wijayanti, S.SiT., M.Kes",
      title: "Lecturer",
      nidn: "0601097901",
    },
  ],
};

export const facultyAvatarGradients = commonAvatarGradientClasses;
