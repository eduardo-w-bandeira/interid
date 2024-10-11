from django.urls import path

ENDPOINT_FUNCS = []


def autoendpoint(func):
    ENDPOINT_FUNCS.append(func)
    return func


def gen_urlpatterns(views):
    urlpatterns = []
    ob_names = dir(views)
    for func in ENDPOINT_FUNCS:  # Get funcs in order
        if func.__name__ not in ob_names:
            continue
        ob = getattr(views, func.__name__)
        if ob is func:
            urlpatterns.append(
                path(ob.__name__ + "/", ob, name=ob.__name__))
    return urlpatterns
