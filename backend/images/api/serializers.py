from ..models import Image
from rest_framework import serializers

# Serializers define the API representation.
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
        
