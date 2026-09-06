import React from 'react';

/**
 * High-quality, culturally authentic devotional vector icons for all deities & rituals.
 * Scalable SVG vectors that work seamlessly in light/dark mode and replace emojis.
 */

export function DeityIcon({ id, className = '', size = 24, strokeWidth = 1.75 }) {
  const s = size;
  const props = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  };

  switch (id) {
    case 'ganesh':
      // Ganesha: Sacred Omkar / Modak / Trunk curve with tilak
      return (
        <svg {...props}>
          <path d="M12 3a4 4 0 0 1 4 4c0 3-3 5-3 8a3 3 0 0 0 6 0" />
          <path d="M8 7a4 4 0 0 0-4 4c0 3 2.5 5 5 5" />
          <path d="M12 3v5" />
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <path d="M7 19c2 1.5 8 1.5 10 0" />
        </svg>
      );

    case 'shiva':
      // Mahadev: Trishul with Crescent Moon & Damru center
      return (
        <svg {...props}>
          <path d="M12 2v20" />
          <path d="M7 4c0 4.5 5 6 5 6s5-1.5 5-6" />
          <path d="M9 10h6" />
          <path d="M9.5 7.5a3.5 3.5 0 0 0 5 0" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'vishnu':
      // Vishnu: Shankha & Sudarshana Chakra motif
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
          <path d="m6.34 6.34 2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
        </svg>
      );

    case 'krishna':
      // Krishna: Divine Bansuri Flute with Peacock Feather plume
      return (
        <svg {...props}>
          <path d="M3 18l14-14" />
          <circle cx="8" cy="13" r="1" fill="currentColor" />
          <circle cx="11" cy="10" r="1" fill="currentColor" />
          <circle cx="14" cy="7" r="1" fill="currentColor" />
          {/* Feather Crown */}
          <path d="M15 4c2-2 6-1 6 3 0 3-3 5-5 5" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'ram':
      // Shri Ram: Sacred Dhanush (Bow) and Arrow
      return (
        <svg {...props}>
          <path d="M5 4c8 4 8 12 0 16" />
          <path d="M5 4v16" />
          <path d="M5 12h15" />
          <path d="m16 8 4 4-4 4" />
        </svg>
      );

    case 'hanuman':
      // Hanuman: Sacred Gada (Mace) & Saffron Flag
      return (
        <svg {...props}>
          <path d="M6 18l8-8" />
          <circle cx="16" cy="8" r="4" />
          <path d="M14 6l4 4M18 6l-4 4" />
          <circle cx="5" cy="19" r="2" />
        </svg>
      );

    case 'durga':
      // Durga Maa: Sacred Trishul & Lotus Petal
      return (
        <svg {...props}>
          <path d="M12 3v18" />
          <path d="M6 6c1 5 6 7 6 7s5-2 6-7" />
          <path d="M12 13a4 4 0 0 1-4 4H4a4 4 0 0 0 4-4" />
          <path d="M12 13a4 4 0 0 0 4 4h4a4 4 0 0 1-4-4" />
        </svg>
      );

    case 'lakshmi':
      // Lakshmi: Divine Lotus Flower with Grace Rays
      return (
        <svg {...props}>
          <path d="M12 4c1.5 3.5 1.5 7.5 0 11-1.5-3.5-1.5-7.5 0-11z" />
          <path d="M12 15c-3-1-6-4-7-8 4 0 7 3 7 8z" />
          <path d="M12 15c3-1 6-4 7-8-4 0-7 3-7 8z" />
          <path d="M7 19c3 1.5 7 1.5 10 0" />
        </svg>
      );

    case 'saraswati':
      // Saraswati: Divine Veena & Wisdom Scroll
      return (
        <svg {...props}>
          <path d="M7 18a4 4 0 0 1 0-8c2 0 3 2 5 2s3-2 5-2a4 4 0 1 1 0 8c-2 0-3-2-5-2s-3 2-5 2z" />
          <path d="M12 2v20" />
          <circle cx="7" cy="14" r="1.5" fill="currentColor" />
          <circle cx="17" cy="14" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'vitthal':
      // Vitthal: Pandharpur Pundalik Charan & Varkari Chipli
      return (
        <svg {...props}>
          <path d="M7 16c0 3 2.5 5 5 5s5-2 5-5V7c0-2.5-2.5-4-5-4S7 4.5 7 7v9z" />
          <path d="M10 9a2 2 0 0 0 4 0" />
          <path d="M12 3v4" />
          <circle cx="12" cy="13" r="1" fill="currentColor" />
          <path d="M5 19h14" />
        </svg>
      );

    case 'datt':
      // Dattatreya: Audumbar Sacred Tree & Trishul-Damru Trinity
      return (
        <svg {...props}>
          <path d="M12 3v18" />
          <circle cx="8" cy="7" r="2.5" />
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="16" cy="7" r="2.5" />
          <path d="M6 19h12" />
          <path d="M9 13h6" />
        </svg>
      );

    case 'swami':
      // Swami Samarth: Sacred Paduka & Akalkot Asana
      return (
        <svg {...props}>
          <path d="M8 8a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0v-6a3 3 0 0 1 3-3z" />
          <path d="M16 8a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0v-6a3 3 0 0 1 3-3z" />
          <circle cx="8" cy="10" r="1" fill="currentColor" />
          <circle cx="16" cy="10" r="1" fill="currentColor" />
          <path d="M4 20h16" />
        </svg>
      );

    case 'sai':
      // Sai Baba: Shraddha & Saburi Sacred Mandir Arch
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="M6 20V10a6 6 0 0 1 12 0v10" />
          <path d="M9 14a3 3 0 0 0 6 0" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'shani':
      // Shani Dev: Celestial Justice Ring & Radiant Flame
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" />
        </svg>
      );

    case 'granth':
      // Granth: Sacred Pothi & Scriptures
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 7h7M9 11h5" />
        </svg>
      );

    case 'gayatri':
      // Gayatri / Vedic Mantra: Radiant Sun & Sacred Om Rays
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <path d="m4.93 4.93 2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      );

    default:
      // Default Devotional Lamp / Diya
      return (
        <svg {...props}>
          <path d="M6 15c0 3 3 5 6 5s6-2 6-5" />
          <path d="M12 4c-1.5 2.5-2 4.5-2 6a2 2 0 0 0 4 0c0-1.5-.5-3.5-2-6z" fill="currentColor" />
          <path d="M4 15h16" />
        </svg>
      );
  }
}

/**
 * Clean SVG Diya / Torch vector icon for header/footer logos and badges.
 */
export function SacredDiyaIcon({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Base oil lamp bowl */}
      <path d="M4 14c0 3.5 3.5 6 8 6s8-2.5 8-6H4z" fill="currentColor" fillOpacity="0.2" />
      <path d="M3 14h18" />
      <path d="M9 20v1.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V20" />
      {/* Flame */}
      <path
        d="M12 2.5c-2 3-3 5.5-3 7.5a3 3 0 0 0 6 0c0-2-1-4.5-3-7.5z"
        fill="#f97316"
        stroke="#ea580c"
      />
      <circle cx="12" cy="10" r="1.2" fill="#fef08a" />
    </svg>
  );
}

/**
 * Temple Bell icon for devotional alerts & daily rituals.
 */
export function TempleBellIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M12 2v2" />
    </svg>
  );
}
