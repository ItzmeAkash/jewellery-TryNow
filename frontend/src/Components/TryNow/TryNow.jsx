import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const TryNow = ({ onClose, category }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Access the camera when the component mounts
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setLoading(false);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera.");
        setLoading(false);
      }
    };

    startCamera();

    // Stop the camera when the component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 shadow-2xl relative animate-fadeIn">
        <button
          onClick={() => {
            // Stop the camera when the close button is clicked
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
            }
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 font-bold text-2xl"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Virtual Try-On</h2>
          <p className="text-gray-500">Try on your favorite {category} design!</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-200 w-full h-64 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
            {loading && !error && (
              <div className="animate-pulse text-gray-500">Loading video feed...</div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <img
              src="http://localhost:8000/video/Bracelets"
              alt="Bracelet Try-On Video"
              
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
