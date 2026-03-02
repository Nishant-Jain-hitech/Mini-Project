import React from 'react';
import LegalLayout from './LegalLayout';

const CookiePolicy = () => {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="March 2026">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Cookie Usage</h2>
        <p>We use cookies to remember your favorite teams and keep your "sliding animation" preferences active across sessions.</p>
      </section>
    </LegalLayout>
  );
};

export default CookiePolicy;