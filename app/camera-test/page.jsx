"use client"
import React, { useState } from "react";
import Webcam from "react-webcam";
import  useMicrophoneTest from "./useMicrophoneTest";

const CameraTest = () => {
  const  {
    // State
    isMicTesting,
    audioLevel,
    error,
    permissionState,

    // Derived values
    audioLevelRounded,
    hasError,
    isPermissionGranted,
    isPermissionDenied,

    // Actions
    startMicTest,
    stopMicTest,
    toggleMicTest,

  } = useMicrophoneTest();  

  const [isCameraTesting, setIsCameraTesting] = useState(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex flex-col justify-center items-center py-12 px-4">
      <div className="absolute top-20 left-20 w-24 h-24 bg-yellow-200/30 rounded-full"></div>
      <div className="absolute top-40 right-32 w-32 h-32 bg-blue-200/30 rounded-full"></div>
      <div className="absolute top-20 right-1/4 w-16 h-16 bg-blue-300/40 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-200/30 rounded-full"></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-green-200/30 rounded-full"></div>
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700">
              🤖 Job-Based Interview
            </span>
          </div>
        </div>
        {/* Main Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-gray-800">Ready to </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Begin Your Interview?
            </span>
          </h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/40 mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Test Your Devices
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Camera Test */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📹</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Camera Test
                  </h3>

                  <div className="space-y-4">
                    <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      {isCameraTesting ? (
                        <Webcam
                          audio={false}
                          mirrored={true}
                          className="w-full h-full object-cover"
                          onUserMediaError={(error) => {
                            console.error("Camera error:", error);
                            alert(
                              "Camera access denied. Please allow camera permission."
                            );
                            setIsCameraTesting(false);
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-6xl text-gray-400 mb-2">📷</div>
                          <p className="text-gray-500 font-medium">
                            Camera Preview
                          </p>
                        </div>
                      )}
                    </div>
                    {isCameraTesting ? (
                      <button
                        onClick={() => setIsCameraTesting(false)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
                      >
                        <span className="text-xl">⏹️</span>
                        Stop Camera
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsCameraTesting(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
                      >
                        <span className="text-xl">🎥</span>
                        Test My Camera
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Microphone test */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Microphone Test
                  </h3>

                  <div className="space-y-4">
                    <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                   { isMicTesting ?
                   <>     
                   <div
                      className="h-4 bg-green-500 rounded transition-all "
                      style={{ width: `${Math.min(audioLevel, 100)}%` }}  
                      ></div>
                      </>:
                            <>
                      <div className="text-4xl text-gray-400 mb-2">🎤</div>
                        <p className="text-gray-500 font-medium">
                          Audio Level Monitor
                        </p>
                      </> }
                    </div>
                 { isMicTesting ?  
                    <button
                      onClick={() => stopMicTest()}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
                      >
                      <span className="text-xl">🎤</span>
                      Stop Testing
                    </button> 
                    :     
                    <button
                      onClick={() => startMicTest()}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2 mx-auto"
                    >
                      <span className="text-xl">🎤</span>
                      Test My Microphone
                    </button>
                    
                    }
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl transform hover:scale-105">
            I'm Ready to Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraTest;