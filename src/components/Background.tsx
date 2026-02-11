export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-cloud-gradient overflow-hidden">
      <div className="absolute -left-24 top-8 w-80 opacity-70 animate-cloud-slow">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <g fill="var(--soft-sky)">
            <ellipse cx="40" cy="60" rx="40" ry="24" />
            <ellipse cx="80" cy="50" rx="36" ry="22" />
            <ellipse cx="120" cy="60" rx="48" ry="26" />
          </g>
        </svg>
      </div>

      <div className="absolute right-0 top-28 w-64 opacity-60 animate-cloud-medium">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <g fill="var(--lavender-mist)">
            <ellipse cx="30" cy="60" rx="30" ry="18" />
            <ellipse cx="70" cy="50" rx="44" ry="24" />
            <ellipse cx="110" cy="62" rx="36" ry="20" />
          </g>
        </svg>
      </div>

      <div className="absolute left-1/2 top-1/3 w-96 opacity-50 -translate-x-1/2 animate-cloud-slower">
        <svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <g fill="var(--peach-cloud)">
            <ellipse cx="60" cy="70" rx="56" ry="30" />
            <ellipse cx="140" cy="56" rx="72" ry="34" />
            <ellipse cx="220" cy="72" rx="58" ry="28" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Background;
