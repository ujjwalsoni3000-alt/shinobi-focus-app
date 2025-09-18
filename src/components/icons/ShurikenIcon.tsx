export function ShurikenIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 16 1.5-3.5 3.5-1.5-3.5-1.5L12 6l-1.5 3.5L7 11l3.5 1.5z"></path>
      <path d="m12 2 1.5 3.5L17 7l-3.5 1.5L12 12l-1.5-3.5L7 7l3.5-1.5z"></path>
      <path d="m12 12 1.5 3.5L17 17l-3.5 1.5L12 22l-1.5-3.5L7 17l3.5-1.5z"></path>
    </svg>
  );
}
