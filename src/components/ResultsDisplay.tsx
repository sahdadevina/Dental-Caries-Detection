import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { ClassificationResult } from '../types/classification';

interface ResultsDisplayProps {
  result: ClassificationResult | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="mt-6 h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col items-center justify-center text-center py-6">
          <HelpCircle size={48} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Results Yet</h3>
          <p className="text-gray-500 max-w-md">
            Upload a dental X-ray image and crop to a specific tooth area to see classification results
          </p>
        </div>
      </div>
    );
  }

  // Determine the color and icon based on severity
  const getSeverityInfo = () => {
    if (result.class === 'No Caries') {
      return {
        icon: <CheckCircle size={24} className="text-green-500" />,
        color: 'bg-green-100 text-green-800',
        border: 'border-green-200',
      };
    } else if (['Initial Caries', 'Moderate Caries'].includes(result.class)) {
      return {
        icon: <AlertTriangle size={24} className="text-yellow-500" />,
        color: 'bg-yellow-100 text-yellow-800',
        border: 'border-yellow-200',
      };
    } else {
      return {
        icon: <AlertTriangle size={24} className="text-red-500" />,
        color: 'bg-red-100 text-red-800',
        border: 'border-red-200',
      };
    }
  };

  const severityInfo = getSeverityInfo();

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border ${severityInfo.border}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Classification Results</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${severityInfo.color}`}>
          {severityInfo.icon}
          <span className="ml-1">{result.class}</span>
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Confidence Score</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${Math.round(Math.min(result.confidence, 0.99) * 100)}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-600 mt-1">
            {Math.round(Math.min(result.confidence, 0.99) * 100)}%
          </p>
        </div>

        <div className="pt-2">
          <h4 className="text-md font-medium text-gray-700 mb-2">Description</h4>
          <p className="text-gray-600">
            {result.description}
          </p>
        </div>

        <div className="pt-2">
          <h4 className="text-md font-medium text-gray-700 mb-2">Recommendation</h4>
          <p className="text-gray-600">
            {result.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;