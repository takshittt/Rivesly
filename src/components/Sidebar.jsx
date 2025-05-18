import React from "react";

// Revisly Logo SVG component
const RevislyLogo = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M142.5 67.5C146.5 63.5 155.5 58 166 67.5"
        stroke="#3B82F6"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M138.8 85.6L78 129.2V200.8L142.8 247.5L207.5 200.8V129.2L146.8 85.6"
        stroke="#3B82F6"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path
        d="M142.5 247.5V275"
        stroke="#3B82F6"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="83" cy="165" r="15" stroke="#3B82F6" strokeWidth="12" />
      <circle cx="202" cy="165" r="15" stroke="#3B82F6" strokeWidth="12" />
    </g>
  </svg>
);

const Sidebar = ({ activePage, onCreateDeck }) => {
  return (
    <div className="w-60 h-screen p-4 flex flex-col border-r bg-green-500 border-green-600 font-mono">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <RevislyLogo />
          <span className="text-blue-500 text-2xl font-semibold">Revisly</span>
        </div>
      </div>

      <nav className="space-y-1">
        <NavItem
          label="Dashboard"
          icon={<HomeIcon />}
          isActive={activePage === "dashboard"}
          href="/dashboard"
        />
        <NavItem
          label="Statistics"
          icon={<ChartIcon />}
          isActive={activePage === "statistics"}
          href="/statistics"
        />
      </nav>

      {/* Spacer to push Create Deck button to bottom */}
      <div className="flex-grow"></div>

      {/* Create Deck Button */}
      <button
        className="mt-4 py-2 px-4 bg-green-400 text-green-700 rounded-md font-medium transition duration-200 flex items-center justify-center hover:scale-105 active:scale-95 hover:shadow-md"
        onClick={onCreateDeck}
      >
        <span className="mr-2">+</span>
        Create Deck
      </button>
    </div>
  );
};

const NavItem = ({ label, icon, isActive, href }) => {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-green-700 ${
        isActive ? "bg-green-600" : "bg-transparent"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
};

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

export default Sidebar;
