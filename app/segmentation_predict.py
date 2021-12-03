import segmentation_models_pytorch as smp
from PIL import Image

import torch
import torchvision.transforms as transforms

val_transform = transforms.Compose([
    transforms.Resize([64, 64]),
    transforms.ToTensor()
])
model = smp.UnetPlusPlus(encoder_name="resnet18",
                         encoder_weights='imagenet',
                         in_channels=3,
                         classes=2,
                         activation=None)
model.eval()

path_to_model = 'models/best.pth'
checkpoint = torch.load(path_to_model,
                        map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['model_state_dict'])


def get_area_of_oil_spill(path):
    img = Image.open(path)
    x = val_transform(img).unsqueeze(0)

    with torch.no_grad():
        oil_square = model(x)[0].softmax(axis=0).argmax(axis=0).sum()
    return oil_square.item() * 10 * 10
