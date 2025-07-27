import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, FileText, AlertCircle, HelpCircle, BookOpen, Award, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About My Dental Care</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          My Dental Care leverages cutting-edge AI technology to help dental professionals 
          detect and classify dental caries according to G.V. Black's classification system, 
          providing greater accuracy and efficiency in dental diagnostics.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Technology</h2>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <p className="text-gray-700 mb-6">
            Our advanced deep learning model has been trained on thousands of dental X-ray images 
            to classify seven different classes of dental conditions based on G.V. Black's classification system:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class I Caries</h3>
                <p className="text-gray-600 text-sm">Caries located in pits and fissures on the occlusal surfaces of molars and premolars, or in the lingual pits of maxillary incisors</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class II Caries</h3>
                <p className="text-gray-600 text-sm">Caries found on the proximal (mesial or distal) surfaces of posterior teeth, including molars and premolars</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class III Caries</h3>
                <p className="text-gray-600 text-sm">Caries on the proximal surfaces of anterior teeth without involvement of the incisal angle</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class IV Caries</h3>
                <p className="text-gray-600 text-sm">Caries on the proximal surfaces of anterior teeth involving the incisal angle</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class V Caries</h3>
                <p className="text-gray-600 text-sm">Caries located in the cervical third of the facial or lingual surfaces of both anterior and posterior teeth</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full mt-0.5">
                <AlertCircle size={16} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Class VI Caries</h3>
                <p className="text-gray-600 text-sm">Caries involving the incisal edges of anterior teeth or the cusp tips of posterior teeth</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full mt-0.5">
                <HelpCircle size={16} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Non-Caries</h3>
                <p className="text-gray-600 text-sm">No visible carious lesion detected. This category may include healthy teeth or non-carious conditions such as developmental anomalies, fluorosis, or minor enamel defects</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700">
            Our model achieves over 91% accuracy in clinical validation studies, providing 
            dental professionals with a reliable second opinion to complement their expertise.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Award size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Accuracy</h3>
          <p className="text-gray-600">
            Our classification system has been validated in clinical settings with a 91% accuracy rate when 
            compared to expert diagnoses.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Research-Based</h3>
          <p className="text-gray-600">
            Built on G.V. Black's classification system and trained on thousands of expertly labeled 
            dental X-ray images.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Users size={24} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">User-Friendly</h3>
          <p className="text-gray-600">
            Designed with dental professionals in mind, providing an intuitive interface that 
            seamlessly integrates into clinical workflows.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to enhance your diagnostic accuracy?</h2>
            <p className="text-gray-700 max-w-2xl mb-6 md:mb-0">
              Start using our AI-powered dental caries classification system today to improve patient outcomes.
            </p>
          </div>
          <NavLink
            to="/classification"
            className="inline-flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            Try It Now
            <ArrowRight size={20} className="ml-2" />
          </NavLink>
        </div>
      </section>

      <section>
        <div className="flex items-center space-x-2 mb-4">
          <FileText size={20} className="text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">Documentation</h2>
        </div>
        <p className="text-gray-600 mb-4">
          For more detailed information on how to use My Dental Care, interpretation of results, 
          and technical specifications, please refer to our documentation.
        </p>
        <a 
          href="#" 
          className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          View Documentation →
        </a>
      </section>
    </div>
  );
};

export default AboutPage;