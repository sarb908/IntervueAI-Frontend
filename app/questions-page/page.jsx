"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {Mic, MicOff, Mic2} from "lucide-react";
import ProtectedRoute from "../_components/ProtectedRoute";
const InterviewPage = () => {
    const router = useRouter()
  const [sessionData, setSessionData] = useState();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const [isMounted, setIsMounted] = useState(false);


  // State for TTS audio playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null); // Reference to control audio element

  // STT-related state
const [isRecording, setIsRecording] = useState(false);
const [isTranscribing, setIsTranscribing] = useState(false);
const [recordingError, setRecordingError] = useState(null);

// Refs for audio recording
const mediaRecorderRef = useRef(null);
const audioChunksRef = useRef([]);


console.log(sessionData)
  const submitAnswer = async () => {
    setIsSubmitting(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      const response = await fetch(
        `http://localhost:8080/sessions/${sessionData.id}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
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
const startRecording = async () => {
  try {
    setRecordingError(null);
    
    // Request microphone permission
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Create MediaRecorder with WebM format
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm'
    });
    
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];
    
    // Collect audio data as it's recorded
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };
    
    // When recording stops, transcribe
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop());
      await transcribeAudio();
    };
    
    // Start recording
    mediaRecorder.start();
    setIsRecording(true);
  } catch (error) {
    setRecordingError("Could not access microphone. Please check permissions.");
  }
};

const stopRecording = () => {
  if (mediaRecorderRef.current?.state === 'recording') {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }
};

const transcribeAudio = async () => {
  try {
    setIsTranscribing(true);
    setRecordingError(null);
    
    // Create audio blob
    const audioBlob = new Blob(audioChunksRef.current, {
      type: 'audio/webm'
    });
    
    if (audioBlob.size === 0) {
      throw new Error("No audio data recorded");
    }
    
    // Create FormData
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    
    // Send to backend
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const response = await fetch('http://localhost:8080/sessions/stt', {
      method: 'POST',
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`STT API error! Status: ${response.status}`);
    }
    
    // Get transcription
    const result = await response.json();
    
    // Append to answer textarea
    if (result.text) {
      setCurrentAnswer(prev => 
        prev ? `${prev} ${result.text}` : result.text
      );
    }
  } catch (error) {
    setRecordingError("Could not transcribe audio. Please try again.");
  } finally {
    setIsTranscribing(false);
    audioChunksRef.current = [];
  }
};



  // ========================================
  // 🎙️ READ QUESTION ALOUD USING TTS
  // ========================================
  useEffect(() => {
    // Don't do anything if no session data or questions
    const sessionData = JSON.parse(
        window.localStorage.getItem("interview_session") || "null"
      );
    if (!sessionData || !sessionData.questions) return;

    // Get the current question text
    const currentQuestion = sessionData.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Function to fetch TTS audio and play it
    const speakQuestion = async () => {
      try {
        setIsPlayingAudio(true);
        setAudioError(null);
        const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

        // STEP 1: Call backend TTS endpoint
        const response = await fetch("http://localhost:8080/sessions/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            text: currentQuestion, // The question text to convert to speech
            voice: "alloy", // Using "onyx" for professional interview tone (deep, clear)
          }),
        });

        // STEP 2: Check if request was successful
        if (!response.ok) {
          throw new Error(`TTS API error! Status: ${response.status}`);
        }

        // STEP 3: Convert response to audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // STEP 4: Load and play the audio
        if (audioRef.current) {
          audioRef.current.src = audioUrl;

          // Try to play the audio
          try {
            await audioRef.current.play();
            console.log("Question audio playing:", currentQuestionIndex + 1);
          } catch (playError) {
            // Browser blocked autoplay - not a critical error
            console.log("Autoplay blocked by browser:", playError);
            setIsPlayingAudio(false);
          }

          // STEP 5: Cleanup when audio finishes
          audioRef.current.onended = () => {
            setIsPlayingAudio(false);
            URL.revokeObjectURL(audioUrl); // Free memory
          };

          // STEP 6: Handle audio errors
          audioRef.current.onerror = () => {
            setIsPlayingAudio(false);
            URL.revokeObjectURL(audioUrl);
          };
        }
      } catch (error) {
        console.error("Error playing question audio:", error);
        setAudioError("Could not play question audio.");
        setIsPlayingAudio(false);
      }
    };

    // Wait 500ms before playing (ensures smooth UI transition)
    const timer = setTimeout(() => {
      speakQuestion();
    }, 500);

    // Cleanup function - runs when question changes or component unmounts
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [ currentQuestionIndex]); // Re-run when question changes


 
  if (!sessionData || !isMounted) return <p>Loading session...</p>;



  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4">
         {/* 
        ========================================
        🔊 HIDDEN AUDIO PLAYER
        ========================================
        Plays the question text using TTS
      */}
      <audio ref={audioRef} preload="auto" />

      {/* 
        ========================================
        🎙️ AUDIO STATUS INDICATOR
        ========================================
        Shows when AI is reading the question
      */}
     


      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 mt-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interview Questions
          </span>
        </h1>

 
{isRecording && (
  <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-pulse">
    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
    <Mic className="w-5 h-5" />
    <span className="font-semibold">Recording in progress...</span>
  </div>
)}

{isTranscribing && (
  <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span className="font-semibold">Transcribing audio...</span>
  </div>
)}
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
  disabled={isSubmitting || isRecording}
  className="w-full h-40 px-4 py-3 border-2 rounded-xl"
  placeholder="Type your answer here... OR click 'Record Answer' to speak!"
/>

<p className="mt-2 text-xs text-gray-500">
  💡 Tip: You can type, record voice, or combine both!
</p>


{recordingError && (
  <div className="mb-3 text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
    ⚠️ {recordingError}
  </div>)}
            </div>

            {/* Navigation Button */}
            <div className="flex justify-end gap-3 pt-4">

                                 {/* Error Message */}
                  {audioError && (
                    <div className="mt-3 text-red-600 text-sm font-medium">
                      ⚠️ {audioError}
                    </div>
                  )}
                  <button
  onClick={isRecording ? stopRecording : startRecording}
  disabled={isSubmitting || isTranscribing}
  className={`flex items-center ml-0 gap-2 px-4 py-2 rounded-lg font-medium ${
    isRecording
      ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
  } disabled:opacity-50 disabled:cursor-not-allowed`}
>
  {isRecording ? (
    <>
      <MicOff className="w-5 h-5" />
      <span>Stop Recording</span>
    </>
  ) : (
    <>
      <Mic className="w-5 h-5" />
      <span>Record Answer</span>
    </>
  )}
</button>


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
    </ProtectedRoute>
  );
};

export default InterviewPage;