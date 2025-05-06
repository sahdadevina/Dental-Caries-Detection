import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Crop, Area } from 'react-easy-crop/types';
import { MoveHorizontal, ZoomIn } from 'lucide-react';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedAreaPixels: Area) => void;
  onCropConfirm: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  onCropConfirm,
}) => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  const handleConfirmCrop = () => {
    if (croppedAreaPixels) {
      onCropConfirm();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative h-[400px] w-full bg-black rounded-lg overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
          cropShape="rect"
          showGrid={true}
        />
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <MoveHorizontal size={20} className="text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Pan</span>
          </div>
          <p className="text-xs text-gray-500">
            Click and drag the image to position the tooth in the center
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <ZoomIn size={20} className="text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Zoom</span>
          </div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Aspect Ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1:1 (Square)</option>
            <option value={4/3}>4:3</option>
            <option value={16/9}>16:9</option>
            <option value={0}>Free</option>
          </select>
        </div>
        
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-300 focus:outline-none"
          onClick={handleConfirmCrop}
        >
          Analyze Selected Area
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;