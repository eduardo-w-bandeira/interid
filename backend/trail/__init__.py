import pathlib
import datetime
from typing import Callable
from types import ModuleType
from django.urls import path
from databarn import Seed, Field, Barn


class Endpoint(Seed):
    view: Callable = Field(key=True)
    route: str = Field(none=False, unique=True)
    url_name: str = Field(none=False, unique=True)
    kwargs: dict = Field(none=False)


class Router(Seed):
    app_name: str = Field(key=True)
    endpoints: Barn = Field(none=False)

    def __init__(self, file: str):
        """Initializes the Router with the given file path.

        Args:
            file: The special var name __file__ in your view.py.
        """
        global routers  # Defined after this class.
        app_name = pathlib.Path(file).parent.name
        super().__init__(app_name=app_name, endpoints=Barn(Endpoint))
        routers.append(self)

    def autoendpoint(self, route: str = "", url_name: str = "", **kwargs):
        """A decorator to automatically register an endpoint with the application.

        Args:
            route: The route for the endpoint. Defaults to the view function name with a trailing slash.
            url_name: The name for the endpoint. Defaults to the view function name.
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
            nonlocal self, route, url_name
            if not route:
                route = view.__name__ + "/"
            if not url_name:
                url_name = view.__name__
            enpoint = Endpoint(view=view, route=route,
                               url_name=url_name, kwargs=kwargs)
            self.endpoints.append(enpoint)
            return view  # Return the original view
        return decor


routers = Barn(Router)


def gen_urlpatterns(views: ModuleType):
    """Generates a list of url patterns from a views module,
    based on the functions that use the @router.autoendpoint()

    Args:
        views_mod: The module containing the views.

    Returns:
        A list of django url patterns.
    """
    global routers
    app_name = pathlib.Path(views.__file__).parent.name
    url_patts = []
    endpoints = routers.get(app_name).endpoints
    for enpoint in endpoints:  # Get them in order
        ob = getattr(views, enpoint.view.__name__)
        if enpoint.view is not ob:
            raise RuntimeError(f"View '{enpoint.view}' is not in '{views}'")
        # create django.urls.path
        url_patt = path(enpoint.route, enpoint.view,
                        name=enpoint.url_name, **enpoint.kwargs)
        url_patts.append(url_patt)
    return url_patts


def str_to_date(date_str):
    """Converts a string to a date object, if not None."""
    if not date_str:
        return date_str
    return datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
