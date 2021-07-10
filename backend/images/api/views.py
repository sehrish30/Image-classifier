from rest_framework import viewsets
from .serializers import ImageSerializer
from ..models import Image
from .paginations import CustomPagination

# ViewSets define the view behavior.


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('-uploaded')
    serializer_class = ImageSerializer
    pagination_class = CustomPagination
