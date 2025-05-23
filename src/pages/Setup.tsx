import React from 'react';
import Header from '@/components/Header';
import SetupComponent from '@/components/SetupComponent';

const Setup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showNav={false} />
      <SetupComponent />
    </div>
  );
};

export default Setup;
