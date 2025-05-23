import React from 'react';
import UploadComponent from '@/components/UploadComponent';
import Header from '@/components/Header';

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showNav={false} />
      <UploadComponent />
    </div>
  );
};

export default Upload;
