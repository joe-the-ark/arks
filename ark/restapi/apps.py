from django.apps import AppConfig
from django.utils.module_loading import autodiscover_modules


class RestapiConfig(AppConfig):
    name = 'restapi'

    def ready(self):
        autodiscover_modules('api')

