# tryon.py
import cv2
import mediapipe as mp
import numpy as np
import os


class GlassesTryOn:
    def __init__(self, glasses_folder='static/galasess'):
        self.face_mesh = self.init_face_mesh()
        self.glasses_list = self.load_glasses(glasses_folder)
        self.brands, self.prices = self.load_brands_and_prices()
        self.current_glass_idx = 0
        self.glasses = self.glasses_list[self.current_glass_idx]
        self.cap = cv2.VideoCapture(0)

    def init_face_mesh(self):
        mp_face_mesh = mp.solutions.face_mesh
        return mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=False,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

    def load_glasses(self, folder):
        glasses = []
        for i in range(1, 33):
            img_path = os.path.join(folder, f"G{i}.png")
            img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
            if img is not None:
                glasses.append(img)
        return glasses

    def load_brands_and_prices(self):
        # Shortened for simplicity
        return [f"Brand{i}" for i in range(1, 33)], [f"${100+i*5}" for i in range(32)]

    def overlay_transparent(self, background, overlay, x, y, overlay_size=None):
        # Same as before...
        bg = background.copy()
        if overlay_size:
            overlay = cv2.resize(overlay, overlay_size)
        if overlay.shape[2] == 4:
            b, g, r, a = cv2.split(overlay)
            mask = cv2.merge((b, g, r))
            alpha = cv2.merge((a, a, a)).astype(float) / 255
        else:
            mask = overlay
            alpha = np.ones_like(mask, dtype=float)

        h, w, _ = mask.shape
        if y + h > bg.shape[0] or x + w > bg.shape[1] or x < 0 or y < 0:
            return bg

        roi = bg[y:y+h, x:x+w].astype(float)
        blended = (roi * (1 - alpha) + mask * alpha).astype(np.uint8)
        bg[y:y+h, x:x+w] = blended
        return bg

    def process_frame(self):
        ret, frame = self.cap.read()
        if not ret:
            return None
        frame = cv2.resize(frame, (640, 480))
        h, w, _ = frame.shape
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                x1 = int(face_landmarks.landmark[33].x * w)
                y1 = int(face_landmarks.landmark[33].y * h)
                x2 = int(face_landmarks.landmark[263].x * w)
                y2 = int(face_landmarks.landmark[263].y * h)

                glasses_width = int(2.0 * abs(x2 - x1) * 0.9)
                glasses_height = int(glasses_width * (self.glasses.shape[0] / self.glasses.shape[1]) * 0.9)
                x = int(x1 - (glasses_width / 4))
                y = int(y1 - (glasses_height / 2))

                frame = self.overlay_transparent(frame, self.glasses, x, y, (glasses_width, glasses_height))

        cv2.putText(frame, f"Model G{self.current_glass_idx+1}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
        return frame

    def next_glass(self):
        self.current_glass_idx = (self.current_glass_idx + 1) % len(self.glasses_list)
        self.glasses = self.glasses_list[self.current_glass_idx]

    def prev_glass(self):
        self.current_glass_idx = (self.current_glass_idx - 1) % len(self.glasses_list)
        self.glasses = self.glasses_list[self.current_glass_idx]
