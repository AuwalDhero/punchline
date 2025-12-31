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

export const PMH_LOGO = (className = "h-8 w-auto") => (
  <svg
    viewBox="0 0 400 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Punchline Marketing Hub Logo"
  >
    <path
      d="M20 30L55 15L90 30V65C90 85 55 105 55 105C55 105 20 85 20 65V30Z"
      stroke="#0B56C6"
      strokeWidth="6"
    />
    <text
      x="35"
      y="65"
      fill="#0B56C6"
      fontFamily="Montserrat"
      fontWeight="800"
      fontSize="24"
    >
      PM
    </text>
    <path
      d="M30 80H80M30 90H60"
      stroke="#0B56C6"
      strokeWidth="4"
    />
    <text
      x="110"
      y="55"
      fill="#000000"
      fontFamily="Montserrat"
      fontWeight="800"
      fontSize="32"
    >
      PUNCHLINE
    </text>
    <text
      x="110"
      y="85"
      fill="#000000"
      fontFamily="Montserrat"
      fontWeight="800"
      fontSize="32"
    >
      MARKETING HUB
    </text>
  </svg>
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
