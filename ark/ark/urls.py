"""ark URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import restapi
from django.conf.urls.static import static
from django.conf import settings
from arkserver import views as server_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', restapi.urls),
    path('', restapi.vue()),
    path('result/<str:name>/<str:player>/<str:game_secret>/<str:inviter>/', server_views.result)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
