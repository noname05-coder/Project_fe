import React from 'react';
import Header from '@/components/Header';
import SummaryComponent from '@/components/SummaryComponent';

const Summary = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showNav={false} />
      <SummaryComponent />
    </div>
  );
};

export default Summary;
