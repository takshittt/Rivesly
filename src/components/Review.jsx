import React, { useState, useEffect, useRef } from "react";
import { useFlashcards } from "../hooks/useFlashcards";
import CelebrationModal from "./CelebrationModal";

const Review = ({ deckId, onClose }) => {
  const { decks, reviewCard } = useFlashcards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsReviewed: 0,
    correctAnswers: 0,
  });

  const hasShuffled = useRef(false);
  const previousDeckId = useRef(null);

  useEffect(() => {
    const selectedDeck = decks.find((d) => d.id === deckId);

    if (
      selectedDeck &&
      (previousDeckId.current !== deckId || !hasShuffled.current)
    ) {
      setDeck(selectedDeck);
      previousDeckId.current = deckId;

      const shuffledCards = shuffleArray([...selectedDeck.cards]);

      const cardIds = shuffledCards.map((card) => card.id);
      const uniqueIds = new Set(cardIds);
      console.log(
        `Original cards: ${selectedDeck.cards.length}, Shuffled: ${shuffledCards.length}, Unique: ${uniqueIds.size}`
      );

      // Reset session stats when starting a new deck
      setSessionStats({
        cardsReviewed: 0,
        correctAnswers: 0,
      });

      setCurrentCardIndex(0);
      setCards(shuffledCards);
      hasShuffled.current = true;
    }
  }, [deckId, decks]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleAgain = () => {
    if (isFlipped && cards.length > 0) {
      const currentCard = cards[currentCardIndex];
      reviewCard(deckId, currentCard.id);

      // Update session stats
      setSessionStats((prev) => ({
        ...prev,
        cardsReviewed: prev.cardsReviewed + 1,
      }));

      goToNextCard();
    }
  };

  const handleGood = () => {
    if (isFlipped && cards.length > 0) {
      const currentCard = cards[currentCardIndex];
      reviewCard(deckId, currentCard.id);

      // Update session stats - count this as a correct answer
      setSessionStats((prev) => ({
        cardsReviewed: prev.cardsReviewed + 1,
        correctAnswers: prev.correctAnswers + 1,
      }));

      goToNextCard();
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
      }, 300);
    } else {
      // Calculate final stats before showing the celebration modal
      const finalStats = {
        ...sessionStats,
        totalCards: cards.length,
        completionRate:
          (sessionStats.correctAnswers / (sessionStats.cardsReviewed || 1)) *
          100,
      };
      setSessionStats(finalStats);

      // Show celebration modal with updated stats
      setShowCelebration(true);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    hasShuffled.current = false;
    onClose();
  };

  if (!deck || cards.length === 0) {
    return (
      <div className="p-6 flex-1 overflow-auto font-mono">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center hover:opacity-80 text-green-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="w-full h-96 mb-6 perspective-1000 max-w-2xl mx-auto rounded-lg shadow-md border-2 bg-green-500 border-green-600">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-medium text-green-700">
                This deck is empty. Let's fill it up!
              </h2>
              <p
                className="mt-8 font-medium text-green-400 cursor-pointer hover:inline-block px-4 py-2 rounded-md"
                onClick={() => onClose("edit")}
              >
                Add cards here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="p-6 flex-1 overflow-auto font-mono">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onClose}
          className="flex items-center hover:opacity-80 text-green-700"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>
        <div className="text-green-700">
          Card {currentCardIndex + 1} of {cards.length}
        </div>
      </div>

      <div
        className="w-full h-96 mb-6 cursor-pointer perspective-1000 max-w-3xl mx-auto"
        onClick={handleCardClick}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div
            className={`absolute w-full h-full backface-hidden border-2 rounded-lg p-6 flex items-center justify-center shadow-md ${
              isFlipped ? "invisible" : ""
            } bg-green-500 border-green-600 text-green-700`}
          >
            <div className="text-center">
              <h2 className="text-3xl font-medium text-green-700">
                {currentCard.question}
              </h2>
              {!isFlipped && (
                <p className="mt-8 font-medium text-green-400">
                  Click to reveal answer
                </p>
              )}
            </div>
          </div>

          <div
            className={`absolute w-full h-full backface-hidden border-2 rounded-lg p-6 flex items-center justify-center rotate-y-180 shadow-md ${
              !isFlipped ? "invisible" : ""
            } bg-green-600 border-green-600 text-green-700`}
          >
            <h2 className="text-3xl font-medium text-center text-green-700">
              {currentCard.answer}
            </h2>
          </div>
        </div>
      </div>

      <div
        className={`flex justify-center space-x-4 max-w-md mx-auto ${
          isFlipped ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <button
          onClick={handleAgain}
          disabled={!isFlipped}
          className="w-1/2 py-3 px-4 border-2 rounded-full font-bold transition-colors focus:outline-none bg-green-600 text-green-700 border-amber-50 hover:scale-105 active:scale-95 hover:shadow-md"
        >
          Again
        </button>
        <button
          onClick={handleGood}
          disabled={!isFlipped}
          className="w-1/2 py-3 px-4 rounded-full transition-colors focus:outline-none bg-green-400 font-bold text-green-700 hover:scale-105 active:scale-95 hover:shadow-md border border-amber-200"
        >
          Got it
        </button>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        deckName={deck?.name}
        stats={sessionStats}
      />
    </div>
  );
};

export default Review;
