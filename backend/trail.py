import datetime
from typing import Callable
from django.urls import path


class Router:

    def __init__(self):
        self.url_patts = []

    def autoendpoint(self, route: str = "", url_name: str = "", **kwargs):
        """A decorator generator to automatically register an endpoint with the application.

        Args:
            route: The route for the endpoint. Defaults to the view function name with a trailing slash.
            url_name: The name for the endpoint. Defaults to the view function name.
            **kwargs: Additional keyword arguments to be passed to the Endpoint.

        Returns:
            Callable: The original view function.

        Example:
            @router.autoendpoint("custom_route", "custom_name")
            def my_view():
                ...
        """
        def decor(view: Callable):
            """The actual decorator function."""
            nonlocal self, route, url_name, kwargs
            if not route:
                route = view.__name__ + "/"
            if not url_name:
                url_name = view.__name__
            url_patt = path(route, view, url_name, **kwargs)
            self.url_patts.append(url_patt)
            return view  # Return the original view
        return decor

    def get_urlpatterns(self):
        """Returns the urlpatterns for the apps."""
        return self.url_patts


def str_to_date(date_str):
    """Converts a string to a date object, if not None."""
    if not date_str:
        return date_str
    return datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
