'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Layers, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/grammar', label: 'Грамматика', icon: BookOpen },
  { href: '/practice', label: 'Практика', icon: Brain },
  { href: '/words', label: 'Слова', icon: Layers },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#58cc02]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#58cc02] text-white shadow-sm">
            <BookOpen className="h-5 w-5" />
          </span>
          EnglishFlow
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-base font-bold transition-colors ${
                  isActive ? 'text-[#58cc02]' : 'text-[#777] hover:text-[#3f3f3f]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-xl bg-[#58cc02]/10 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-xl p-2 hover:bg-[#f7f9fc] text-[#777]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-[#e5e5e5] bg-white px-4 pb-4"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold ${
                  isActive ? 'bg-[#58cc02]/10 text-[#58cc02]' : 'text-[#777] hover:bg-[#f7f9fc]'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </motion.nav>
      )}
    </header>
  );
}
