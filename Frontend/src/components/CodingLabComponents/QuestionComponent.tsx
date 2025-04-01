// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface QuestionComponentProps {
//   labId: string;
//   timeLimit: number; // in seconds
//   onTimeUp: () => void;
//   onCorrectSolution: () => void;
// }

// export const QuestionComponent: React.FC<QuestionComponentProps> = ({
//   labId,
//   timeLimit,
//   onTimeUp,
//   onCorrectSolution,
// }) => {
//   const [token, setToken] = useState('');
//   const [remainingTime, setRemainingTime] = useState(timeLimit);
//   const userId = "enter a user ID here unique to every user>"
//   useEffect(() => {
//     // Fetch embed token
//     const fetchToken = async () => {
//       try {
//         const response = await axios.post('http://localhost:3000/generate-embed-token', { labId, userId });
//         setToken(response.data.jwtToken);
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };
//     fetchToken();

//     // Set up timer
//     const timerId = setTimeout(onTimeUp, timeLimit * 1000);

//     // Update remaining time every second
//     const intervalId = setInterval(() => {
//       setRemainingTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalId);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // Listen for messages from iframe
//     const handleMessage = (event: MessageEvent) => {
//       // Ensure the message is from the correct origin
//       if (event.origin === 'https://edudiagno.fermion.app') {
//         // Check for correct solution message
//         if (event.data.type === 'solutionCorrect') {
//           onCorrectSolution();
//         }
//       }
//     };

//     window.addEventListener('message', handleMessage);

//     // Cleanup on unmount
//     return () => {
//       clearTimeout(timerId);
//       clearInterval(intervalId);
//       window.removeEventListener('message', handleMessage);
//     };
//   }, [labId, timeLimit, onTimeUp, onCorrectSolution]);

//   // Loading state
//   if (!token) {
//     return <div>Loading coding lab...</div>;
//   }

//   // Render iframe and timer
//   return (
//     <div>
//       <div>Time remaining: {remainingTime} seconds</div>
//       <iframe
//             width="1280"
//             height="720"
//             src={`https://edudiagno.fermion.app/embed/io-coding-lab?token=${token}`}
//             title="Coding Lab"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
// 	picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen>
//         </iframe>
//     </div>
//   );
// };










import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface QuestionComponentProps {
  labId: string;
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  onCorrectSolution: () => void;
  isLastLab?: boolean; // Optional prop to indicate if this is the last lab
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  labId,
  timeLimit,
  onTimeUp,
  onCorrectSolution,
  isLastLab = false,
}) => {
  const [token, setToken] = useState('');
  const [remainingTime, setRemainingTime] = useState(timeLimit); // Initialize with timeLimit
  const [isFinished, setIsFinished] = useState(false);
  const userId = "user123"; // Replace with a unique user ID (e.g., from auth context)

  useEffect(() => {
    // Reset remainingTime when labId changes
    setRemainingTime(timeLimit);

    // Fetch embed token
    const fetchToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generate-embed-token', { labId, userId });
        setToken(response.data.jwtToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();

    // Set up timer
    const timerId = setTimeout(() => {
      onTimeUp();
      if (isLastLab) setIsFinished(true);
    }, timeLimit * 1000);

    // Update remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://edudiagno.fermion.app') {
        if (event.data.type === 'solutionCorrect') {
          onCorrectSolution();
          if (isLastLab) setIsFinished(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup on unmount or when labId changes
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
      window.removeEventListener('message', handleMessage);
    };
  }, [labId, timeLimit, onTimeUp, onCorrectSolution, isLastLab]); // Include all dependencies

  // Handle submit button click
  const handleSubmit = () => {
    onCorrectSolution();
    if (isLastLab) setIsFinished(true);
  };

  // Loading state
  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading coding lab...</div>
      </div>
    );
  }

  // Finished state
  if (isFinished) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-3xl font-bold text-green-600">Quiz Completed! Well Done!</div>
      </div>
    );
  }

  // Main UI with iframe, timer, and submit button
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Timer */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  strokeWidth="4"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(remainingTime / timeLimit) * 100}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-700">
                {remainingTime}
              </div>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-700">Seconds Remaining</span>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {isLastLab ? 'Finish' : 'Submit & Next'}
          </button>
        </div>

        {/* Iframe */}
        <div className="relative w-full h-[600px] overflow-hidden rounded-md border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            src={`https://edudiagno.fermion.app/embed/io-coding-lab?token=${token}`}
            title="Coding Lab"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
};