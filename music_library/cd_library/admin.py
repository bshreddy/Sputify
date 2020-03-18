from django.contrib import admin
from .models import Album, BannerId, ContentCategory, ContentCategoryId, Track

class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'artist', 'year', 'followers', 'albumType')

class TrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'album', 'song')

class ContentCategoryIdAdmin(admin.ModelAdmin):
    list_display = ('category', 'album')

admin.site.register(Album, AlbumAdmin)
admin.site.register(BannerId)
admin.site.register(ContentCategory)
admin.site.register(ContentCategoryId, ContentCategoryIdAdmin)
admin.site.register(Track, TrackAdmin)