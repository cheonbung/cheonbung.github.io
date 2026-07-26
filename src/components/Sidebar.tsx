import React, { useEffect, useRef } from 'react';
import { User, BookOpen, Download, GraduationCap, Award, FileText, Menu, Moon, Sun, X, ScrollText, Globe } from 'lucide-react';
import { PortfolioData, Language, Theme } from '../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeSection: string;
  data: PortfolioData;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen, toggleSidebar, activeSection, data, language, setLanguage, theme, toggleTheme
}) => {
  const ui = data.ui;
  const asideRef = useRef<HTMLElement>(null);

  const navItems = [
    { id: 'about', label: ui.about, icon: User },
    { id: 'education', label: ui.education, icon: GraduationCap },
    { id: 'publications', label: ui.publications, icon: BookOpen },
    { id: 'patents', label: ui.patents, icon: ScrollText },
    { id: 'awards', label: ui.awards, icon: Award },
    { id: 'overseas', label: ui.overseasExperience, icon: Globe },
    { id: 'coursework', label: ui.coursework, icon: FileText },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const focusables = (): HTMLElement[] =>
      asideRef.current
        ? Array.from(asideRef.current.querySelectorAll<HTMLElement>('button, a[href]'))
        : [];
    // 열릴 때 메뉴 안으로 포커스 이동, 닫힐 때 원래 위치로 복원
    const prevFocus = document.activeElement as HTMLElement | null;
    focusables()[0]?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleSidebar();
        return;
      }
      // Tab 포커스를 열린 메뉴 안에 가둔다
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    // 모바일 메뉴가 열려 있는 동안 뒷배경 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // 데스크톱 폭으로 커지면 메뉴를 닫아 잠금 해제
    const onResize = () => {
      if (window.innerWidth >= 1024) toggleSidebar();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [isOpen, toggleSidebar]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-slate-900 z-50 border-b border-gray-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-bold text-lg text-slate-800 dark:text-slate-100">{data.profile.name}</span>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('KO')}
              aria-pressed={language === 'KO'}
              className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${language === 'KO' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              한글
            </button>
            <button
              onClick={() => setLanguage('EN')}
              aria-pressed={language === 'EN'}
              className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${language === 'EN' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              ENG
            </button>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={ui.themeToggle}
            aria-pressed={theme === 'dark'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleSidebar}
            aria-label={ui.menu}
            aria-expanded={isOpen}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Container */}
      <aside
        ref={asideRef}
        className={`
          fixed top-0 left-0 h-full bg-slate-900 text-white z-40 transition-transform duration-300 ease-in-out w-64
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          no-print shadow-2xl
        `}
      >
        <div className="p-6 border-b border-slate-700 hidden lg:block">
          {/* 본문 프로필의 h1과 중복되지 않도록 사이드바 이름은 제목 계층에서 제외 (p로 표기) */}
          <p className="text-xl font-bold tracking-tight">{data.profile.name}</p>
          <p className="text-slate-400 text-sm mt-1">{data.profile.role}</p>
          <p className="text-xs text-slate-400 mt-2 font-light">{data.profile.email}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`
                      w-full flex items-center px-6 py-3 text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                    `}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language Toggle & Footer */}
        <div className="p-6 border-t border-slate-700 bg-slate-900">
          <button
            onClick={() => window.print()}
            className="w-full mb-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 rounded-lg transition-colors"
          >
            <Download size={16} />
            {ui.downloadResume}
          </button>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex flex-1 items-center justify-between bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('KO')}
                aria-pressed={language === 'KO'}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${language === 'KO' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                한글
              </button>
              <button
                onClick={() => setLanguage('EN')}
                aria-pressed={language === 'EN'}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-colors ${language === 'EN' ? 'bg-slate-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>
            <button
              onClick={toggleTheme}
              aria-label={ui.themeToggle}
              aria-pressed={theme === 'dark'}
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="text-xs text-slate-400 text-center leading-relaxed">
            <span className="block mb-1 text-slate-500">{data.ui.lastUpdated}: {data.ui.lastUpdatedDate}</span>
            &copy; {new Date().getFullYear()} {data.profile.name}.
            <br /> All rights reserved.
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
