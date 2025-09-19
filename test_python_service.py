#!/usr/bin/env python3
"""
Test the Python agent service directly
"""

import requests
import json

def test_python_service():
    """Test the Python agent service"""
    
    print("🐍 Testing Python Agent Service...")
    
    # Test health endpoint
    try:
        health_response = requests.get("http://localhost:8000/health")
        print(f"✅ Health check: {health_response.json()}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return
    
    # Test conversation endpoint
    test_data = {
        "conversation_id": "test-123",
        "message": "Hello there!",
        "current_stage": "greeting",
        "current_state": None
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/conversation",
            json=test_data,  # Use json parameter instead of data
            headers={"Content-Type": "application/json"}
        )
        
        print(f"✅ Conversation API Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Agent Response: {result.get('response', 'No response')}")
            print(f"✅ Current Stage: {result.get('current_stage', 'Unknown')}")
            print(f"✅ Agent Used: {result.get('agent_used', 'Unknown')}")
        else:
            print(f"❌ Error response: {response.text}")
            
    except Exception as e:
        print(f"❌ Conversation test failed: {e}")

if __name__ == "__main__":
    test_python_service()