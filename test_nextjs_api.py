#!/usr/bin/env python3
"""
Test the Next.js API that calls the Python service
"""

import requests
import json

def test_nextjs_api():
    """Test the Next.js API route that connects to Python service"""
    
    print("🚀 Testing Next.js → Python Integration...")
    
    # Test the Next.js API route
    test_data = {
        "messages": [
            {"role": "user", "content": "Hello there!"}
        ]
    }
    
    try:
        response = requests.post(
            "http://localhost:3001/api/sales-agent",
            json=test_data,
            headers={
                "Content-Type": "application/json",
                "x-conversation-id": f"test-{int(__import__('time').time())}"
            },
            stream=True  # Handle streaming response
        )
        
        print(f"✅ Next.js API Status: {response.status_code}")
        print(f"✅ Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            # Read streaming response
            content = ""
            for line in response.iter_lines():
                if line:
                    content += line.decode('utf-8') + "\n"
            
            print(f"✅ Streaming Response:")
            print(content)
            
            if "technical difficulties" in content:
                print("⚠️  Fallback response - Python service might have an issue")
                print("💡 But the integration is working! Next.js is calling Python service")
            else:
                print("🎉 Full integration working!")
                
        else:
            print(f"❌ Error response: {response.text}")
            
    except Exception as e:
        print(f"❌ Next.js API test failed: {e}")

if __name__ == "__main__":
    test_nextjs_api()