export default function NDAPage() {
  return (
    <div className="min-h-screen bg-carbon-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-charcoal rounded-xl shadow-xl p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-pure-white mb-8">Non-Disclosure Agreement</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-light-gray mb-2">
              Effective Date: Upon Electronic Acceptance
            </p>
            <p className="text-light-gray mb-8">
              Version: 2.0 | Document ID: NDA-APEX-2024-001
            </p>

            <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-red-400 mb-3">LEGALLY BINDING AGREEMENT</h3>
              <p className="text-red-300 font-semibold mb-3">
                THIS IS A LEGAL CONTRACT. BY CLICKING "I AGREE" OR PROCEEDING WITH THE APEX QUALIFICATION PROCESS, 
                YOU ARE ENTERING INTO A BINDING NON-DISCLOSURE AGREEMENT.
              </p>
              <p className="text-red-300">
                This Agreement protects highly valuable trade secrets and proprietary methodologies. Breach of this 
                Agreement will result in immediate legal action and substantial monetary damages.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">RECITALS</h2>
              <p className="text-light-gray mb-4">
                This Non-Disclosure Agreement ("Agreement") is entered into as of the date of electronic acceptance 
                between APEX Remote Operations LLC, a Texas limited liability company ("Company" or "Disclosing Party"), 
                and the individual or entity accepting these terms ("Recipient" or "You").
              </p>
              <p className="text-light-gray mb-4">
                WHEREAS, Company has developed proprietary business methodologies, strategies, and systems known as 
                the "APEX Protocol" for building location-independent contracting businesses;
              </p>
              <p className="text-light-gray mb-4">
                WHEREAS, Company desires to disclose certain Confidential Information to Recipient in connection with 
                evaluating Recipient's potential participation in the APEX Program;
              </p>
              <p className="text-light-gray mb-4">
                WHEREAS, Recipient desires to receive such Confidential Information subject to the terms and conditions 
                of this Agreement;
              </p>
              <p className="text-light-gray">
                NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other 
                good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties 
                agree as follows:
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">1. DEFINITION OF CONFIDENTIAL INFORMATION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">1.1 Scope of Confidential Information</h3>
              <p className="text-light-gray mb-4">
                "Confidential Information" means all non-public, proprietary, or confidential information disclosed by 
                Company to Recipient, whether orally, in writing, or in any other form, including but not limited to:
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-pure-white mb-3">Business Methodologies & Strategies</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>The complete APEX Protocol™ and all component strategies</li>
                  <li>Remote operations frameworks and systems</li>
                  <li>Client acquisition methodologies and scripts</li>
                  <li>Pricing strategies and financial models</li>
                  <li>Vendor management and negotiation tactics</li>
                  <li>Scaling and market expansion strategies</li>
                  <li>Exit planning and business sale methodologies</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Technical & Operational Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Software configurations and technology stacks</li>
                  <li>Automation workflows and processes</li>
                  <li>Marketing funnels and conversion strategies</li>
                  <li>Operational templates and documentation</li>
                  <li>Key performance indicators and metrics</li>
                  <li>Quality control and monitoring systems</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Network & Relationship Information</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                  <li>Identity of APEX members and their businesses</li>
                  <li>Supplier and vendor relationships</li>
                  <li>Strategic partnership opportunities</li>
                  <li>Member success stories and case studies</li>
                  <li>Internal communications and discussions</li>
                </ul>

                <h4 className="text-lg font-semibold text-pure-white mb-3">Financial & Performance Data</h4>
                <ul className="list-disc pl-6 space-y-2 text-light-gray">
                  <li>Revenue models and projections</li>
                  <li>Cost structures and margins</li>
                  <li>Investment strategies and returns</li>
                  <li>Member performance data</li>
                  <li>Market analysis and opportunities</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">1.2 Form of Disclosure</h3>
              <p className="text-light-gray mb-4">
                Confidential Information includes information disclosed in any form or medium, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Written documents and electronic files</li>
                <li>Verbal communications and presentations</li>
                <li>Video content and recordings</li>
                <li>Visual demonstrations and whiteboard sessions</li>
                <li>Access to systems, platforms, or tools</li>
                <li>Observation of methodologies in practice</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">1.3 Presumption of Confidentiality</h3>
              <p className="text-light-gray">
                All information disclosed by Company shall be presumed Confidential Information unless explicitly marked 
                as "Public" or "Non-Confidential" in writing by an authorized Company representative.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">2. OBLIGATIONS OF RECIPIENT</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">2.1 Non-Disclosure Obligations</h3>
              <p className="text-light-gray mb-4">
                Recipient agrees to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Hold all Confidential Information in strict confidence</li>
                <li>Not disclose Confidential Information to any third party</li>
                <li>Not use Confidential Information except for evaluation purposes</li>
                <li>Protect Confidential Information with the same degree of care used for own confidential information, 
                    but in no event less than reasonable care</li>
                <li>Immediately notify Company of any unauthorized disclosure or use</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.2 Restricted Use</h3>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
                <p className="text-yellow-400 font-semibold">
                  Recipient may use Confidential Information SOLELY for the purpose of evaluating potential participation 
                  in the APEX Program. Any other use, including implementation in Recipient's business without enrollment, 
                  is strictly prohibited and will be considered theft of trade secrets.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.3 No Reverse Engineering</h3>
              <p className="text-light-gray mb-4">
                Recipient shall not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Reverse engineer, deconstruct, or analyze the methodologies</li>
                <li>Create derivative works based on Confidential Information</li>
                <li>Use Confidential Information to develop competing products or services</li>
                <li>Attempt to recreate the APEX Protocol or any component thereof</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.4 Limited Disclosure</h3>
              <p className="text-light-gray">
                Recipient may disclose Confidential Information only to employees, advisors, or consultants who 
                (i) have a legitimate need to know, (ii) have been informed of the confidential nature, and 
                (iii) are bound by confidentiality obligations at least as restrictive as this Agreement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">3. EXCLUSIONS</h2>
              
              <p className="text-light-gray mb-4">
                Confidential Information does not include information that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                <li>Was publicly known at the time of disclosure through no breach by Recipient</li>
                <li>Becomes publicly known after disclosure through no breach by Recipient</li>
                <li>Was rightfully known by Recipient prior to disclosure without confidentiality obligation</li>
                <li>Is independently developed by Recipient without use of Confidential Information</li>
                <li>Is rightfully received from a third party without confidentiality obligation</li>
              </ul>
              <p className="text-light-gray">
                The burden of proving any exclusion rests entirely with Recipient and requires clear and convincing evidence.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">4. TERM AND TERMINATION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">4.1 Term</h3>
              <p className="text-light-gray mb-6">
                This Agreement shall commence upon acceptance and continue in perpetuity. The confidentiality obligations 
                shall survive any termination of discussions between the parties.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.2 Return of Information</h3>
              <p className="text-light-gray mb-4">
                Upon Company's request or termination of discussions, Recipient shall immediately:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Return all Confidential Information in tangible form</li>
                <li>Delete all electronic copies of Confidential Information</li>
                <li>Destroy all notes, analyses, or derivatives containing Confidential Information</li>
                <li>Provide written certification of compliance with this section</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.3 Survival</h3>
              <p className="text-light-gray">
                The obligations of confidentiality shall survive indefinitely, regardless of whether Recipient 
                enrolls in the APEX Program or the parties enter into any other agreement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">5. INTELLECTUAL PROPERTY</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">5.1 No License or Transfer</h3>
              <p className="text-light-gray mb-6">
                Nothing in this Agreement grants Recipient any license, right, title, or interest in any Confidential 
                Information, intellectual property, trademark, or trade secret of Company. All rights remain exclusively 
                with Company.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">5.2 Feedback and Improvements</h3>
              <p className="text-light-gray">
                Any feedback, suggestions, or improvements provided by Recipient regarding the Confidential Information 
                shall become the exclusive property of Company without compensation to Recipient.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">6. REMEDIES FOR BREACH</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">6.1 Irreparable Harm</h3>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
                <p className="text-purple-400 font-semibold">
                  RECIPIENT ACKNOWLEDGES that disclosure or misuse of Confidential Information would cause Company 
                  irreparable harm for which monetary damages would be an inadequate remedy. Company shall be entitled 
                  to seek injunctive relief without the necessity of posting bond.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.2 Liquidated Damages</h3>
              <p className="text-light-gray mb-4">
                In addition to injunctive relief, breach of this Agreement shall result in liquidated damages of:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li><strong>$100,000</strong> for any unauthorized disclosure of Confidential Information</li>
                <li><strong>$250,000</strong> for use of Confidential Information in Recipient's business without enrollment</li>
                <li><strong>$500,000</strong> for creation of competing products or services using Confidential Information</li>
                <li><strong>$1,000,000</strong> for disclosure of the complete APEX Protocol to third parties</li>
              </ul>
              <p className="text-light-gray mb-6">
                These amounts represent a reasonable estimate of Company's damages, which would be difficult to calculate 
                precisely. They are not penalties but rather agreed compensation for breach.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.3 Attorneys' Fees</h3>
              <p className="text-light-gray mb-6">
                In any action to enforce this Agreement, the prevailing party shall be entitled to recover reasonable 
                attorneys' fees, costs, and expenses, including expert witness fees and costs of investigation.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.4 Criminal Prosecution</h3>
              <p className="text-light-gray">
                Violation of this Agreement may constitute theft of trade secrets under federal and state law, 
                including the Defend Trade Secrets Act, subjecting Recipient to criminal prosecution.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">7. REPRESENTATIONS AND WARRANTIES</h2>
              
              <p className="text-light-gray mb-4">
                Recipient represents and warrants that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Recipient has full legal capacity and authority to enter this Agreement</li>
                <li>This Agreement does not conflict with any other obligation of Recipient</li>
                <li>Recipient is not bound by any agreement restricting receipt of Confidential Information</li>
                <li>Recipient will not use Confidential Information to violate any law or regulation</li>
                <li>Recipient has read, understood, and agrees to be bound by this Agreement</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">8. GENERAL PROVISIONS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">8.1 Governing Law and Venue</h3>
              <p className="text-light-gray mb-6">
                This Agreement shall be governed by the laws of the State of Texas, without regard to conflict of law 
                principles. Any action relating to this Agreement shall be brought exclusively in the state or federal 
                courts located in Travis County, Texas, and Recipient consents to personal jurisdiction therein.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.2 Entire Agreement</h3>
              <p className="text-light-gray mb-6">
                This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof 
                and supersedes all prior or contemporaneous agreements, whether written or oral.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.3 Severability</h3>
              <p className="text-light-gray mb-6">
                If any provision is found unenforceable, the remainder shall continue in full force and effect, 
                and the unenforceable provision shall be modified to the minimum extent necessary to make it enforceable.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.4 No Waiver</h3>
              <p className="text-light-gray mb-6">
                No waiver of any breach shall constitute a waiver of any subsequent breach. Company's failure to 
                enforce any provision shall not constitute a waiver of its right to do so later.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.5 Assignment</h3>
              <p className="text-light-gray mb-6">
                Recipient may not assign this Agreement without Company's prior written consent. Company may freely 
                assign this Agreement. Any attempted assignment in violation shall be null and void.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.6 Counterparts and Electronic Signature</h3>
              <p className="text-light-gray">
                This Agreement may be executed electronically and in counterparts. Electronic acceptance, including 
                clicking "I Agree" or similar, constitutes a valid and binding signature.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">9. ACKNOWLEDGMENT AND ACCEPTANCE</h2>
              
              <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-3">BY ACCEPTING THIS AGREEMENT:</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-300">
                  <li>You acknowledge that you have read and understood all terms</li>
                  <li>You agree to be legally bound by this Agreement</li>
                  <li>You understand the serious legal consequences of breach</li>
                  <li>You acknowledge that Company's methodologies are valuable trade secrets</li>
                  <li>You agree that the liquidated damages are reasonable and not a penalty</li>
                  <li>You waive any claim that the restrictions are unreasonable</li>
                  <li>You have had the opportunity to seek independent legal counsel</li>
                </ul>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-slate-gray">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-pure-white mb-4">ELECTRONIC SIGNATURE</h3>
                <p className="text-light-gray mb-4">
                  By clicking "I Agree" or proceeding with the qualification process, you are providing your electronic 
                  signature and agreeing to be bound by this Non-Disclosure Agreement.
                </p>
                <div className="grid gap-4 text-sm text-medium-gray">
                  <p>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>Time: {new Date().toLocaleTimeString('en-US')}</p>
                  <p>IP Address: [Will be logged upon acceptance]</p>
                  <p>User Agent: [Will be logged upon acceptance]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}