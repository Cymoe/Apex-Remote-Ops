import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Svg,
  Path,
  Circle,
  Rect,
  Line,
  G,
  Defs,
  LinearGradient,
  Stop
} from '@react-pdf/renderer';

// Register custom fonts for a more professional look
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 }
  ]
});

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

// Enhanced color palette with pure black text
const colors = {
  primary: '#2563eb',
  primaryDark: '#1e40af',
  primaryLight: '#dbeafe',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  dark: '#111827',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
  background: '#f9fafb',
  white: '#ffffff',
  black: '#000000', // Pure black for all text
  gradient1: '#3b82f6',
  gradient2: '#8b5cf6'
};

// Professional styles with black text
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    fontFamily: 'Inter',
  },
  
  // Cover page styles
  coverPage: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    backgroundColor: colors.dark,
  },
  
  coverBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  coverContent: {
    zIndex: 10,
    alignItems: 'center',
  },
  
  coverTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -1,
  },
  
  coverTagline: {
    fontSize: 20,
    color: colors.lightGray,
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: 300,
  },
  
  coverDivider: {
    width: 80,
    height: 4,
    backgroundColor: colors.primary,
    marginBottom: 40,
  },
  
  coverSubtitle: {
    fontSize: 16,
    color: colors.lightGray,
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
  // Content page styles
  contentPage: {
    padding: 50,
    paddingTop: 60,
    paddingBottom: 80,
  },
  
  pageHeader: {
    marginBottom: 40,
    position: 'relative',
  },
  
  pageHeaderLine: {
    position: 'absolute',
    left: 0,
    top: 40,
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
  },
  
  pageTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  
  pageSubtitle: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 400,
  },
  
  // Section styles
  section: {
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  
  // Text styles
  text: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 1.8,
    marginBottom: 10,
  },
  
  strongText: {
    fontWeight: 700,
    color: colors.black,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  
  cardTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 8,
  },
  
  // Stats styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
    marginBottom: 30,
  },
  
  statCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
    position: 'relative',
    overflow: 'hidden',
  },
  
  statCardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  
  statNumber: {
    fontSize: 32,
    fontWeight: 700,
    color: colors.black,
    marginBottom: 4,
    letterSpacing: -1,
  },
  
  statLabel: {
    fontSize: 12,
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 500,
  },
  
  statChange: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: 8,
  },
  
  statChangePositive: {
    color: colors.secondary,
  },
  
  statChangeNegative: {
    color: colors.danger,
  },
  
  // Chart styles
  chartContainer: {
    marginVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  
  // Table styles
  table: {
    marginVertical: 20,
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  
  tableHeader: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  tableCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  tableCellText: {
    fontSize: 12,
    color: colors.black,
  },
  
  // List styles
  bulletList: {
    marginBottom: 20,
  },
  
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  
  bulletIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginTop: 2,
  },
  
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: colors.black,
    lineHeight: 1.8,
  },
  
  // Badge styles
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  
  badgeText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: 600,
  },
  
  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: 10,
    color: colors.gray,
  },
  
  pageNumber: {
    fontSize: 11,
    color: colors.gray,
    fontWeight: 500,
  },
  
  // Icon container
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

// Chart component for revenue visualization
const RevenueChart = ({ data }: { data: PitchDeckData }) => {
  const revenues = [
    parseFloat(data.twoYearsAgoRevenue?.replace(/[^0-9.-]+/g, '') || '0'),
    parseFloat(data.lastYearRevenue?.replace(/[^0-9.-]+/g, '') || '0'),
    parseFloat(data.currentRevenue?.replace(/[^0-9.-]+/g, '') || '0')
  ];
  
  const maxRevenue = Math.max(...revenues) || 1;
  const chartHeight = 150;
  const barWidth = 60;
  const spacing = 80;
  
  return (
    <Svg width="400" height="200" viewBox="0 0 400 200">
      {/* Background grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <Line
          key={i}
          x1="40"
          y1={40 + (i * 30)}
          x2="360"
          y2={40 + (i * 30)}
          stroke={colors.lightGray}
          strokeWidth="1"
        />
      ))}
      
      {/* Bars */}
      {revenues.map((revenue, index) => {
        const height = (revenue / maxRevenue) * chartHeight;
        const x = 60 + (index * spacing);
        const y = 40 + chartHeight - height;
        
        return (
          <G key={index}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={height}
              fill={colors.primary}
              rx="4"
            />
            <Text
              x={x + barWidth / 2}
              y={200}
              fontSize="10"
              fill={colors.black}
              textAnchor="middle"
            >
              {index === 0 ? '2 Years Ago' : index === 1 ? 'Last Year' : 'Current'}
            </Text>
          </G>
        );
      })}
    </Svg>
  );
};

// Icon components
const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20">
    <Circle cx="10" cy="10" r="10" fill={colors.secondary} />
    <Path
      d="M6 10L9 13L14 7"
      stroke={colors.white}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowUpIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16">
    <Path
      d="M8 12V4M4 8L8 4L12 8"
      stroke={colors.secondary}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Create the enhanced PDF document
export const PitchDeckPDF = ({ data }: { data: PitchDeckData }) => {
  // Calculate growth rates
  const revenueGrowth = data.currentRevenue && data.lastYearRevenue
    ? Math.round(((parseFloat(data.currentRevenue.replace(/[^0-9.-]+/g, '')) - 
        parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g, ''))) / 
        parseFloat(data.lastYearRevenue.replace(/[^0-9.-]+/g, ''))) * 100)
    : 0;

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          {/* Background Pattern */}
          <View style={styles.coverBackground}>
            <Svg width="600" height="800" viewBox="0 0 600 800" style={{ opacity: 0.1 }}>
              <Defs>
                <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={colors.gradient1} />
                  <Stop offset="100%" stopColor={colors.gradient2} />
                </LinearGradient>
              </Defs>
              <Circle cx="500" cy="100" r="200" fill="url(#grad1)" />
              <Circle cx="100" cy="700" r="300" fill="url(#grad1)" />
            </Svg>
          </View>
          
          <View style={styles.coverContent}>
            <Text style={styles.coverTitle}>{data.companyName || 'Company Name'}</Text>
            <Text style={styles.coverTagline}>{data.tagline || 'Company Tagline'}</Text>
            <View style={styles.coverDivider} />
            <Text style={styles.coverSubtitle}>Investment Opportunity</Text>
            <Text style={[styles.coverSubtitle, { fontSize: 14, letterSpacing: 0, marginTop: 40 }]}>
              Confidential Information Memorandum
            </Text>
            <Text style={[styles.coverSubtitle, { fontSize: 12, letterSpacing: 0, marginTop: 60, color: colors.gray }]}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </Text>
          </View>
        </View>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Executive Summary</Text>
            <Text style={styles.pageSubtitle}>Investment Highlights</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>About {data.companyName}</Text>
            <Text style={styles.text}>
              {data.businessDescription || 'A leading home service company with proven systems and strong market presence.'}
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.primary }]} />
              <Text style={styles.statNumber}>{data.currentRevenue || '$X.XM'}</Text>
              <Text style={styles.statLabel}>Annual Revenue</Text>
              {revenueGrowth > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <ArrowUpIcon />
                  <Text style={[styles.statChange, styles.statChangePositive]}> +{revenueGrowth}% YoY</Text>
                </View>
              )}
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.secondary }]} />
              <Text style={styles.statNumber}>{data.profitMargin || 'XX%'}</Text>
              <Text style={styles.statLabel}>Profit Margin</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.accent }]} />
              <Text style={styles.statNumber}>{data.totalCustomers || 'XXX'}</Text>
              <Text style={styles.statLabel}>Active Customers</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.primaryDark }]} />
              <Text style={styles.statNumber}>{data.customerRetentionRate || 'XX%'}</Text>
              <Text style={styles.statLabel}>Retention Rate</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Investment Highlights</Text>
            <View style={styles.bulletList}>
              {data.keyAchievements.filter(a => a).map((achievement, index) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletIcon}>
                    <CheckIcon />
                  </View>
                  <Text style={styles.bulletText}>{achievement}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>1</Text>
          </View>
        </View>
      </Page>

      {/* Financial Performance */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Financial Performance</Text>
            <Text style={styles.pageSubtitle}>Historical Growth & Profitability</Text>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.cardTitle}>Revenue Trend</Text>
            <RevenueChart data={data} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Metrics</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, { borderTopWidth: 1, borderTopColor: colors.lightGray }]}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Metric</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Current Year</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Last Year</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Growth</Text>
                </View>
              </View>
              
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellText, styles.strongText]}>Revenue</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>{data.currentRevenue || 'TBD'}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>{data.lastYearRevenue || 'TBD'}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellText, styles.statChangePositive]}>
                    +{revenueGrowth}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellText, styles.strongText]}>Net Profit</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>{data.currentProfit || 'TBD'}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>{data.lastYearProfit || 'TBD'}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellText, styles.statChangePositive]}>
                    +{Math.round(((parseFloat(data.currentProfit?.replace(/[^0-9.-]+/g, '') || '0') - 
                      parseFloat(data.lastYearProfit?.replace(/[^0-9.-]+/g, '') || '0')) / 
                      parseFloat(data.lastYearProfit?.replace(/[^0-9.-]+/g, '') || '1')) * 100)}%
                  </Text>
                </View>
              </View>
              
              <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                <View style={styles.tableCell}>
                  <Text style={[styles.tableCellText, styles.strongText]}>Recurring Revenue</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>{data.recurringRevenuePercent || 'TBD'}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>-</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.tableCellText}>of total</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Key Insight</Text>
            </View>
            <Text style={styles.text}>
              The business has demonstrated consistent growth with improving margins, 
              indicating strong operational efficiency and market demand.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>2</Text>
          </View>
        </View>
      </Page>

      {/* Customer & Market Analysis */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Customer & Market Analysis</Text>
            <Text style={styles.pageSubtitle}>Market Position & Customer Base</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.primary }]} />
              <Text style={styles.statNumber}>{data.averageJobSize || '$X,XXX'}</Text>
              <Text style={styles.statLabel}>Avg. Transaction Size</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.secondary }]} />
              <Text style={styles.statNumber}>{data.topCustomerPercent || 'X%'}</Text>
              <Text style={styles.statLabel}>Top Customer Concentration</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Geographic Markets</Text>
            <View style={styles.bulletList}>
              {data.marketsServed.filter(m => m).map((market, index) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletIcon}>
                    <Svg width="20" height="20" viewBox="0 0 20 20">
                      <Circle cx="10" cy="10" r="8" fill={colors.primary} />
                      <Circle cx="10" cy="10" r="3" fill={colors.white} />
                    </Svg>
                  </View>
                  <Text style={styles.bulletText}>{market}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Market Opportunity</Text>
            <Text style={styles.text}>
              Well-positioned in high-growth markets with minimal customer concentration risk. 
              The diverse customer base and strong retention metrics indicate product-market fit 
              and sustainable competitive advantages.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>3</Text>
          </View>
        </View>
      </Page>

      {/* Operations & Technology */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Operations & Technology</Text>
            <Text style={styles.pageSubtitle}>Scalable Infrastructure</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.primary }]} />
              <Text style={styles.statNumber}>{data.teamSize || 'XX'}</Text>
              <Text style={styles.statLabel}>Full-Time Team</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={[styles.statCardAccent, { backgroundColor: colors.accent }]} />
              <Text style={styles.statNumber}>{data.subcontractors || 'XX'}</Text>
              <Text style={styles.statLabel}>Partner Network</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technology Stack</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {data.techStack.filter(t => t).map((tech, index) => (
                <View key={index} style={[styles.badge, { marginRight: 8, marginBottom: 8 }]}>
                  <Text style={styles.badgeText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Path
                  d="M12 2L2 7V12C2 16.5 4.5 20.5 12 22C19.5 20.5 22 16.5 22 12V7L12 2Z"
                  fill={colors.primaryDark}
                />
              </Svg>
            </View>
            <Text style={styles.cardTitle}>Operational Excellence</Text>
            <Text style={styles.text}>
              Fully remote operations model with established systems for quality control, 
              real-time monitoring, and automated workflows. Technology-enabled processes 
              drive efficiency and scalability.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Licensed Operating Regions</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {data.licensedStates.filter(s => s).map((state, index) => (
                <View key={index} style={[styles.card, { 
                  width: '30%', 
                  marginRight: '3%', 
                  padding: 12,
                  backgroundColor: colors.primaryLight,
                  borderColor: colors.primary
                }]}>
                  <Text style={[styles.text, { color: colors.primaryDark, fontWeight: 600, marginBottom: 0 }]}>
                    {state}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>4</Text>
          </View>
        </View>
      </Page>

      {/* Growth Strategy */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Growth Strategy</Text>
            <Text style={styles.pageSubtitle}>Expansion Opportunities</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identified Growth Opportunities</Text>
            {data.growthOpportunities.filter(o => o).map((opportunity, index) => (
              <View key={index} style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={[styles.iconContainer, { width: 32, height: 32, marginBottom: 0, marginRight: 12 }]}>
                    <Text style={{ color: colors.primaryDark, fontWeight: 700 }}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.cardTitle, { marginBottom: 0 }]}>Opportunity {index + 1}</Text>
                </View>
                <Text style={styles.text}>{opportunity}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competitive Advantages</Text>
            <View style={styles.bulletList}>
              {data.competitiveAdvantages.filter(a => a).map((advantage, index) => (
                <View key={index} style={styles.bulletItem}>
                  <View style={styles.bulletIcon}>
                    <Svg width="20" height="20" viewBox="0 0 20 20">
                      <Path
                        d="M10 2L12.09 7.26L18 8.27L14 12.14L15.18 18L10 15.27L4.82 18L6 12.14L2 8.27L7.91 7.26L10 2Z"
                        fill={colors.accent}
                      />
                    </Svg>
                  </View>
                  <Text style={styles.bulletText}>{advantage}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>5</Text>
          </View>
        </View>
      </Page>

      {/* Transaction Overview */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <View style={styles.pageHeader}>
            <View style={styles.pageHeaderLine} />
            <Text style={styles.pageTitle}>Transaction Overview</Text>
            <Text style={styles.pageSubtitle}>Investment Terms</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.primaryDark, padding: 40, alignItems: 'center' }]}>
            <Text style={[styles.sectionTitle, { color: colors.white, marginBottom: 8 }]}>Asking Price</Text>
            <Text style={[styles.statNumber, { fontSize: 48, color: colors.white }]}>
              {data.askingPrice || 'Upon Request'}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reason for Sale</Text>
              <Text style={styles.text}>
                {data.reasonForSale || 'Owner pursuing other business opportunities.'}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Transition Support</Text>
              <Text style={styles.text}>
                {data.transitionPeriod || 'Comprehensive transition support will be provided to ensure continuity.'}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Financing Options</Text>
              <Text style={styles.text}>
                {data.financing === 'partial' 
                  ? 'Seller financing available for qualified buyers (up to 20% of purchase price)'
                  : data.financing === 'flexible'
                  ? 'Flexible financing terms available for qualified buyers'
                  : 'All-cash transaction preferred'}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Confidential - {data.companyName}</Text>
            <Text style={styles.pageNumber}>6</Text>
          </View>
        </View>
      </Page>

      {/* Contact Page */}
      <Page size="A4" style={styles.page}>
        <View style={[styles.coverPage, { backgroundColor: colors.primaryDark }]}>
          <View style={styles.coverContent}>
            <View style={[styles.iconContainer, { width: 80, height: 80, backgroundColor: colors.white, marginBottom: 40 }]}>
              <Svg width="48" height="48" viewBox="0 0 48 48">
                <Path
                  d="M24 4L8 14V24C8 33 12 41 24 44C36 41 40 33 40 24V14L24 4Z"
                  fill={colors.primaryDark}
                />
                <Path
                  d="M20 24L23 27L28 20"
                  stroke={colors.white}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            
            <Text style={[styles.coverTitle, { fontSize: 36 }]}>Ready to Learn More?</Text>
            <Text style={[styles.coverTagline, { fontSize: 18, marginTop: 20 }]}>
              Schedule a confidential discussion about this opportunity
            </Text>
            
            <View style={[styles.coverDivider, { backgroundColor: colors.white, marginTop: 40, marginBottom: 40 }]} />
            
            <View style={{ backgroundColor: colors.white, padding: 30, borderRadius: 12, marginTop: 20 }}>
              <Text style={[styles.text, { color: colors.dark, textAlign: 'center', marginBottom: 8 }]}>
                Contact us through the
              </Text>
              <Text style={[styles.cardTitle, { textAlign: 'center', fontSize: 18, color: colors.primary }]}>
                RemoteOps Platform
              </Text>
            </View>
            
            <Text style={[styles.footerText, { color: colors.lightGray, marginTop: 60, textAlign: 'center' }]}>
              This document contains confidential and proprietary information.
            </Text>
            <Text style={[styles.footerText, { color: colors.lightGray, textAlign: 'center' }]}>
              Please handle with appropriate care and discretion.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};