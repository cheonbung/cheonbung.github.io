import React from 'react';
import { Award, Education, Patent, PortfolioData, Publication } from '../types';

// 인쇄(PDF 저장) 시에만 표시되는 학술 CV 레이아웃.
// 화면용 레이아웃(App)은 인쇄 시 통째로 숨겨지고 이 컴포넌트만 출력된다.

const SELF_NAMES = ['이병천', 'Byeongcheon Lee', 'B. Lee'];
const isSelf = (author: string) => SELF_NAMES.some((n) => author.includes(n));

const AuthorList = ({ authors }: { authors: string[] }) => (
  <>
    {authors.map((author, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && ', '}
        <span className={isSelf(author) ? 'font-bold underline underline-offset-2' : ''}>{author}</span>
      </React.Fragment>
    ))}
  </>
);

const CVSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-4">
    <h2 className="text-[10.5pt] font-bold uppercase tracking-[0.12em] border-b border-slate-900 pb-0.5 mb-1.5 break-after-avoid">
      {title}
    </h2>
    {children}
  </section>
);

const PaperItem = ({ pub, index }: { pub: Publication; index: number }) => (
  <div className="flex gap-1.5 mb-1.5 break-inside-avoid">
    <span className="w-5 shrink-0 text-right text-[9pt] pt-[1px]">{index}.</span>
    <div className="flex-1">
      <p className="font-semibold whitespace-pre-line leading-snug">{pub.title}</p>
      <p className="text-[9pt] leading-snug"><AuthorList authors={pub.authors} /></p>
      <p className="text-[9pt] leading-snug text-slate-700">
        <em>{pub.journalOrConference}</em>
        {' · '}{pub.type}{' · '}{pub.date}
        {pub.note ? <> · <span className="font-semibold">{pub.note}</span></> : null}
      </p>
    </div>
  </div>
);

const PatentItem = ({ patent, index }: { patent: Patent; index: number }) => (
  <div className="flex gap-1.5 mb-1.5 break-inside-avoid">
    <span className="w-5 shrink-0 text-right text-[9pt] pt-[1px]">{index}.</span>
    <div className="flex-1">
      <p className="font-semibold whitespace-pre-line leading-snug">{patent.title}</p>
      <p className="text-[9pt] leading-snug"><AuthorList authors={patent.inventors} /></p>
      <p className="text-[9pt] leading-snug text-slate-700">
        {patent.type}{' · '}{patent.number}{' · '}{patent.date}{' · '}{patent.applicant}
      </p>
    </div>
  </div>
);

const EducationItem = ({ edu }: { edu: Education }) => (
  <div className="flex justify-between gap-3 mb-1 break-inside-avoid">
    <p className="leading-snug">
      <span className="font-semibold">{edu.school}</span>
      {' — '}{edu.degree}
      {edu.major && edu.major !== '' && edu.major !== '-' ? `, ${edu.major}` : ''}
      <span className="text-[9pt] text-slate-700">
        {' '}({edu.status}
        {edu.advisor && edu.advisor !== '-' ? ` · ${edu.advisorLabel}: ${edu.advisor}` : ''})
      </span>
    </p>
    <span className="shrink-0 text-[9pt] pt-[1px]">{edu.period}</span>
  </div>
);

const AwardItem = ({ award }: { award: Award }) => (
  <div className="flex justify-between gap-3 mb-1 break-inside-avoid">
    <p className="leading-snug">
      {award.title}
      <span className="text-[9pt] text-slate-700"> — {award.issuer}</span>
    </p>
    <span className="shrink-0 text-[9pt] pt-[1px]">{award.date}</span>
  </div>
);

const CourseTable = ({ section }: { section: PortfolioData['gradCourses'] }) => (
  <div>
    <p className="font-semibold text-[9.5pt] mb-1 break-after-avoid">
      {section.title} <span className="font-normal text-slate-700">(GPA {section.gpa})</span>
    </p>
    <table className="w-full text-[8.5pt] leading-snug">
      <thead>
        <tr className="border-b border-slate-400 text-left">
          <th className="py-0.5 pr-2 font-semibold">{section.headers.period}</th>
          <th className="py-0.5 pr-2 font-semibold">{section.headers.name}</th>
          <th className="py-0.5 text-right font-semibold">{section.headers.grade}</th>
        </tr>
      </thead>
      <tbody>
        {section.courses.map((course, idx) => (
          <tr key={idx} className="border-b border-slate-200">
            <td className="py-0.5 pr-2 whitespace-nowrap">{course.period}</td>
            <td className="py-0.5 pr-2">{course.name}</td>
            <td className="py-0.5 text-right whitespace-nowrap">{course.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PrintCV = ({ data }: { data: PortfolioData }) => {
  const { ui, profile } = data;

  return (
    <div className="hidden print:block bg-white text-slate-900 text-[10pt] font-sans break-keep">
      {/* 헤더 */}
      <header className="flex justify-between items-start gap-6 border-b-2 border-slate-900 pb-3">
        <div>
          <h1 className="text-[19pt] font-extrabold tracking-tight">{profile.name}</h1>
          <p className="mt-1 leading-snug">
            {profile.role}{' · '}{profile.affiliation}
          </p>
          {profile.lab && <p className="leading-snug">{profile.lab}</p>}
          <p className="text-[9pt] text-slate-700 mt-1 leading-snug">
            {profile.email}{' · '}{profile.github}{' · '}https://cheonbung.github.io
          </p>
          <p className="text-[9pt] text-slate-700 leading-snug">
            {profile.interests.map((i) => `#${i}`).join('  ')}
          </p>
        </div>
        <img
          src={profile.imagePath}
          alt={profile.name}
          className="w-[21mm] h-[27mm] object-cover border border-slate-300"
        />
      </header>

      {/* 학력 */}
      <CVSection title={ui.education}>
        {data.education.map((edu, idx) => <EducationItem key={idx} edu={edu} />)}
      </CVSection>

      {/* 저널 논문 */}
      <CVSection title={ui.journalPapers}>
        {data.publications.map((pub, idx) => (
          <PaperItem key={idx} pub={pub} index={data.publications.length - idx} />
        ))}
      </CVSection>

      {/* 학술대회 발표 */}
      <CVSection title={ui.confPresentations}>
        {data.conferences.map((conf, idx) => (
          <PaperItem key={idx} pub={conf} index={data.conferences.length - idx} />
        ))}
      </CVSection>

      {/* 특허 */}
      <CVSection title={ui.patents}>
        {data.patents.map((patent, idx) => (
          <PatentItem key={idx} patent={patent} index={data.patents.length - idx} />
        ))}
      </CVSection>

      {/* 수상 */}
      <CVSection title={ui.awards}>
        {data.awards.map((award, idx) => <AwardItem key={idx} award={award} />)}
      </CVSection>

      {/* 해외연수 */}
      <CVSection title={ui.overseasExperience}>
        {data.overseasExperiences.map((exp, idx) => (
          <div key={idx} className="flex justify-between gap-3 mb-1 break-inside-avoid">
            <p className="leading-snug">
              <span className="font-semibold">{exp.title}</span>
              <span className="text-[9pt] text-slate-700"> — {exp.institution} · {exp.courses.join(' / ')}</span>
            </p>
            <span className="shrink-0 text-[9pt] pt-[1px]">{exp.period}</span>
          </div>
        ))}
      </CVSection>

      {/* 언어 및 자격증 */}
      <CVSection title={`${ui.languages} & ${ui.certifications}`}>
        {data.languages.map((lang, idx) => (
          <div key={idx} className="flex justify-between gap-3 mb-1">
            <p className="leading-snug">{lang.name} — {lang.testName}: <span className="font-semibold">{lang.score}</span> ({lang.issuer})</p>
            <span className="shrink-0 text-[9pt] pt-[1px]">{lang.date}</span>
          </div>
        ))}
        {data.certifications.map((cert, idx) => (
          <div key={idx} className="flex justify-between gap-3 mb-1">
            <p className="leading-snug">{cert.name} <span className="text-[9pt] text-slate-700">— {cert.issuer}</span></p>
            <span className="shrink-0 text-[9pt] pt-[1px]">{cert.date}</span>
          </div>
        ))}
      </CVSection>

      {/* 수강 과목 */}
      <CVSection title={ui.coursework}>
        <div className="space-y-3">
          <CourseTable section={data.gradCourses} />
          <CourseTable section={data.undergradCourses} />
        </div>
      </CVSection>

      <footer className="mt-5 pt-2 border-t border-slate-300 text-center text-[8.5pt] text-slate-600">
        {ui.lastUpdated}: {ui.lastUpdatedDate} · https://cheonbung.github.io
      </footer>
    </div>
  );
};

export default PrintCV;
