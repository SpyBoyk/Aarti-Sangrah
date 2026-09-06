export function Diya({ size = 56 }) {
  return (
    <div className="relative inline-flex flex-col items-center" aria-hidden="true">
      <svg width={size} height={size * 1.35} viewBox="0 0 64 86" fill="none">
        <ellipse cx="32" cy="78" rx="20" ry="5" fill="#ea580c" opacity="0.25" className="glow-pulse" />
        <g className="flame">
          <ellipse cx="32" cy="38" rx="11" ry="17" fill="#f97316" />
          <ellipse cx="32" cy="42" rx="6.5" ry="11" fill="#fbbf24" />
          <ellipse cx="32" cy="45" rx="3.2" ry="6" fill="#fef3c7" />
        </g>
        <path d="M12 60 Q32 52 52 60 L46 70 Q32 76 18 70 Z" fill="#9a3412" />
        <path d="M12 60 Q32 52 52 60" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="28" y="58" width="8" height="6" rx="2" fill="#431407" />
      </svg>
    </div>
  );
}

export function OmBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <span className="select-none text-[26rem] leading-none font-bold text-orange-500/[0.06] dark:text-orange-400/[0.07] max-md:text-[14rem]">
        ॐ
      </span>
    </div>
  );
}
