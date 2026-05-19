"use client";
import React, { useEffect, useState } from "react";

const InterviewPage = () => {
  const [sessionData, setSessionData] = useState(null);


  useEffect(() => {
    const savedData = localStorage.getItem("interview_session");
    console.log("Retrieved from localStorage:", savedData); // Debugging line to check what is retrieved from localStorage
    if (savedData) {
      setSessionData(JSON.parse(savedData));
     localStorage.removeItem("interview_session");
    }
  }, []);

  if (!sessionData) return <p>Loading session...</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 mt-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interview Questions
          </span>
        </h1>

        {sessionData && sessionData.questions && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <div className="space-y-6">
              {sessionData.questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-lg text-gray-800 leading-relaxed flex-1">
                      {question}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;