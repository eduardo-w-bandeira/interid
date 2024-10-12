from django.urls import path
from databarn import Seed, Field, Barn


class PathInfo(Seed):  # "Info" for avoiding collision with django.urls.path
    view = Field(key=True)
    route = Field(str, none=False, unique=True)
    name = Field(str, none=False, unique=True)


path_infos = Barn(PathInfo)


def autoendpoint(route: str = "", name: str = ""):
    """Decorator to add route and name to a view function."""
    def decor(view):
        nonlocal route, name
        if not route:
            route = view.__name__ + "/"
        if not name:
            name = view.__name__
        info = PathInfo(view=view, route=route, name=name)
        path_infos.append(info)
        return view  # Return the original view
    return decor


def gen_urlpatterns(views):
    """Generate url patterns from the views in the given module,
    for use with autoendpoint."""
    urlpatterns = []
    ob_names = dir(views)
    for info in path_infos:  # Get infos in order
        if info.view.__name__ not in ob_names:
            continue
        ob = getattr(views, info.view.__name__)
        if ob is info.view:
            url_pattern = path(info.route, ob, name=info.name)
            urlpatterns.append(url_pattern)
    return urlpatterns
