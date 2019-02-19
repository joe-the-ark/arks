from django.core.management import BaseCommand
from django.conf import settings

from restapi.client import API

import code


class Command(BaseCommand):

    def handle(self, **options):
        local_objects = {
            'api': API(settings.API_SERVER if hasattr(settings, 'API_SERVER') else '127.0.0.1:8000'),
        }

        code.interact(local=local_objects)