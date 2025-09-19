#!/usr/bin/env python3
"""
Interactive conversation test with the Python agent
"""

import requests
import json

def test_conversation():
    base_url = "http://localhost:8000"
    conversation_id = "live-test-123"
    
    print("🤖 APEX Agent Live Test")
    print("=" * 40)
    print("This is your Python agent working!\n")
    
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ['quit', 'exit', 'bye']:
            break
            
        try:
            response = requests.post(
                f"{base_url}/conversation",
                json={
                    "conversation_id": conversation_id,
                    "message": user_input,
                    "current_stage": "greeting"
                }
            )
            
            if response.status_code == 200:
                result = response.json()
                agent_response = result.get('response', 'No response')
                stage = result.get('current_stage', 'unknown')
                agent = result.get('agent_used', 'unknown')
                
                print(f"Agent ({stage}): {agent_response}")
                print(f"[Stage: {stage}, Agent: {agent}]\n")
            else:
                print(f"❌ Error: {response.status_code} - {response.text}\n")
                
        except Exception as e:
            print(f"❌ Connection error: {e}\n")
            
    print("👋 Conversation ended!")

if __name__ == "__main__":
    test_conversation()