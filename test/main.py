import cv2
from deepface import DeepFace
import os
import time

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)

non_asian_start = None
current_non_asian_race = None

while True:
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    non_asian_found = False

    for (x, y, w, h) in faces:
        face = frame[y:y+h, x:x+w]
        try:
            objs = DeepFace.analyze(face, actions=['race'], enforce_detection=False)
            obj = objs[0]
            race = obj['dominant_race']

            if race.lower() != "asian": # change this to your race if you dont want to get locked out of your pc lmao
                non_asian_found = True
                if current_non_asian_race != race:
                    current_non_asian_race = race
                    non_asian_start = time.time()
                else:
                    if time.time() - non_asian_start > 2: # preventing some false positives :3
                        os.system("rundll32.exe user32.dll,LockWorkStation")
                        # os.system("shutdown /s /t 1")
                        non_asian_start = None
                        current_non_asian_race = None
            else:
                non_asian_start = None
                current_non_asian_race = None

            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            cv2.putText(frame, f'Race: {race}', (x, y-25), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

        except Exception as e:
            print(f"Error analyzing face: {e}")

    if not non_asian_found:
        non_asian_start = None
        current_non_asian_race = None

    cv2.imshow('Face Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()