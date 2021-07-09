from django.db import models

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image classified at {self.uploaded.strftime('%Y-%m-%d %H:%M')} "
    
    def save(self, *args, **kwargs):
        try:
            print("success")
        except:
            print("classification")
        super().save(*args, **kwargs)