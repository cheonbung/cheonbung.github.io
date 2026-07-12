import React from 'react';

export type Language = 'KO' | 'EN';

export interface Education {
  period: string;
  degree: string;
  school: string;
  major: string;
  status: string;
  advisor?: string;
  advisorLabel?: string;
}

export interface Course {
  period: string;
  name: string;
  credits: number;
  grade: string;
}

export interface CourseSection {
  title: string;
  gpa: string;
  courses: Course[];
  headers: {
    period: string;
    name: string;
    credits: string;
    grade: string;
  }
}

export interface LanguageItem {
  name: string;
  testName: string;
  score: string;
  date: string;
  issuer: string;
}

export interface Certification {
  date: string;
  name: string;
  issuer: string;
}

export type PublicationType = 'SCIE' | 'SSCI' | 'Domestic' | 'International Conference' | 'Domestic Conference';

export type AwardRank = 'gold' | 'silver' | 'bronze';

export interface Publication {
  date: string;
  type: PublicationType;
  title: string;
  authors: string[];
  journalOrConference: string;
  note?: string;
}

export interface Patent {
  type: 'Domestic' | 'PCT';
  date: string;
  number: string;
  title: string;
  inventors: string[];
  applicant: string;
}

export interface Award {
  date: string;
  title: string;
  issuer: string;
  rank?: AwardRank;
}

export interface OverseasExperience {
  period: string;
  title: string;
  institution: string;
  courses: string[];
}

export interface Profile {
  name: string;
  role?: string;
  affiliation?: string; // 소속 (학과 등)
  lab?: string;         // 연구실 이름
  labUrl?: string;      // 연구실 링크
  email: string;
  imagePath: string;
  github: string;
  interests: string[];
  bio: React.ReactNode; // 줄바꿈/볼드 처리를 위해 ReactNode 사용
}

export interface UIStrings {
  siteTitle: string;
  about: string;
  education: string;
  publications: string;
  patents: string;
  awards: string;
  overseasExperience: string;
  coursework: string;
  languages: string;
  certifications: string;
  journalPapers: string;
  confPresentations: string;
  gradCourses: string;
  undergradCourses: string;
  designedBy: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  menu: string;
  emailLabel: string;
  visitProfile: string;
  downloadResume: string;
  rankLabels: Record<AwardRank, string>;
  stats: {
    journals: string;
    conferences: string;
    patents: string;
  }
}

export interface PortfolioData {
  ui: UIStrings;
  profile: Profile;
  education: Education[];
  gradCourses: CourseSection;
  undergradCourses: CourseSection;
  languages: LanguageItem[];
  certifications: Certification[];
  publications: Publication[];
  conferences: Publication[];
  patents: Patent[];
  awards: Award[];
  overseasExperiences: OverseasExperience[];
}
