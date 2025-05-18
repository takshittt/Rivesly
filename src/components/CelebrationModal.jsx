import React, { useEffect, useState } from "react";

// Custom confetti shapes
const ConfettiPiece = ({ style, shape, color }) => {
  switch (shape) {
    case "circle":
      return (
        <div
          style={{ ...style, borderRadius: "50%", backgroundColor: color }}
        ></div>
      );
    case "square":
      return <div style={{ ...style, backgroundColor: color }}></div>;
    case "triangle":
      return (
        <div
          style={{
            ...style,
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderLeft: `${parseInt(style.width) / 2}px solid transparent`,
            borderRight: `${parseInt(style.width) / 2}px solid transparent`,
            borderBottom: `${parseInt(style.height)}px solid ${color}`,
          }}
        ></div>
      );
    case "star":
      return (
        <svg
          width={style.width}
          height={style.height}
          viewBox="0 0 24 24"
          fill={color}
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    default:
      return <div style={{ ...style, backgroundColor: color }}></div>;
  }
};

const CelebrationModal = ({ isOpen, onClose, deckName, stats }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // App theme-aligned colors
      const colors = [
        "#3B82F6", // blue-500
        "#10B981", // emerald-500
        "#84cc16", // lime-500
        "#8B5CF6", // violet-500
        "#F59E0B", // amber-500
      ];
      const shapes = ["circle", "square", "triangle", "star"];

      const newConfetti = Array.from({ length: 100 }).map((_, index) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          id: index,
          color,
          shape,
          left: `${Math.random() * 100}%`,
          size: Math.floor(Math.random() * 10) + 5, // 5-15px
          delay: Math.random() * 3, // 0-3s delay
          duration: Math.random() * 4 + 3, // 3-7s duration
          rotation: Math.random() * 360, // random initial rotation
        };
      });

      setConfetti(newConfetti);

      // Add overflow hidden to body when modal is open
      document.body.style.overflow = "hidden";

      // Clean up when modal closes
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Format completion rate to 1 decimal place
  const formattedCompletionRate = stats?.completionRate
    ? Math.round(stats.completionRate * 10) / 10
    : 0;

  // Helper function to determine grade emoji based on completion rate
  const getGradeEmoji = (rate) => {
    if (rate >= 90) return "🌟";
    if (rate >= 80) return "✨";
    if (rate >= 70) return "🎉";
    if (rate >= 60) return "👍";
    return "😊";
  };

  return (
    <div
      className="celebration-modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-mono"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti absolute"
          style={{
            left: piece.left,
            top: "-20px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          <ConfettiPiece
            shape={piece.shape}
            color={piece.color}
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
            }}
          />
        </div>
      ))}

      {/* Modal Content */}
      <div
        className="celebration-content rounded-lg p-8 max-w-md w-full shadow-xl bg-green-500 border border-green-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="celebration-emoji text-5xl mb-4">🎉</div>
          <h2 className="celebration-title text-3xl font-bold mb-4">
            Congratulations!
          </h2>
          <p className="text-xl mb-6 text-green-700">
            You've completed all cards in{" "}
            {deckName ? `the "${deckName}" deck` : "this deck"}!
          </p>

          {stats && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="celebration-stats bg-green-600 p-3 rounded-lg text-center">
                <div className="text-sm text-green-700 mb-1">
                  Cards Reviewed
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {stats.totalCards}
                </div>
              </div>
              <div className="celebration-stats bg-green-600 p-3 rounded-lg text-center">
                <div className="text-sm text-green-700 mb-1">
                  Correct Answers
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {stats.correctAnswers}
                </div>
              </div>
              <div className="col-span-2 celebration-stats bg-blue-400/20 p-3 rounded-lg text-center">
                <div className="text-sm text-green-700 mb-1">Success Rate</div>
                <div className="text-2xl font-bold text-green-700">
                  {formattedCompletionRate}%{" "}
                  {getGradeEmoji(formattedCompletionRate)}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-green-400 text-green-700 rounded-md font-medium transition duration-200 hover:scale-105 active:scale-95 border border-amber-200"
              onClick={onClose}
            >
              Good
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;
