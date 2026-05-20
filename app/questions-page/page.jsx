"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const InterviewPage = () => {
    const router = useRouter()
  const [sessionData, setSessionData] = useState();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isMounted, setIsMounted] = useState(false);
console.log(sessionData)
  const submitAnswer = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8080/sessions/${sessionData.id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: currentAnswer,
          }),
        }
      );
      if (!response.ok) {
        if (response?.details == "All questions already answered"){
                router.push("/final-report");
        } 
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (
        result.next_question_idx !== null &&
        result.next_question_idx !== undefined
      ) {
        window.localStorage.setItem("interview_session", JSON.stringify({
         ...result
        }));
        return { success: true, currentQuestionIndex : result.current_question_idx ,nextQuestionIdx: result.next_question_idx };
      } else {
        // No more questions - interview complete
        return { success: true, nextQuestionIdx: null };
      }
    } catch (error) {
      console.error("Error submitting answer:", error.message);
     // alert("Failed to submit answer. Please try again.");
      return { success: false };
    }
    finally{
        setIsSubmitting(false);
    }
  };
  const handleNextQuestion = async () => {
    const result = await submitAnswer();

    if (result.success) {
      setCurrentAnswer("");
      if (
        sessionData &&
        currentQuestionIndex < sessionData.questions.length - 1
      ) {
        setCurrentQuestionIndex(result.currentQuestionIndex+1 );

      } else {
        router.push("/final-report");
      }
    }
  };
  // Run only after the component mounts in the browser
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedData = JSON.parse(
        window.localStorage.getItem("interview_session") || "null"
      );
      console.log(savedData)
      if (savedData) {
        setSessionData(savedData);
        setCurrentQuestionIndex(savedData?.current_question_idx || 0);
      }
    } catch (error) {
      console.error("Failed to load interview session:", error);
    }
  }, []);
 
  if (!sessionData || !isMounted) return <p>Loading session...</p>;



  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 mt-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interview Questions
          </span>
        </h1>

        {sessionData && sessionData.questions && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 space-y-6">
            {/* Current Question Display */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg">
                    {currentQuestionIndex + 1}
                  </span>
                </div>
                <p className="text-xl text-gray-800 leading-relaxed flex-1">
                  {sessionData.questions[currentQuestionIndex]}
                </p>
              </div>
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Answer:
              </label>
              <textarea
                onChange={(e) => setCurrentAnswer(e.target.value)}
                value={currentAnswer}
                className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Type your answer here... Be specific and provide examples where possible."
              />
            </div>

            {/* Navigation Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextQuestion}
                disabled={isSubmitting || !currentAnswer.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : currentQuestionIndex ===
                  sessionData.questions.length - 1 ? (
                  "Submit & Finish"
                ) : (
                  "Submit & Next"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;