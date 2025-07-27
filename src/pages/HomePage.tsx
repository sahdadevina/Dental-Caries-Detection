import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, FileImage, BarChart2, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]"></div>
        <div className="relative p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Advanced Dental Caries Classification<br />Powered by AI
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
            Upload dental X-rays and get instant AI-powered analysis to 
            identify and classify dental caries with clinical precision.
          </p>
          <NavLink
            to="/classification"
            className="inline-flex items-center bg-white text-blue-700 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 focus:outline-none"
          >
            Start Classifying
            <ArrowRight size={20} className="ml-2" />
          </NavLink>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileImage size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload X-ray</h3>
            <p className="text-gray-600">
              Upload your dental X-ray image in common formats (JPG, PNG). The system accepts only periapical X-ray image.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Zap size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Crop & Analyze</h3>
            <p className="text-gray-600">
              Use our interactive cropping tool to select specific tooth areas for analysis. Our AI model processes the selection instantly.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart2 size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Results</h3>
            <p className="text-gray-600">
              View detailed classification results showing caries classification across 6 different categories with confidence scores and recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to improve your diagnostic accuracy?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Start using our AI-powered dental caries classification system today to enhance your diagnostic capabilities and provide better patient care.
        </p>
        <NavLink
          to="/classification"
          className="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Try It Now
          <ArrowRight size={20} className="ml-2" />
        </NavLink>
      </section>
    </div>
  );
};

export default HomePage;