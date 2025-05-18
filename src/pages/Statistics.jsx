import React from "react";
import { useFlashcards } from "../hooks/useFlashcards";

const Statistics = () => {
  const { stats } = useFlashcards();

  return (
    <div className="p-6 flex-1 overflow-auto font-mono">
      <h1 className="text-3xl font-bold mb-2 text-green-700">Statistics</h1>
      <p className="mb-6 text-green-700">
        Track your learning progress over time
      </p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-green-500">
        <StatCard
          title="Study Streak"
          value={`${stats.streak} days`}
          icon={<CalendarIcon />}
        />
        <StatCard
          title="Average Retention"
          value={`${stats.retention}%`}
          icon={<TrendingUpIcon />}
        />
        <StatCard
          title="Study Time"
          value={`${stats.studyTime} hrs`}
          icon={<ClockIcon />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-lg shadow bg-green-500 border border-green-600">
          <h2 className="text-lg font-semibold mb-4 text-green-700">
            Daily Reviews
          </h2>
          <div className="h-64 flex items-end space-x-2">
            {dailyReviewData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className="w-full rounded-t transition-all duration-300 bg-green-600 "
                    style={{ height: `${(day.reviews / 30) * 100}%` }}
                    title={`${day.reviews} reviews`}
                  ></div>
                  <div
                    className="w-full rounded-t mt-1 transition-all duration-300 bg-green-500 border border-green-600"
                    style={{ height: `${(day.newCards / 10) * 30}%` }}
                    title={`${day.newCards} new cards`}
                  ></div>
                </div>
                <span className="text-xs font-medium mt-2 text-green-700">
                  {day.label}
                </span>
                <span className="text-xs text-green-700">{day.reviews}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center mx-3">
              <div className="w-4 h-4 rounded mr-2 bg-green-600"></div>
              <span className="text-sm text-green-700">Reviews</span>
            </div>
            <div className="flex items-center mx-3">
              <div className="w-4 h-4 rounded mr-2 bg-green-500 border border-green-600"></div>
              <span className="text-sm text-green-700">New Cards</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg shadow bg-green-500 border border-green-600">
          <h2 className="text-lg font-semibold mb-4 text-green-700">
            Retention Rate
          </h2>
          <div className="h-64 flex flex-col justify-center items-center">
            <div className="relative w-48 h-48">
              {/* Progress circle */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e7f3ec"
                  strokeWidth="10"
                />
                {/* Progress circle - calculate stroke-dasharray and stroke-dashoffset */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * stats.retention) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-green-700">
                  {stats.retention}%
                </span>
                <span className="text-sm text-green-700">Retention</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <div className="text-center mx-4">
                <div className="text-sm font-medium text-green-700">
                  Last Month
                </div>
                <div className="text-lg font-bold text-green-700">84%</div>
              </div>
              <div className="text-center mx-4">
                <div className="text-sm font-medium text-green-700">Change</div>
                <div className="text-lg font-bold text-green-700">
                  +{stats.retention - 84}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          Learning Insights
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow flex bg-green-600 border border-green-600">
            <div className="p-3 rounded-full mr-4 bg-green-600">
              <TrendingUpIcon className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <h3 className="font-medium text-green-700">
                Your retention rate is improving
              </h3>
              <p className="text-green-700">
                Your memory retention has improved by 8% over the last month.
                Keep up the good work!
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow flex bg-green-600 border border-green-600">
            <div className="p-3 rounded-full mr-4 bg-green-600">
              <ClockIcon className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <h3 className="font-medium text-green-700">
                Best study time detected
              </h3>
              <p className="text-green-700">
                You seem to perform better when studying in the morning.
                Consider scheduling more study sessions before noon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-lg p-4 shadow flex flex-col font-mono bg-green-500 border border-green-600">
    <div className="mb-2 flex items-center">
      {icon}
      <span className="ml-2 text-green-700">{title}</span>
    </div>
    <span className="text-3xl font-bold text-green-700">{value}</span>
  </div>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-700"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const TrendingUpIcon = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-green-700`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
      clipRule="evenodd"
    />
  </svg>
);

const ClockIcon = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-green-700`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

// Sample data for charts
const dailyReviewData = [
  { label: "Mon", reviews: 15, newCards: 5 },
  { label: "Tue", reviews: 22, newCards: 7 },
  { label: "Wed", reviews: 18, newCards: 3 },
  { label: "Thu", reviews: 27, newCards: 9 },
  { label: "Fri", reviews: 24, newCards: 7 },
  { label: "Sat", reviews: 12, newCards: 2 },
  { label: "Sun", reviews: 9, newCards: 0 },
];

// Historical retention data - kept for reference or future use
// eslint-disable-next-line no-unused-vars
const retentionData = [
  { label: "Jan", value: 78 },
  { label: "Feb", value: 82 },
  { label: "Mar", value: 79 },
  { label: "Apr", value: 85 },
  { label: "May", value: 90 },
  { label: "Jun", value: 87 },
];

export default Statistics;
