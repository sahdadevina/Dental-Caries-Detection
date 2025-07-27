import { Area } from "react-easy-crop/types";
import { ClassificationResult } from "../types/classification";
import axios from "axios";

export const classifyCaries = async (
  image: string,
  croppedArea: Area
): Promise<ClassificationResult> => {
  const byteString = atob(image.split(",")[1]);
  const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
  const imageContent = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    imageContent[i] = byteString.charCodeAt(i);
  }

  const imageBlob = new Blob([imageContent], { type: mimeString });
  const formData = new FormData();
  formData.append("file", imageBlob, "cropped_image.png");

  try {
    const start = Date.now();
    const response = await axios.post(
      "http://localhost:8000/api/v1/analyze",
      formData
    );
    const end = Date.now();

    const {
      caries_class,
      description,
      recommendation,
      confidence_level,
    } = response.data;

    return {
      class: caries_class,
      confidence: confidence_level,
      description,
      recommendation,
      classificationTime: end - start,
    };
  } catch (error) {
    console.error("❌ Error analyzing image:", error);
    return {
      class: "Error",
      confidence: 0,
      description: "An error occurred while processing the image.",
      recommendation: "Please try again later.",
      classificationTime: 0,
    };
  }
};

