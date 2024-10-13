import pathlib
from typing import Callable
from types import ModuleType
from django.urls import path
from databarn import Seed, Field, Barn


class Endpoint(Seed):
    view: Callable = Field(key=True)
    route: str = Field(none=False, unique=True)
    name: str = Field(none=False, unique=True)
    kwargs: dict = Field(none=False)


class AppConf(Seed):
    name: str = Field(key=True)
    endpoints: Barn = Field(none=False)


app_confs = Barn(AppConf)


class Router:

    def __init__(self, file):
        self.app_name = pathlib.Path(file).parent.name
        self.endpoints = Barn(Endpoint)

    def autoendpoint(self, route: str = "", name: str = "", **kwargs):
        """Decorator to add route and name to a view function."""
        def decor(view: Callable):
            global app_confs
            nonlocal route, name
            if not route:
                route = view.__name__ + "/"
            if not name:
                name = view.__name__
            enpoint = Endpoint(view=view, route=route,
                               name=name, kwargs=kwargs)
            self.endpoints.append(enpoint)
            app_conf = AppConf(name=self.app_name, endpoints=self.endpoints)
            app_confs.append(app_conf)
            return view  # Return the original view
        return decor


def gen_urlpatterns(views_mod: ModuleType):
    """Generates a list of url patterns from a views module,
    based on the functions that use the @app.autoendpoint

    Args:
        views_mod: The module containing the views.

    Returns:
        A list of django url patterns.
    """
    global app_confs
    app_name = pathlib.Path(views_mod.__file__).parent.name
    url_patts = []
    endpoints = app_confs.get(app_name).endpoints
    for enpoint in endpoints:  # Get them in order
        mod_ob = getattr(views_mod, enpoint.view.__name__)
        if enpoint.view is not mod_ob:
            raise RuntimeError(f"View {enpoint.view} is not in {views_mod}")
        # create django.urls.path
        url_patt = path(enpoint.route, enpoint.view,
                        name=enpoint.name, **enpoint.kwargs)
        url_patts.append(url_patt)
    return url_patts
