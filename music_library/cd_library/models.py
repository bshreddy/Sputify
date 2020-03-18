from django.db import models
import datetime

album_types = (
    ('a', 'Album'),
    ('p', 'Playlist'),
)

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255, default='Records')
    year = models.IntegerField(default=datetime.datetime.now().year)
    cover = models.ImageField(upload_to='static/albums/')
    followers = models.IntegerField(default=0)
    albumType = models.CharField(max_length=1, choices=album_types, default='p')

    def __str__(self):
        if self.albumType == 'a':
            return f"{self.title} by {self.artist}"
        return f"{self.title}"

class Track(models.Model):
    title = models.CharField(max_length=255)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    song = models.FileField(upload_to='static/tracks/', default="static/fade.mp3")

    def __str__(self):
        return f"{self.title} from {self.album}"

class BannerId(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.album}"

class ContentCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"

class ContentCategoryId(models.Model):
    category = models.ForeignKey(ContentCategory, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)