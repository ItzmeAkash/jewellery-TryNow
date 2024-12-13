from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import mediapipe as mp
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MediaPipe modules
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.7)

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.7)

# Global variables for images
bracelet_img = None
earring_img = None


def calculate_distance(point1, point2):
    return int(np.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2))


def overlay_transparent(background, overlay, x, y, overlay_size=None):
    if overlay_size:
        overlay = cv2.resize(overlay, overlay_size)
    h, w, _ = overlay.shape
    bg_h, bg_w, _ = background.shape

    if y + h > bg_h or x + w > bg_w or x < 0 or y < 0:
        h = min(h, bg_h - y)
        w = min(w, bg_w - x)
        overlay = overlay[:h, :w]

    roi = background[y:y+h, x:x+w]
    overlay_rgb = overlay[..., :3]
    mask = overlay[..., 3:] / 255.0 if overlay.shape[2] == 4 else None

    if mask is None:
        raise ValueError("Overlay image does not have an alpha channel.")

    if mask.shape[:2] != roi.shape[:2]:
        mask = cv2.resize(mask, (roi.shape[1], roi.shape[0]))

    if mask.ndim == 2:
        mask = mask[:, :, np.newaxis]

    blended = roi * (1 - mask) + overlay_rgb * mask
    background[y:y+h, x:x+w] = blended.astype(np.uint8)
    return background


@app.post("/upload/Bracelets")
async def upload_bracelet(file: UploadFile = File(...)):
    global bracelet_img
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    bracelet_img = cv2.imdecode(np_img, cv2.IMREAD_UNCHANGED)
    if bracelet_img is None:
        return {"error": "Failed to load bracelet image."}
    return {"message": "Bracelet image uploaded successfully."}


@app.post("/upload/Earrings")
async def upload_earring(file: UploadFile = File(...)):
    global earring_img
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    earring_img = cv2.imdecode(np_img, cv2.IMREAD_UNCHANGED)
    if earring_img is None:
        return {"error": "Failed to load earring image."}
    return {"message": "Earring image uploaded successfully."}


def generate_video_bracelet():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks and bracelet_img is not None:
            for hand_landmarks in results.multi_hand_landmarks:
                h, w, _ = frame.shape
                wrist = hand_landmarks.landmark[0]
                index_finger_base = hand_landmarks.landmark[5]

                wrist_point = (int(wrist.x * w), int(wrist.y * h))
                index_point = (int(index_finger_base.x * w), int(index_finger_base.y * h))
                bracelet_size = calculate_distance(wrist_point, index_point)

                x = wrist_point[0] - bracelet_size // 2
                y = wrist_point[1] - bracelet_size // 2

                frame = overlay_transparent(frame, bracelet_img, x, y, (bracelet_size, bracelet_size))

        _, jpeg = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    cap.release()


def generate_video_earring():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_frame)

        if results.multi_face_landmarks and earring_img is not None:
            for face_landmarks in results.multi_face_landmarks:
                h, w, _ = frame.shape

                left_top = (int(face_landmarks.landmark[234].x * w), int(face_landmarks.landmark[234].y * h))
                left_lobe = (int(face_landmarks.landmark[177].x * w), int(face_landmarks.landmark[177].y * h))
                right_top = (int(face_landmarks.landmark[454].x * w), int(face_landmarks.landmark[454].y * h))
                right_lobe = (int(face_landmarks.landmark[401].x * w), int(face_landmarks.landmark[401].y * h))

                left_size = calculate_distance(left_top, left_lobe)
                right_size = calculate_distance(right_top, right_lobe)

                frame = overlay_transparent(frame, earring_img, left_lobe[0] - left_size // 2, left_lobe[1] - left_size // 2, (left_size, left_size))
                frame = overlay_transparent(frame, earring_img, right_lobe[0] - right_size // 2, right_lobe[1] - right_size // 2, (right_size, right_size))

        _, jpeg = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    cap.release()


@app.get("/video/Bracelets")
async def video_bracelet():
    return StreamingResponse(generate_video_bracelet(), media_type="multipart/x-mixed-replace; boundary=frame")


@app.get("/video/Earrings")
async def video_earring():
    return StreamingResponse(generate_video_earring(), media_type="multipart/x-mixed-replace; boundary=frame")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
