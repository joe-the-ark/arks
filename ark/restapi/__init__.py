from .urls import urlpatterns
from .decorators import api, param
from .client import API
from .exceptions import APIError
from .views import vue
from .log import log, error


urls = urlpatterns, 'restapi', 'api'

default_app_config = 'restapi.apps.RestapiConfig'

