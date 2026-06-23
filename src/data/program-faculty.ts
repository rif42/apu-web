export interface FacultyMember {
  name: string;
  title: string;
  photo?: string;
  nidn: string;
  link?: string;
  scopus_id?: string;
  scopus_index?: string;
  sinta_id?: string;
  sinta_index?: string;
  specialization?: string;
}

export interface ProgramFacultyData {
  description: string;
  facultyMembers: FacultyMember[];
}

export const biomedicalFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  facultyMembers: [
    {
      name: "Nadya Audina NS. S.Si., M.Biomed",
      title: "Head of Biomedical Study Program",
      nidn: "5960775676230172",
    },
    {
      name: "Mohammad Ariq Nazar, S.Si, M.Biomed",
      title: "Head of Biomedical Study Program",
      nidn: "0614029302",
    },
    {
      name: "Nadya Audina NS. S.Si., M.Biomed",
      title: "Head of Biomedical Study Program",
      nidn: "5960775676230172",
    },
  ],
};

export const biotechnologyFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  facultyMembers: [
    {
      name: "Fauziah Novita Putri Rifai, S.Si, M.Biotech",
      title: "Head of Biotechnology Study Program",
      nidn: "5438774675230243",

    },
    {
      name: "Nurul Hidayah S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "6960774675230252",
    },
    {
      name: "Salindri Prawitasari, S.Si, M.Si.",
      title: "Lecturer",
      nidn: "9659774675230242",
    },
    {
      name: "Dini Cahyani, S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "8237775676230193",
    },
    {
      name: "Iffan Alif, S.Si, M.Biotech",
      title: "Lecturer",
      nidn: "5454772673130273",
    },
    {
      name: "Waheni Rizki Aprilia, S.Si., Ph.D.",
      title: "Lecturer",
      nidn: "8734771672230402",
    },
    {
      name: "Adzani Gaisani Arda M.Sc",
      title: "Lecturer",
      nidn: "-",
    },
    {
      name: "Fikriya Novita Sari, S.Si., M.Si",
      title: "Lecturer",
      nidn: "1459777678230243",
    },
  ],
};

export const communicationFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in communication science",
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
      name: "Rif'atul Himmah, S.Sos., M.I.Kom",
      title: "Lecturer",
      nidn: "2461772673230292",
    },
    {
      name: "Bondan Eko Suratno, M.Hum",
      title: "Lecturer",
      nidn: "610108603",
    },
  ],
};

export const lawFaculty: ProgramFacultyData = {
  description: "Internationally qualified faculty guiding students in law",
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
      name: "Naufal Sebastian, S.H.,M.H.",
      title: "lecturer",
      nidn: "7435775676130282",
    },
  ],
};

export const managementFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in research and innovation",
  facultyMembers: [
    {
      name: "Dr. Ir. Agus F. Abdillah, MBA, ERMAP",
      title: "Lecturer",
      nidn: "6137744645130133",
      scopus_id: " 59912689000",
    },
    {
      name: "Dr. Suharto Abdul Majid, M.M",
      title: "Lecturer",
      nidn: "315037102",
    },
    {
      name: "Dr. Mohammad Annas, S. Tr.Par, M.M. ",
      title: "Lecturer",
      nidn: "312087404",
      scopus_id: "57886387600",
    },
    {
      name: "Reni Nur Arifah, S.E., M.M.",
      title: "Head of Management Study Program",
      nidn: "0625069301",
    },
    {
      name: "Yetty Yuliany K, S.E., M.M",
      title: "Lecturer",
      nidn: "0605077402",
    },
    {
      name: "Putri Aryo Jelang Fitri Khothimah, S.E., M.M.",
      title: "Lecturer",
      nidn: "0601039501",
    },
    {
      name: "Randika Shafly Fawwaz, S.M., M.M",
      title: "Lecturer",
      nidn: "2433775676130432",
    },
    {
      name: "Eva Fachria, S.E., M.S.M",
      title: "Lecturer",
      nidn: "9053772673230383",
    },


    {
      name: "Dr. Mohammad Annas, S. Tr.Par, M.M.",
      title: "Lecturer",
      nidn: "-",
    },
  ],
};

export const midwiferyAssociateFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in midwifery",
  facultyMembers: [
    {
      name: "Bdn, Titik Kurniawati, S.ST., M.Kes., M.Keb",
      title: "Head of Midwifery Associate Study Program",
      nidn: "0622068101",
    },
    {
      name: "Dewi Elliana, SKM., S.Tr.Keb., M.Kes",
      title: "lecturer",
      nidn: "0611027703",
    },
    {
      name: "dr. Rita Agustina, M.Biomed",
      title: "Lecturer",
      nidn: "4133752653230133",
    },
    {
      name: "Diah Widiyatun, S.ST., M.Tr.Keb",
      title: "Lecturer",
      nidn: "0617069002",
    },
    {
      name: "Erna Setyaningsih, S.ST., M.Tr.Keb",
      title: "Lecturer",
      nidn: "356771672230323",
    },
  ],
};

export const midwiferyBachelorFaculty: ProgramFacultyData = {
  description:
    "Internationally qualified faculty guiding students in midwifery",
  facultyMembers: [
    {
      name: "Bd. Rizqitha, S.Tr.Keb., M.Tr.Keb",
      title: "Head of Midwifery Bachelor Study Program",
      nidn: "0608049401",
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
