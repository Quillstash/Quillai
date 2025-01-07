import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-6">
          Welcome to QuillAI! By accessing or using our services, you agree to be bound by the following terms and conditions.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By using QuillAI, you agree to comply with and be legally bound by these Terms of Service, as well as our Privacy Policy. If you do not agree, you may not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
          <p className="text-gray-600">
            QuillAI provides tools for AI-assisted content generation and related services. The features and capabilities may be updated or enhanced over time at our discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Provide accurate and up-to-date information when signing up or using our services.</li>
            <li>Do not use QuillAI for unlawful, harmful, or abusive purposes.</li>
            <li>Respect the intellectual property rights of QuillAI and other users.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Content Ownership</h2>
          <p className="text-gray-600">
            You retain ownership of any content you create using QuillAI, but by using our service, you grant us a license to use, display, and share your content as necessary for providing the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Payment and Credits</h2>
          <p className="text-gray-600">
            QuillAI operates on a credit-based system. Payments for credits are non-refundable unless otherwise stated. Misuse or violation of these terms may result in account suspension without a refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Cryptocurrency Payments</h2>
          <p className="text-gray-600">
            Due to current regional limitations, we are only accepting payments in cryptocurrency. This process is 100% transparent and clear.  
          </p>
          <p className="text-gray-600 mt-2">
             you will need to contact the developer directly on discord to make payment, and confirm the transaction. Upon confirmation, your subscription will be updated promptly. We sincerely apologize for any inconvenience this may cause and appreciate your understanding.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
          <p className="text-gray-600">
            QuillAI shall not be held liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to suspend or terminate your access to QuillAI at any time, with or without notice, for violations of these terms or any other reason.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Changes to Terms</h2>
          <p className="text-gray-600">
            QuillAI reserves the right to modify these Terms of Service at any time. Changes will be communicated via our website, and your continued use of the service constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Information</h2>
          <p className="text-gray-600">
            If you have any questions or concerns regarding these terms, please contact us at <a href="mailto:support@quillai.com" className="text-blue-500 hover:underline">support@quillai.com</a>.
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

export default TermsPage;
