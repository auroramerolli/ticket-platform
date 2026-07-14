export default function HeroTicket() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto max-w-sm mx-auto drop-shadow-[6px_6px_0_rgba(26,26,26,0.15)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(-6 160 100)">
        {/* Ticket body */}
        <rect
          x="20"
          y="30"
          width="280"
          height="140"
          rx="10"
          fill="#F5EFE1"
          stroke="#1A1A1A"
          strokeWidth="3"
        />
        {/* Perforation notches */}
        <circle cx="216" cy="30" r="12" fill="#EDE4D3" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="216" cy="170" r="12" fill="#EDE4D3" stroke="#1A1A1A" strokeWidth="3" />
        {/* Dashed tear line */}
        <line
          x1="216"
          y1="42"
          x2="216"
          y2="158"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.4"
        />

        {/* Left content: text lines */}
        <text x="40" y="60" fontFamily="monospace" fontSize="9" fill="#E24A46" letterSpacing="2">
          KONCERT
        </text>
        <rect x="40" y="72" width="140" height="14" rx="2" fill="#1A1A1A" opacity="0.85" />
        <rect x="40" y="94" width="100" height="8" rx="2" fill="#1A1A1A" opacity="0.35" />
        <rect x="40" y="108" width="120" height="8" rx="2" fill="#1A1A1A" opacity="0.35" />

        <text x="40" y="150" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="#1A1A1A">
          45 €
        </text>

        {/* Right content: QR block */}
        <g transform="translate(238, 78)">
          <rect width="44" height="44" rx="4" fill="#1A1A1A" />
          <rect x="5" y="5" width="10" height="10" fill="#F5EFE1" />
          <rect x="29" y="5" width="10" height="10" fill="#F5EFE1" />
          <rect x="5" y="29" width="10" height="10" fill="#F5EFE1" />
          <rect x="19" y="19" width="6" height="6" fill="#F5EFE1" />
          <rect x="29" y="29" width="6" height="6" fill="#F5EFE1" />
          <rect x="19" y="5" width="4" height="4" fill="#F5EFE1" />
          <rect x="5" y="19" width="4" height="4" fill="#F5EFE1" />
        </g>
      </g>

      {/* Small floating stub, second ticket peeking behind */}
      <g transform="rotate(8 100 60)" opacity="0.5">
        <rect
          x="60"
          y="10"
          width="90"
          height="50"
          rx="6"
          fill="#E8B94A"
          stroke="#1A1A1A"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
