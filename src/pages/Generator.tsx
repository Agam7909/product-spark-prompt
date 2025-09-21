import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Sparkles, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  purpose: string;
  audience: string;
  features: string;
  platform: string;
  complexity: string;
}

const questions = [
  {
    id: "purpose",
    title: "What is your product's purpose?",
    subtitle: "Describe the main problem your product solves",
    placeholder: "e.g., A task management app that helps remote teams stay organized and productive",
    component: "textarea"
  },
  {
    id: "audience",
    title: "Who is your target audience?",
    subtitle: "Define your ideal users and their characteristics",
    placeholder: "e.g., Remote teams, freelancers, small business owners aged 25-45",
    component: "textarea"
  },
  {
    id: "features",
    title: "What are the must-have features?",
    subtitle: "List the core features that are essential for your MVP",
    placeholder: "e.g., Task creation, team collaboration, deadline tracking, file sharing",
    component: "textarea"
  },
  {
    id: "platform",
    title: "What platforms do you want it on?",
    subtitle: "Choose your preferred platform",
    options: [
      { value: "web", label: "Web Application" },
      { value: "mobile", label: "Mobile App (iOS/Android)" },
      { value: "both", label: "Both Web and Mobile" },
      { value: "desktop", label: "Desktop Application" }
    ],
    component: "select"
  },
  {
    id: "complexity",
    title: "What's your desired complexity level?",
    subtitle: "This helps us tailor the technical requirements",
    options: [
      { value: "basic", label: "Basic - Simple functionality, minimal features" },
      { value: "medium", label: "Medium - Standard features with some customization" },
      { value: "advanced", label: "Advanced - Complex features and integrations" }
    ],
    component: "select"
  }
];

const Generator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    purpose: "",
    audience: "",
    features: "",
    platform: "",
    complexity: ""
  });
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePRD = () => {
    const platformText = questions[3].options?.find(opt => opt.value === formData.platform)?.label || formData.platform;
    const complexityText = questions[4].options?.find(opt => opt.value === formData.complexity)?.label || formData.complexity;

    return `# Product Requirements Document (PRD)

## Product Overview
${formData.purpose}

## Target Audience
${formData.audience}

## Platform Requirements
${platformText}

## Complexity Level
${complexityText}

## Core Features & Requirements

### Must-Have Features
${formData.features}

### Functional Requirements
- User-friendly interface with intuitive navigation
- Responsive design that works across all specified platforms
- Fast loading times and smooth performance
- Secure user data handling and privacy protection

### Technical Requirements
- Modern, clean UI/UX design
- ${formData.platform === 'web' ? 'Progressive Web App (PWA) capabilities' : ''}
- ${formData.platform === 'mobile' ? 'Native mobile app performance' : ''}
- ${formData.platform === 'both' ? 'Cross-platform compatibility' : ''}
- Database integration for data persistence
- User authentication and authorization
- RESTful API architecture

### User Experience Goals
- Minimize user onboarding time
- Ensure accessibility compliance (WCAG 2.1)
- Provide clear feedback for all user actions
- Implement intuitive error handling and recovery

### Success Metrics
- User engagement and retention rates
- Task completion rates
- Performance benchmarks (load times, response times)
- User satisfaction scores

## Implementation Approach
Build using modern frameworks and best practices. Focus on ${formData.complexity === 'basic' ? 'simplicity and ease of use' : formData.complexity === 'medium' ? 'balanced functionality and performance' : 'advanced features and scalability'}.

## Next Steps
1. Create wireframes and mockups
2. Set up development environment
3. Implement core features iteratively
4. Conduct user testing and gather feedback
5. Deploy and monitor performance

---
*This PRD was generated by the AI-Powered PRD Generator. Use this as a foundation and customize based on your specific needs.*`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePRD());
      toast({
        title: "Copied to clipboard!",
        description: "Your PRD prompt has been copied and is ready to paste into any AI app builder.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const downloadPRD = () => {
    const element = document.createElement("a");
    const file = new Blob([generatePRD()], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "product-requirements-document.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started!",
      description: "Your PRD has been downloaded as a Markdown file.",
    });
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-hero py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Your PRD is Ready!</h1>
            </div>
            <p className="text-muted-foreground">
              Copy this prompt and paste it into any AI app builder to generate your application.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Product Requirements Document
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadPRD} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                <pre className="whitespace-pre-wrap text-sm">{generatePRD()}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button 
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setFormData({
                  purpose: "",
                  audience: "",
                  features: "",
                  platform: "",
                  complexity: ""
                });
              }}
              variant="ghost"
            >
              Generate Another PRD
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const currentValue = formData[currentQuestion.id as keyof FormData];
  const isStepValid = currentValue.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
            <CardDescription className="text-base">
              {currentQuestion.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.component === "textarea" ? (
              <div className="space-y-2">
                <Textarea
                  placeholder={currentQuestion.placeholder}
                  value={currentValue}
                  onChange={(e) => updateFormData(currentQuestion.id, e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Select 
                  value={currentValue} 
                  onValueChange={(value) => updateFormData(currentQuestion.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={nextStep}
                disabled={!isStepValid}
                variant={isLastStep ? "hero" : "default"}
              >
                {isLastStep ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate PRD
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Generator;