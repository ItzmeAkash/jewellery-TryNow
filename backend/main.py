from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import mediapipe as mp
import numpy as np
import io

# Initialize FastAPI app
app = FastAPI()


# Allow CORS for your React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7)

# Global variable for bracelet image
bracelet_img = None

def calculate_distance(point1, point2):
    """Calculate Euclidean distance between two points."""
    return int(np.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2))

def overlay_transparent(background, overlay, x, y, overlay_size=None):
    """Overlays a transparent PNG on a background at (x, y) with optional resizing."""
    if overlay_size:
        overlay = cv2.resize(overlay, overlay_size)

    h, w, _ = overlay.shape
    bg_h, bg_w, _ = background.shape

    # Ensure the overlay fits within the background dimensions
    if y + h > bg_h or x + w > bg_w or x < 0 or y < 0:
        h = min(h, bg_h - y)
        w = min(w, bg_w - x)
        overlay = overlay[:h, :w]

    roi = background[y:y+h, x:x+w]

    # Ensure roi is valid before processing
    if roi.size == 0:
        return background  # No valid region to overlay

    # Extract overlay RGB and alpha channels
    overlay_rgb = overlay[..., :3]  # RGB
    mask = overlay[..., 3:] / 255.0  # Alpha

    # Resize mask if needed to match ROI size
    if mask.shape[:2] != roi.shape[:2]:
        mask = cv2.resize(mask, (roi.shape[1], roi.shape[0]))

    # Add dimension if mask is 2D
    if mask.ndim == 2:
        mask = mask[:, :, np.newaxis]

    # Blend the overlay with the background using the mask
    blended = roi * (1 - mask) + overlay_rgb * mask
    background[y:y+h, x:x+w] = blended.astype(np.uint8)
    return background

@app.post("/upload/Bracelets")
async def upload_bracelet(file: UploadFile = File(...)):
    global bracelet_img
    # Read image file
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    bracelet_img = cv2.imdecode(np_img, cv2.IMREAD_UNCHANGED)
    
    if bracelet_img is None:
        return {"error": "Could not load bracelet image."}
    
    return {"message": "Bracelet image uploaded successfully."}

def generate_video():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Flip frame for mirror view and convert to RGB for MediaPipe
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the frame with MediaPipe Hands
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks and bracelet_img is not None:
            for hand_landmarks in results.multi_hand_landmarks:
                h, w, _ = frame.shape

                # Get wrist and index finger base landmarks
                wrist = hand_landmarks.landmark[0]  # Wrist landmark
                index_finger_base = hand_landmarks.landmark[5]  # Index finger base

                # Convert landmarks to pixel coordinates
                wrist_point = (int(wrist.x * w), int(wrist.y * h))
                index_point = (int(index_finger_base.x * w), int(index_finger_base.y * h))

                # Calculate bracelet size based on distance between wrist and index finger base
                bracelet_size = calculate_distance(wrist_point, index_point)

                # Adjust the bracelet position
                x = wrist_point[0] - bracelet_size // 2
                y = wrist_point[1] - bracelet_size // 2

                # Overlay the bracelet on the wrist
                frame = overlay_transparent(frame, bracelet_img, x, y, (bracelet_size, bracelet_size))

        # Encode frame as JPEG
        _, jpeg = cv2.imencode('.jpg', frame)
        frame_bytes = jpeg.tobytes()
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()

@app.get("/video/Bracelets")
async def video_bracelet():
    return StreamingResponse(generate_video(), media_type="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
