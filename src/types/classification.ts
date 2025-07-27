export interface ClassificationResult {
  class: string;
  confidence: number;
  description: string;
  recommendation: string;
  detectionTime: number;
}

export interface ClassificationResult {
  class: string;
  confidence: number;
  description: string;
  recommendation: string;
  classificationTime: number;
}

// export interface CroppedArea {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }