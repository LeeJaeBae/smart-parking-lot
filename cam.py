import cv2
import pytesseract
import numpy as np

# """
# 0    Orientation and script detection (OSD) only.
#   1    Automatic page segmentation with OSD.
#   2    Automatic page segmentation, but no OSD, or OCR.
#   3    Fully automatic page segmentation, but no OSD. (Default)
#   4    Assume a single column of text of variable sizes.
#   5    Assume a single uniform block of vertically aligned text.
#   6    Assume a single uniform block of text.
#   7    Treat the image as a single text line.
#   8    Treat the image as a single word.
#   9    Treat the image as a single word in a circle.
#  10    Treat the image as a single character.
#  11    Sparse text. Find as much text as possible in no particular order.
#  12    Sparse text with OSD.
#  13    Raw line. Treat the image as a single text line,
#                         bypassing hacks that are Tesseract-specific.
# OCR Engine modes:
# 0    Legacy engine only.
# 1    Neural nets LSTM engine only.
# 2    Legacy + LSTM engines.
# 3    Default, based on what is available.
# """
cam = cv2.VideoCapture(0)

yolo = cv2.dnn.readNet("./data/yolov4.weights", "./data/yolov4.cfg")
classes = []
with open('data/classes/coco.names', 'r') as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = yolo.getLayerNames()
output = [layer_names[i[0] - 1] for i in yolo.getUnconnectedOutLayers()]
colors = np.random.uniform(0, 255, size=(len(classes),3))

print(classes)
while cam.isOpened():
    ret, img = cam.read()
    h,w,c = img.shape

    blob = cv2.dnn.blobFromImage(img, 0.00392, (416,416), (0,0,0), True, crop=False)
    yolo.setInput(blob)
    outs = yolo.forward(output)
    class_ids=[]
    confidences=[]
    boxes=[]
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)

            confidence = scores[class_id]

            if confidence > 0.2:
                center_x = int(detection[0] * w)
                center_y = int(detection[1] * h)
                dw = int(detection[2] * w)
                dh = int(detection[3] * h)

                x = int(center_x - dw /2)
                y = int(center_y - dh / 2)
                boxes.append([x,y,dw,dh])
                confidences.append(float(confidence))
                class_ids.append(class_id)
    indexes = cv2.dnn.NMSBoxes(boxes,confidences,0.45,0.4)

    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]

            center_x = int(x+w/2)
            center_y = int(y+h/2)

            label = ""


cam.release()
cv2.destroyAllWindows()

#
# img = cv2.resize(img, dsize=(1024, 800), interpolation=cv2.INTER_AREA)
# height, width, channel = img.shape
#
# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#
# structuringElement = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
#
# imgTopHat = cv2.morphologyEx(gray, cv2.MORPH_TOPHAT, structuringElement)
# imgBlackHat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, structuringElement)
#
# imgGrayscalePlusTopHat = cv2.add(gray, imgTopHat)
# gray = cv2.subtract(imgGrayscalePlusTopHat, imgBlackHat)
#
# img_blurred = cv2.GaussianBlur(gray, ksize=(5, 5), sigmaX=0)
#
# img_thresh = cv2.adaptiveThreshold(
#     img_blurred,
#     maxValue=255.0,
#     adaptiveMethod=cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
#     thresholdType=cv2.THRESH_BINARY_INV,
#     blockSize=19,
#     C=9
# )
# try:
#     cv2.imshow('img', img)
#     cv2.imshow('thresh', img_thresh)
#     cv2.imshow('gray', gray)
#     cv2.imshow('blur', img_blurred)
# except:
#     print('error')
# k = cv2.waitKey(1)
# # text = pytesseract.image_to_string(img_thresh, lang="kor+eng")
# # print(text)
# if k == 27: break