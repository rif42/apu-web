export interface ProgramHead {
  name: string;
  title: string;
  photo?: string;
  message: string;
}

export interface ProgramStrength {
  title: string;
  description: string;
  icon: string; // SVG path data or identifier
}

export interface GraduateAttribute {
  letter: string;
  word: string;
  meaning: string;
  description: string;
}

export interface CareerPath {
  title: string;
  description: string;
}

export interface FacultyMember {
  name: string;
  title: string;
  photo?: string;
  nidn: string;
  link?: string;
}

export interface ProgramDetail {
  programId: string;
  name: string;
  degree: string;
  faculty: string;
  head: ProgramHead;
  strengths: ProgramStrength[];
  vision: string;
  mission: string[];
  graduateAttributes: GraduateAttribute[];
  objectives: string[];
  careerPaths: CareerPath[];
  facultyMembers: FacultyMember[];
  focusAreas: string[];
}

export const biotechnologyProgram: ProgramDetail = {
  programId: 'biotechnology',
  name: 'Biotechnology',
  degree: 'S1',
  faculty: 'Fakultas Sains dan Teknologi',
  head: {
    name: 'Fauziah Novita Putri Rifai, S.Si, M.Biotech',
    title: 'Kepala Program Studi',
    message: `Selamat datang di Program Studi Biotechnology APU. Kami membangun kurikulum yang menggabungkan kekuatan biologi molekuler, teknologi informasi, dan rekayasa industri berkelanjutan. Mahasiswa kami tidak hanya belajar di laboratorium standar GLP/GMP, tetapi juga terlibat langsung dalam proyek riset dan magang industri sejak semester awal.

Lulusan Biotechnology APU siap menghadapi tantangan global di bidang medis, digital, dan industri hijau. Bergabunglah dengan kami untuk menjadi bagian dari generasi yang mengubah dunia melalui sains dan inovasi.`,
  },
  strengths: [
    {
      title: 'Interdisipliner',
      description: 'Medical biotech + informatics + industrial biotech dengan green technology',
      icon: 'dna',
    },
    {
      title: 'Sarana Modern',
      description: 'Laboratorium standar GLP/GMP (SCCR) dengan peralatan lengkap dan mutakhir',
      icon: 'flask',
    },
    {
      title: 'Pendidik Internasional',
      description: 'Dosen berkualifikasi global yang aktif dalam penelitian dan publikasi',
      icon: 'globe',
    },
    {
      title: 'Orientasi Industri',
      description: 'Magang, proyek terapan, dan kolaborasi dengan mitra industri bioteknologi',
      icon: 'factory',
    },
    {
      title: 'Biotech Digital & AI',
      description: 'Pemodelan komputasional, analisis data biologis, dan penerapan AI dalam bioteknologi',
      icon: 'cpu',
    },
    {
      title: 'Entrepreneurship',
      description: 'Pembentukan mindset entrepreneur dan pengembangan kepemimpinan di bidang sains',
      icon: 'trending-up',
    },
    {
      title: 'Jaringan Global',
      description: 'Kemitraan nasional dan internasional untuk peluang karir dan riset',
      icon: 'network',
    },
  ],
  vision:
    'Menjadi program studi bioteknologi unggul bertaraf internasional, melalui inovasi green technology dan pengembangan rekayasa sel.',
  mission: [
    'Menyelenggarakan pendidikan bioteknologi berkualitas dunia yang berbasis riset dan teknologi terkini.',
    'Mengembangkan penelitian inovatif di bidang medical biotechnology, bioinformatics, dan industrial biotechnology.',
    'Membangun kerja sama strategis dengan industri dan institusi akademik dalam dan luar negeri.',
    'Menghasilkan lulusan yang adaptif, kreatif, dan bertanggung jawab sosial.'
  ],
  graduateAttributes: [
    {
      letter: 'A',
      word: 'Adaptable',
      meaning: 'Adaptif',
      description: 'Mampu merespons perubahan dunia yang cepat dengan pembelajaran berkelanjutan.',
    },
    {
      letter: 'P',
      word: 'Persistence',
      meaning: 'Tangguh',
      description: 'Pantang menyerah dalam menghadapi tantangan akademik dan profesional.',
    },
    {
      letter: 'U',
      word: 'Universal',
      meaning: 'Universal',
      description: 'Berwawasan global dan menghargai nilai kebaikan universal.',
    },
    {
      letter: 'S',
      word: 'Smart',
      meaning: 'Cerdas',
      description: 'Cerdas dan maju secara intelektual dengan dasar sains yang kuat.',
    },
    {
      letter: 'S',
      word: 'Creative',
      meaning: 'Kreatif',
      description: 'Selalu berinovasi dan mencari peluang baru di bidang bioteknologi.',
    },
    {
      letter: 'C',
      word: 'Collaborative',
      meaning: 'Kolaboratif',
      description: 'Bekerja sama dalam tim sebagai pemimpin efektif dan anggota yang berkontribusi.',
    },
    {
      letter: 'R',
      word: 'Responsible',
      meaning: 'Bertanggung Jawab',
      description: 'Tanggung jawab sosial kepada masyarakat, bangsa, dan Tuhan.',
    },
  ],
  objectives: [
    'Menghasilkan lulusan yang menguasai konsep fundamental dan aplikasi bioteknologi.',
    'Membekali mahasiswa dengan keterampilan riset laboratorium dan analisis data.',
    'Mengintegrasikan teknologi informasi dan kecerdasan buatan dalam proses bioteknologi.',
    'Membangun jiwa entrepreneur dan kemampuan manajemen proyek sains.',
  ],
  careerPaths: [
    {
      title: 'Research Scientist',
      description: 'Riset dan pengembangan di laboratorium bioteknologi farmasi, pangan, dan kesehatan.',
    },
    {
      title: 'Clinical Regulator',
      description: 'Regulasi dan pengawasan produk biomedis untuk memastikan keamanan dan kualitas.',
    },
    {
      title: 'Bioinformatics Expert',
      description: 'Analisis data biologis, pemodelan komputasional, dan pengembangan algoritma genomik.',
    },
    {
      title: 'Data Security Specialist',
      description: 'Keamanan data riset dan informasi kesehatan dalam ekosistem digital bioteknologi.',
    },
    {
      title: 'Quality Assurance Professional',
      description: 'Jaminan mutu produk bioteknologi sesuai standar GLP, GMP, dan internasional.',
    },
    {
      title: 'Industrial Biotech Developer',
      description: 'Pengembangan produk dan proses di industri bioteknologi hijau dan berkelanjutan.',
    },
  ],
  facultyMembers: [
    {
      name: 'Fauziah Novita Putri Rifai, S.Si, M.Biotech',
      title: 'Kepala Program Studi',
      nidn: '-',
    },
    {
      name: 'Iffan Alif, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Nurul Hidayah, S.Si, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Salindri Prawitasari, S.Si, M.Si',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Dini Cahyani, S.Si, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
  ],
  focusAreas: [
    'Medical Biotechnology',
    'Biotechnology Informatics',
    'Biotechnology Industry',
  ],
};
