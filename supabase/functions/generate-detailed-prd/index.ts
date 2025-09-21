import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const grokApiKey = Deno.env.get('GROK_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    
    if (!grokApiKey) {
      console.error('GROK_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ error: 'Grok API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const platformText = getPlatformText(formData.platform);
    const complexityText = getComplexityText(formData.complexity);

    const prompt = `You are an expert product manager and technical architect. Create a comprehensive, highly detailed Product Requirements Document (PRD) that is 3-4 pages long and production-ready. This should be a professional document that developers can use to build the application without ambiguity.

Based on the following inputs:
- Product Purpose: ${formData.purpose}
- Target Audience: ${formData.audience}
- Core Features: ${formData.features}
- Platform: ${platformText}
- Complexity Level: ${complexityText}

Create a detailed PRD with the following structure:

# Product Requirements Document (PRD)

## 1. Executive Summary
[2-3 paragraphs summarizing the product vision, key objectives, and expected impact]

## 2. Product Overview
### 2.1 Product Vision
### 2.2 Product Mission
### 2.3 Key Value Propositions
### 2.4 Success Metrics & KPIs

## 3. Market Research & User Analysis
### 3.1 Target Audience Breakdown
[Detailed user personas with demographics, behaviors, pain points, goals]
### 3.2 Market Size & Opportunity
### 3.3 Competitive Analysis
### 3.4 User Journey Mapping

## 4. Detailed Feature Specifications
### 4.1 Core Features (MVP)
[For each feature, include: Description, User Stories, Acceptance Criteria, Priority]
### 4.2 Advanced Features (Future Releases)
### 4.3 Feature Prioritization Matrix

## 5. Technical Requirements
### 5.1 System Architecture
### 5.2 Technology Stack Recommendations
### 5.3 Database Schema Requirements
### 5.4 API Specifications
### 5.5 Security Requirements
### 5.6 Performance Requirements
### 5.7 Scalability Considerations

## 6. User Experience (UX) Requirements
### 6.1 Design Principles
### 6.2 User Interface Guidelines
### 6.3 Accessibility Requirements (WCAG 2.1 AA)
### 6.4 Mobile Responsiveness
### 6.5 User Onboarding Flow

## 7. Functional Requirements
### 7.1 User Management & Authentication
### 7.2 Core Functionality
### 7.3 Data Management
### 7.4 Integration Requirements
### 7.5 Notification System

## 8. Non-Functional Requirements
### 8.1 Performance Benchmarks
### 8.2 Security Standards
### 8.3 Compliance Requirements
### 8.4 Monitoring & Analytics
### 8.5 Backup & Recovery

## 9. Implementation Roadmap
### 9.1 Development Phases
### 9.2 Timeline & Milestones
### 9.3 Resource Requirements
### 9.4 Risk Assessment & Mitigation

## 10. Quality Assurance & Testing
### 10.1 Testing Strategy
### 10.2 Test Cases & Scenarios
### 10.3 Performance Testing
### 10.4 Security Testing
### 10.5 User Acceptance Testing

## 11. Launch Strategy
### 11.1 Go-to-Market Plan
### 11.2 User Acquisition Strategy
### 11.3 Marketing Requirements
### 11.4 Success Metrics & Monitoring

## 12. Post-Launch Considerations
### 12.1 Maintenance & Support
### 12.2 Feature Enhancement Pipeline
### 12.3 Scaling Strategy
### 12.4 Long-term Vision

Requirements:
- Be extremely detailed and specific
- Include technical specifications that developers can follow
- Add user stories with clear acceptance criteria
- Consider edge cases and error scenarios
- Include specific technology recommendations
- Add security considerations
- Include performance requirements
- Make it actionable and implementable
- Think like a senior product manager with 10+ years of experience
- Consider all aspects that could cause bugs or issues if not addressed
- Make the document production-ready and comprehensive

Write in a professional tone suitable for stakeholders, developers, and designers.`;

    console.log('Sending request to Grok API...');
    
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an expert product manager and technical architect specializing in creating comprehensive, detailed Product Requirements Documents.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'grok-beta',
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('Grok API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to generate PRD' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Grok API response received successfully');
    
    const generatedPRD = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      prd: generatedPRD,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-detailed-prd function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error',
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getPlatformText(platform: string): string {
  const platformMap: { [key: string]: string } = {
    'web': 'Web Application',
    'mobile': 'Mobile App (iOS/Android)',
    'both': 'Both Web and Mobile',
    'desktop': 'Desktop Application'
  };
  return platformMap[platform] || platform;
}

function getComplexityText(complexity: string): string {
  const complexityMap: { [key: string]: string } = {
    'basic': 'Basic - Simple functionality, minimal features',
    'medium': 'Medium - Standard features with some customization',
    'advanced': 'Advanced - Complex features and integrations'
  };
  return complexityMap[complexity] || complexity;
}