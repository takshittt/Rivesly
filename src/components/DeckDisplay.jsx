import React, { useRef, useState, useMemo } from "react";

// Create a fallback for motion components
function MotionDiv({ children, className, ...props }) {
  return (
    <div
      className={`${className} transition-all duration-300 ease-in-out hover:scale-105`}
      {...props}
    >
      {children}
    </div>
  );
}

function MotionButton({ children, className, ...props }) {
  return (
    <button
      className={`${className} transition-all duration-200 ease-in-out hover:scale-105 active:scale-95`}
      {...props}
    >
      {children}
    </button>
  );
}

function MotionLi({ children, className, ...props }) {
  return (
    <li
      className={`${className} transition-opacity duration-300 ease-in-out`}
      {...props}
    >
      {children}
    </li>
  );
}

// Edit Icon SVG component
function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

// Delete Icon SVG component
function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

// Generate random particle positions once, not on every render
function generateParticleStyles() {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
  };
}

function DeckDisplay({ decks, onStudyClick, onDeleteDeck, onEditDeck }) {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);

  // Generate random particle positions once per deck
  const particlePositions = useMemo(() => {
    return decks.map(() => generateParticleStyles());
  }, [decks.length]); // Only regenerate when deck count changes

  const handleDelete = (e, deckId) => {
    e.stopPropagation(); // Prevent event from bubbling up
    onDeleteDeck(deckId);
  };

  const handleEdit = (e, deckId) => {
    e.stopPropagation(); // Prevent event from bubbling up
    if (onEditDeck) onEditDeck(deckId);
  };

  // Mouse down event for drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setInitialScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // Mouse leave event for drag scrolling
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Mouse up event for drag scrolling
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse move event for drag scrolling
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = initialScrollLeft - walk;
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - scrollContainerRef.current.offsetLeft);
    setInitialScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    // Don't prevent default to allow natural scrolling
    const x = e.touches[0].clientX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = initialScrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Generate a unique animation delay for each card
  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };

  return (
    <div className="mb-8 relative font-mono">
      <h2 className="text-xl font-bold mb-2 text-blue-500">Your Decks</h2>

      {decks.length > 0 ? (
        <div className="relative">
          {/* Deck scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-4 px-8 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* CSS for hiding scrollbar */}
            <style>
              {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fadeInUp {
                animation: fadeInUp 0.6s ease-out forwards;
              }
              @keyframes pulse {
                0% {
                  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
                }
                70% {
                  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
                }
                100% {
                  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
                }
              }
              .animate-pulse-subtle {
                animation: pulse 2s infinite;
              }
            `}
            </style>

            {decks.map((deck, index) => {
              return (
                <div
                  key={deck.id}
                  className={`deck-card relative flex-shrink-0 w-64 h-96 shadow-lg rounded-lg mx-3 overflow-hidden cursor-default transition-all duration-300 transform hover:-translate-y-2 group animate-fadeInUp border bg-green-600 border-green-600`}
                  style={{ animationDelay: getAnimationDelay(index) }}
                  onClick={() => onStudyClick(deck.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Study ${deck.name} deck`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onStudyClick(deck.id);
                    }
                  }}
                >
                  {/* Edit and Delete buttons - Only visible on hover */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <button
                      className="p-2 bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-sm cursor-pointer transform transition hover:scale-110 bg-green-50 text-green-700"
                      onClick={(e) => handleEdit(e, deck.id)}
                      aria-label={`Edit ${deck.name} deck`}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="p-2 bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-sm cursor-pointer transform transition hover:scale-110 bg-red-50 text-green-700"
                      onClick={(e) => handleDelete(e, deck.id)}
                      aria-label={`Delete ${deck.name} deck`}
                    >
                      <DeleteIcon />
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="deck-circle absolute top-5 left-5 w-20 h-20 rounded-full bg-white opacity-10 transition-transform duration-700 ease-in-out group-hover:scale-125"></div>
                    <div className="deck-circle absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white opacity-10 transition-transform duration-700 ease-in-out group-hover:scale-110"></div>
                    <div className="absolute top-40 right-0 w-10 h-40 bg-white opacity-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1"></div>
                    {/* Add some subtle moving particle effects with precomputed positions */}
                    <div
                      className="absolute w-4 h-4 rounded-full bg-white opacity-10 animate-pulse-subtle"
                      style={particlePositions[index]}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full relative z-10">
                    <h3
                      className={`text-2xl font-bold mb-4 transform transition-transform duration-300 group-hover:translate-x-1 text-green-700`}
                    >
                      {deck.name}
                    </h3>

                    {deck.description && (
                      <p
                        className={`text-sm mb-4 opacity-90 transform transition-transform duration-300 group-hover:translate-x-1 text-green-700`}
                      >
                        {deck.description}
                      </p>
                    )}

                    <div
                      className={`text-sm mb-4 opacity-80 transform transition-transform duration-300 group-hover:translate-x-1 text-green-700`}
                    >
                      <div className="mb-2">
                        <span className="font-bold">Cards:</span>{" "}
                        {deck.cards.length}
                      </div>
                    </div>

                    <div className="flex-grow"></div>

                    {/* Study button */}
                    <button
                      className="study-button mt-6 px-4 py-2 rounded-md border font-medium transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md bg-green-400 text-green-700 border-amber-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStudyClick(deck.id);
                      }}
                      aria-label={`Review ${deck.name} deck now`}
                    >
                      Review Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg p-12 text-center border bg-green-500 border-green-600">
          <span className="text-3xl mb-4">🔍</span>
          <h3 className="text-lg font-medium mb-2 text-green-700">
            No decks found
          </h3>
        </div>
      )}
    </div>
  );
}

export default DeckDisplay;
