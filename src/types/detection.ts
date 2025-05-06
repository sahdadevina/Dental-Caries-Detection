export interface DetectionResult {
  class: string;
  confidence: number;
  description: string;
  recommendation: string;
  detectionTime: number;
}

export interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}