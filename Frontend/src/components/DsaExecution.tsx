import React from 'react';

const DsaExecution: React.FC = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYWJJZCI6IjY3ZjhiYmY3OTFmMjdiNDNiNjdlZDkyNiIsInVzZXJJZCI6IjEyMzQiLCJpYXQiOjE3NDQzNTUxMjAsImV4cCI6MTc0NDM1ODcyMH0.V5MaGzPvVBuw74L9Qnzq_UcEaLoaf_MnboN4qAyWwYg'
  return (
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
  );
};

export default DsaExecution;






// export const DsaExecution: React.FC = () => {
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const token = '67f8bbf791f27b43b67ed926';

//   const handleIframeError = () => {
//     setError('Failed to load the coding lab.');
//     setIsLoading(false);
//   };

//   return (
//     <div className="relative w-full h-[600px] overflow-hidden rounded-md border border-gray-200">
//       {isLoading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       <iframe
//         width="100%"
//         height="100%"
//         src={`https://edudiagno.fermion.app/embed/io-coding-lab?token=${token}`}
//         title="Coding Lab"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//         className="absolute top-0 left-0"
//         onLoad={() => setIsLoading(false)}
//         onError={handleIframeError}
//       />
//     </div>
//   );
// };