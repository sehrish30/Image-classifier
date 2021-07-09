from .views import ImageViewSet
from rest_framework import routers
from django.urls import path, include

app_name = 'api-images'

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'images', ImageViewSet)

# Wire up our API using automatic URL routing.
urlpatterns = [
    path('', include(router.urls))
]