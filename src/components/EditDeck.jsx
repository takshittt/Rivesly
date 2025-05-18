import React, { useState, useEffect } from "react";
import { useFlashcards } from "../hooks/useFlashcards";

// Card Edit Form Component
const CardForm = ({ card, onSave, onCancel, isNew = false }) => {
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const [errors, setErrors] = useState({ question: "", answer: "" });

  const validateForm = () => {
    const newErrors = { question: "", answer: "" };
    let isValid = true;

    if (!question.trim()) {
      newErrors.question = "Question is required";
      isValid = false;
    }

    if (!answer.trim()) {
      newErrors.answer = "Answer is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...card, question, answer });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg shadow-md p-6 mb-4 bg-green-500 font-mono"
    >
      <h3 className="text-xl font-semibold mb-4 text-green-700">
        {isNew ? "Add New Card" : "Edit Card"}
      </h3>

      <div className="mb-4">
        <label
          htmlFor="question"
          className="block font-medium mb-2 text-green-700"
        >
          Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none bg-green-500 text-green-700 ${
            errors.question ? "border-red-500" : "border-green-600"
          }`}
          rows="3"
          placeholder="Enter the question"
        ></textarea>
        {errors.question && (
          <p className="text-red-500 text-sm mt-1">{errors.question}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="answer"
          className="block font-medium mb-2 text-green-700"
        >
          Answer
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none bg-green-500 text-green-700 ${
            errors.answer ? "border-red-500" : "border-green-600"
          }`}
          rows="3"
          placeholder="Enter the answer"
        ></textarea>
        {errors.answer && (
          <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md transition-colors bg-green-600 text-green-700 border-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md transition-colors bg-green-400 text-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// Card List Item Component
const CardItem = ({ card, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg shadow-sm border mb-3 overflow-hidden transition-all duration-300 bg-green-500 border-green-600 font-mono">
      <div
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <p className="font-medium text-green-700">{card.question}</p>
          {isExpanded && (
            <div className="mt-3 pt-3 border-green-600">
              <p className="text-green-700">{card.answer}</p>
            </div>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(card);
            }}
            className="p-2 rounded-full bg-green-600 text-green-700"
            aria-label="Edit card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
            className="p-2 rounded-full bg-red-50 text-green-700"
            aria-label="Delete card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Deck Information Form
const DeckInfoForm = ({ deck, onSave, isEditing, setIsEditing }) => {
  const [name, setName] = useState(deck?.name || "");
  const [description, setDescription] = useState(deck?.description || "");
  const [nameError, setNameError] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      setNameError("Deck name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ name, description });
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mb-6 font-mono">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-green-700">{deck.name}</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="hover:opacity-80 text-green-700"
          >
            Edit
          </button>
        </div>
        {deck.description && (
          <p className="mb-4 text-green-700">{deck.description}</p>
        )}
        <div className="text-sm text-green-700">
          {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg shadow-md p-6 mb-6 bg-green-500 font-mono"
    >
      <h2 className="text-xl font-semibold mb-4 text-green-700">
        Edit Deck Information
      </h2>

      <div className="mb-4">
        <label
          htmlFor="deckName"
          className="block font-medium mb-2 text-green-700"
        >
          Deck Name
        </label>
        <input
          type="text"
          id="deckName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim()) setNameError("");
          }}
          className={`w-full p-3 border rounded-lg focus:outline-none bg-green-500 text-green-700 ${
            nameError ? "border-red-500" : "border-green-600"
          }`}
          placeholder="Enter deck name"
        />
        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block font-medium mb-2 text-green-700"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none bg-green-500 text-green-700 border-green-600"
          rows="3"
          placeholder="Enter deck description"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 border rounded-md transition-colors text-green-700 border-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md transition-colors bg-green-400 text-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// Main EditDeck Component
const EditDeck = ({ deckId, onClose }) => {
  const { decks, updateDeck, addCard, updateCard, deleteCard } =
    useFlashcards();
  const [deck, setDeck] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingDeckInfo, setIsEditingDeckInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load deck data
  useEffect(() => {
    const selectedDeck = decks.find((d) => d.id === deckId);
    if (selectedDeck) {
      setDeck(selectedDeck);
    }
  }, [deckId, decks]);

  // Filter cards based on search query
  const filteredCards =
    deck?.cards.filter(
      (card) =>
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Update deck information
  const handleUpdateDeckInfo = (updatedInfo) => {
    const updatedDeck = {
      ...deck,
      ...updatedInfo,
    };
    updateDeck(updatedDeck);
    setDeck(updatedDeck);
  };

  // Handle save card (new or edited)
  const handleSaveCard = (card) => {
    if (card.id) {
      // Update existing card
      updateCard(deckId, card);
      setEditingCard(null);
    } else {
      // Add new card
      addCard(deckId, card.question, card.answer);
      setIsAddingCard(false);
    }
  };

  // Handle delete card
  const handleDeleteCard = (cardId) => {
    deleteCard(deckId, cardId);
  };

  if (!deck) {
    return (
      <div className="p-6 text-center font-mono text-green-700">Loading...</div>
    );
  }

  return (
    <div className="p-6 flex-1 overflow-auto font-mono">
      {/* Header with back button */}
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

      {/* Deck Info */}
      <DeckInfoForm
        deck={deck}
        onSave={handleUpdateDeckInfo}
        isEditing={isEditingDeckInfo}
        setIsEditing={setIsEditingDeckInfo}
      />

      {/* Search and Add Card Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none bg-green-500 text-green-700 border-green-600"
          />
          <span className="absolute right-3 top-2.5 text-green-700">🔍</span>
        </div>

        <button
          onClick={() => {
            setIsAddingCard(true);
            setEditingCard(null);
          }}
          className="py-2 px-4 rounded-md font-medium transition duration-200 flex items-center bg-green-400 text-green-700"
          disabled={isAddingCard}
        >
          <span className="mr-2">+</span>
          Add Card
        </button>
      </div>

      {/* Card Editor */}
      {isAddingCard && (
        <CardForm
          card={null}
          onSave={handleSaveCard}
          onCancel={() => setIsAddingCard(false)}
          isNew={true}
        />
      )}

      {editingCard && (
        <CardForm
          card={editingCard}
          onSave={handleSaveCard}
          onCancel={() => setEditingCard(null)}
          isNew={false}
        />
      )}

      {/* Card List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-green-700">
          {searchQuery ? "Search Results" : "All Cards"}
          {searchQuery && ` (${filteredCards.length} cards found)`}
        </h3>

        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={setEditingCard}
              onDelete={handleDeleteCard}
            />
          ))
        ) : (
          <div className="text-center py-8 rounded-lg bg-green-500 border-green-600">
            {searchQuery ? (
              <>
                <p className="mb-2 text-green-700">
                  No cards match your search.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="underline text-green-700"
                >
                  Clear search
                </button>
              </>
            ) : (
              <p className="text-green-700">
                No cards yet. Click "Add Card" to create your first card.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDeck;
