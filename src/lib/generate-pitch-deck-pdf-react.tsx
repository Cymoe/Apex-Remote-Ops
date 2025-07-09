import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink
} from '@react-pdf/renderer';

// Register fonts if needed
// Font.register({
//   family: 'Roboto',
//   src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
// });

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

// Define styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  coverPage: {
    backgroundColor: '#1e3a8a', // Deep blue
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  coverTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  coverTagline: {
    fontSize: 24,
    color: '#e0e7ff',
    marginBottom: 50,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 10,
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 14,
    color: '#94a3b8',
    position: 'absolute',
    bottom: 50,
  },
  contentPage: {
    padding: 50,
  },
  pageHeader: {
    marginBottom: 30,
    borderBottom: '2 solid #e2e8f0',
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 25,
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 1.6,
    marginBottom: 8,
    paddingLeft: 20,
  },
  highlightBox: {
    backgroundColor: '#f0f9ff',
    borderLeft: '4 solid #3b82f6',
    padding: 15,
    marginVertical: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    marginRight: '2%',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  financialTable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableHeader: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  tableCell: {
    padding: 10,
    flex: 1,
    fontSize: 12,
    color: '#475569',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 50,
    fontSize: 10,
    color: '#94a3b8',
  },
});

// Create the PDF document component
export const PitchDeckPDF = ({ data }: { data: PitchDeckData }) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.page}>
      <View style={styles.coverPage}>
        <Text style={styles.coverTitle}>{data.companyName || 'Company Name'}</Text>
        <Text style={styles.coverTagline}>{data.tagline || 'Company Tagline'}</Text>
        <Text style={styles.coverSubtitle}>Business Exit Opportunity</Text>
        <Text style={styles.coverSubtitle}>Confidential Information Memorandum</Text>
        <Text style={styles.coverDate}>
          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </Text>
      </View>
    </Page>

    {/* Executive Summary */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Executive Summary</Text>
        </View>

        <View style={styles.highlightBox}>
          <Text style={styles.text}>
            {data.businessDescription || 'A leading home service company with proven systems and strong market presence.'}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.currentRevenue || '$X.XM'}</Text>
            <Text style={styles.statLabel}>Current Revenue</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.profitMargin || 'XX%'}</Text>
            <Text style={styles.statLabel}>Profit Margin</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.totalCustomers || 'XXX'}</Text>
            <Text style={styles.statLabel}>Active Customers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.recurringRevenuePercent || 'XX%'}</Text>
            <Text style={styles.statLabel}>Recurring Revenue</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Investment Highlights</Text>
        {data.keyAchievements.filter(a => a).map((achievement, index) => (
          <Text key={index} style={styles.bulletPoint}>• {achievement}</Text>
        ))}

        <Text style={styles.sectionTitle}>Unique Value Proposition</Text>
        <Text style={styles.text}>
          {data.uniqueValue || 'Established market leader with scalable systems and proven profitability.'}
        </Text>

        <Text style={styles.pageNumber}>1</Text>
      </View>
    </Page>

    {/* Financial Performance */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Financial Performance</Text>
        </View>

        <Text style={styles.sectionTitle}>Revenue Growth</Text>
        <View style={styles.financialTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Year</Text>
            <Text style={styles.tableHeader}>Revenue</Text>
            <Text style={styles.tableHeader}>Growth</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Current Year</Text>
            <Text style={styles.tableCell}>{data.currentRevenue || 'TBD'}</Text>
            <Text style={styles.tableCell}>
              {data.currentRevenue && data.lastYearRevenue 
                ? `${Math.round(((parseFloat(data.currentRevenue.replace(/[^0-9.-]+/g,"")) - 
                    parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g,""))) / 
                    parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g,""))) * 100)}%`
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Last Year</Text>
            <Text style={styles.tableCell}>{data.lastYearRevenue || 'TBD'}</Text>
            <Text style={styles.tableCell}>
              {data.lastYearRevenue && data.twoYearsAgoRevenue 
                ? `${Math.round(((parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g,"")) - 
                    parseFloat(data.twoYearsAgoRevenue.replace(/[^0-9.-]+/g,""))) / 
                    parseFloat(data.twoYearsAgoRevenue.replace(/[^0-9.-]+/g,""))) * 100)}%`
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Two Years Ago</Text>
            <Text style={styles.tableCell}>{data.twoYearsAgoRevenue || 'TBD'}</Text>
            <Text style={styles.tableCell}>-</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Profitability</Text>
        <View style={styles.financialTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Year</Text>
            <Text style={styles.tableHeader}>Net Profit</Text>
            <Text style={styles.tableHeader}>Margin</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Current Year</Text>
            <Text style={styles.tableCell}>{data.currentProfit || 'TBD'}</Text>
            <Text style={styles.tableCell}>{data.profitMargin || 'TBD'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Last Year</Text>
            <Text style={styles.tableCell}>{data.lastYearProfit || 'TBD'}</Text>
            <Text style={styles.tableCell}>
              {data.lastYearProfit && data.lastYearRevenue 
                ? `${Math.round((parseFloat(data.lastYearProfit.replace(/[^0-9.-]+/g,"")) / 
                    parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g,""))) * 100)}%`
                : 'TBD'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Two Years Ago</Text>
            <Text style={styles.tableCell}>{data.twoYearsAgoProfit || 'TBD'}</Text>
            <Text style={styles.tableCell}>
              {data.twoYearsAgoProfit && data.twoYearsAgoRevenue 
                ? `${Math.round((parseFloat(data.twoYearsAgoProfit.replace(/[^0-9.-]+/g,"")) / 
                    parseFloat(data.twoYearsAgoRevenue.replace(/[^0-9.-]+/g,""))) * 100)}%`
                : 'TBD'}
            </Text>
          </View>
        </View>

        <Text style={styles.pageNumber}>2</Text>
      </View>
    </Page>

    {/* Customer & Market Analysis */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Customer & Market Analysis</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.customerRetentionRate || 'XX%'}</Text>
            <Text style={styles.statLabel}>Customer Retention</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.averageJobSize || '$X,XXX'}</Text>
            <Text style={styles.statLabel}>Average Job Size</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Customer Concentration</Text>
        <Text style={styles.text}>
          Largest customer represents {data.topCustomerPercent || 'X%'} of total revenue, 
          demonstrating a well-diversified customer base with minimal concentration risk.
        </Text>

        <Text style={styles.sectionTitle}>Markets Served</Text>
        {data.marketsServed.filter(m => m).map((market, index) => (
          <Text key={index} style={styles.bulletPoint}>• {market}</Text>
        ))}

        <Text style={styles.sectionTitle}>Geographic Coverage</Text>
        <View style={styles.highlightBox}>
          <Text style={styles.text}>Licensed to operate in:</Text>
          {data.licensedStates.filter(s => s).map((state, index) => (
            <Text key={index} style={styles.bulletPoint}>• {state}</Text>
          ))}
        </View>

        <Text style={styles.pageNumber}>3</Text>
      </View>
    </Page>

    {/* Operations Overview */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Operations Overview</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.teamSize || 'XX'}</Text>
            <Text style={styles.statLabel}>Full-Time Employees</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.subcontractors || 'XX'}</Text>
            <Text style={styles.statLabel}>Active Subcontractors</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Technology Infrastructure</Text>
        {data.techStack.filter(t => t).map((tech, index) => (
          <Text key={index} style={styles.bulletPoint}>• {tech}</Text>
        ))}

        <Text style={styles.sectionTitle}>Operational Excellence</Text>
        <Text style={styles.text}>
          The business operates on a fully remote model with established systems for:
        </Text>
        <Text style={styles.bulletPoint}>• Quality control and job monitoring</Text>
        <Text style={styles.bulletPoint}>• Real-time communication and dispatch</Text>
        <Text style={styles.bulletPoint}>• Automated billing and collections</Text>
        <Text style={styles.bulletPoint}>• Performance tracking and reporting</Text>

        <Text style={styles.pageNumber}>4</Text>
      </View>
    </Page>

    {/* Growth Opportunities */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Growth Opportunities</Text>
        </View>

        {data.growthOpportunities.filter(o => o).map((opportunity, index) => (
          <View key={index} style={styles.highlightBox}>
            <Text style={styles.sectionTitle}>Opportunity {index + 1}</Text>
            <Text style={styles.text}>{opportunity}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Competitive Advantages</Text>
        {data.competitiveAdvantages.filter(a => a).map((advantage, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={styles.bulletPoint}>• {advantage}</Text>
          </View>
        ))}

        <Text style={styles.pageNumber}>5</Text>
      </View>
    </Page>

    {/* Transaction Details */}
    <Page size="A4" style={styles.page}>
      <View style={styles.contentPage}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Transaction Details</Text>
        </View>

        <View style={styles.highlightBox}>
          <Text style={styles.sectionTitle}>Asking Price</Text>
          <Text style={[styles.statNumber, { fontSize: 36 }]}>
            {data.askingPrice || 'Price Upon Request'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Reason for Sale</Text>
        <Text style={styles.text}>
          {data.reasonForSale || 'Owner pursuing other business opportunities.'}
        </Text>

        <Text style={styles.sectionTitle}>Transition Support</Text>
        <Text style={styles.text}>
          {data.transitionPeriod || 'Comprehensive transition support will be provided to ensure continuity.'}
        </Text>

        <Text style={styles.sectionTitle}>Financing Options</Text>
        <Text style={styles.text}>
          {data.financing === 'partial' 
            ? 'Seller financing available for qualified buyers (up to 20% of purchase price)'
            : data.financing === 'flexible'
            ? 'Flexible financing terms available for qualified buyers'
            : 'All-cash transaction preferred'}
        </Text>

        <Text style={styles.pageNumber}>6</Text>
      </View>
    </Page>

    {/* Contact Page */}
    <Page size="A4" style={styles.page}>
      <View style={[styles.coverPage, { backgroundColor: '#0f172a' }]}>
        <Text style={[styles.coverTitle, { fontSize: 36 }]}>Next Steps</Text>
        <Text style={[styles.coverTagline, { fontSize: 18, marginTop: 30 }]}>
          To learn more about this opportunity
        </Text>
        <Text style={[styles.coverTagline, { fontSize: 18 }]}>
          and schedule a confidential discussion,
        </Text>
        <Text style={[styles.coverTagline, { fontSize: 18 }]}>
          please contact us through the RemoteOps platform.
        </Text>
        
        <View style={{ marginTop: 80 }}>
          <Text style={[styles.coverSubtitle, { fontSize: 14 }]}>
            This document contains confidential and proprietary information.
          </Text>
          <Text style={[styles.coverSubtitle, { fontSize: 14 }]}>
            Please handle with appropriate care and discretion.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Export a component that provides the download link
export const PitchDeckDownloadLink = ({ data, children }: { data: PitchDeckData; children: React.ReactNode }) => {
  const fileName = `${data.companyName || 'Business'}_Pitch_Deck_${new Date().toISOString().split('T')[0]}.pdf`;
  
  return (
    <PDFDownloadLink 
      document={<PitchDeckPDF data={data} />} 
      fileName={fileName}
    >
      {({ loading }) => 
        loading ? 'Generating PDF...' : children
      }
    </PDFDownloadLink>
  );
};