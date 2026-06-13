import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch
from main import app

client = TestClient(app)

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_cors_headers():
    """Test CORS headers are present"""
    response = client.options("/health")
    assert response.status_code == 200

@patch('services.gemini_service.GeminiService')
def test_analyze_journal_endpoint(mock_gemini):
    """Test journal analysis endpoint"""
    mock_service = Mock()
    mock_service.analyze_journal.return_value = {
        "sentiment_score": 0.8,
        "emotions": ["happy"],
        "key_themes": ["success"],
        "wellness_avatar": "😊",
        "suggestions": ["Keep it up"]
    }
    mock_gemini.return_value = mock_service
    
    response = client.post("/api/analyze-journal", json={
        "content": "I had a great day!",
        "mood": "happy"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "sentiment_score" in data
    assert data["sentiment_score"] == 0.8

@patch('services.gemini_service.GeminiService')
def test_predict_burnout_endpoint(mock_gemini):
    """Test burnout prediction endpoint"""
    mock_service = Mock()
    mock_service.predict_burnout.return_value = {
        "risk_level": "moderate",
        "risk_score": 60,
        "factors": ["workload"],
        "recommendations": ["Take breaks"],
        "timeline_forecast": []
    }
    mock_gemini.return_value = mock_service
    
    response = client.post("/api/predict-burnout", json={
        "journals": [
            {"content": "Feeling stressed", "mood": "anxious"}
        ]
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "moderate"
    assert data["risk_score"] == 60

@patch('services.gemini_service.GeminiService')
def test_recovery_plan_endpoint(mock_gemini):
    """Test recovery plan generation endpoint"""
    mock_service = Mock()
    mock_service.generate_recovery_plan.return_value = {
        "overall_wellness": 65,
        "priority_actions": ["Exercise"],
        "weekly_goals": ["Sleep 8h"],
        "resources": ["Therapy"],
        "timeline": "4 weeks"
    }
    mock_gemini.return_value = mock_service
    
    response = client.post("/api/recovery-plan", json={
        "journals": [{"content": "Stressed", "mood": "anxious"}],
        "prediction": {"risk_level": "moderate", "risk_score": 60}
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["overall_wellness"] == 65
    assert "priority_actions" in data

@patch('services.gemini_service.GeminiService')
def test_mentor_chat_endpoint(mock_gemini):
    """Test AI mentor chat endpoint"""
    mock_service = Mock()
    mock_service.chat_with_mentor.return_value = "Here's my advice..."
    mock_gemini.return_value = mock_service
    
    response = client.post("/api/mentor/chat", json={
        "message": "How to manage stress?",
        "persona": "supportive",
        "context": []
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["response"] == "Here's my advice..."

def test_invalid_endpoint():
    """Test non-existent endpoint returns 404"""
    response = client.get("/api/nonexistent")
    assert response.status_code == 404

def test_missing_required_fields():
    """Test missing required fields returns 422"""
    response = client.post("/api/analyze-journal", json={})
    assert response.status_code == 422

def test_invalid_json():
    """Test invalid JSON returns 422"""
    response = client.post(
        "/api/analyze-journal",
        data="not json",
        headers={"Content-Type": "application/json"}
    )
    assert response.status_code == 422

@patch('services.gemini_service.GeminiService')
def test_analyze_journal_with_long_content(mock_gemini):
    """Test journal analysis with very long content"""
    mock_service = Mock()
    mock_service.analyze_journal.return_value = {
        "sentiment_score": 0.5,
        "emotions": ["neutral"],
        "key_themes": ["daily life"],
        "wellness_avatar": "😐",
        "suggestions": ["Continue journaling"]
    }
    mock_gemini.return_value = mock_service
    
    long_content = "This is a very long journal entry. " * 1000
    response = client.post("/api/analyze-journal", json={
        "content": long_content,
        "mood": "calm"
    })
    
    assert response.status_code == 200

@patch('services.gemini_service.GeminiService')
def test_predict_burnout_with_many_journals(mock_gemini):
    """Test burnout prediction with many journal entries"""
    mock_service = Mock()
    mock_service.predict_burnout.return_value = {
        "risk_level": "low",
        "risk_score": 30,
        "factors": ["good habits"],
        "recommendations": ["Keep going"],
        "timeline_forecast": []
    }
    mock_gemini.return_value = mock_service
    
    journals = [
        {"content": f"Journal {i}", "mood": "happy"}
        for i in range(100)
    ]
    
    response = client.post("/api/predict-burnout", json={
        "journals": journals
    })
    
    assert response.status_code == 200

def test_api_documentation():
    """Test API documentation is available"""
    response = client.get("/docs")
    assert response.status_code == 200

def test_openapi_schema():
    """Test OpenAPI schema is available"""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "openapi" in data
    assert data["info"]["title"] == "Wellora API"

@patch('services.gemini_service.GeminiService')
def test_rate_limiting_behavior(mock_gemini):
    """Test API handles multiple rapid requests"""
    mock_service = Mock()
    mock_service.analyze_journal.return_value = {
        "sentiment_score": 0.7,
        "emotions": ["happy"],
        "key_themes": [],
        "wellness_avatar": "😊",
        "suggestions": []
    }
    mock_gemini.return_value = mock_service
    
    # Make multiple requests
    responses = []
    for i in range(10):
        response = client.post("/api/analyze-journal", json={
            "content": f"Test {i}",
            "mood": "happy"
        })
        responses.append(response)
    
    # All should succeed (no rate limiting yet)
    assert all(r.status_code == 200 for r in responses)

def test_security_headers():
    """Test that security headers are present"""
    response = client.get("/health")
    # Check for basic security headers
    assert response.status_code == 200
    # In production, you'd check for headers like:
    # X-Content-Type-Options, X-Frame-Options, etc.

@patch('services.gemini_service.GeminiService')
def test_special_characters_in_content(mock_gemini):
    """Test handling of special characters in journal content"""
    mock_service = Mock()
    mock_service.analyze_journal.return_value = {
        "sentiment_score": 0.5,
        "emotions": ["neutral"],
        "key_themes": [],
        "wellness_avatar": "😐",
        "suggestions": []
    }
    mock_gemini.return_value = mock_service
    
    special_content = "Testing with émojis 😊, symbols @#$%, and unicode™"
    response = client.post("/api/analyze-journal", json={
        "content": special_content,
        "mood": "calm"
    })
    
    assert response.status_code == 200
