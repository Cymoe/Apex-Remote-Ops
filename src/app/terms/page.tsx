export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-carbon-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-charcoal rounded-xl shadow-xl p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-pure-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-light-gray mb-2">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-light-gray mb-8">
              Version: 2.0 | Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">IMPORTANT LEGAL NOTICE</h3>
              <p className="text-yellow-300 font-semibold mb-3">
                THESE TERMS CONTAIN A BINDING ARBITRATION AGREEMENT AND CLASS ACTION WAIVER. 
                THEY AFFECT YOUR LEGAL RIGHTS. PLEASE READ CAREFULLY.
              </p>
              <p className="text-yellow-300">
                By clicking "I Agree," creating an account, or accessing our services, you acknowledge that you have read, 
                understood, and agree to be legally bound by these Terms. If you do not agree, you must immediately 
                cease use of our services.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">1. AGREEMENT TO TERMS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">1.1 Binding Agreement</h3>
              <p className="text-light-gray mb-4">
                These Terms of Service ("Agreement") constitute a legally binding agreement made between you, 
                whether personally or on behalf of an entity ("you") and APEX Remote Operations LLC, a Texas 
                limited liability company ("Company," "we," "us," or "our"), concerning your access to and use 
                of the remoteops.ai website and all associated services (collectively, the "Services").
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">1.2 Electronic Acceptance</h3>
              <p className="text-light-gray mb-4">
                You agree that by accessing the Services, you have read, understood, and agree to be bound by all 
                of these Terms. Your continued use of the Services constitutes ongoing acceptance. We will track 
                and log your acceptance, including IP address, timestamp, and user identification.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">1.3 Supplemental Terms</h3>
              <p className="text-light-gray">
                These Terms incorporate by reference our Privacy Policy and any executed Non-Disclosure Agreement. 
                In case of conflict, the following order of precedence applies: (1) executed NDA, (2) these Terms, 
                (3) Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">2. ELIGIBILITY AND VERIFICATION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">2.1 Age and Capacity</h3>
              <p className="text-light-gray mb-4">
                You represent and warrant that you are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                <li>At least 18 years of age</li>
                <li>Have full legal capacity and authority to enter into binding contracts</li>
                <li>Not located in any jurisdiction where the Services are prohibited</li>
                <li>Not listed on any U.S. government list of prohibited or restricted parties</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">2.2 Verification and Background Checks</h3>
              <p className="text-light-gray">
                We reserve the right to conduct identity verification, credit checks, and background investigations. 
                By applying, you consent to such investigations and agree to provide additional documentation upon request.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">3. THE APEX PROGRAM - SPECIFIC TERMS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">3.1 Program Description and Limitations</h3>
              <p className="text-light-gray mb-4">
                The APEX Program is a premium business education program with the following characteristics:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Limited to seven (7) participants annually</li>
                <li>Requires five-figure investment (specific amount disclosed post-NDA)</li>
                <li>Minimum 12-week commitment with 40+ hours per week expected</li>
                <li>Access to proprietary APEX Protocol™ and methodologies</li>
                <li>Lifetime membership upon successful completion</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">3.2 Application and Selection Process</h3>
              <p className="text-light-gray mb-4">
                The application process is governed by the following binding procedures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Initial AI-powered assessment (responses are recorded and binding)</li>
                <li>72-hour review period (we may extend at our discretion)</li>
                <li>Strategic assessment call (recorded for quality and legal purposes)</li>
                <li>Mandatory NDA execution before methodology disclosure</li>
                <li>Final acceptance solely at Company's discretion</li>
                <li>No right to appeal rejection decisions</li>
              </ul>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
                <p className="text-blue-400 font-semibold">
                  LEGAL NOTICE: All representations made during the application process are material to acceptance. 
                  Any misrepresentation is grounds for immediate termination without refund.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">4. PAYMENT TERMS AND CANCELLATION POLICY</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">4.1 Investment and Payment</h3>
              <p className="text-light-gray mb-4">
                Upon acceptance into the APEX Program:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Full payment or first installment due within 48 hours of acceptance</li>
                <li>Late payments subject to 1.5% monthly interest (18% APR)</li>
                <li>Returned payments incur $250 processing fee</li>
                <li>We may report delinquencies to credit agencies</li>
                <li>Payment plans require automatic ACH/credit card authorization</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.2 Cancellation and Refund Policy</h3>
              <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-6 mb-6">
                <h4 className="text-red-400 font-bold mb-3">CANCELLATION AND REFUND POLICY - LEGALLY BINDING</h4>
                <p className="text-red-300 mb-3">
                  Due to the immediate delivery of proprietary intellectual property and trade secrets upon enrollment, 
                  the following policy applies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-red-300 mb-3">
                  <li>NO REFUNDS after NDA execution and methodology disclosure</li>
                  <li>NO REFUNDS for "change of mind" or "buyer's remorse"</li>
                  <li>NO REFUNDS for inability to implement strategies</li>
                  <li>NO REFUNDS for personal or business circumstances</li>
                  <li>Partial refunds ONLY if we materially breach our obligations</li>
                </ul>
                <p className="text-red-400 font-bold">
                  BY ENROLLING, YOU WAIVE ALL RIGHTS TO REFUNDS EXCEPT AS REQUIRED BY APPLICABLE LAW.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">4.3 Acknowledgment of Investment Risk</h3>
              <p className="text-light-gray">
                You acknowledge that business education involves risk, results vary, and success depends on numerous 
                factors outside our control. You are sophisticasted enough to evaluate these risks and make an informed decision.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">5. INTELLECTUAL PROPERTY RIGHTS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">5.1 Company IP Ownership</h3>
              <p className="text-light-gray mb-4">
                The Company owns all right, title, and interest in and to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>The APEX Protocol™ and all methodologies</li>
                <li>All course materials, videos, templates, and tools</li>
                <li>Trademarks, service marks, and trade dress</li>
                <li>Compilation and arrangement of content</li>
                <li>Software, code, and technical infrastructure</li>
                <li>Trade secrets and confidential information</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">5.2 Limited License Grant</h3>
              <p className="text-light-gray mb-4">
                Subject to compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, 
                revocable license to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Access course materials for personal business use only</li>
                <li>Implement strategies in your own business operations</li>
                <li>Take notes for personal reference</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">5.3 Prohibited Uses - Liquidated Damages</h3>
              <p className="text-light-gray mb-4">
                The following uses are strictly prohibited and subject to liquidated damages of $50,000 per violation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Sharing login credentials or course access</li>
                <li>Recording, screenshotting, or reproducing materials</li>
                <li>Creating derivative works or competing programs</li>
                <li>Reverse engineering methodologies</li>
                <li>Disclosing strategies to non-members</li>
                <li>Using materials for consulting or coaching others</li>
              </ul>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                <p className="text-purple-400">
                  You acknowledge that these liquidated damages are reasonable given the difficulty in calculating actual 
                  damages from IP theft and that they are not a penalty.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">6. CONFIDENTIALITY OBLIGATIONS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">6.1 Definition of Confidential Information</h3>
              <p className="text-light-gray mb-4">
                "Confidential Information" includes all non-public information disclosed through the Services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>APEX methodologies, strategies, and protocols</li>
                <li>Member identities and business information</li>
                <li>Financial models and pricing strategies</li>
                <li>Vendor relationships and negotiations tactics</li>
                <li>Marketing strategies and conversion metrics</li>
                <li>Any information marked or identified as confidential</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.2 Obligations</h3>
              <p className="text-light-gray mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Maintain strict confidentiality indefinitely</li>
                <li>Use Confidential Information solely for authorized purposes</li>
                <li>Implement reasonable security measures</li>
                <li>Immediately notify us of any suspected breach</li>
                <li>Return or destroy information upon request</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">6.3 Injunctive Relief</h3>
              <p className="text-light-gray">
                You acknowledge that breach of confidentiality would cause irreparable harm for which monetary damages 
                are inadequate. We are entitled to seek injunctive relief without posting bond, in addition to all 
                other remedies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">7. DISCLAIMERS AND LIMITATIONS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">7.1 No Guarantee of Results</h3>
              <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-lg p-6 mb-6">
                <p className="text-yellow-400 font-bold mb-3">
                  EARNINGS AND INCOME DISCLAIMER - FTC COMPLIANCE
                </p>
                <p className="text-yellow-300 mb-3">
                  WE MAKE NO EARNINGS CLAIMS, EFFORTS OR GUARANTEES CONCERNING YOUR SUCCESS. THE APEX PROGRAM 
                  PROVIDES EDUCATION AND STRATEGIES ONLY. ANY EARNINGS OR INCOME EXAMPLES ARE NOT TYPICAL AND 
                  YOUR RESULTS WILL VARY BASED ON NUMEROUS FACTORS INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-yellow-300">
                  <li>Your background, experience, and work ethic</li>
                  <li>Market conditions and competition</li>
                  <li>Your financial resources and business acumen</li>
                  <li>Economic factors beyond anyone's control</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">7.2 AS-IS Disclaimer</h3>
              <p className="text-light-gray mb-6">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">7.3 Professional Disclaimer</h3>
              <p className="text-light-gray">
                NOTHING IN THE APEX PROGRAM CONSTITUTES LEGAL, FINANCIAL, TAX, OR OTHER PROFESSIONAL ADVICE. 
                YOU MUST CONSULT QUALIFIED PROFESSIONALS FOR ADVICE SPECIFIC TO YOUR SITUATION.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">8. LIMITATION OF LIABILITY</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">8.1 Liability Cap</h3>
              <p className="text-light-gray mb-6">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY'S AGGREGATE LIABILITY ARISING OUT 
                OF OR RELATED TO THESE TERMS EXCEED THE GREATER OF (A) $100 OR (B) THE AMOUNT YOU PAID TO COMPANY 
                IN THE SIX MONTHS PRECEDING THE CLAIM.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.2 Exclusion of Damages</h3>
              <p className="text-light-gray mb-6">
                IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, 
                OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST REVENUE, LOST BUSINESS, OR 
                LOST DATA, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">8.3 Essential Purpose</h3>
              <p className="text-light-gray">
                THESE LIMITATIONS APPLY EVEN IF ANY REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">9. INDEMNIFICATION</h2>
              
              <p className="text-light-gray mb-4">
                You agree to defend, indemnify, and hold harmless Company and its officers, directors, employees, 
                contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, 
                judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising 
                out of or relating to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                <li>Your violation of these Terms</li>
                <li>Your use or misuse of the Services</li>
                <li>Your violation of any third-party rights</li>
                <li>Your violation of any applicable laws</li>
                <li>Any misrepresentation by you</li>
                <li>Your business operations or implementation of strategies</li>
              </ul>
              <p className="text-light-gray">
                We reserve the right to assume exclusive defense and control of any matter subject to indemnification, 
                and you agree to cooperate with our defense.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">10. DISPUTE RESOLUTION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">10.1 Mandatory Arbitration</h3>
              <div className="bg-blue-900/20 border-2 border-blue-500/50 rounded-lg p-6 mb-6">
                <p className="text-blue-400 font-bold mb-3">
                  PLEASE READ CAREFULLY - THIS AFFECTS YOUR LEGAL RIGHTS
                </p>
                <p className="text-blue-300 mb-3">
                  Any dispute arising out of or relating to these Terms or the Services shall be resolved through 
                  binding arbitration in accordance with the JAMS Streamlined Arbitration Rules. The arbitration shall be:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-blue-300">
                  <li>Conducted in Austin, Texas (or virtually at arbitrator's discretion)</li>
                  <li>Governed by the Federal Arbitration Act</li>
                  <li>Conducted in English</li>
                  <li>Decided by a single arbitrator</li>
                  <li>Subject to limited discovery as determined by the arbitrator</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-pure-white mb-3">10.2 Class Action Waiver</h3>
              <p className="text-light-gray mb-6 font-bold">
                YOU AND COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL 
                CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">10.3 Exception - Small Claims Court</h3>
              <p className="text-light-gray mb-6">
                Either party may bring a suit in small claims court for disputes or claims within that court's jurisdiction.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">10.4 30-Day Right to Opt Out</h3>
              <p className="text-light-gray">
                You have the right to opt out of arbitration by sending written notice to legal@remoteops.ai within 
                30 days of first accepting these Terms. Opting out will not affect any other provisions of these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">11. TERMINATION</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">11.1 Termination by Company</h3>
              <p className="text-light-gray mb-4">
                We may terminate your access immediately, without notice, for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Breach of any provision of these Terms</li>
                <li>Violation of intellectual property rights</li>
                <li>Sharing of confidential information</li>
                <li>Non-payment or payment default</li>
                <li>Misrepresentation or fraud</li>
                <li>Conduct harmful to other members or Company reputation</li>
                <li>Any reason at our sole discretion with 30 days notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">11.2 Effect of Termination</h3>
              <p className="text-light-gray mb-4">
                Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-6">
                <li>Access to Services ceases immediately</li>
                <li>No refunds will be provided</li>
                <li>Confidentiality obligations survive</li>
                <li>You must destroy all Company materials</li>
                <li>Accrued rights and obligations survive</li>
              </ul>

              <h3 className="text-xl font-semibold text-pure-white mb-3">11.3 Survival</h3>
              <p className="text-light-gray">
                Sections 4 (Payment), 5 (IP Rights), 6 (Confidentiality), 7 (Disclaimers), 8 (Limitations), 
                9 (Indemnification), 10 (Disputes), and 13 (General) survive termination indefinitely.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">12. MODIFICATIONS</h2>
              
              <p className="text-light-gray mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray mb-4">
                <li>Posting the updated Terms with a new version number and date</li>
                <li>Sending notice to your registered email address</li>
                <li>Requiring acknowledgment upon next login</li>
              </ul>
              <p className="text-light-gray">
                Your continued use after notice constitutes acceptance. If you disagree with changes, your sole remedy 
                is to discontinue use of the Services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">13. GENERAL PROVISIONS</h2>
              
              <h3 className="text-xl font-semibold text-pure-white mb-3">13.1 Governing Law</h3>
              <p className="text-light-gray mb-4">
                These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. 
                The United Nations Convention on Contracts for the International Sale of Goods does not apply.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.2 Severability</h3>
              <p className="text-light-gray mb-4">
                If any provision is found unenforceable, the remainder of these Terms will continue in full force and effect, 
                and an enforceable provision will be substituted reflecting our intent as closely as possible.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.3 Waiver</h3>
              <p className="text-light-gray mb-4">
                No waiver of any term will be deemed a further or continuing waiver of such term or any other term. 
                Our failure to assert any right or provision shall not constitute a waiver.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.4 Force Majeure</h3>
              <p className="text-light-gray mb-4">
                Neither party shall be liable for any failure or delay in performance due to circumstances beyond its 
                reasonable control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism, 
                riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages 
                of transportation facilities, fuel, energy, labor, or materials.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.5 Entire Agreement</h3>
              <p className="text-light-gray mb-4">
                These Terms, together with the Privacy Policy and any executed NDA, constitute the entire agreement 
                between you and Company regarding the Services and supersede all prior agreements and understandings.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.6 Assignment</h3>
              <p className="text-light-gray mb-4">
                You may not assign or transfer these Terms without our prior written consent. We may assign these 
                Terms without restriction. Any attempted assignment in violation will be null and void.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.7 Electronic Communications</h3>
              <p className="text-light-gray mb-4">
                You consent to receive electronic communications from us. You agree that all agreements, notices, 
                disclosures, and other communications satisfy any legal requirement that such communications be in writing.
              </p>

              <h3 className="text-xl font-semibold text-pure-white mb-3">13.8 Statute of Limitations</h3>
              <p className="text-light-gray">
                You agree that any claim arising out of or related to these Terms or the Services must be filed within 
                one (1) year after such claim arose, or be forever barred.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-pure-white mb-4">14. CONTACT INFORMATION</h2>
              <div className="bg-slate-gray/20 rounded-lg p-6 text-light-gray">
                <p className="font-semibold text-pure-white mb-2">APEX Remote Operations LLC</p>
                <p>Legal Department</p>
                <p>Email: legal@remoteops.ai</p>
                <p>Phone: 1-800-APEX-OPS</p>
                <p>Mailing Address: [To be provided]</p>
                <p className="mt-4">
                  For support inquiries: support@remoteops.ai
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-slate-gray">
              <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-3">FINAL ACKNOWLEDGMENT</h3>
                <p className="text-green-300 mb-3">
                  BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-green-300">
                  <li>You have read and understood these Terms in their entirety</li>
                  <li>You have had the opportunity to seek independent legal counsel</li>
                  <li>You are entering into a legally binding agreement</li>
                  <li>You have the authority to accept these Terms</li>
                  <li>You understand the financial commitment and refund policy</li>
                  <li>You accept the arbitration agreement and class action waiver</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}