"use client"
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  TrendingUp,
  Award,
  Star,
  ArrowRight,
  Home,
  RefreshCw,
  Download,
  Sparkles,
  Target,
  Brain,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

const FinalReport = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [candidateName, setCandidateName] = useState("");


  useEffect(() => {
    // Get candidate name from localStorage
    const sessionid = JSON.parse(localStorage.getItem("interview_session"))?.id
   

    const fetchFinalReport = async (sessionid) => {
      if (!sessionid) {
        console.error("No session ID provided");
        setIsLoading(false);
        return;
      }
     // console.log(sessionid, "sessionid")
      try {
        const response = await fetch(
          `http://localhost:8080/sessions/${sessionid}/final_report`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Final Report Data:", data);
        setReportData(data);
      } catch (error) {
        console.error("Error fetching final report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinalReport(sessionid);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Generating Your Report
          </h2>
          <p className="text-gray-600">
            Our AI is analyzing your performance...
          </p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Report Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load your interview report. Please try again.
          </p>
          <button
            onClick={() => router.push("/ai-interview")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <CheckCircle
                className="w-20 h-20 text-green-500"
                strokeWidth={2}
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Complete!
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Here's your detailed performance
            report.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Interview Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Interview Summary
                </h3>
              </div>


              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => router.push("/ai-interview")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <RefreshCw className="w-5 h-5" />
                  Start New Interview
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 border-2 border-gray-200 transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Highlights */}

            {/* Detailed Feedback */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
              <div className="bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl p-8 border border-blue-100">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                  {reportData.final_report ||
                    "Your detailed performance report is being generated. This will include comprehensive feedback on your technical skills, communication abilities, and areas for improvement."}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <ArrowRight className="w-7 h-7" />
                Recommended Next Steps
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">
                    Review the detailed feedback and identify key areas for
                    improvement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">
                    Practice similar questions to strengthen your weak areas
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">
                    Take another practice interview to track your progress
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">
                    Share your achievements with your network
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
          <p className="text-gray-600 text-lg">
            Thank you for using our AI Interview platform! Keep practicing and
            improving. 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;