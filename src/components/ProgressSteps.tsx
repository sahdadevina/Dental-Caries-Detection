import React from 'react';
import { Upload, Crop, BarChart } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'Upload X-ray', icon: Upload },
    { id: 2, title: 'Crop Image', icon: Crop },
    { id: 3, title: 'View Results', icon: BarChart },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep >= step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  <StepIcon size={20} />
                </div>
                <p 
                  className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 rounded transition-colors duration-300 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;