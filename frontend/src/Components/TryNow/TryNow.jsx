import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../axiosInstance";

const TryNow = ({ onClose, category }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLoading(false);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Camera access denied. Please enable it in your browser settings."
            : err.name === "NotFoundError"
            ? "No camera found. Please connect a camera and try again."
            : err.name === "OverconstrainedError"
            ? "Camera constraints could not be satisfied."
            : "Could not access the camera due to an unknown error."
        );
        setLoading(false);
      }
    };

    startCamera();

    const handleBeforeUnload = async (event) => {
      // Stop the camera
      stopCamera();

      // Optionally notify the backend
      await axiosInstance.post("/stop-process");

      // Prevent the default unload behavior (optional)
      event.preventDefault();
      event.returnValue = "";
    };

    // Add the beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup camera and remove event listener on component unmount
      stopCamera();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop(); // Stop all video tracks
      });
      streamRef.current = null; // Reset stream reference
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear video element source
      }
    }
  };

  const handleClose = async () => {
    await axiosInstance.post("/stop-process"); // Optionally notify backend to close camera feed
    stopCamera(); // Stop camera before closing
    onClose(); // Call parent-provided close function
  };

  const getVideoEndpoint = () => {
    return `${axiosInstance.defaults.baseURL}video/${category}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-2xl relative animate-fadeIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 font-bold text-2xl"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Virtual Try-On</h2>
          <p className="text-gray-500">Try on your favorite {category} design!</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-200 w-full h-96 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
            {loading && !error && (
              <div className="animate-pulse text-gray-500">Loading video feed...</div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <iframe
                src={getVideoEndpoint()}
                alt={`${category} Try-On Video`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TryNow.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default TryNow;
