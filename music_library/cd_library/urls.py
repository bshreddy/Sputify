from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/banner', views.banner),
    path('api/content', views.content),
    path('api/tracks/<int:album_id>', views.tracks),
    path('api/stream/<track_id>', views.stream),
]
