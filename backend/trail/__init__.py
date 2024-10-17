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
    """Router class for managing application endpoints.

    Attributes:
        app_name (str): The name of the application derived from the file path.
        endpoints (Barn): A collection of Endpoint instances.

    Methods:
        __init__(file):
            Initializes the Router with the given file path.
        autoendpoint(route: str = "", name: str = "", **kwargs):
            A decorator to automatically register an endpoint with the application.
                route (str): The route for the endpoint. Defaults to the view function name with a trailing slash.
                name (str): The name for the endpoint. Defaults to the view function name.
    """

    def __init__(self, file: str):
        """Initializes the Router with the given file path.

        Args:
            file: The special var name __file__ in your view.py.
        """
        self.app_name = pathlib.Path(file).parent.name
        self.endpoints = Barn(Endpoint)

    def autoendpoint(self, route: str = "", name: str = "", **kwargs):
        """A decorator to automatically register an endpoint with the application.

        Args:
            route: The route for the endpoint. Defaults to the view function name with a trailing slash.
            name: The name for the endpoint. Defaults to the view function name.
            **kwargs: Additional keyword arguments to be passed to the Endpoint.

        Returns:
            Callable: The original view function.

        Example:
            @router.autoendpoint("custom_route/", "custom_name")
            def my_view():
                ...
        """
        def decor(view: Callable):
            """The actual decorator function."""
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
    based on the functions that use the @router.autoendpoint()

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
