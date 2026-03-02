import React from 'react';
import LegalLayout from './LegalLayout';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 2026">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account in The Pavilion or participate in fan discussions. This includes your username and email address.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">2. Data Usage</h2>
        <p>Your data helps us personalize match notifications and manage your fan status across the platform.</p>
      </section>
    </LegalLayout>
  );
};

export default PrivacyPolicy;