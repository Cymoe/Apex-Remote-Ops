import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PitchDeckData {
  companyName: string;
  tagline: string;
  yearFounded: string;
  headquarters: string;
  website: string;
  businessDescription: string;
  uniqueValue: string;
  keyAchievements: string[];
  currentRevenue: string;
  lastYearRevenue: string;
  twoYearsAgoRevenue: string;
  currentProfit: string;
  lastYearProfit: string;
  twoYearsAgoProfit: string;
  profitMargin: string;
  recurringRevenuePercent: string;
  marketsServed: string[];
  totalCustomers: string;
  averageJobSize: string;
  customerRetentionRate: string;
  topCustomerPercent: string;
  teamSize: string;
  subcontractors: string;
  techStack: string[];
  licensedStates: string[];
  growthOpportunities: string[];
  competitiveAdvantages: string[];
  askingPrice: string;
  reasonForSale: string;
  transitionPeriod: string;
  financing: string;
}

export const generatePitchDeckFromHTML = async (data: PitchDeckData) => {
  // Create a hidden container for rendering
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-9999px';
  container.style.width = '1200px';
  container.style.backgroundColor = '#ffffff';
  document.body.appendChild(container);

  try {
    // Generate HTML content
    container.innerHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <!-- Cover Page -->
        <div style="height: 1800px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: white; padding: 80px; page-break-after: always;">
          <h1 style="font-size: 72px; font-weight: 700; margin-bottom: 40px; text-align: center; letter-spacing: -2px;">
            ${data.companyName || 'Company Name'}
          </h1>
          <p style="font-size: 32px; font-weight: 300; margin-bottom: 80px; text-align: center; opacity: 0.9;">
            ${data.tagline || 'Company Tagline'}
          </p>
          <div style="width: 120px; height: 6px; background-color: #60a5fa; margin: 40px 0;"></div>
          <p style="font-size: 24px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px; opacity: 0.8;">
            Investment Opportunity
          </p>
          <p style="font-size: 20px; opacity: 0.7;">
            Confidential Information Memorandum
          </p>
          <p style="font-size: 18px; margin-top: 120px; opacity: 0.6;">
            ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
        </div>

        <!-- Executive Summary -->
        <div style="padding: 80px; min-height: 1800px; page-break-after: always;">
          <div style="border-left: 6px solid #2563eb; padding-left: 40px; margin-bottom: 60px;">
            <h2 style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 16px;">Executive Summary</h2>
            <p style="font-size: 20px; color: #6b7280;">Investment Highlights</p>
          </div>

          <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 40px; margin-bottom: 60px; border-radius: 8px;">
            <h3 style="font-size: 24px; color: #111827; margin-bottom: 20px;">About ${data.companyName}</h3>
            <p style="font-size: 18px; line-height: 1.8; color: #374151;">
              ${data.businessDescription || 'A leading home service company with proven systems and strong market presence.'}
            </p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px;">
            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background-color: #2563eb;"></div>
              <p style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 8px;">${data.currentRevenue || '$X.XM'}</p>
              <p style="font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Annual Revenue</p>
            </div>
            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background-color: #10b981;"></div>
              <p style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 8px;">${data.profitMargin || 'XX%'}</p>
              <p style="font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Profit Margin</p>
            </div>
            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background-color: #f59e0b;"></div>
              <p style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 8px;">${data.totalCustomers || 'XXX'}</p>
              <p style="font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Active Customers</p>
            </div>
            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 6px; background-color: #8b5cf6;"></div>
              <p style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 8px;">${data.customerRetentionRate || 'XX%'}</p>
              <p style="font-size: 16px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Retention Rate</p>
            </div>
          </div>

          <div>
            <h3 style="font-size: 28px; color: #111827; margin-bottom: 24px;">Key Investment Highlights</h3>
            ${data.keyAchievements.filter(a => a).map(achievement => `
              <div style="display: flex; align-items: start; margin-bottom: 20px;">
                <div style="width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                  <span style="color: white; font-size: 20px;">✓</span>
                </div>
                <p style="font-size: 18px; line-height: 1.8; color: #374151; margin: 0;">${achievement}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Financial Performance -->
        <div style="padding: 80px; min-height: 1800px; page-break-after: always;">
          <div style="border-left: 6px solid #2563eb; padding-left: 40px; margin-bottom: 60px;">
            <h2 style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 16px;">Financial Performance</h2>
            <p style="font-size: 20px; color: #6b7280;">Historical Growth & Profitability</p>
          </div>

          <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; margin-bottom: 60px;">
            <h3 style="font-size: 24px; color: #111827; margin-bottom: 30px;">Revenue Growth Trend</h3>
            <div style="display: flex; align-items: flex-end; height: 300px; justify-content: space-around;">
              ${[
                { year: '2 Years Ago', value: data.twoYearsAgoRevenue },
                { year: 'Last Year', value: data.lastYearRevenue },
                { year: 'Current', value: data.currentRevenue }
              ].map((item, index) => {
                const maxHeight = 250;
                const height = index === 0 ? maxHeight * 0.6 : index === 1 ? maxHeight * 0.8 : maxHeight;
                return `
                  <div style="text-align: center;">
                    <div style="width: 120px; height: ${height}px; background-color: #2563eb; border-radius: 8px 8px 0 0; margin-bottom: 10px; position: relative;">
                      <span style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); font-weight: 700; font-size: 20px; color: #111827;">
                        ${item.value || 'N/A'}
                      </span>
                    </div>
                    <p style="color: #6b7280; font-size: 16px;">${item.year}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div style="margin-bottom: 60px;">
            <h3 style="font-size: 28px; color: #111827; margin-bottom: 30px;">Financial Metrics</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 20px; text-align: left; font-size: 16px; color: #111827; border: 1px solid #e5e7eb;">Metric</th>
                  <th style="padding: 20px; text-align: left; font-size: 16px; color: #111827; border: 1px solid #e5e7eb;">Current Year</th>
                  <th style="padding: 20px; text-align: left; font-size: 16px; color: #111827; border: 1px solid #e5e7eb;">Last Year</th>
                  <th style="padding: 20px; text-align: left; font-size: 16px; color: #111827; border: 1px solid #e5e7eb;">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 20px; font-size: 16px; font-weight: 600; color: #111827; border: 1px solid #e5e7eb;">Revenue</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">${data.currentRevenue || 'TBD'}</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">${data.lastYearRevenue || 'TBD'}</td>
                  <td style="padding: 20px; font-size: 16px; color: #10b981; font-weight: 600; border: 1px solid #e5e7eb;">+${
                    data.currentRevenue && data.lastYearRevenue 
                      ? Math.round(((parseFloat(data.currentRevenue.replace(/[^0-9.-]+/g, '')) - 
                          parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g, ''))) / 
                          parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g, ''))) * 100)
                      : 0
                  }%</td>
                </tr>
                <tr>
                  <td style="padding: 20px; font-size: 16px; font-weight: 600; color: #111827; border: 1px solid #e5e7eb;">Net Profit</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">${data.currentProfit || 'TBD'}</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">${data.lastYearProfit || 'TBD'}</td>
                  <td style="padding: 20px; font-size: 16px; color: #10b981; font-weight: 600; border: 1px solid #e5e7eb;">+${
                    data.currentProfit && data.lastYearProfit 
                      ? Math.round(((parseFloat(data.currentProfit.replace(/[^0-9.-]+/g, '')) - 
                          parseFloat(data.lastYearProfit.replace(/[^0-9.-]+/g, ''))) / 
                          parseFloat(data.lastYearProfit.replace(/[^0-9.-]+/g, ''))) * 100)
                      : 0
                  }%</td>
                </tr>
                <tr>
                  <td style="padding: 20px; font-size: 16px; font-weight: 600; color: #111827; border: 1px solid #e5e7eb;">Recurring Revenue</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">${data.recurringRevenuePercent || 'TBD'}</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">-</td>
                  <td style="padding: 20px; font-size: 16px; color: #374151; border: 1px solid #e5e7eb;">of total</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Transaction Overview -->
        <div style="padding: 80px; min-height: 1800px;">
          <div style="border-left: 6px solid #2563eb; padding-left: 40px; margin-bottom: 60px;">
            <h2 style="font-size: 48px; font-weight: 700; color: #111827; margin-bottom: 16px;">Transaction Overview</h2>
            <p style="font-size: 20px; color: #6b7280;">Investment Terms</p>
          </div>

          <div style="background-color: #1e3a8a; color: white; padding: 60px; border-radius: 16px; text-align: center; margin-bottom: 60px;">
            <p style="font-size: 24px; margin-bottom: 16px; opacity: 0.9;">Asking Price</p>
            <p style="font-size: 64px; font-weight: 700; margin: 0;">${data.askingPrice || 'Upon Request'}</p>
          </div>

          <div style="display: grid; gap: 40px;">
            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 24px; color: #111827; margin-bottom: 20px;">Reason for Sale</h3>
              <p style="font-size: 18px; line-height: 1.8; color: #374151;">
                ${data.reasonForSale || 'Owner pursuing other business opportunities.'}
              </p>
            </div>

            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 24px; color: #111827; margin-bottom: 20px;">Transition Support</h3>
              <p style="font-size: 18px; line-height: 1.8; color: #374151;">
                ${data.transitionPeriod || 'Comprehensive transition support will be provided to ensure continuity.'}
              </p>
            </div>

            <div style="background-color: #f9fafb; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 24px; color: #111827; margin-bottom: 20px;">Financing Options</h3>
              <p style="font-size: 18px; line-height: 1.8; color: #374151;">
                ${data.financing === 'partial' 
                  ? 'Seller financing available for qualified buyers (up to 20% of purchase price)'
                  : data.financing === 'flexible'
                  ? 'Flexible financing terms available for qualified buyers'
                  : 'All-cash transaction preferred'}
              </p>
            </div>
          </div>

          <div style="margin-top: 120px; text-align: center;">
            <div style="display: inline-block; background-color: white; padding: 40px 60px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 20px; color: #374151; margin-bottom: 16px;">Contact us through the</p>
              <p style="font-size: 28px; color: #2563eb; font-weight: 700;">RemoteOps Platform</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Get all page divs
    const pages = container.querySelectorAll('div[style*="page-break-after"]');
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      if (i > 0) {
        pdf.addPage();
      }
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 210, pageHeight);
    }
    
    // Clean up
    document.body.removeChild(container);
    
    return pdf;
  } catch (error) {
    // Clean up on error
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    throw error;
  }
};