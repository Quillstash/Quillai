import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">
          At QuillAI, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information that you provide directly to us, such as when you create an account, contact support, or use our services. This may include your name, email address, and any other data you choose to share.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>To provide and improve our services.</li>
            <li>To communicate with you regarding updates, promotions, or support.</li>
            <li>To ensure the security and integrity of our platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. We Do Not Sell or Misuse Your Information</h2>
          <p className="text-gray-600">
            We are committed to safeguarding your data. QuillAI does not sell, rent, or misuse any customer information under any circumstances. 
          </p>
          <p className="text-gray-600 mt-2">
            Your trust is important to us, and we are fully transparent about how we handle your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Transparency in Data Practices</h2>
          <p className="text-gray-600">
            We ensure that all data collection and usage practices are clearly communicated to you. If you have any concerns, you are welcome to contact us for clarification.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Security of Your Data</h2>
          <p className="text-gray-600">
            We take reasonable measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal information at any time. If you would like assistance with this, please contact our support team.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Updates to This Policy</h2>
          <p className="text-gray-600">
            QuillAI reserves the right to modify this Privacy Policy at any time. Changes will be communicated via our website. Continued use of our services constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:support@quillai.com" className="text-blue-500 hover:underline">support@quillai.com</a>.
          </p>
        </section>
{/* 
        <footer className="border-t pt-4 mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} QuillAI. All rights reserved.
        </footer> */}
      </div>
    </div>
  );
};

export default PrivacyPage;
