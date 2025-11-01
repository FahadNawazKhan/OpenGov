
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const LandingPageNavbar = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="landing-navbar">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">OpenGov</h1>
          </div>

          <div className="hidden md:flex items-center gap-6 text-white/90 font-medium">
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo('use-cases')} className="hover:text-white transition-colors">Use Cases</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="outline"
              className="bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm"
              onClick={() => navigate('/auth')}
            >
              Login / Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
