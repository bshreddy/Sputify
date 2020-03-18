import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, StreamingHttpResponse, FileResponse

from .models import Album, BannerId, ContentCategory, ContentCategoryId, Track

DEFAULT_TRACK = {'id': -1, 'title': 'Defualt Song', 'album_id': -1, 'song': 'static/fade.mp3'}

def album(album_id):
    data = Album.objects.filter(id__exact=album_id).values()[0]
    return data

def tracks(request, album_id):
    data = list(Track.objects.filter(album_id__exact=album_id).values())
    if len(data) == 0:
        data = [DEFAULT_TRACK]
    print(data)
    return JsonResponse(data, safe=False)

def banner(request):
    albumIds = [i[0] for i in BannerId.objects.all().values_list('album_id')]
    bannerAlbums = []
    for albumId in albumIds:
        bannerAlbums.append(album(albumId))
    return JsonResponse(bannerAlbums, safe=False)

def content(request):
    categories = list(ContentCategory.objects.all().values())
    categoriesNames = [x['name'] for x in categories]

    categoryData = {}
    for category in categories:
        albumIds = [ x['album_id'] for x in ContentCategoryId.objects.filter(category_id__exact=category['id']).values()]
        
        contentAlbums = []
        for albumId in albumIds:
            contentAlbums.append(album(albumId))
        categoryData[category['name']] = contentAlbums

    data = {
        "categories": categoriesNames,
        "categoryData": categoryData
    }
    return JsonResponse(data, safe=False)

def stream(request, track_id):
    track_id = int(track_id)
    if track_id == -1:
        track = DEFAULT_TRACK
    else:
        track = Track.objects.filter(id__exact=track_id).values()[0]
        if not os.path.isfile(track['song']):
            track = DEFAULT_TRACK

    response = FileResponse(open(track['song'], 'rb'), content_type='audio/mpeg')
    return response