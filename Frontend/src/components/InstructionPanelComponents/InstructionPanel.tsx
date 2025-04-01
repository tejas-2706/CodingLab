// import React, { useEffect, useState } from 'react';

// const InstructionPanel: React.FC<{ onNext: () => void }> = ({ onNext }) => {
//   const [webcamStatus, setWebcamStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [micStatus, setMicStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [networkStatus, setNetworkStatus] = useState<'loading' | 'success' | 'error'>('loading');

//   // Check webcam access
//   const checkWebcam = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ video: true });
//       setWebcamStatus('success');
//     } catch (error) {
//       setWebcamStatus('error');
//     }
//   };

//   // Check microphone access
//   const checkMicrophone = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       setMicStatus('success');
//     } catch (error) {
//       setMicStatus('error');
//     }
//   };

//   // Check network connectivity (basic online check)
//   const checkNetwork = () => {
//     if (navigator.onLine) {
//       setNetworkStatus('success');
//     } else {
//       setNetworkStatus('error');
//     }
//   };

//   // Run checks on mount
//   useEffect(() => {
//       checkWebcam();
//       checkMicrophone();
//       checkNetwork();
//       console.log(navigator.mediaDevices.enumerateDevices());
//   }, []);

//   // Determine if all checks are successful
//   const allChecksPassed = webcamStatus === 'success' && micStatus === 'success' && networkStatus === 'success';

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Before You Start</h1>
//         <p className="text-gray-600 mb-6">
//           Please ensure your webcam, microphone, and network are working properly. The checks below will help verify
//           everything is set up correctly.
//         </p>

//         {/* Checklist */}
//         <div className="space-y-4 mb-8">
//           {/* Webcam Check */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700">Webcam Check</span>
//             {webcamStatus === 'loading' && <span className="text-yellow-500">Checking...</span>}
//             {webcamStatus === 'success' && <span className="text-green-500">✓ Success</span>}
//             {webcamStatus === 'error' && <span className="text-red-500">✗ Error</span>}
//           </div>

//           {/* Microphone Check */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700">Microphone Check</span>
//             {micStatus === 'loading' && <span className="text-yellow-500">Checking...</span>}
//             {micStatus === 'success' && <span className="text-green-500">✓ Success</span>}
//             {micStatus === 'error' && <span className="text-red-500">✗ Error</span>}
//           </div>

//           {/* Network Check */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700">Network Connectivity</span>
//             {networkStatus === 'loading' && <span className="text-yellow-500">Checking...</span>}
//             {networkStatus === 'success' && <span className="text-green-500">✓ Success</span>}
//             {networkStatus === 'error' && <span className="text-red-500">✗ Error</span>}
//           </div>
//         </div>

//         {/* Next Button */}
//         <button
//           onClick={onNext}
//           disabled={!allChecksPassed}
//           className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
//             allChecksPassed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InstructionPanel;






























import React, { useEffect, useState, useRef } from 'react';

const InstructionPanel: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [webcamStatus, setWebcamStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [micStatus, setMicStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [networkStatus, setNetworkStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [webcamDevices, setWebcamDevices] = useState<MediaDeviceInfo[]>([]);
  const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedWebcam, setSelectedWebcam] = useState<string>('');
  const [selectedMic, setSelectedMic] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch available devices
  const fetchDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const audioDevices = devices.filter((device) => device.kind === 'audioinput');
      setWebcamDevices(videoDevices);
      setMicDevices(audioDevices);
      if (videoDevices.length > 0) setSelectedWebcam(videoDevices[0].deviceId);
      if (audioDevices.length > 0) setSelectedMic(audioDevices[0].deviceId);
    } catch (error) {
      console.error('Error enumerating devices:', error);
    }
  };

  // Check webcam access with selected device
  const checkWebcam = async () => {
    if (!selectedWebcam) {
      setWebcamStatus('error');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedWebcam } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setWebcamStatus('success');
    } catch (error) {
      setWebcamStatus('error');
    }
  };

  // Check microphone access with selected device
  const checkMicrophone = async () => {
    if (!selectedMic) {
      setMicStatus('error');
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: selectedMic } },
      });
      setMicStatus('success');
    } catch (error) {
      setMicStatus('error');
    }
  };

  // Check network connectivity
  const checkNetwork = () => {
    setNetworkStatus(navigator.onLine ? 'success' : 'error');
  };

  // Run initial checks
  useEffect(() => {
    fetchDevices();
    checkNetwork();
  }, []);

  // Update checks when devices change
  useEffect(() => {
    if (selectedWebcam) checkWebcam();
    if (selectedMic) checkMicrophone();
  }, [selectedWebcam, selectedMic]);

  // Check if all tests pass
  const allChecksPassed = webcamStatus === 'success' && micStatus === 'success' && networkStatus === 'success';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Prepare for Your Interview</h1>

        {/* Webcam Preview */}
        <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
          <video ref={videoRef} className="w-full h-full object-cover" />
          {webcamStatus === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center text-yellow-600 bg-black bg-opacity-20">
              Checking camera...
            </div>
          )}
          {webcamStatus === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center text-red-600 bg-black bg-opacity-20">
              Camera not detected
            </div>
          )}
        </div>

        {/* Device Selection */}
        <div className="flex items-center justify-between mb-8">
          {/* Camera Selection */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 text-sm font-medium">Camera:</span>
            <select
              value={selectedWebcam}
              onChange={(e) => setSelectedWebcam(e.target.value)}
              className="w-48 p-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {webcamDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          {/* Microphone Selection */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 text-sm font-medium">Mic:</span>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-48 p-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {micDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Mic ${device.deviceId.slice(0, 5)}`}
                </option>
              ))}
            </select>
          </div>

          {/* Network Status */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm font-medium">Network:</span>
            <span
              className={`text-sm ${
                networkStatus === 'success' ? 'text-green-600' : networkStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}
            >
              {networkStatus === 'success' ? '✓ Connected' : networkStatus === 'error' ? '✗ Disconnected' : 'Checking...'}
            </span>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={onNext}
          disabled={!allChecksPassed}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
            allChecksPassed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Interview
        </button>
      </div>
    </div>
  );
};

export default InstructionPanel;