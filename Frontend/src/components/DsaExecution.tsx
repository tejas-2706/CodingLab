import React from 'react';

const DsaExecution: React.FC = () => {
  const token = '67bd6538524855296bf0f4cd'; // Replace with actual token

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