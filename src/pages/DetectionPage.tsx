import React, { useState, useCallback } from 'react';
import { Area } from 'react-easy-crop/types';
import ImageUploader from '../components/ImageUploader';
import ImageCropper from '../components/ImageCropper';
import ResultsDisplay from '../components/ResultsDisplay';
import ProgressSteps from '../components/ProgressSteps';
import { DetectionResult } from '../types/detection';
import { detectCaries } from '../utils/modelIntegration';

const DetectionPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelected = useCallback((imageFile: File) => {
    setSelectedImage(imageFile);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(imageFile);
    setStep(2);
  }, []);

  const handleCropComplete = useCallback((croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleCropConfirm = useCallback(async () => {
    if (!imagePreview || !croppedAreaPixels) return;
    
    setStep(3);
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, you would send the cropped image to your model
      // For demo purposes, we'll use a timeout to simulate processing time
      const detectionResult = await detectCaries(imagePreview, croppedAreaPixels);
      setResult(detectionResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  }, [imagePreview, croppedAreaPixels]);

  const resetDetection = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setCroppedAreaPixels(null);
    setResult(null);
    setStep(1);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dental Caries Detection</h1>
      
      <ProgressSteps currentStep={step} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload X-ray Image</h2>
              <p className="text-gray-600 mb-6">
                Upload a dental X-ray image to begin the caries detection process. 
                We support JPG, PNG, and TIFF file formats.
              </p>
              <ImageUploader onImageSelected={handleImageSelected} />
            </>
          )}
          
          {step === 2 && imagePreview && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop Image</h2>
              <p className="text-gray-600 mb-6">
                Select the specific tooth area you want to analyze by adjusting the crop box.
                For best results, center the tooth in the frame.
              </p>
              <ImageCropper 
                image={imagePreview} 
                onCropComplete={handleCropComplete}
                onCropConfirm={handleCropConfirm}
              />
            </>
          )}
          
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis</h2>
              <p className="text-gray-600 mb-6">
                {isAnalyzing 
                  ? 'Processing your image. This may take a few moments...' 
                  : 'Analysis complete! Review the results on the right.'}
              </p>
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Selected dental X-ray" 
                    className="max-h-[300px] rounded-lg mx-auto"
                  />
                  {/* We could show the cropped area overlay here */}
                </div>
              )}
              <button
                onClick={resetDetection}
                className="mt-6 w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Start New Detection
              </button>
            </>
          )}
        </div>
        
        <div>
          <ResultsDisplay 
            result={result} 
            isLoading={isAnalyzing} 
          />
          
          {result && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detection Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Detection Class:</span>
                  <span className="font-medium">{result.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Detection Time:</span>
                  <span className="font-medium">{result.detectionTime}ms</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;