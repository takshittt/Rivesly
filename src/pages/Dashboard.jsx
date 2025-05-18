import React, { useState } from "react";
import { useFlashcards } from "../hooks/useFlashcards";
import DeckDisplay from "../components/DeckDisplay";
import Review from "../components/Review";
import EditDeck from "../components/EditDeck";
import "../assets/flipCard.css";

// Create Deck Modal Component
const CreateDeckModal = ({ isOpen, onClose, onCreateDeck }) => {
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate deck name
    if (!deckName.trim()) {
      setNameError("Deck name is required");
      return;
    }

    // Create the deck
    onCreateDeck(deckName, description);

    // Reset form and close modal
    setDeckName("");
    setDescription("");
    setNameError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="rounded-lg p-6 max-w-md w-full shadow-xl bg-green-500 font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4 text-green-700">
          Create New Deck
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 text-green-700"
              htmlFor="deckName"
            >
              Deck Name *
            </label>
            <input
              id="deckName"
              type="text"
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-green-700 border-green-600`}
              placeholder="Enter deck name"
              value={deckName}
              onChange={(e) => {
                setDeckName(e.target.value);
                if (e.target.value.trim()) setNameError("");
              }}
            />
            {nameError && (
              <p className="text-red-500 text-xs italic mt-1">{nameError}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2 text-green-700"
              htmlFor="description"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-green-500 text-green-700 border-green-600"
              placeholder="Enter deck description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border bg-green-500 text-green-700 border-green-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-400 text-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add LightBulb icon component
function LightBulbIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pro-tip-icon text-amber-300`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

// Tip Category Badge component
function TipCategoryBadge({ category }) {
  const categoryColors = {
    memory: "bg-blue-400/20 text-blue-500",
    focus: "bg-purple-400/20 text-purple-500",
    technique: "bg-emerald-400/20 text-emerald-500",
    productivity: "bg-amber-400/20 text-amber-500",
    mindset: "bg-pink-400/20 text-pink-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        categoryColors[category] || "bg-green-400/20 text-green-700"
      }`}
    >
      {category}
    </span>
  );
}

const Dashboard = ({ showCreateDeckModal, setShowCreateDeckModal }) => {
  const { decks, stats, deleteDeck, addDeck } = useFlashcards();
  const [studyingDeckId, setStudyingDeckId] = useState(null);
  const [editingDeckId, setEditingDeckId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Array of learning tips with categories
  const learningTips = [
    {
      text: "Consistent daily practice, even for just 10 minutes, is more effective than cramming for hours once a week.",
      category: "technique",
      number: "01",
    },
    {
      text: "Try to explain concepts in your own words - teaching others (even imaginary students) improves your retention.",
      category: "memory",
      number: "02",
    },
    {
      text: "Connect new information to things you already know. Creating these mental links makes recall easier.",
      category: "memory",
      number: "03",
    },
    {
      text: "Test yourself regularly. Active recall is one of the most powerful learning techniques.",
      category: "technique",
      number: "04",
    },
    {
      text: "Use visual aids and mind maps to connect ideas and see the bigger picture.",
      category: "memory",
      number: "05",
    },
    {
      text: "Take regular breaks. The Pomodoro technique suggests 25 minutes of focus followed by a 5-minute break.",
      category: "productivity",
      number: "06",
    },
    {
      text: "Get enough sleep. Your brain consolidates memories during deep sleep cycles.",
      category: "mindset",
      number: "07",
    },
    {
      text: "Review material just before going to bed to boost retention during sleep.",
      category: "technique",
      number: "08",
    },
    {
      text: "Vary your study environment occasionally. Different surroundings create multiple memory cues.",
      category: "focus",
      number: "09",
    },
    {
      text: "Stay hydrated and maintain good nutrition. Your brain needs fuel to function optimally.",
      category: "mindset",
      number: "10",
    },
  ];

  const statsItems = [
    { title: "Total Cards", value: stats.totalCards, icon: "📚" },
    { title: "Daily Streak", value: `${stats.streak} days`, icon: "⏱️" },
    { title: "Retention Rate", value: `${stats.retention}%`, icon: "📈" },
    { title: "Study Time", value: `${stats.studyTime}h`, icon: "📊" },
  ];

  const handleStudyClick = (deckId) => {
    setStudyingDeckId(deckId);
    setEditingDeckId(null);
  };

  const handleCloseStudy = () => {
    setStudyingDeckId(null);
  };

  const handleEditDeck = (deckId) => {
    setEditingDeckId(deckId);
    setStudyingDeckId(null);
  };

  const handleCloseEditDeck = () => {
    setEditingDeckId(null);
  };

  const handleDeleteDeck = (deckId) => {
    // Set the deck ID to confirm deletion
    setConfirmDelete(deckId);
    // When dialog is open, prevent body scrolling
    document.body.style.overflow = "hidden";
  };

  const confirmDeleteDeck = () => {
    if (confirmDelete) {
      deleteDeck(confirmDelete);
      setConfirmDelete(null);
      // Re-enable scrolling when dialog is closed
      document.body.style.overflow = "auto";
    }
  };

  const cancelDeleteDeck = () => {
    setConfirmDelete(null);
    // Re-enable scrolling when dialog is closed
    document.body.style.overflow = "auto";
  };

  const handleCreateDeck = (name, description) => {
    addDeck(name, description);

    // Provide visual feedback (scroll to view decks)
    setTimeout(() => {
      const deckSection = document.querySelector(".deck-card:last-child");
      if (deckSection) {
        deckSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 300); // Small delay to let the DOM update
  };

  const closeCreateDeckModal = () => {
    setShowCreateDeckModal(false);
  };

  // Function to show a random tip
  const showRandomTip = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * learningTips.length);
    } while (newIndex === currentTipIndex && learningTips.length > 1);

    setCurrentTipIndex(newIndex);
  };

  // Simple filtering to search only deck names
  const filteredDecks = decks.filter((deck) =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine which view to show
  const renderContent = () => {
    if (studyingDeckId) {
      return <Review deckId={studyingDeckId} onClose={handleCloseStudy} />;
    }

    if (editingDeckId) {
      return <EditDeck deckId={editingDeckId} onClose={handleCloseEditDeck} />;
    }

    const currentTip = learningTips[currentTipIndex];

    return (
      <>
        <div className="flex justify-between items-center mb-6 font-mono">
          <p className="text-lg font-medium text-green-700">
            Welcome back! {stats.totalCards} cards are ready for review.
          </p>

          {/* Search Bar */}
          <div className="relative w-64">
            <input
              type="text"
              className="w-full px-4 py-2 pr-10 border rounded-full focus:outline-none bg-white text-green-700 border-green-600"
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-2.5 rounded-full w-6 h-6 flex items-center justify-center bg-green-600 text-green-700">
              🔍
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsItems.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg p-4 flex flex-col font-bold bg-green-600 font-mono"
            >
              <div className="flex items-center mb-2">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-sm ml-2 text-green-700">
                  {stat.title}
                </span>
              </div>
              <span className="text-2xl font-bold text-emerald-800">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Decks Section - passing filtered decks */}
        <DeckDisplay
          decks={filteredDecks}
          onStudyClick={handleStudyClick}
          onDeleteDeck={handleDeleteDeck}
          onEditDeck={handleEditDeck}
        />

        {/* Confirmation Dialog */}
        {confirmDelete && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={cancelDeleteDeck}
          >
            <div
              className="rounded-lg p-6 max-w-md w-full shadow-xl bg-green-500 font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-green-700">
                Delete Deck
              </h3>
              <p className="mb-6 text-green-700">
                Are you sure you want to delete "
                {decks
                  .find((deck) => deck.id === confirmDelete)
                  ?.name.toUpperCase()}
                "?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-md border text-green-700 border-green-600"
                  onClick={cancelDeleteDeck}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md text-l bg-red-400 text-green-700"
                  onClick={confirmDeleteDeck}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Deck Modal */}
        <CreateDeckModal
          isOpen={showCreateDeckModal}
          onClose={closeCreateDeckModal}
          onCreateDeck={handleCreateDeck}
        />

        {/* Pro Tip Section */}
        <div className="pro-tip-container rounded-lg overflow-hidden shadow-lg mb-6 font-mono">
          <div className="flex items-start p-6">
            {/* Tip number and icon */}
            <div className="mr-6 flex flex-col items-center">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-green-500/20 mb-2">
                <LightBulbIcon className="h-7 w-7" />
              </div>
              <div className="pro-tip-number text-xl font-bold text-amber-300">
                {currentTip.number}
              </div>
            </div>

            {/* Tip content */}
            <div className="pro-tip-content flex-1">
              <div className="flex items-center mb-3">
                <h3 className="pro-tip-title text-xl font-bold mr-3">
                  Pro Learning Tip
                </h3>
                <TipCategoryBadge category={currentTip.category} />
              </div>

              <p className="text-green-700 mb-4">{currentTip.text}</p>

              <button
                className="pro-tip-button py-2 px-4 rounded-lg text-sm font-medium bg-green-400 text-green-700 border border-amber-200 hover:bg-amber-50 flex items-center"
                onClick={showRandomTip}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Next Tip
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-6 flex-1 overflow-auto font-mono">{renderContent()}</div>
  );
};

export default Dashboard;
