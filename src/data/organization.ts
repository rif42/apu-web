export interface OrgNode {
  id: string;
  name: string;
  role: string;
  category: OrgCategory;
  parentId?: string;
  description?: string;
  image?: string;
}

export type OrgCategory =
  | "pimpinan"
  | "fakultas"
  | "unit-pendukung"
  | "prodi"

export interface OrgTreeNode extends OrgNode {
  children?: OrgTreeNode[];
}

export function buildTree(nodes: OrgNode[]): OrgTreeNode[] {
  const map = new Map<string, OrgTreeNode>();
  const roots: OrgTreeNode[] = [];

  // Initialize map with all nodes (no children yet)
  for (const node of nodes) {
    map.set(node.id, { ...node });
  }

  // Link children to parents
  for (const node of nodes) {
    const treeNode = map.get(node.id)!;
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(treeNode);
      }
    } else {
      roots.push(treeNode);
    }
  }

  return roots;
}

export const organization: OrgNode[] = [
  // Root
  {
    id: "yayasan",
    name: "Yayasan Agung Putra Ibrahim",
    role: "Operator",
    category: "pimpinan",
    description:
      "Educational foundation that operates Agung Putra Ibrahim University (APU).",
    image: "/images/organization/yayasan.webp",
  },

  // Under Yayasan
  {
    id: "rektor",
    name: "Rector",
    role: "University Leadership",
    category: "pimpinan",
    parentId: "yayasan",
    description:
      "The highest university leadership responsible for the implementation of the university's three pillars (education, research, community service).",
    image: "/images/organization/rektor.webp",
  },
  {
    id: "senat",
    name: "Senate",
    role: "Academic Advisory Body",
    category: "pimpinan",
    parentId: "yayasan",
    description:
      "The highest academic advisory body that provides academic policy recommendations.",
    image: "/images/organization/senat.webp",
  },

  // Under Rektor — Wakil Rektor
  {
    id: "wr1",
    name: "Vice Rector I",
    role: "Academic Affairs",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Handling academic affairs, curriculum, and learning quality.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr1-a",
    name: "Academic",
    role: "Academic Affairs",
    category: "unit-pendukung",
    parentId: "wr1",
    description:
      "Handling class schedules, curriculum planning, and student administration.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr1-b",
    name: "IT Operator/PDDIKTI",
    role: "Academic Affairs",
    category: "unit-pendukung",
    parentId: "wr1",
    description:
      "Handling data and information systems related to university LMS and PDDIKTI.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr2",
    name: "Vice Rector II",
    role: "Finance & Infrastructure Affairs",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Handling financial administration, infrastructure, and asset management.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "lab",
    name: "Laboratory",
    role: "Support Unit",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Managing laboratories, equipment, and facilities supporting academic and non-academic activities.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "perpus",
    name: "Library",
    role: "Support Unit",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Managing the library, book collections, and facilities supporting academic and non-academic activities.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "keuangan",
    name: "Finance",
    role: "Support Unit",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Managing finances, administration, and material asset management supporting academic and non-academic activities.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "sarpras",
    name: "Infrastructure",
    role: "Support Unit",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Managing infrastructure, facilities, and physical asset management supporting academic and non-academic activities.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "kepegawaian",
    name: "Human Resources",
    role: "Support Unit",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Managing human resources and administration supporting academic and non-academic activities.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "wr3",
    name: "Vice Rector III",
    role: "Student Affairs",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Handling student activities, career, and student welfare.",
    image: "/images/organization/wr3.webp",
  },
  {
    id: "kerjasama",
    name: "Cooperation",
    role: "Support Unit",
    category: "pimpinan",
    parentId: "wr3",
    description:
      "Handling cooperation activities with external parties, both within and outside the university.",
    image: "/images/organization/wr3.webp",
  },
  {
    id: "kemahasiswaan",
    name: "Student Affairs",
    role: "Student Affairs",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Handling student activities, career, and student welfare.",
    image: "/images/organization/wr3.webp",
  },

  // Under Rektor — Unit Pendukung
  {
    id: "lppm",
    name: "LPPM",
    role: "Research and Community Service Institute",
    category: "unit-pendukung",
    parentId: "rektor",
    description:
      "Managing research and community service programs.",
    image: "/images/organization/lppm.webp",
  },
  {
    id: "lpmi",
    name: "LPMI",
    role: "Internal Quality Assurance Institute",
    category: "unit-pendukung",
    parentId: "rektor",
    description:
      "Ensuring and improving the quality of education implementation sustainably.",
    image: "/images/organization/lpmi.webp",
  },

  // Under Rektor — Fakultas
  {
    id: "fis",
    name: "Faculty of Social Sciences",
    role: "Faculty",
    category: "fakultas",
    parentId: "rektor",
    description:
      "Faculty that organizes study programs in social sciences and humanities.",
    image: "/images/organization/fis.webp",
  },
  {
    id: "fik",
    name: "Faculty of Health Sciences",
    role: "Faculty",
    category: "fakultas",
    parentId: "rektor",
    description:
      "Faculty that organizes study programs in health and biomedical sciences.",
    image: "/images/organization/fik.webp",
  },

  // Prodi under FIS
  {
    id: "hukum",
    name: "Law",
    role: "Study Program",
    category: "prodi",
    parentId: "fis",
    description:
      "Law Study Program prepares graduates competent in national and international law.",
    image: "/images/organization/prodi-hukum.webp",
  },
  {
    id: "ilmu-komunikasi",
    name: "Communication Science",
    role: "Study Program",
    category: "prodi",
    parentId: "fis",
    description:
      "Communication Science Study Program prepares media practitioners, journalists, and strategic communication professionals.",
    image: "/images/organization/prodi-ilmu-komunikasi.webp",
  },
  {
    id: "manajemen",
    name: "Management",
    role: "Study Program",
    category: "prodi",
    parentId: "fis",
    description:
      "Management Study Program prepares graduates with expertise in business and organizational management.",
    image: "/images/organization/prodi-manajemen.webp",
  },
  {
    id: "bioteknologi",
    name: "Biotechnology",
    role: "Study Program",
    category: "prodi",
    parentId: "fis",
    description:
      "Biotechnology Study Program prepares graduates in biological technology and life science-based innovation.",
    image: "/images/organization/prodi-bioteknologi.webp",
  },

  // Prodi under FIK
  {
    id: "ilmu-biomedis",
    name: "Biomedical Science",
    role: "Study Program",
    category: "prodi",
    parentId: "fik",
    description:
      "Biomedical Science Study Program prepares graduates expert in health research and medical laboratories.",
    image: "/images/organization/prodi-ilmu-biomedis.webp",
  },
  {
    id: "sarjana-kebidanan",
    name: "Bachelor of Midwifery",
    role: "Study Program",
    category: "prodi",
    parentId: "fik",
    description:
      "Bachelor of Midwifery Study Program prepares graduates as professional bachelor's-level midwives.",
    image: "/images/organization/prodi-sarjana-kebidanan.webp",
  },
  {
    id: "profesi-bidan",
    name: "Midwifery Profession",
    role: "Study Program",
    category: "prodi",
    parentId: "fik",
    description:
      "Midwifery Profession Program is an advanced education program to prepare professional midwifery personnel.",
    image: "/images/organization/prodi-profesi-bidan.webp",
  },
  {
    id: "d3-kebidanan",
    name: "D3 Midwifery",
    role: "Study Program",
    category: "prodi",
    parentId: "fik",
    description:
      "D3 Midwifery Study Program prepares competent associate expert midwifery personnel.",
    image: "/images/organization/prodi-d3-kebidanan.webp",
  },
];
