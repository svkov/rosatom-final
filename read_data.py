import gzip
import numpy as np
import pickle
import os
import matplotlib.pyplot as plt


def load_numpy_gz(path):
    f = gzip.GzipFile(path, 'rb')
    return np.load(f)


def load_pickle_gz(path):
    with gzip.open(path, 'rb') as f:
        return pickle.load(f)


def read_image(path_to_dir):
    path = os.path.join(path_to_dir, 'data', 'L2A.npy.gz')
    return load_numpy_gz(path)


def read_timestamp(path_to_dir):
    path = os.path.join(path_to_dir, 'timestamp.pkl.gz')
    return load_pickle_gz(path)


def read_bbox(path_to_dir):
    path = os.path.join(path_to_dir, 'bbox.pkl.gz')
    data = load_pickle_gz(path)
    return data.lower_left, data.upper_right


def show_rgb(img, i):
    b = img[i, :, :, :][:, :, [3, 2, 1]]
    plt.imshow(b)
