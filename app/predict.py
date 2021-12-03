from PIL import Image

import torch
import torchvision
import torch.nn as nn
import torchvision.transforms as transforms

path_to_model = 'models/best_loss_rn18.st'
map_location = torch.device('cpu')
loaded = torchvision.models.resnet18(True)
loaded.fc = nn.Linear(512, 1)
loaded.load_state_dict(torch.load(
    path_to_model, map_location=map_location))
loaded.eval()
print('model loaded')


def predict_pic(path_to_image):
    inference_transform = transforms.Compose([
        transforms.Resize([224, 224]),
        transforms.ToTensor(),
        transforms.Normalize(mean=(0.5, 0.5, 0.5), std=(0.5, 0.5, 0.5))
    ])

    img = Image.open(path_to_image)
    x = inference_transform(img).unsqueeze(0)

    with torch.no_grad():
        pred_conf = torch.sigmoid(loaded(x))
    return pred_conf.item()
