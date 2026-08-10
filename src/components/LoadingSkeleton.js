"use client";

export default function LoadingSkeleton() {
  return (
    <div className="match-list">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="skeleton-card"
        >
          <div className="skeleton skeleton-title" />

          <div className="skeleton skeleton-line" />

          <div className="skeleton skeleton-line" />

          <div className="skeleton skeleton-footer" />
        </div>
      ))}
    </div>
  );
}