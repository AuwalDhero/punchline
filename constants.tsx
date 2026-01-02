import React from 'react';
import {
  Target,
  Users,
  Search,
  TrendingUp,
  Star,
  Globe,
  Award,
  Lightbulb
} from 'lucide-react';

/**
 * =====================================================
 * UI-ONLY CONSTANTS
 *
 * ❌ NO CMS CONTENT ALLOWED HERE
 * ❌ NO BLOG / SERVICES / EVENTS / COURSES DATA
 *
 * CMS content MUST come from Markdown in /content/*
 * =====================================================
 */

/* ---------------- ICON REGISTRY ---------------- */

export const ICON_MAP: Record<string, React.ReactNode> = {
  Target: <Target size={32} />,
  Users: <Users size={32} />,
  Search: <Search size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  Star: <Star size={32} />,
  Globe: <Globe size={32} />,
  Award: <Award size={32} />,
  Lightbulb: <Lightbulb size={32} />
};

/* ---------------- LOGO (UI COMPONENT) ---------------- */

/* ---------------- LOGO (UI COMPONENT) ---------------- */

export const PMH_LOGO = (className = 'h-8 w-auto') => (
  <img
    src="/uploads/logo.png"
    alt="Punchline Marketing Hub Logo"
    className={className}
    loading="lazy"
  />
);


/* ---------------- UI METRICS (STATIC / NON-CMS) ---------------- */

/**
 * NOTE:
 * These are static UI display metrics.
 * They are NOT editable via CMS and MUST NOT be treated as content.
 * If real metrics are needed later, move them to CMS.
 */
export const UI_STATS = [
  { label: 'Market Projects', value: 250, suffix: '+' },
  { label: 'Professionals Trained', value: 5, suffix: 'k+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
  { label: 'Revenue Growth', value: 45, suffix: '%' }
];
