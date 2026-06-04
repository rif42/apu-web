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
    role: "Penyelenggara",
    category: "pimpinan",
    description:
      "Yayasan pendidikan yang menyelenggarakan Universitas Agung Putra Ibrahim (APU).",
    image: "/images/organization/yayasan.webp",
  },

  // Under Yayasan
  {
    id: "rektor",
    name: "Rektor",
    role: "Pimpinan Perguruan Tinggi",
    category: "pimpinan",
    parentId: "yayasan",
    description:
      "Pimpinan tertinggi universitas yang bertanggung jawab atas penyelenggaraan tridharma perguruan tinggi.",
    image: "/images/organization/rektor.webp",
  },
  {
    id: "senat",
    name: "Senat",
    role: "Badan Pertimbangan Akademik",
    category: "pimpinan",
    parentId: "yayasan",
    description:
      "Badan pertimbangan akademik tertinggi yang memberikan rekomendasi kebijakan akademik.",
    image: "/images/organization/senat.webp",
  },

  // Under Rektor — Wakil Rektor
  {
    id: "wr1",
    name: "Wakil Rektor I",
    role: "Bidang Akademik",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Menangani urusan akademik, kurikulum, dan kualitas pembelajaran.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr1-a",
    name: "Akademik",
    role: "Bidang Akademik",
    category: "unit-pendukung",
    parentId: "wr1",
    description:
      "Menangani jadwal kuliah, perencanaan kurikulum, dan administrasi mahasiswa.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr1-b",
    name: "IT Operator/PDDIKTI",
    role: "Bidang Akademik",
    category: "unit-pendukung",
    parentId: "wr1",
    description:
      "Menangani data dan sistem informasi yang berhubungan dengan LMS universitas dan PDDIKTI.",
    image: "/images/organization/wr1.webp",
  },
  {
    id: "wr2",
    name: "Wakil Rektor II",
    role: "Bidang Keuangan & Sarana Prasarana",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Menangani administrasi keuangan, sarana prasarana, dan pengelolaan aset.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "lab",
    name: "Laboratorium",
    role: "Unit Pendukung",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Mengelola laboratorium, peralatan, dan fasilitas yang mendukung kegiatan akademik dan non-akademik.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "perpus",
    name: "Perpustakaan",
    role: "Unit Pendukung",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Mengelola perpustakaan, koleksi buku, dan fasilitas yang mendukung kegiatan akademik dan non-akademik.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "keuangan",
    name: "Keuangan",
    role: "Unit Pendukung",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Mengelola keuangan, administrasi, dan pengelolaan aset material yang mendukung kegiatan akademik dan non-akademik.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "sarpras",
    name: "Sarana Prasarana",
    role: "Unit Pendukung",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Mengelola sarana prasarana, fasilitas, dan pengelolaan aset fisik yang mendukung kegiatan akademik dan non-akademik.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "kepegawaian",
    name: "Kepegawaian",
    role: "Unit Pendukung",
    category: "unit-pendukung",
    parentId: "wr2",
    description:
      "Mengelola kepegawaian, administrasi yang mendukung kegiatan akademik dan non-akademik.",
    image: "/images/organization/wr2.webp",
  },
  {
    id: "wr3",
    name: "Wakil Rektor III",
    role: "Bidang Kemahasiswaan",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Menangani kegiatan kemahasiswaan, karir, dan kesejahteraan mahasiswa.",
    image: "/images/organization/wr3.webp",
  },
  {
    id: "kerjasama",
    name: "Kerjasama",
    role: "Unit Pendukung",
    category: "pimpinan",
    parentId: "wr3",
    description:
      "Menangani kegiatan kerjasama dengan pihak eksternal, baik dalam maupun luar universitas.",
    image: "/images/organization/wr3.webp",
  },
  {
    id: "kemahasiswaan",
    name: "Wakil Rektor III",
    role: "Bidang Kemahasiswaan",
    category: "pimpinan",
    parentId: "rektor",
    description:
      "Menangani kegiatan kemahasiswaan, karir, dan kesejahteraan mahasiswa.",
    image: "/images/organization/wr3.webp",
  },

  // Under Rektor — Unit Pendukung
  {
    id: "lppm",
    name: "LPPM",
    role: "Lembaga Penelitian dan Pengabdian Masyarakat",
    category: "unit-pendukung",
    parentId: "rektor",
    description:
      "Mengelola program penelitian dan pengabdian kepada masyarakat.",
    image: "/images/organization/lppm.webp",
  },
  {
    id: "lpmi",
    name: "LPMI",
    role: "Lembaga Penjaminan Mutu Internal",
    category: "unit-pendukung",
    parentId: "rektor",
    description:
      "Menjamin dan meningkatkan mutu penyelenggaraan pendidikan secara berkelanjutan.",
    image: "/images/organization/lpmi.webp",
  },

  // Under Rektor — Fakultas
  {
    id: "fis",
    name: "Fakultas Ilmu Sosial",
    role: "Fakultas",
    category: "fakultas",
    parentId: "rektor",
    description:
      "Fakultas yang menyelenggarakan program studi di bidang ilmu sosial dan humaniora.",
    image: "/images/organization/fis.webp",
  },
  {
    id: "fik",
    name: "Fakultas Ilmu Kesehatan",
    role: "Fakultas",
    category: "fakultas",
    parentId: "rektor",
    description:
      "Fakultas yang menyelenggarakan program studi di bidang kesehatan dan biomedis.",
    image: "/images/organization/fik.webp",
  },

  // Prodi under FIS
  {
    id: "hukum",
    name: "Hukum",
    role: "Program Studi",
    category: "prodi",
    parentId: "fis",
    description:
      "Program Studi Hukum mempersiapkan lulusan yang kompeten di bidang hukum nasional dan internasional.",
    image: "/images/organization/prodi-hukum.webp",
  },
  {
    id: "ilmu-komunikasi",
    name: "Ilmu Komunikasi",
    role: "Program Studi",
    category: "prodi",
    parentId: "fis",
    description:
      "Program Studi Ilmu Komunikasi mempersiapkan praktisi media, jurnalistik, dan komunikasi strategis.",
    image: "/images/organization/prodi-ilmu-komunikasi.webp",
  },
  {
    id: "manajemen",
    name: "Manajemen",
    role: "Program Studi",
    category: "prodi",
    parentId: "fis",
    description:
      "Program Studi Manajemen mempersiapkan lulusan dengan keahlian di bidang bisnis dan manajemen organisasi.",
    image: "/images/organization/prodi-manajemen.webp",
  },
  {
    id: "bioteknologi",
    name: "Bioteknologi",
    role: "Program Studi",
    category: "prodi",
    parentId: "fis",
    description:
      "Program Studi Bioteknologi mempersiapkan lulusan di bidang teknologi biologi dan inovasi berbasis sains hayati.",
    image: "/images/organization/prodi-bioteknologi.webp",
  },

  // Prodi under FIK
  {
    id: "ilmu-biomedis",
    name: "Ilmu Biomedis",
    role: "Program Studi",
    category: "prodi",
    parentId: "fik",
    description:
      "Program Studi Ilmu Biomedis mempersiapkan lulusan yang ahli di bidang riset kesehatan dan laboratorium medis.",
    image: "/images/organization/prodi-ilmu-biomedis.webp",
  },
  {
    id: "sarjana-kebidanan",
    name: "Sarjana Kebidanan",
    role: "Program Studi",
    category: "prodi",
    parentId: "fik",
    description:
      "Program Studi Sarjana Kebidanan mempersiapkan lulusan sebagai bidan profesional tingkat sarjana.",
    image: "/images/organization/prodi-sarjana-kebidanan.webp",
  },
  {
    id: "profesi-bidan",
    name: "Profesi Bidan",
    role: "Program Studi",
    category: "prodi",
    parentId: "fik",
    description:
      "Program Profesi Bidan adalah program pendidikan lanjutan untuk mempersiapkan tenaga bidan profesional.",
    image: "/images/organization/prodi-profesi-bidan.webp",
  },
  {
    id: "d3-kebidanan",
    name: "D3 Kebidanan",
    role: "Program Studi",
    category: "prodi",
    parentId: "fik",
    description:
      "Program Studi D3 Kebidanan mempersiapkan tenaga bidan ahli madya yang kompeten secara profesional.",
    image: "/images/organization/prodi-d3-kebidanan.webp",
  },
];
