import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Earnings Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="mb-6">
            <strong>Last Updated: {new Date().getFullYear()}</strong>
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Income and Earnings Disclaimer</h2>
          
          <p className="mb-6">
            APEX Operations LLC and RemoteOps.ai (collectively "we," "us," or "our") make every effort to accurately represent our products and services and their potential for income. Any earnings or income statements, or examples of earnings or income, are only estimates of what you might earn. There is no assurance you will do as well as stated in any examples.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">No Guarantees</h2>
          
          <p className="mb-6">
            YOUR INDIVIDUAL RESULTS WILL VARY BASED ON YOUR SKILL, EXPERIENCE, EXPERTISE, DESIRE AND TIME INVESTMENT.
          </p>
          
          <p className="mb-6">
            Where specific income or sales figures are used and attributed to a specific individual or business, that individual or business has earned that amount. There is no assurance you will do as well using the same information or strategies. Your results may vary.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Business Risks</h2>
          
          <p className="mb-6">
            Any business endeavor has inherent risk for loss of capital. Success in business requires hard work, dedication, and skill. We do not guarantee that you will achieve any results from our ideas or models. You may experience a financial loss when implementing any strategy or advice provided.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Success Factors</h2>
          
          <p className="mb-6">
            Your success depends on numerous factors including, but not limited to:
          </p>
          
          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li>Your skill level and expertise</li>
            <li>Your dedication and time investment</li>
            <li>Your financial resources</li>
            <li>Your local market conditions</li>
            <li>Your ability to hire and manage contractors</li>
            <li>Your sales and marketing abilities</li>
            <li>Economic conditions</li>
            <li>Competition in your area</li>
            <li>Unforeseen challenges</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Testimonials and Examples</h2>
          
          <p className="mb-6">
            Testimonials and examples used on our sites are exceptional results, do not reflect the typical purchaser's experience, do not apply to the average person and are not intended to represent or guarantee that anyone will achieve the same or similar results.
          </p>
          
          <p className="mb-6">
            Where specific income figures are mentioned (for example, "$67,234/month" or "$30K/month"), these represent actual results from specific individuals but should not be considered average or typical. Most people who purchase business training information do not achieve these levels of income.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Forward-Looking Statements</h2>
          
          <p className="mb-6">
            Materials on this website may contain information that includes or is based upon forward-looking statements. Forward-looking statements give our expectations or forecasts of future events. You can identify these statements by the fact that they do not relate strictly to historical or current facts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Purchase Risks</h2>
          
          <p className="mb-6">
            Any purchase from this website is done at your own risk. You accept sole responsibility for any decision to purchase our products or services. We make no guarantee about the level of success you may experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Professional Advice Disclaimer</h2>
          
          <p className="mb-6">
            The information provided on this website and in our products is for educational and informational purposes only. You should consult with a professional where appropriate. We do not offer legal, tax, or business consulting advice.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Typical Results</h2>
          
          <p className="mb-6 font-bold">
            THE TYPICAL PURCHASER OF OUR PRODUCTS AND SERVICES RECEIVES NO EARNINGS AT ALL. This is because the typical purchaser does not implement what they learn or gives up before giving the program a fair chance to work.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Due Diligence</h2>
          
          <p className="mb-6">
            You are advised to do your own due diligence when it comes to making business decisions and should use caution and seek the advice of qualified professionals. You should check with your accountant, lawyer, or professional advisor before acting on any information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Territory Protection</h2>
          
          <p className="mb-6">
            Any mention of "territory protection" or "exclusive territories" in our full APEX Operator License program does not guarantee exclusive business rights in any geographic area. Other contractors, businesses, and competitors may operate in the same area. Territory protection refers only to our commitment not to sell the same program to others in that specific area, subject to our terms and conditions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Refund Policy</h2>
          
          <p className="mb-6">
            Our refund policy is clearly stated at the point of purchase. Generally, we offer a 30-day money-back guarantee if you implement the strategies and don't see a clear path forward. However, refunds are not guaranteed and are subject to our review of your implementation efforts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
          
          <p className="mb-6">
            If you have any questions about this Earnings Disclaimer, please contact us at:
          </p>
          
          <p className="mb-6">
            Email: support@remoteops.ai<br />
            Phone: Available to enrolled students only
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Agreement</h2>
          
          <p className="mb-6">
            By using our website and/or purchasing our products or services, you acknowledge that you have read, understood, and agree to this Earnings Disclaimer. You accept that any earnings or income examples given are not typical and your results, if any, may vary significantly.
          </p>
          
          <p className="mb-6 font-bold uppercase">
            WE MAKE NO EARNINGS OR INCOME GUARANTEES OR PROJECTIONS OF ANY KIND.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} APEX Operations LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}