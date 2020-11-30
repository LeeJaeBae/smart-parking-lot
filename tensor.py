import tensorflow as tf

physical_devices = tf.config.experimental.list_physical_devices('CPU')

from absl import app, flags, logging
from absl.flags import FLAGS
import core.utils as utils
from core.yolov4 import filter_boxes
from tensorflow.python.saved_model import tag_constants
from PIL import Image
import cv2
import numpy as np

ConfigProto = tf.compat.v1.ConfigProto
InteractiveSession = tf.compat.v1.InteractiveSession

weights = "./checkpoints/yolov4-416"
model = "./data/yolov4.cfg"
names = "./data/coco.names"

config = ConfigProto()
# config.gpu_option.allow_growth = True
session = InteractiveSession(config=config)
# STRIDES, ANCHORS, NUM_CLASS, XYSCALE = utils.load_config(FLAGS)

input_size = 416
vid = cv2.VideoCapture(0)

print("video from:", "video_path")

saved_model_loaded = tf.saved_model.load(weights, tags=[tag_constants.SERVING])
infer = saved_model_loaded.signatures['serving_default']
print(infer)


pass
frame_id = 0
while vid.isOpened():
    ret, frame = vid.read()
    if ret:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(frame)
    else:
        if frame_id == vid.get(cv2.CAP_PROP_FRAME_COUNT):
            print("Video processing complete")
            break
        raise ValueError("No image! Try with another video format")

    frame_size = frame.shape[:2]
    image_data = cv2.resize(frame, (input_size, input_size))
    image_data = image_data / 255.
    image_data = image_data[np.newaxis, ...].astype(np.float32)

    batch_data = tf.constant(image_data)
    pred_bbox = infer(batch_data)
    for key, value in pred_bbox.items():
        boxes = value[:, :, 0:4]
        pred_conf = value[:, :, 4:]

    boxes, scores, classes, valid_detections = tf.image.combined_non_max_suppression(
        boxes=tf.reshape(boxes, (tf.shape(boxes)[0], -1, 1, 4)),
        scores=tf.reshape(
            pred_conf, (tf.shape(pred_conf)[0], -1, tf.shape(pred_conf)[-1])),
        max_output_size_per_class=50,
        max_total_size=50,
        iou_threshold=0.45,
        score_threshold=0.25
    )
    pred_bbox = [boxes.numpy(), scores.numpy(), classes.numpy(), valid_detections.numpy()]
    image = utils.draw_bbox(frame, pred_bbox)

    result = np.asarray(image)

    result = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    if True:
        # cv2.namedWindow("result", cv2.WINDOW_AUTOSIZE)
        cv2.imshow("result", result)
        if cv2.waitKey(1) & 0xFF == ord('q'): break