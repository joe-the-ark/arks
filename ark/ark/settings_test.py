from .settings import *

import pymysql

pymysql.install_as_MySQLdb()


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ark',
        'PORT':'3306',
        'USER':'root',
        'PASSWORD':'Quattro!',
    }
}


STATIC_ROOT = '/var/ark/static'
MEDIA_ROOT = '/var/ark/media'


API_SERVER = '47.104.135.210:8105'