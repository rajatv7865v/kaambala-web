"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const sizes = {
    sm: { container: 60, icon: 12, text: "text-xl" },
    md: { container: 80, icon: 16, text: "text-3xl" },
    lg: { container: 120, icon: 24, text: "text-4xl" },
  };

  const { container, icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Circle */}
      <div className="relative" style={{ width: container, height: container }}>
        <svg
          width={container}
          height={container}
          viewBox="0 0 120 120"
          className="drop-shadow-lg"
        >
          {/* White Background Circle (No Border) */}
          <circle cx="60" cy="60" r="55" fill="white" stroke="none" />

          {/* Beauty Icon - Woman Silhouette with Flowing Hair (Left) */}
          <g transform="translate(15, 30)">
            {/* Flowing Hair - Purple/Pink */}
            <path
              d="M 8 5 Q 4 3, 2 6 Q 1 8, 2 10 Q 3 12, 5 11 Q 6 10, 7 9 Q 8 8, 9 9 Q 10 10, 11 11 Q 13 12, 14 10 Q 15 8, 14 6 Q 12 3, 8 5"
              fill="#9333ea"
            />
            <path
              d="M 8 5 Q 5 4, 3 7 Q 2 9, 3 11 Q 4 13, 6 12 Q 7 11, 8 10 Q 9 11, 10 12 Q 12 13, 13 11 Q 14 9, 13 7 Q 11 4, 8 5"
              fill="#a855f7"
            />
            {/* Head */}
            <circle cx="8" cy="10" r="5" fill="#c084fc" />
            {/* Body */}
            <ellipse cx="8" cy="22" rx="3" ry="6" fill="#d8b4fe" />
          </g>

          {/* Repair Icon - Gear with Crossed Tools (Center) */}
          <g transform="translate(45, 35)">
            {/* Gear - Dark Blue */}
            <circle cx="15" cy="15" r="10" fill="#1e40af" />
            <circle cx="15" cy="15" r="6" fill="#3b82f6" />
            {/* Gear Teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 15 + 8 * Math.cos(rad);
              const y = 15 + 8 * Math.sin(rad);
              return (
                <rect
                  key={angle}
                  x={x - 1.5}
                  y={y - 1.5}
                  width="3"
                  height="5"
                  fill="#1e40af"
                  transform={`rotate(${angle} ${x} ${y})`}
                />
              );
            })}
            {/* Wrench - Light Blue (Diagonal top-left to bottom-right) */}
            <path
              d="M 8 8 L 12 12 L 18 6 L 22 10 L 18 14 L 12 8 Z"
              fill="#60a5fa"
              stroke="#1e40af"
              strokeWidth="0.8"
            />
            {/* Screwdriver - Light Blue (Diagonal top-right to bottom-left) */}
            <path
              d="M 22 8 L 22 12 L 18 16 L 15 13 Z"
              fill="#60a5fa"
              stroke="#1e40af"
              strokeWidth="0.8"
            />
          </g>

          {/* Cleaning Icon - Water Droplet, Broom, Dustpan (Right) */}
          <g transform="translate(75, 30)">
            {/* Water Droplet - Teal */}
            <path
              d="M 10 3 Q 12 1, 14 3 Q 14 5, 12 10 Q 10 15, 10 18 Q 10 15, 8 10 Q 6 5, 10 3"
              fill="#14b8a6"
            />
            {/* Sparkle - White */}
            <circle cx="13" cy="5" r="1.5" fill="white" />
            {/* Broom - Green */}
            <rect x="3" y="15" width="2.5" height="10" fill="#22c55e" rx="1" />
            <path
              d="M 2 25 Q 4 23, 6 25"
              fill="#16a34a"
              stroke="#16a34a"
              strokeWidth="0.5"
            />
            {/* Dustpan - Green */}
            <path d="M 7 25 L 12 25 L 12 27 L 10 29 L 7 27 Z" fill="#22c55e" />
          </g>

          {/* Text "Kaambala" - Dark Blue */}
          <text
            x="60"
            y="95"
            textAnchor="middle"
            fill="#1e40af"
            fontSize="14"
            fontWeight="bold"
            fontFamily="var(--font-poppins), 'Poppins', sans-serif"
          >
            Kaambala
          </text>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span
          className={`font-extrabold ${
            className.includes("text-white") ? "text-white" : "text-primary-700"
          } ${text}`}
        >
          Kaambala
        </span>
      )}
    </div>
  );
}
