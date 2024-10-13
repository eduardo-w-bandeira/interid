from django.urls import path
from databarn import Seed, Field, Barn


class Endpoint(Seed):
    view = Field(key=True)
    route = Field(str, none=False, unique=True)
    name = Field(str, none=False, unique=True)
    kwargs = Field(dict, none=False)


endpoints = Barn(Endpoint)


def autoendpoint(route: str = "", name: str = "", **kwargs):
    """Decorator to add route and name to a view function."""
    def decor(view):
        nonlocal route, name
        if not route:
            route = view.__name__ + "/"
        if not name:
            name = view.__name__
        enpoint = Endpoint(view=view, route=route, name=name, kwargs=kwargs)
        endpoints.append(enpoint)
        return view  # Return the original view
    return decor


def gen_urlpatterns(views):
    """Generate url patterns from the views in the given module,
    for use with autoendpoint."""
    urlpatterns = []
    ob_names = dir(views)
    for enpoint in endpoints:  # Get path_info in order
        if enpoint.view.__name__ not in ob_names:
            continue
        ob = getattr(views, enpoint.view.__name__)
        if ob is enpoint.view:
            url_pattern = path(enpoint.route, ob,
                               name=enpoint.name, **enpoint.kwargs)
            urlpatterns.append(url_pattern)
    return urlpatterns
