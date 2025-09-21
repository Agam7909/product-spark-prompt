import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Target, Rocket, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Zap,
    title: "5-Question Flow",
    description: "Answer just 5 simple questions about your product idea and we'll handle the rest."
  },
  {
    icon: Target,
    title: "Structured PRDs",
    description: "Get professional-grade Product Requirements Documents with proper formatting."
  },
  {
    icon: Rocket,
    title: "AI-Ready Prompts",
    description: "Copy-paste directly into any AI app builder like Replit AI, Grok, or custom platforms."
  },
  {
    icon: Users,
    title: "Founder-Friendly",
    description: "Built specifically for non-technical founders and entrepreneurs."
  }
];

const benefits = [
  "No prompt engineering knowledge required",
  "Professional PRD structure and formatting",
  "Works with all major AI app builders",
  "Export as Markdown or copy to clipboard",
  "Save hours of documentation time"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PRD Generator
              </span>
            </div>
            <Link to="/generator">
              <Button variant="hero" size="sm">
                Try It Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Product Documentation
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Turn Ideas Into 
            <br />
            AI-Ready PRDs
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop struggling with complex prompts. Answer 5 simple questions and get a 
            professional Product Requirements Document that any AI app builder can understand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button size="lg" variant="hero" className="text-lg px-8 py-6">
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Your First PRD
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            ✨ No signup required • 🚀 Works with Replit AI, Grok & more • 📝 Export ready
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your product ideas into structured documentation in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Founders Love Our PRD Generator
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built specifically for non-technical founders who want to turn their ideas 
                into apps without getting stuck on documentation.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/generator" className="inline-block mt-8">
                <Button variant="hero" size="lg">
                  Start Building Your PRD
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-mono text-muted-foreground">
                    Generated PRD Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                    <div className="text-primary font-bold"># Product Requirements Document</div>
                    <div className="mt-2 text-muted-foreground">
                      ## Product Overview<br />
                      A task management app that helps...<br />
                      <br />
                      ## Target Audience<br />
                      Remote teams, freelancers...<br />
                      <br />
                      ## Core Features<br />
                      - Task creation and management<br />
                      - Team collaboration tools<br />
                      - Deadline tracking...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-primary text-white border-0 shadow-glow">
            <CardContent className="py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Your App?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of founders who've turned their ideas into apps with our AI-powered PRD generator.
              </p>
              <Link to="/generator">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Your PRD Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 PRD Generator. Built with ❤️ for founders and entrepreneurs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;