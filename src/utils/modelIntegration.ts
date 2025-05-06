import { Area } from 'react-easy-crop/types';
import { DetectionResult } from '../types/detection';

// Mock data for demonstration purposes
const cariesClasses = [
  {
    class: 'Class I Caries',
    description: 'Caries detected in pits and fissures on the occlusal surfaces of molars and premolars, or on the buccal/lingual surfaces of molars/maxillary incisors.',
    recommendation: 'Requires immediate attention. Consider composite resin restoration or amalgam filling depending on cavity size and location.'
  },
  {
    class: 'Class II Caries',
    description: 'Caries present on the proximal (mesial or distal) surfaces of premolars and molars.',
    recommendation: 'Treatment with composite or amalgam restoration recommended. Consider preventive resin restoration if caught early.'
  },
  {
    class: 'Class III Caries',
    description: 'Caries on proximal surfaces of anterior teeth without incisal angle involvement.',
    recommendation: 'Composite resin restoration recommended for aesthetic and functional restoration.'
  },
  {
    class: 'Class IV Caries',
    description: 'Caries on proximal surfaces of anterior teeth with incisal angle involvement.',
    recommendation: 'Immediate restoration needed. Consider composite buildup or crown depending on extent of damage.'
  },
  {
    class: 'Class V Caries',
    description: 'Caries in the gingival third (cervical area) of facial or lingual surfaces.',
    recommendation: 'Treatment with glass ionomer or composite restoration recommended. Monitor gingival health.'
  },
  {
    class: 'Class VI Caries',
    description: 'Caries on incisal edges of anterior teeth or cusp tips of posterior teeth.',
    recommendation: 'Restore with composite resin. Consider occlusal analysis to prevent future wear.'
  },
  {
    class: 'Non-Caries',
    description: 'No carious lesions detected. May include normal teeth or non-caries conditions such as enamel hypoplasia, fluorosis, or trauma.',
    recommendation: 'Continue regular dental hygiene practices and schedule routine check-ups every 6 months.'
  }
];

export const detectCaries = async (
  image: string,
  croppedArea: Area
): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cariesClasses.length);
      const selectedClass = cariesClasses[randomIndex];
      
      const confidence = 0.7 + Math.random() * 0.29;
      const detectionTime = Math.floor(500 + Math.random() * 1500);
      
      resolve({
        class: selectedClass.class,
        confidence,
        description: selectedClass.description,
        recommendation: selectedClass.recommendation,
        detectionTime
      });
    }, 2000);
  });
};