import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingTourProps {
  role: 'citizen' | 'authority';
}

const OnboardingTour = ({ role }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(`opengov_tour_${role}`);
    if (!hasSeenTour) {
      setShow(true);
    }
  }, [role]);

  const citizenSteps = [
    {
      title: 'Welcome to OpenGov!',
      description: 'Report community issues and track their progress in real-time.',
    },
    {
      title: 'Submit Reports',
      description: 'Click "Submit New Report" to report issues like potholes, broken lights, or safety concerns.',
    },
    {
      title: 'Track Progress',
      description: 'Monitor your reports and get updates when authorities take action.',
    },
    {
      title: 'Use Filters',
      description: 'Search and filter your reports by category, status, or date.',
    },
  ];

  const authoritySteps = [
    {
      title: 'Welcome to OpenGov Authority Dashboard!',
      description: 'Efficiently manage and respond to citizen reports.',
    },
    {
      title: 'Review Reports',
      description: 'See all citizen reports with filters to prioritize urgent issues.',
    },
    {
      title: 'Update Status',
      description: 'Mark reports as in progress, resolved, or rejected to keep citizens informed.',
    },
    {
      title: 'Assign Tasks',
      description: 'Assign reports to team members and add internal notes.',
    },
  ];

  const steps = role === 'citizen' ? citizenSteps : authoritySteps;

  const handleClose = () => {
    localStorage.setItem(`opengov_tour_${role}`, 'true');
    setShow(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>

        <div className="flex items-center gap-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingTour;
