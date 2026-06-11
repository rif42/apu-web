export interface Requirement {
  number: string;
  title: string;
  description: string;
}

export const requirements: Requirement[] = [
  {
    number: '01',
    title: 'Senior High/Vocational/Islamic High School Graduate',
    description: 'Graduates in 2026 or earlier from senior high, vocational, or Islamic high school',
  },
  {
    number: '02',
    title: 'Physically & Mentally Healthy',
    description: 'Health certificate from a doctor or community health center',
  },
  {
    number: '03',
    title: 'Identity Card',
    description: 'Valid Identity Card',
  },
  {
    number: '04',
    title: 'Family Card',
    description: 'Family Card as proof of domicile',
  },
  {
    number: '05',
    title: 'Diploma/Graduation Certificate',
    description: 'Diploma or temporary graduation certificate',
  },
];
