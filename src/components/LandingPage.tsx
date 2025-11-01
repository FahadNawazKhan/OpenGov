
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  MapPin, Users, Shield, Zap, AlertCircle, CheckCircle, 
  TrendingUp, Clock, Award, Globe, BarChart3, FileText,
  Camera, MessageSquare, Bell, Map, Target, ArrowRight,
  ChevronRight, Star, ThumbsUp, Eye
} from 'lucide-react';
import LandingPageNavbar from './LandingPageNavbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('landing-navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('bg-background/80', 'backdrop-blur-sm');
        } else {
          navbar.classList.remove('bg-background/80', 'backdrop-blur-sm');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingPageNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyber via-electric to-neon py-20 px-4">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/30 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            {t('landing.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-lg">
            {t('landing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-cyber hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl hover-scale font-bold"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white/40 hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm hover-scale font-semibold"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
            How OpenGov Works
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Simple, transparent, and effective civic engagement
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-cyber/20 to-cyber/5 border-cyber/30 hover-scale">
              <div className="w-16 h-16 bg-cyber rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Report Issues</h3>
              <p className="text-muted-foreground">
                Citizens can easily report local issues like potholes, broken streetlights, or safety concerns with precise location data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-electric/20 to-electric/5 border-electric/30 hover-scale">
              <div className="w-16 h-16 bg-electric rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Track your reports in real-time. Get instant notifications when authorities review or resolve your submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-neon/20 to-neon/5 border-neon/30 hover-scale">
              <div className="w-16 h-16 bg-neon rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Authority Dashboard</h3>
              <p className="text-muted-foreground">
                Local authorities can efficiently manage, assign, and resolve citizen reports through a dedicated dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* How It Works - Step by Step */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber/20 text-cyber border-cyber/30">SIMPLE PROCESS</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Report Issues in 3 Easy Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our streamlined process makes civic engagement effortless and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="relative">
              <Card className="p-8 card-kurzgesagt bg-gradient-to-br from-cyber/10 to-cyber/5 border-cyber/20 hover-scale">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyber rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <Camera className="w-12 h-12 text-cyber mb-4 mt-2" />
                <h3 className="text-xl font-bold mb-3">Capture & Report</h3>
                <p className="text-muted-foreground">
                  Take a photo of the issue, add a description, and pin the exact location on the map. It takes less than 2 minutes!
                </p>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 text-cyber">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Card className="p-8 card-kurzgesagt bg-gradient-to-br from-electric/10 to-electric/5 border-electric/20 hover-scale">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-electric rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <Bell className="w-12 h-12 text-electric mb-4 mt-2" />
                <h3 className="text-xl font-bold mb-3">Get Noticed</h3>
                <p className="text-muted-foreground">
                  Your report is instantly sent to the relevant local authority. They receive real-time notifications to take action.
                </p>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 text-electric">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Card className="p-8 card-kurzgesagt bg-gradient-to-br from-success/10 to-success/5 border-success/20 hover-scale">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-success rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <Target className="w-12 h-12 text-success mb-4 mt-2" />
                <h3 className="text-xl font-bold mb-3">Track Resolution</h3>
                <p className="text-muted-foreground">
                  Monitor your report&apos;s status in real-time. Get updates when work starts and when the issue is resolved.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-electric/20 text-electric border-electric/30">POWERFUL FEATURES</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Everything You Need for Civic Engagement
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-scale glass-card border-cyber/20">
              <Map className="w-10 h-10 text-cyber mb-4" />
              <h3 className="text-lg font-bold mb-2">Interactive Maps</h3>
              <p className="text-muted-foreground text-sm">
                View all reports on an interactive map. See patterns and hotspots in your neighborhood.
              </p>
            </Card>

            <Card className="p-6 hover-scale glass-card border-electric/20">
              <Camera className="w-10 h-10 text-electric mb-4" />
              <h3 className="text-lg font-bold mb-2">Photo Evidence</h3>
              <p className="text-muted-foreground text-sm">
                Upload multiple photos to document issues clearly and help authorities understand the problem.
              </p>
            </Card>

            <Card className="p-6 hover-scale glass-card border-neon/20">
              <MessageSquare className="w-10 h-10 text-neon mb-4" />
              <h3 className="text-lg font-bold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground text-sm">
                Stay informed with instant notifications about your report&apos;s progress and resolution.
              </p>
            </Card>

            <Card className="p-6 hover-scale glass-card border-success/20">
              <BarChart3 className="w-10 h-10 text-success mb-4" />
              <h3 className="text-lg font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground text-sm">
                Authorities get powerful analytics to track trends and prioritize critical issues.
              </p>
            </Card>

            <Card className="p-6 hover-scale glass-card border-cyber/20">
              <Clock className="w-10 h-10 text-cyber mb-4" />
              <h3 className="text-lg font-bold mb-2">Status Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Track every stage from submission to resolution with transparent status updates.
              </p>
            </Card>

            <Card className="p-6 hover-scale glass-card border-electric/20">
              <Award className="w-10 h-10 text-electric mb-4" />
              <h3 className="text-lg font-bold mb-2">Priority System</h3>
              <p className="text-muted-foreground text-sm">
                Issues are automatically categorized and prioritized based on severity and impact.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              What Can You Report?
            </h2>
            <p className="text-muted-foreground text-lg">
              From infrastructure to safety, we cover all civic issues
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 card-kurzgesagt bg-gradient-to-br from-cyber/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyber/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyber" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Infrastructure Issues</h3>
                  <p className="text-muted-foreground mb-3">
                    Potholes, broken roads, damaged sidewalks, missing street signs, and construction hazards.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Potholes</Badge>
                    <Badge variant="outline" className="text-xs">Road Damage</Badge>
                    <Badge variant="outline" className="text-xs">Sidewalks</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 card-kurzgesagt bg-gradient-to-br from-electric/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-electric/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-electric" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Utilities & Services</h3>
                  <p className="text-muted-foreground mb-3">
                    Broken streetlights, water leaks, electricity issues, drainage problems, and public facility maintenance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Streetlights</Badge>
                    <Badge variant="outline" className="text-xs">Water Leaks</Badge>
                    <Badge variant="outline" className="text-xs">Drainage</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 card-kurzgesagt bg-gradient-to-br from-neon/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-neon/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Safety Concerns</h3>
                  <p className="text-muted-foreground mb-3">
                    Dangerous intersections, missing safety barriers, inadequate lighting in public areas, and security issues.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Traffic Safety</Badge>
                    <Badge variant="outline" className="text-xs">Public Safety</Badge>
                    <Badge variant="outline" className="text-xs">Security</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 card-kurzgesagt bg-gradient-to-br from-success/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Environment & Sanitation</h3>
                  <p className="text-muted-foreground mb-3">
                    Illegal dumping, overflowing bins, air pollution, noise complaints, and park maintenance issues.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Waste Management</Badge>
                    <Badge variant="outline" className="text-xs">Pollution</Badge>
                    <Badge variant="outline" className="text-xs">Parks</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      


      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                Building Better Communities Together
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Transparency:</strong> Every report is tracked and visible, ensuring accountability.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Efficiency:</strong> Streamlined processes help authorities respond faster.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Community:</strong> Citizens and authorities work together to improve neighborhoods.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Analytics:</strong> Data-driven insights help prioritize community needs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="card-kurzgesagt bg-gradient-to-br from-success/20 to-electric/10 border-success/30 p-8 hover-scale">
                <Users className="w-24 h-24 text-success mb-4" />
                <h3 className="text-2xl font-bold mb-3 gradient-text">Join Thousands of Citizens</h3>
                <p className="text-muted-foreground mb-6">
                  Already making a difference in their communities through OpenGov.
                </p>
                <Button 
                  className="bg-success text-success-foreground hover:bg-success/90 rounded-full shadow-lg hover-scale"
                  onClick={() => navigate('/auth')}
                >
                  Start Reporting Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-neon/20 text-neon border-neon/30">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <Card className="p-6 hover-scale glass-card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyber/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-cyber" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Is OpenGov free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes! OpenGov is completely free for all citizens. We believe civic engagement should be accessible to everyone.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-scale glass-card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-electric" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">How long does it take to resolve an issue?</h3>
                  <p className="text-muted-foreground">
                    Resolution times vary by issue type and severity. Most reports are reviewed within 24 hours, with an average resolution time of 3-5 days.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-scale glass-card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-neon/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Can I report anonymously?</h3>
                  <p className="text-muted-foreground">
                    Currently, you need to create an account to submit reports. This helps ensure accountability and allows you to track your submissions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-scale glass-card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">What areas does OpenGov cover?</h3>
                  <p className="text-muted-foreground">
                    OpenGov is available across India in 500+ cities. If your city isn&apos;t covered yet, we&apos;re constantly expanding!
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-scale glass-card">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyber/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-cyber" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">How do authorities access the platform?</h3>
                  <p className="text-muted-foreground">
                    Local authorities can sign up for an authority account to access their dedicated dashboard with advanced management and analytics tools.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-cyber via-electric to-neon relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-pulse">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/95 mb-8 drop-shadow-md max-w-2xl mx-auto">
            Whether you're a citizen wanting to report an issue or an authority ready to serve your community better, OpenGov is here for you.
          </p>
          <Button 
            size="lg"
            className="bg-white text-cyber hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl hover-scale font-bold"
            onClick={() => navigate('/auth')}
          >
            Join OpenGov Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
