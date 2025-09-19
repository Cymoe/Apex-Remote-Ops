export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-carbon-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-charcoal rounded-xl shadow-xl p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-pure-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-light-gray mb-2">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-light-gray mb-8">
              Version: 2.0 | Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-400 mb-3">PRIVACY COMMITMENT</h3>
              <p className="text-blue-300">
                APEX Remote Operations LLC ("APEX," "Company," "we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy is a legally binding agreement that governs our collection, use, and protection of your 
                personal information. By using our services, you explicitly consent to the practices described herein.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">1. SCOPE AND CONSENT</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">1.1 Scope of Policy</h3>
              <p className="text-light-gray mb-4">
                This Privacy Policy applies to all information collected through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Our website at remoteops.ai and all subdomains</li>
                <li>Our AI-powered qualification and assessment systems</li>
                <li>Our educational platform and course delivery systems</li>
                <li>All communications with our team and automated systems</li>
                <li>Any other services or touchpoints we provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">1.2 Explicit Consent</h3>
              <p className="text-light-gray mb-4">
                By accessing our services, you provide explicit, informed consent to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Collection of personal and business information as detailed below</li>
                <li>Processing of data for qualification and educational purposes</li>
                <li>Storage of information for the periods specified</li>
                <li>Use of tracking technologies and analytics</li>
                <li>Recording of calls and video sessions for quality and legal purposes</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">2. INFORMATION WE COLLECT</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">2.1 Information You Provide Directly</h3>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-pure-white mb-3">Personal Identifiers</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Full legal name and any business aliases</li>
                  <li>Email addresses (personal and business)</li>
                  <li>Phone numbers (mobile and business)</li>
                  <li>Physical and mailing addresses</li>
                  <li>Government-issued ID information (when required for verification)</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Business Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Company name, structure, and registration details</li>
                  <li>Industry, niche, and service offerings</li>
                  <li>Current and historical revenue data</li>
                  <li>Business model and operational structure</li>
                  <li>Number of employees and contractors</li>
                  <li>Years in business and growth trajectory</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Financial Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Available capital and investment capacity</li>
                  <li>Credit card and banking information (for payments)</li>
                  <li>Financial goals and constraints</li>
                  <li>Budget flexibility indicators</li>
                  <li>Previous investments in business education</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Qualification Data</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray">
                  <li>All responses to our AI qualification system</li>
                  <li>Assessment scores and evaluation metrics</li>
                  <li>Communication patterns and engagement levels</li>
                  <li>Stated goals, challenges, and motivations</li>
                  <li>Time availability and commitment indicators</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.2 Information Collected Automatically</h3>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-pure-white mb-3">Technical Data</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>IP addresses and geolocation data</li>
                  <li>Browser type, version, and settings</li>
                  <li>Device information (type, OS, unique identifiers)</li>
                  <li>Network information and ISP details</li>
                  <li>Login timestamps and session duration</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Usage and Analytics Data</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Pages visited and content viewed</li>
                  <li>Click paths and navigation patterns</li>
                  <li>Video watch time and engagement metrics</li>
                  <li>Course progress and completion rates</li>
                  <li>Feature usage and interaction data</li>
                  <li>Error logs and performance metrics</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Behavioral Tracking</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray">
                  <li>Response times and patterns in conversations</li>
                  <li>Qualification stage progression</li>
                  <li>Objection patterns and concerns raised</li>
                  <li>Decision-making indicators</li>
                  <li>Engagement quality scores</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.3 Information from Third Parties</h3>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>OAuth providers (Google) for authentication</li>
                <li>Payment processors for transaction verification</li>
                <li>Business verification services for due diligence</li>
                <li>Credit bureaus (with your consent)</li>
                <li>Public records and business databases</li>
                <li>Social media platforms (publicly available information)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">3. HOW WE USE YOUR INFORMATION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">3.1 Primary Purposes</h3>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li><strong>Qualification Assessment:</strong> Evaluate fit for our exclusive program</li>
                <li><strong>Program Delivery:</strong> Provide access to educational content and resources</li>
                <li><strong>Personalization:</strong> Customize learning paths based on your profile</li>
                <li><strong>Communication:</strong> Send program updates, reminders, and support</li>
                <li><strong>Payment Processing:</strong> Handle transactions and financial records</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory and tax obligations</li>
                <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">3.2 Analytical Purposes</h3>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Improve our qualification algorithms and accuracy</li>
                <li>Enhance course content based on engagement data</li>
                <li>Optimize platform performance and user experience</li>
                <li>Develop new features and educational offerings</li>
                <li>Conduct aggregated market research</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">3.3 Legal Basis for Processing</h3>
              <p className="text-light-gray mb-4">
                We process your information based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li><strong>Consent:</strong> Your explicit agreement to this policy</li>
                <li><strong>Contract:</strong> Necessity for program delivery</li>
                <li><strong>Legitimate Interest:</strong> Business operations and improvements</li>
                <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">4. INFORMATION SHARING AND DISCLOSURE</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">4.1 No Sale of Personal Information</h3>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mb-6">
                <p className="text-green-400 font-semibold">
                  WE DO NOT AND WILL NEVER SELL, RENT, OR TRADE YOUR PERSONAL INFORMATION TO THIRD PARTIES FOR THEIR 
                  MARKETING PURPOSES.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.2 Authorized Sharing</h3>
              <p className="text-light-gray mb-4">
                We may share your information only with:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-pure-white mb-2">Service Providers (Data Processors)</h4>
                  <ul className="list-disc pl-6 space-y-2 text-light-gray">
                    <li>Supabase (database and authentication) - SOC 2 compliant</li>
                    <li>Google Cloud Platform (infrastructure) - ISO 27001 certified</li>
                    <li>Stripe/PayPal (payment processing) - PCI DSS compliant</li>
                    <li>SendGrid (email delivery) - GDPR compliant</li>
                  </ul>
                  <p className="text-sm text-yellow-300 mt-2">
                    All providers are bound by data processing agreements and cannot use your data for their own purposes.
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-pure-white mb-2">APEX Network Members</h4>
                  <p className="text-light-gray mb-2">
                    Only with your explicit opt-in consent, limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-gray">
                    <li>Name and business type for networking</li>
                    <li>General location (city/state only)</li>
                    <li>Areas of expertise for collaboration</li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-pure-white mb-2">Legal Disclosures</h4>
                  <p className="text-light-gray">
                    When required by law, court order, or to protect rights and safety, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-light-gray mt-2">
                    <li>Compliance with legal process</li>
                    <li>Protection of our rights and property</li>
                    <li>Prevention of fraud or security threats</li>
                    <li>Protection of public safety</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.3 Business Transfers</h3>
              <p className="text-light-gray">
                In the event of merger, acquisition, or sale of assets, your information may be transferred to the 
                successor entity. You will be notified of any such change and your rights under the new ownership.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">5. DATA SECURITY</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">5.1 Security Measures</h3>
              <p className="text-light-gray mb-4">
                We implement industry-leading security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS 1.3 encryption for data in transit</li>
                <li>Multi-factor authentication requirements</li>
                <li>Regular security audits and penetration testing</li>
                <li>Strict access controls and employee training</li>
                <li>24/7 security monitoring and incident response</li>
                <li>Secure data centers with physical security</li>
                <li>Regular automated backups with encryption</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">5.2 Data Breach Notification</h3>
              <p className="text-light-gray mb-4">
                In the event of a data breach that may compromise your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>We will notify you within 72 hours of discovery</li>
                <li>Provide details of what information was affected</li>
                <li>Outline steps we're taking to remedy the situation</li>
                <li>Offer guidance on protective measures you can take</li>
                <li>Provide credit monitoring if financial data was compromised</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">5.3 Your Security Responsibilities</h3>
              <p className="text-light-gray">
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities under your account. Report any suspected unauthorized access immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">6. DATA RETENTION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">6.1 Retention Periods</h3>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="py-2 text-pure-white">Data Type</th>
                      <th className="py-2 text-pure-white">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="text-light-gray">
                    <tr className="border-b border-gray-700">
                      <td className="py-3">APEX Member Data</td>
                      <td className="py-3">Indefinitely (lifetime membership)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3">Application Data (Rejected)</td>
                      <td className="py-3">2 years from decision date</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3">Financial Records</td>
                      <td className="py-3">7 years (tax compliance)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3">Communication Logs</td>
                      <td className="py-3">3 years from last interaction</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3">Technical Logs</td>
                      <td className="py-3">90 days (security purposes)</td>
                    </tr>
                    <tr>
                      <td className="py-3">Marketing Preferences</td>
                      <td className="py-3">Until opt-out + 30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.2 Deletion Procedures</h3>
              <p className="text-light-gray">
                Data is securely deleted using industry-standard methods including overwriting and cryptographic erasure. 
                Backup systems are purged within 30 days of primary deletion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">7. YOUR PRIVACY RIGHTS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">7.1 Universal Rights</h3>
              <p className="text-light-gray mb-4">
                Regardless of location, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request removal of your data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Restriction:</strong> Limit processing of your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Revoke previously given consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">7.2 How to Exercise Your Rights</h3>
              <p className="text-light-gray mb-4">
                To exercise any privacy right:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-light-gray mb-6">
                <li>Email privacy@remoteops.ai with your request</li>
                <li>Include "Privacy Rights Request" in the subject line</li>
                <li>Provide sufficient information to verify your identity</li>
                <li>Specify which rights you wish to exercise</li>
                <li>We will respond within 30 days (or as required by law)</li>
              </ol>

              <h3 className="text-xl font-semibold text-pure-white mb-3">7.3 Verification Process</h3>
              <p className="text-light-gray">
                To protect your privacy, we will verify your identity before processing any request. This may include 
                confirming information you've previously provided or requesting additional documentation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">8. JURISDICTION-SPECIFIC RIGHTS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">8.1 California Privacy Rights (CCPA/CPRA)</h3>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
                <p className="text-blue-400 font-semibold mb-3">For California Residents:</p>
                <ul className="list-disc pl-6 space-y-2 text-blue-300">
                  <li>Right to know what personal information is collected, used, shared, or sold</li>
                  <li>Right to delete personal information (with exceptions)</li>
                  <li>Right to opt-out of sale of personal information (we don't sell data)</li>
                  <li>Right to non-discrimination for exercising privacy rights</li>
                  <li>Right to correct inaccurate personal information</li>
                  <li>Right to limit use of sensitive personal information</li>
                </ul>
                <p className="text-blue-300 mt-4">
                  To exercise these rights: Call 1-800-APEX-OPS or email privacy@remoteops.ai
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.2 European Privacy Rights (GDPR)</h3>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
                <p className="text-purple-400 font-semibold mb-3">For EEA/UK Residents:</p>
                <ul className="list-disc pl-6 space-y-2 text-purple-300">
                  <li>All rights listed in Section 7.1 above</li>
                  <li>Right to lodge a complaint with supervisory authority</li>
                  <li>Right to withdraw consent at any time</li>
                  <li>Right to object to automated decision-making</li>
                  <li>Enhanced data portability rights</li>
                </ul>
                <p className="text-purple-300 mt-4">
                  Our EU Representative: [To be appointed]<br />
                  Our UK Representative: [To be appointed]
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.3 Other Jurisdictions</h3>
              <p className="text-light-gray">
                Residents of Nevada, Colorado, Connecticut, Utah, and Virginia have additional rights under state law. 
                Contact us for jurisdiction-specific information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">9. COOKIES AND TRACKING TECHNOLOGIES</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">9.1 Technologies We Use</h3>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Track usage patterns and performance</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                <li><strong>Pixel Tags:</strong> Track email opens and link clicks</li>
                <li><strong>Local Storage:</strong> Store preferences and session data</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">9.2 Managing Cookies</h3>
              <p className="text-light-gray mb-4">
                You can control cookies through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Browser settings (may impact functionality)</li>
                <li>Our cookie preference center (when available)</li>
                <li>Third-party opt-out tools (for analytics)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">10. INTERNATIONAL DATA TRANSFERS</h2>
              
              <p className="text-light-gray mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions where applicable</li>
                <li>Your explicit consent for transfers</li>
                <li>Technical and organizational security measures</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">11. CHILDREN'S PRIVACY</h2>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <p className="text-red-400 font-semibold">
                  Our services are strictly for individuals 18 years or older. We do not knowingly collect information 
                  from children. If we discover we have collected data from someone under 18, we will delete it immediately. 
                  Report any concerns to privacy@remoteops.ai.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">12. CHANGES TO THIS POLICY</h2>
              
              <p className="text-light-gray mb-4">
                We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we do:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>The "Last Updated" date will be revised</li>
                <li>Material changes will be notified via email</li>
                <li>We may require re-acceptance for significant changes</li>
                <li>Previous versions will be archived and available upon request</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">13. CONTACT INFORMATION</h2>
              
              <div className="bg-slate-gray/20 rounded-lg p-6 text-light-gray">
                <p className="font-semibold text-pure-white mb-4">APEX Remote Operations LLC</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-pure-white mb-2">Privacy Inquiries:</h4>
                    <p>Email: privacy@remoteops.ai</p>
                    <p>Phone: 1-800-APEX-OPS</p>
                    <p>Response Time: Within 30 days</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-pure-white mb-2">Data Protection Officer:</h4>
                    <p>Email: dpo@remoteops.ai</p>
                    <p>Mail: [Address to be provided]</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h4 className="font-semibold text-pure-white mb-2">Supervisory Authorities:</h4>
                  <p className="text-sm">
                    You have the right to lodge a complaint with your local data protection authority. 
                    We will cooperate with any investigation.
                  </p>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-slate-gray">
              <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-3">YOUR PRIVACY IS OUR PRIORITY</h3>
                <p className="text-green-300">
                  This Privacy Policy reflects our commitment to protecting your personal information with the highest 
                  standards of security and transparency. If you have any questions or concerns, please don't hesitate 
                  to contact us. Your trust is essential to our relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}