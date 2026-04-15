import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '', icon: Icon }) => {
  return (
    <section id={id} className={`scroll-mt-24 lg:scroll-mt-12 mb-12 ${className}`}>
      <div className="flex items-center gap-2.5 mb-6 border-b border-slate-200 pb-2">
        {Icon && <Icon size={20} className="text-blue-600 shrink-0" />}
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        {children}
      </div>
    </section>
  );
};

export default Section;