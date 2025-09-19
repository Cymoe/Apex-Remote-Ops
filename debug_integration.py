#!/usr/bin/env python3
"""
Debug the Next.js → Python integration
"""

import requests
import json

def debug_integration():
    print("🔍 Debugging Next.js → Python Integration...\n")
    
    # Test 1: Python service health
    try:
        health = requests.get("http://localhost:8000/health")
        print(f"✅ Python Health: {health.json()}")
    except Exception as e:
        print(f"❌ Python Health Failed: {e}")
        return
    
    # Test 2: Python conversation endpoint
    try:
        python_response = requests.post(
            "http://localhost:8000/conversation",
            json={
                "conversation_id": "debug-test",
                "message": "Hello!",
                "current_stage": "greeting"
            }
        )
        print(f"✅ Python Conversation: {python_response.status_code}")
        if python_response.status_code == 200:
            result = python_response.json()
            print(f"   Response: {result.get('response', 'No response')}")
        else:
            print(f"   Error: {python_response.text}")
    except Exception as e:
        print(f"❌ Python Conversation Failed: {e}")
    
    # Test 3: Next.js API route
    try:
        nextjs_response = requests.post(
            "http://localhost:3000/api/sales-agent",
            json={"messages": [{"role": "user", "content": "Hello!"}]},
            headers={"x-conversation-id": "debug-nextjs"}
        )
        print(f"\n✅ Next.js API Status: {nextjs_response.status_code}")
        print(f"   Content-Type: {nextjs_response.headers.get('content-type')}")
        
        # Read response content
        content = nextjs_response.text
        print(f"   Response Content: {content[:200]}...")
        
        if "technical difficulties" in content:
            print("⚠️  Getting fallback response - Next.js can't reach Python service")
        else:
            print("✅ Getting real response from Python service!")
            
    except Exception as e:
        print(f"❌ Next.js API Failed: {e}")

if __name__ == "__main__":
    debug_integration()