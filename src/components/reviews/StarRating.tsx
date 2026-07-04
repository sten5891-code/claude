"use client";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`별점 ${value}점`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= Math.round(value) ? "#8b5cf6" : "none"}
          stroke="#8b5cf6"
          strokeWidth="1.5"
        >
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 20.6l1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
        </svg>
      ))}
    </span>
  );
}

export function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          aria-label={`${i}점`}
          className="transition hover:scale-110"
        >
          <svg
            width={26}
            height={26}
            viewBox="0 0 24 24"
            fill={i <= value ? "#8b5cf6" : "none"}
            stroke="#8b5cf6"
            strokeWidth="1.5"
          >
            <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 20.6l1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
