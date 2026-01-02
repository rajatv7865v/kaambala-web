import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Privacy Policy & Cancellation Policy
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Cancellation by the Customer</h2>
            <p className="text-gray-700 mb-4">
              Refunds are processed based on the timing of your cancellation request:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>More than 12 hours before the scheduled time:</strong> You are eligible for a 100% Full Refund. No cancellation fees will be charged.
              </li>
              <li>
                <strong>Between 4 to 12 hours before the scheduled time:</strong> A 50% Cancellation Fee will be applied. You will receive a 50% Refund of the booking amount.
              </li>
              <li>
                <strong>Less than 4 hours before the scheduled time:</strong> No refund will be provided for cancellations made within 4 hours of the service start time.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. On-Site Cancellation</h2>
            <p className="text-gray-700">
              If our service provider (Electrician, Carpenter, Cleaner, etc.) has already arrived at your location and the service is cancelled by the customer due to any reason, no refund will be issued. This ensures that the service provider is compensated for their travel and time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Cancellations by Service Provider</h2>
            <p className="text-gray-700 mb-4">
              A 100% Full Refund will be issued to the customer in the following cases:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>If the assigned service provider fails to arrive at the scheduled time.</li>
              <li>If the service provider is unable to perform the task due to a lack of necessary tools or expertise.</li>
              <li>If Kamwala.com cancels the booking due to unforeseen technical issues or unavailability of experts.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Refund Processing Time</h2>
            <p className="text-gray-700">
              Once a refund is approved, the amount will be credited back to your original payment method (Bank Account, UPI, or Credit/Debit Card). The refund typically takes 5 to 7 business days to reflect in your account, depending on your bank's processing time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Service Warranty & Re-work</h2>
            <p className="text-gray-700 mb-4">
              If you are unsatisfied with the quality of the service, please report the issue within 24 hours.
            </p>
            <p className="text-gray-700">
              We offer a 7-day warranty on most repairs. If the same issue recurs within this period, we will send a technician for a Free Re-visit to fix the problem.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding your refund or to cancel a booking, please contact us at:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Email:</strong> info@kaambala.com</li>
              <li><strong>Phone:</strong> +91 8005212520</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;