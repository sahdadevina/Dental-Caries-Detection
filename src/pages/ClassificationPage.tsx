import React, { useState, useCallback } from 'react';
import { Area } from 'react-easy-crop/types';
import ImageUploader from '../components/ImageUploader';
import ImageCropper from '../components/ImageCropper';
import ResultsDisplay from '../components/ResultsDisplay';
import ProgressSteps from '../components/ProgressSteps';
import { ClassificationResult } from '../types/classification';
import { classifyCaries } from '../utils/modelIntegration';

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, 'image/jpeg');
  });
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // prevent CORS issues
    image.src = url;
  });

const ClassificationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
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
      // 1. Convert cropped area to blob
      const croppedImageBlob = await getCroppedImg(imagePreview, croppedAreaPixels);
  
      // 2. Convert blob to File
      const croppedImageFile = new File([croppedImageBlob], "cropped.jpg", {
        type: "image/jpeg",
      });
  
      // 3. Upload to backend FastAPI
      const formData = new FormData();
      formData.append("file", croppedImageFile);
  
      const startTime = performance.now(); // ⏱ Start timer

      const response = await fetch("http://127.0.0.1:8000/api/v1/analyze", {
        method: "POST",
        body: formData,
      });

      const endTime = performance.now(); // ⏱ End timer
      const classificationDuration = Math.round(endTime - startTime); // hitung ms

      if (!response.ok) throw new Error("Failed to classify image");

      const backendResult = await response.json();

      const parsedResult: ClassificationResult = {
        class: backendResult.caries_class,
        confidence: backendResult.confidence_level,
        description: backendResult.description,
        recommendation: backendResult.recommendation,
        classificationTime: classificationDuration, // ⏱ tampilkan hasilnya
      };

      setResult(parsedResult);

  
    } catch (error) {
      console.error("Error during classification:", error);
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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dental Caries Classification</h1>
      
      <ProgressSteps currentStep={step} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload X-ray Image</h2>
              <p className="text-gray-600 mb-6">
                Upload a dental X-ray image to begin the caries classification process. 
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
                Start New Classification
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Classification Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Classification Class:</span>
                  <span className="font-medium">{result.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">{Math.round(Math.min(result.confidence, 0.99) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Classification Time:</span>
                  <span className="font-medium">{result.classificationTime}ms</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassificationPage;