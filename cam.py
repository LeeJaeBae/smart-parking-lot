import cv2
import pytesseract

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
cam = cv2.VideoCapture(-1)

while cam.isOpened():
    ret, img = cam.read()
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
    try:
        cv2.imshow('test', img)
    except:
        print('error')
    k = cv2.waitKey(1)
    # text = pytesseract.image_to_string(img_thresh, lang="kor+eng", config='--psm 3 --oem 1')
    # print(text)
    # if k == 27: break

cam.release()
cv2.destroyAllWindows()
