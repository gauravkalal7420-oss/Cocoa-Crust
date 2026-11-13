export function Spark({ className = "h-6 w-6", strokeWidth = 1.6 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5c.6 3.6 2.4 6.3 9.5 9.5-7.1 3.2-8.9 5.9-9.5 9.5-.6-3.6-2.4-6.3-9.5-9.5C9.6 8.8 11.4 6.1 12 2.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkFilled({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c.8 5.7 3.4 8.3 12 12-8.6 3.7-11.2 6.3-12 12-.8-5.7-3.4-8.3-12-12C8.6 8.3 11.2 5.7 12 0Z" />
    </svg>
  );
}

export function Heart({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.5S3.5 15.2 3.5 9.4A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.5 2.8c0 5.8-8.5 11.1-8.5 11.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className = "h-4 w-24" }) {
  return (
    <svg viewBox="0 0 120 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 10c8-9 15-9 22 0s14 9 22 0 15-9 22 0 14 9 22 0 15-9 28-1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Scallop({ className = "", fill = "#FFD3E8" }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0 60V34c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20c0-11 9-20 20-20s20 9 20 20v26H0Z"
        fill={fill}
      />
    </svg>
  );
}