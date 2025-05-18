import { useState, useEffect } from "react";

// Sample flashcard data
const initialDecks = [
  {
    id: 1,
    name: "Spanish Vocabulary",
    description: "Common Spanish words and phrases for beginners",
    cards: [
      {
        id: 1,
        question: "¿Cómo estás?",
        answer: "How are you?",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 2),
      },
      {
        id: 2,
        question: "Buenos días",
        answer: "Good morning",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 3),
      },
      {
        id: 3,
        question: "¿Cómo te llamas?",
        answer: "What's your name?",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 1),
      },
      // More cards...
    ],
  },
  {
    id: 2,
    name: "JavaScript Concepts",
    description: "Essential JavaScript concepts for web development",
    cards: [
      {
        id: 1,
        question: "What is a closure?",
        answer:
          "A closure is a function that has access to its own scope, the scope of the outer function, and global scope.",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 4),
      },
      {
        id: 2,
        question: "What is the difference between let and var?",
        answer:
          "let is block-scoped while var is function-scoped. Variables declared with let can't be redeclared in the same scope.",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 2),
      },
      // More cards...
    ],
  },
  {
    id: 3,
    name: "World Capitals",
    description: "Capital cities of countries around the world",
    cards: [
      {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 1),
      },
      {
        id: 2,
        question: "What is the capital of Japan?",
        answer: "Tokyo",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 5),
      },
      {
        id: 3,
        question: "What is the capital of Brazil?",
        answer: "Brasília",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 3),
      },
      // More cards...
    ],
  },
  {
    id: 4,
    name: "Chemistry Basics",
    description: "Fundamental chemistry concepts and elements",
    cards: [
      {
        id: 1,
        question: "What is the chemical symbol for Gold?",
        answer: "Au",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 2),
      },
      {
        id: 2,
        question: "What is the atomic number of Oxygen?",
        answer: "8",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 4),
      },
      {
        id: 3,
        question: "What is the pH of a neutral solution?",
        answer: "7",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 1),
      },
      {
        id: 4,
        question: "What is the chemical formula for water?",
        answer: "H₂O",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 3),
      },
    ],
  },
  {
    id: 5,
    name: "Famous Quotes",
    description: "Well-known quotes from historical figures and literature",
    cards: [
      {
        id: 1,
        question: "Who said 'I think, therefore I am'?",
        answer: "René Descartes",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 5),
      },
      {
        id: 2,
        question: "Complete the quote: 'To be, or not to be...'",
        answer: "That is the question",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 2),
      },
      {
        id: 3,
        question: "Who said 'Be the change you wish to see in the world'?",
        answer: "Mahatma Gandhi",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 1),
      },
      {
        id: 4,
        question: "Who wrote 'All that glitters is not gold'?",
        answer: "William Shakespeare (from The Merchant of Venice)",
        lastReviewed: new Date(Date.now() - 3600000 * 24 * 3),
      },
    ],
  },
];

export const useFlashcards = () => {
  const [decks, setDecks] = useState(() => {
    // Check if we have decks in localStorage
    const savedDecks = localStorage.getItem("flashcards");
    return savedDecks ? JSON.parse(savedDecks) : initialDecks;
  });

  const [currentDeck, setCurrentDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [stats, setStats] = useState({
    streak: 7,
    retention: 86,
    totalCards: 0,
    cardsToReview: 0,
    studyTime: 5.2,
  });

  // Save decks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(decks));

    // Calculate total cards
    let total = 0;
    decks.forEach((deck) => {
      total += deck.cards.length;
    });

    setStats((prev) => ({
      ...prev,
      totalCards: total,
      cardsToReview: total, // Set all cards as reviewable
    }));
  }, [decks]);

  // Function to add a new deck
  const addDeck = (name, description = "") => {
    const newDeck = {
      id: decks.length + 1,
      name,
      description,
      cards: [],
    };

    setDecks([...decks, newDeck]);
  };

  // Function to update an entire deck
  const updateDeck = (updatedDeck) => {
    setDecks(
      decks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    );
  };

  // Function to add a card to a deck
  const addCard = (deckId, question, answer) => {
    setDecks(
      decks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: [
              ...deck.cards,
              {
                id:
                  deck.cards.length > 0
                    ? Math.max(...deck.cards.map((card) => card.id)) + 1
                    : 1,
                question,
                answer,
                lastReviewed: new Date(),
              },
            ],
          };
        }
        return deck;
      })
    );
  };

  // Function to update a card
  const updateCard = (deckId, updatedCard) => {
    setDecks(
      decks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: deck.cards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            ),
          };
        }
        return deck;
      })
    );
  };

  // Function to delete a card
  const deleteCard = (deckId, cardId) => {
    setDecks(
      decks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: deck.cards.filter((card) => card.id !== cardId),
          };
        }
        return deck;
      })
    );
  };

  // Function to start reviewing a deck
  const startReview = (deckId) => {
    const deck = decks.find((d) => d.id === deckId);
    if (deck) {
      setCurrentDeck(deck);
      setCurrentCard(0);
    }
  };

  // Function to record a card study
  const reviewCard = (deckId, cardId) => {
    setDecks(
      decks.map((deck) => {
        if (deck.id === deckId) {
          return {
            ...deck,
            cards: deck.cards.map((card) => {
              if (card.id === cardId) {
                return {
                  ...card,
                  lastReviewed: new Date(),
                };
              }
              return card;
            }),
          };
        }
        return deck;
      })
    );
  };

  // Function to delete a deck
  const deleteDeck = (deckId) => {
    setDecks(decks.filter((deck) => deck.id !== deckId));
  };

  return {
    decks,
    stats,
    currentDeck,
    currentCard,
    addDeck,
    updateDeck,
    addCard,
    updateCard,
    deleteCard,
    startReview,
    reviewCard,
    deleteDeck,
    setCurrentCard,
  };
};
