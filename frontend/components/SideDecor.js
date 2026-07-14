function FloatingTicket({ className, rotate = -12 }) {
  return (
    <svg
      viewBox="0 0 140 70"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <rect
        x="2"
        y="2"
        width="136"
        height="66"
        rx="6"
        fill="none"
        stroke="#EDE4D3"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
      <circle cx="100" cy="2" r="7" fill="#0A0A12" stroke="#EDE4D3" strokeOpacity="0.18" strokeWidth="2" />
      <circle cx="100" cy="68" r="7" fill="#0A0A12" stroke="#EDE4D3" strokeOpacity="0.18" strokeWidth="2" />
      <line
        x1="100"
        y1="12"
        x2="100"
        y2="58"
        stroke="#EDE4D3"
        strokeOpacity="0.15"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <rect x="16" y="22" width="60" height="6" rx="2" fill="#EDE4D3" fillOpacity="0.14" />
      <rect x="16" y="36" width="40" height="5" rx="2" fill="#EDE4D3" fillOpacity="0.1" />
      <rect x="112" y="26" width="16" height="16" rx="2" fill="#EDE4D3" fillOpacity="0.12" />
    </svg>
  );
}

export default function SideDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden xl:block"
    >
      <FloatingTicket
        className="absolute w-40 h-auto left-10 top-40 opacity-70"
        rotate={-14}
      />
      <FloatingTicket
        className="absolute w-32 h-auto left-4 top-[70vh] opacity-50"
        rotate={10}
      />
      <FloatingTicket
        className="absolute w-36 h-auto right-8 top-64 opacity-60"
        rotate={16}
      />
      <FloatingTicket
        className="absolute w-28 h-auto right-14 top-[75vh] opacity-40"
        rotate={-9}
      />

      {/* A couple of oversized, glowing "hero" stars for extra depth */}
      <div className="absolute left-24 top-24 h-1.5 w-1.5 rounded-full bg-ink/60 blur-[1px] shadow-[0_0_12px_4px_rgba(237,228,211,0.25)]" />
      <div className="absolute right-28 top-[45vh] h-2 w-2 rounded-full bg-mustard/70 blur-[1px] shadow-[0_0_16px_6px_rgba(232,185,74,0.25)]" />
      <div className="absolute left-16 top-[85vh] h-1.5 w-1.5 rounded-full bg-stamp/70 blur-[1px] shadow-[0_0_14px_5px_rgba(226,74,70,0.2)]" />
    </div>
  );
}
