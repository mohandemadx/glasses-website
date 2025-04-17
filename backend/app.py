# app.py
from flask import Flask, render_template, Response, request, redirect, url_for
from tryon import GlassesTryOn
import cv2

app = Flask(__name__)
glasses_tryon = GlassesTryOn()

def generate_frames():
    while True:
        frame = glasses_tryon.process_frame()
        if frame is None:
            continue
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/change', methods=['POST'])
def change_glasses():
    direction = request.form.get("direction")
    if direction == 'next':
        glasses_tryon.next_glass()
    elif direction == 'prev':
        glasses_tryon.prev_glass()
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True)
