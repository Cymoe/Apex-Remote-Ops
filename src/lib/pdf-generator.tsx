import dynamic from 'next/dynamic';

// Dynamically import React PDF to avoid SSR issues
export const generatePDFBuffer = async (data: any) => {
  // Import React PDF components at runtime
  const { renderToBuffer, Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');
  
  // Create styles
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      padding: 50,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    text: {
      fontSize: 12,
      marginBottom: 10,
    },
  });

  // Create a simple document for testing
  const TestDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{data.companyName || 'Test Company'}</Text>
          <Text style={styles.text}>This is a test PDF document.</Text>
          <Text style={styles.text}>Revenue: {data.currentRevenue || 'N/A'}</Text>
        </View>
      </Page>
    </Document>
  );

  // Generate PDF
  try {
    const doc = <TestDocument />;
    const buffer = await renderToBuffer(doc);
    return buffer;
  } catch (error) {
    console.error('PDF generation error in lib:', error);
    throw error;
  }
};