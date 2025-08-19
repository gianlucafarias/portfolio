
export default function Marquee({ children, duration = "15s" }) {
  return (
    <div className="overflow-hidden">
      <div
        className="w-max will-change-transform transform-gpu animate-(--animate-marquee)"
        style={{ animationDuration: duration }}
      >
        <div className="flex gap-8 px-4">
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
