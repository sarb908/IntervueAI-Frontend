// useMicrophoneTest.js
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useMicrophoneTest() {
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState("");
  const [permissionState, setPermissionState] = useState("unknown"); // unknown | granted | denied

  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const dataArrayRef = useRef(null);

  // Stop microphone test and clean up all resources
  const stopMicTest = useCallback(async () => {
    // Cancel animation loop
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Stop media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Disconnect audio nodes
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (err) {
        console.error("Error disconnecting source:", err);
      }
      sourceRef.current = null;
    }

    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch (err) {
        console.error("Error disconnecting analyser:", err);
      }
      analyserRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== "closed") {
          await audioContextRef.current.close();
        }
      } catch (err) {
        console.error("Error closing audio context:", err);
      }
      audioContextRef.current = null;
    }

    // Reset refs and state
    dataArrayRef.current = null;
    setAudioLevel(0);
    setIsMicTesting(false);
  }, []);

  // Start microphone test
  const startMicTest = useCallback(async () => {
    try {
      setError("");

      // Check browser support
      if (
        !navigator?.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error("Microphone is not supported in this browser.");
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      setPermissionState("granted");

      // Create AudioContext
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      // Resume if suspended (required in some browsers)
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // Create analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Create source
      const source =
        audioContext.createMediaStreamSource(stream);
      sourceRef.current = source;

      // Connect source → analyser
      source.connect(analyser);

      // Prepare data array
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      setIsMicTesting(true);

      // Animation loop to measure microphone level
      const updateAudioLevel = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(
          dataArrayRef.current
        );

        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          sum += dataArrayRef.current[i];
        }

        const average =
          sum / dataArrayRef.current.length;

        // Normalize to 0–100
        const normalizedLevel = Math.min(
          Math.round((average / 255) * 100),
          100
        );

        setAudioLevel(normalizedLevel);

        animationFrameRef.current =
          requestAnimationFrame(updateAudioLevel);
      };

      updateAudioLevel();
    } catch (err) {
      console.error("Microphone access error:", err);

      const message =
        err?.name === "NotAllowedError" ||
        err?.name === "PermissionDeniedError"
          ? "Microphone access denied. Please allow microphone permission."
          : err?.message ||
            "Unable to access microphone.";

      setError(message);
      setPermissionState("denied");

      await stopMicTest();
    }
  }, [stopMicTest]);

  // Toggle helper
  const toggleMicTest = useCallback(() => {
    if (isMicTesting) {
      stopMicTest();
    } else {
      startMicTest();
    }
  }, [isMicTesting, startMicTest, stopMicTest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicTest();
    };
  }, [stopMicTest]);

  return {
    // State
    isMicTesting,
    audioLevel,
    error,
    permissionState,

    // Derived values
    audioLevelRounded: Math.round(audioLevel),
    hasError: Boolean(error),
    isPermissionGranted: permissionState === "granted",
    isPermissionDenied: permissionState === "denied",

    // Actions
    startMicTest,
    stopMicTest,
    toggleMicTest,

    // Raw refs (optional access if needed)
    stream: streamRef.current,
    analyser: analyserRef.current,
    audioContext: audioContextRef.current,
  };
}