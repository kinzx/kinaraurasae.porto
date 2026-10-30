'use client';

import { useEffect, useMemo, useState } from 'react';
import { Award, FolderGit2, Home, Mail, PenTool, Search, User, Wrench } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'NAV' | 'PROJECT';
  href: string;
  icon: typeof Home;
}

const searchDataset: SearchItem[] = [
  { id: 'nav-home', title: 'Home', category: 'NAV', href: '#intro', icon: Home },
  { id: 'nav-about', title: 'About', category: 'NAV', href: '#profile', icon: User },
  { id: 'nav-projects', title: 'Projects', category: 'NAV', href: '#work', icon: FolderGit2 },
  {
    id: 'nav-achievements',
    title: 'Achievements',
    subtitle: 'CTF & Experience',
    category: 'NAV',
    href: '#profile',
    icon: Award,
  },
  {
    id: 'nav-writings',
    title: 'Writings',
    subtitle: 'Notes & documentation',
    category: 'NAV',
    href: '#work',
    icon: PenTool,
  },
  {
    id: 'nav-uses',
    title: 'Uses',
    subtitle: 'Tools, software & hardware',
    category: 'NAV',
    href: '#profile',
    icon: Wrench,
  },
  { id: 'nav-contact', title: 'Contact', category: 'NAV', href: '#contact', icon: Mail },
  {
    id: 'prj-unitrade',
    title: 'UniTrade',
    subtitle: 'Marketplace C2C Odoo 17 untuk mahasiswa Yogyakarta',
    category: 'PROJECT',
    href: '#work',
    icon: FolderGit2,
  },
  {
    id: 'prj-tehpoci',
    title: 'WEB UMKM Teh Poci',
    subtitle: 'Eksplorasi antarmuka digital dan katalog produk UMKM',
    category: 'PROJECT',
    href: '#work',
    icon: FolderGit2,
  },
  {
    id: 'prj-sakoo',
    title: 'Sakoo Finance Bot',
    subtitle: 'Personal finance assistant via WA, Telegram, Web Dashboard',
    category: 'PROJECT',
    href: '#work',
    icon: FolderGit2,
  },
  {
    id: 'prj-qrmaker',
    title: 'Qr-Maker',
    subtitle: 'Aplikasi instant QR code generator tema dark mode',
    category: 'PROJECT',
    href: '#work',
    icon: FolderGit2,
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const onOpenCustom = () => setIsOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-search-palette', onOpenCustom);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-search-palette', onOpenCustom);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchDataset;
    return searchDataset.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)),
    );
  }, [query]);

  // Clamp active index against filtered length without triggering an effect setState
  const activeIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));

  const selectItem = (item: SearchItem) => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = item.href;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filtered[activeIndex];
      if (current) selectItem(current);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Search portfolio"
        className="fixed top-6 right-6 z-40 flex items-center gap-2 rounded-full border border-black/15 bg-white/90 px-3.5 py-2 font-mono text-xs text-black shadow-lg backdrop-blur-md transition-transform hover:scale-105"
      >
        <Search className="h-4 w-4 text-black/60" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="rounded border border-black/20 bg-black/5 px-1.5 py-0.5 text-[0.65rem] text-black/70">
          Ctrl K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 p-4 pt-16 backdrop-blur-sm sm:pt-24">
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white text-[#111111] shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-black/10 px-4 py-3.5">
              <Search className="h-5 w-5 text-black/45" />
              <input
                type="text"
                value={query}
                autoFocus
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, writings, pages..."
                className="w-full bg-transparent font-sans text-sm outline-none placeholder:text-black/40"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded border border-black/15 bg-black/5 px-2 py-0.5 font-mono text-[0.65rem] text-black/60 hover:bg-black/10"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="p-6 text-center font-mono text-xs text-black/50">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        isSelected ? 'bg-slate-100 text-black' : 'text-black/80 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-black/50" />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{item.title}</p>
                          {item.subtitle && (
                            <p className="truncate text-xs text-black/50">{item.subtitle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-3">
                        <span className="font-mono text-[0.65rem] tracking-wider text-black/45 uppercase">
                          {item.category}
                        </span>
                        {isSelected && (
                          <span className="font-mono text-xs text-black/50">&crarr;</span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
