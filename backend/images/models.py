from django.db import models
from keras.preprocessing.image import load_img, img_to_array
from keras_preprocessing import image
import numpy as np
from django.db.models.signals import post_save
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2, decode_predictions, preprocess_input
# Create your models here.


class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image classified at {self.uploaded.strftime('%Y-%m-%d %H:%M')} "

    def save(self, *args, **kwargs):
        try:
            super().save(*args, **kwargs)

        except Exception as e:
            print(e)


def image_post_save(sender, instance, created, *args, **kwargs):
    if created:
        id = instance.id
        img = image.load_img(
            'media_root'+"/"+str(instance.picture), target_size=(299, 299))

        img_array = img_to_array(img)

        # model takes 4 dimensions because it predicts multiple images so we will use numpy
        to_pred = np.expand_dims(img_array, axis=0)  # (1,333, 22, 25)

        # normalize data
        prep = preprocess_input(to_pred)

        # give model pre traine weights which will doenload
        model = InceptionResNetV2(weights='imagenet')
        prediction = model.predict(prep)
        decoded = decode_predictions(prediction)[0][0][1]

        classifed_result = str(decoded)
        Image.objects.filter(id=id).update(classified=classifed_result)


post_save.connect(image_post_save, sender=Image)
