import profAgung from "@/assets/images/academic/diaspora/prof-agung.webp";
import mrFaris from "@/assets/images/academic/diaspora/mr-faris.webp";
import msAdzani from "@/assets/images/academic/diaspora/ms-adzani.webp";
import mrJutadi from "@/assets/images/academic/diaspora/mr-jutadi.webp";
import msDina from "@/assets/images/academic/diaspora/ms-dina.webp";
import mrFaheem from "@/assets/images/academic/diaspora/mr-faheem.webp";
import msWaheni from "@/assets/images/academic/diaspora/ms-waheni.webp";
import profYayuk from "@/assets/images/academic/diaspora/prof-yayuk.webp";
import mrDendi from "@/assets/images/academic/diaspora/mr-dendi.webp";
import mrAgus from "@/assets/images/academic/diaspora/mr-agus.webp";
import msEndah from "@/assets/images/academic/diaspora/ms-endah.webp";
import { lecturers, sectionCopy } from "./lecturers";

const baseLecturer = lecturers[0];
const baseNotableResearch = sectionCopy.featured.notableResearch;

export interface DiasporaPerson {
  id: string;
  name: string;
  role: string;
  desc: string;
  href: string;
  image: { src: string };
  position: number;
  pastExperience: {
    label: string;
    items: string[];
  };
  notableResearch: {
    label: string;
    text: string;
  };
}

export const people: DiasporaPerson[] = [
  {
    id: "faris",
    name: "Muhammad Faris, M.T.M.",
    role: 'TBD',
    desc: "Kirklareli University, Türkiye",
    href: "#",
    image: mrFaris,
    position: 4,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "adzani",
    name: "Adzani Gaisani Arda, BSc,MSc.",
    role: 'TBD',
    desc: "University of Debrecen, Hungary",
    href: "#",
    image: msAdzani,
    position: 12,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "jutadi",
    name: "dr. Jutadi, MBBS",
    role: 'TBD',
    desc: "Changsha Medical University, China",
    href: "#",
    image: mrJutadi,
    position: 20,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "dina",
    name: "Nur Dina A.M.Sc., (Ph.D. cand)",
    role: 'TBD',
    desc: "NAIST Japan",
    href: "#",
    image: msDina,
    position: 28,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "faheem",
    name: "Dr. Faheem Ahmed Khan, B.Sc, M.S, Ph.D",
    role: 'TBD',
    desc: "M.I.T. USA",
    href: "#",
    image: mrFaheem,
    position: 37,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "prof-agung",
    name: "Prof. Dr. dr. Agung Putra, M.Si. Med.",
    role: 'TBD',
    desc: "Founder & Commissioner SCCR Indonesia",
    href: "#",
    image: profAgung,
    position: 50,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "waheni",
    name: "Waheni Rizki Aprilia, S.Si., Ph.D.",
    role: 'TBD',
    desc: "Suranaree University of Technology, Thailand",
    href: "#",
    image: msWaheni,
    position: 62,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "yayuk",
    name: "Prof. Yayuk Astuti, S.Si, Ph.D",
    role: 'TBD',
    desc: "Newcastle University, UK",
    href: "#",
    image: profYayuk,
    position: 71,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "dendi",
    name: "Dendi Krisna Nugraha, M.Sc., Ph.D.",
    role: 'TBD',
    desc: "RIMD, Osaka Japan",
    href: "#",
    image: mrDendi,
    position: 79,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "agus",
    name: "Dr. Ir. Agus F. Abdillah, MBA",
    role: 'TBD',
    desc: "University of Birmingham, UK",
    href: "#",
    image: mrAgus,
    position: 87,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
  {
    id: "endah",
    name: "Endah Agustina Lestari BSc,MSc.",
    role: 'TBD',
    desc: "University of Queensland, Australia",
    href: "#",
    image: msEndah,
    position: 96,
    pastExperience: {
      label: "TBD",
      items: ["TBD"],
    },
    notableResearch: {
      label: "TBD",
      text: "TBD",
    },
  },
];

export const diasporaLecturer = {
  id: baseLecturer.id,
  name: baseLecturer.name,
  role: 'TBD',
  image: profAgung,
  pastExperience: {
    label: "TBD",
    items: ["TBD"],
  },
  notableResearch: {
    label: "TBD",
    text: "TBD",
  },
};
