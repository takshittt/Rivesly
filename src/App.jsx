import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";

const App = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.slice(1);
    if (path && ["dashboard", "statistics"].includes(path)) {
      setCurrentPage(path);
    } else if (path) {
      window.history.replaceState(null, "", "/dashboard");
      setCurrentPage("dashboard");
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            showCreateDeckModal={showCreateDeckModal}
            setShowCreateDeckModal={setShowCreateDeckModal}
          />
        );
      case "statistics":
        return <Statistics />;
      default:
        return (
          <Dashboard
            showCreateDeckModal={showCreateDeckModal}
            setShowCreateDeckModal={setShowCreateDeckModal}
          />
        );
    }
  };

  const navigate = (path) => {
    const route = path.replace("/", "");
    setCurrentPage(route || "dashboard");
    window.history.pushState(null, "", path);
  };

  const handleLinkClick = (e) => {
    if (
      e.target.tagName === "A" &&
      e.target.getAttribute("href")?.startsWith("/")
    ) {
      e.preventDefault();
      navigate(e.target.getAttribute("href"));
    }
  };

  const handleCreateDeck = () => {
    setShowCreateDeckModal(true);
  };

  return (
    <div className="flex h-screen bg-green-500" onClick={handleLinkClick}>
      <Sidebar activePage={currentPage} onCreateDeck={handleCreateDeck} />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  );
};

export default App;
