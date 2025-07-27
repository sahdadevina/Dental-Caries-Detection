import os
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
import numpy as np
import tensorflow as tf

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Path ke model
model_path = os.path.join(os.path.dirname(__file__), "model", "model.keras")

try:
    model = tf.keras.models.load_model(model_path)
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error("Error loading model: %s", e)
    raise

# Inisialisasi FastAPI
app = FastAPI()

# Allow CORS
origins = [
    "http://localhost:5173",  # React Vite default
    "http://localhost",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fungsi preprocessing
def preprocess_image(image: Image.Image) -> np.ndarray:
    img = image.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Endpoint utama
@app.post("/api/v1/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        preprocessed_image = preprocess_image(image)
    except UnidentifiedImageError as e:
        logger.error("Uploaded file is not a valid image: %s", e)
        raise HTTPException(status_code=400, detail="Invalid image file")
    except Exception as e:
        logger.error("Error processing image file: %s", e)
        raise HTTPException(status_code=500, detail="Internal server error")

    try:
        prediction = model.predict(preprocessed_image)
        predicted_class = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))

        class_names = [
            "Class I Caries",
            "Class II Caries",
            "Class III Caries",
            "Class IV Caries",
            "Class V Caries",
            "Class VI Caries",
            "Non-Caries",
        ]

        descriptions = [
            "Caries located in pits and fissures on the occlusal surfaces of molars and premolars, or in the lingual pits of maxillary incisors.",
            "Caries found on the proximal (mesial or distal) surfaces of posterior teeth, including molars and premolars.",
            "Caries on the proximal surfaces of anterior teeth without involvement of the incisal angle.",
            "Caries on the proximal surfaces of anterior teeth involving the incisal angle.",
            "Caries located in the cervical third of the facial or lingual surfaces of both anterior and posterior teeth.",
            "Caries involving the incisal edges of anterior teeth or the cusp tips of posterior teeth.",
            "No visible carious lesion detected. This may include healthy teeth or non-carious conditions such as developmental anomalies, fluorosis, or minor enamel defects.",
        ]

        recommendations = [
            "Prompt restoration is recommended using composite resin or amalgam, depending on the depth and accessibility of the lesion.",
            "Requires radiographic evaluation and restoration using composite resin or amalgam. Consider preventive measures for adjacent contacts.",
            "Aesthetic restoration using composite resin is recommended to preserve function and appearance.",
            "Immediate restoration with composite resin buildup is necessary. A crown may be indicated for extensive damage.",
            "Restoration with glass ionomer cement (GIC) or composite resin is advised. Periodic monitoring of gingival health is essential.",
            "Restoration with composite resin is recommended. Occlusal analysis may be needed to identify contributing parafunctional habits.",
            "Maintain proper oral hygiene and continue routine dental check-ups every 6 months.",
        ]

        result = {
            "caries_class": class_names[predicted_class],
            "description": descriptions[predicted_class],
            "recommendation": recommendations[predicted_class],
            "confidence_level": confidence,
        }

        logger.info("Prediction result: %s", result)
        return JSONResponse(content=result)

    except Exception as e:
        logger.error("Error during prediction: %s", e)
        raise HTTPException(status_code=500, detail="Error processing image")

# Untuk run manual jika dijalankan langsung
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")

