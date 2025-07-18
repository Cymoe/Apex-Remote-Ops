// Test script to verify Loom thumbnail fetching
const testLoomUrl = 'https://www.loom.com/share/bbfeb396eaa34c17bb67a305115265f6';

async function testLoomThumbnailFetch() {
  try {
    console.log('Testing Loom thumbnail fetch for:', testLoomUrl);
    
    const response = await fetch('http://localhost:3000/api/fetch-loom-metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoUrl: testLoomUrl })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('\nResponse:', JSON.stringify(data, null, 2));
    
    if (data.thumbnailUrl) {
      console.log('\n✅ Thumbnail URL successfully fetched:', data.thumbnailUrl);
    } else {
      console.log('\n⚠️  No thumbnail URL in response');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

testLoomThumbnailFetch(); 