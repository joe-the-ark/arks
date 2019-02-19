from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

import os


def doc(request):
    ctx = {}

    return render(request, 'restapi/doc.html', ctx)


def vue():
    def vue_view(request):
        return render(request, 'index.html')

    return vue_view