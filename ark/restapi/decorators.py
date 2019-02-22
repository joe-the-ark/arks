from django.http import JsonResponse, HttpResponse
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from .urls import urlpatterns
from .apis import all_apis
from .exceptions import APIError
from .log import log, error

import inspect
import json
import traceback


def param(name, type=str, comment=''):
    
    def wrapper(func):
        if not hasattr(func, '__params__'):
            func.__params__ = {}

        func.__params__[name] = { 'type': type, 'comment': comment }
        return func

    return wrapper


def api(func):
    all_apis.append(func)
    arg_spec = inspect.getargspec(func)

    func.__args__ = args = [{
        'name': _,
        'required': True,
        'default': None,
        'type': 'str',
        'comment': '',
    } for _ in arg_spec.args]

    if not hasattr(func, '__params__'):
        func.__params__ = {}

    default_count = len(arg_spec.defaults) if arg_spec.defaults else 0
    for i in range(default_count):
        arg = args[len(args) - default_count + i]
        arg['required'] = False
        arg['default'] = arg_spec.defaults[i]
    
    @csrf_exempt
    def django_view(request):
        if request.method != 'POST':
            args_doc = func.__args__[:]
            for arg_doc in args_doc:
                arg_name = arg_doc['name']
                if arg_name in func.__params__:
                    arg_doc['type'] = func.__params__[arg_name]['type'].__name__
                    arg_doc['comment'] = func.__params__[arg_name]['comment']

            is_json = request.GET.get('json', None)
            ctx = { 'name': func.__name__, 'doc': func.__doc__, 'args': args_doc }
            if is_json:
                return JsonResponse(ctx)
            else:
                return render(request, 'restapi/api.html', ctx)

        try:
            params = json.loads(request.body.decode('utf-8'))
        except:
            raise
            return HttpResponse('参数无法解析', status=400)

        try:
            result = func(**params)
            success = True
            log('[%s] called success' % func.__name__)
        except APIError as ex:
            result = {
                'success': False,
                'code': ex.code,
                'msg': ex.msg
            }  
            error('[%s] called with exception' % func.__name__)
            error('exception: %s' % str(ex))
            return JsonResponse(result, status=ex.status)

        return JsonResponse({ 'success': success, 'result': result })
        
    urlpatterns.append(path('%s/' % func.__name__, django_view))
    return func

    