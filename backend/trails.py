# import datetime
from typing import Callable
from django.urls import path
from rest_framework.views import APIView
import inspect


class Router:
    API_VIEW_SUFFIXES: list = ["APIView", "View", "Views", "ViewSet", "Detail"]
    API_VIEW_FUNC_GENERATOR: str = "as_view"

    def __init__(self):
        self.url_patts = []

    def auto_route(self, endpoint: str = "", param: str = "", url_name: str = "", **kwargs):
        """A decorator to automatically generate and register a URL route for a given view.

        Args:
            endpoint: The URL endpoint for the view. Defaults to the view's name.
            param: Additional parameter to append to the endpoint. Defaults to "".
                Example: "<int:user_id>/comments"
            url_name: The name of the URL pattern. Defaults to the view's name.
            **kwargs: Additional keyword arguments to pass to the URL pattern.

        Returns:
            Callable: The original view function.

        Example:
            @router.auto_route()
            def my_view(request):
                ...

        If the view is an APIView subclass, the decor will:
        - Remove the APIView suffix from the class name (see API_VIEW_SUFFIXES).
        - Convert it to snake_case.
        - Add an "s" to it if it hasn't already.
        - Use the API_VIEW_FUNC_GENERATOR method to generate the view func for django.urls.path().
        """

        def decor(view: Callable):
            """The actual decorator function."""
            nonlocal self, endpoint, param, url_name, kwargs
            is_api_view = inspect.isclass(view) and issubclass(view, APIView)
            if is_api_view:
                # APIView.as_view() returns a view function
                generator = getattr(view, self.API_VIEW_FUNC_GENERATOR)
                bound_view = generator()
            else:
                bound_view = view
            if not endpoint:
                endpoint = view.__name__
                if is_api_view:
                    for suffix in self.API_VIEW_SUFFIXES:
                        if endpoint.endswith(suffix):
                            endpoint = endpoint[:-len(suffix)]
                            endpoint = pascal_to_snake(endpoint)
                            if not endpoint.endswith("s"):
                                endpoint += "s"
                            break
            if not endpoint.endswith("/"):
                endpoint += "/"
            if param:
                endpoint = endpoint + param.strip("/") + "/"
            if not url_name:
                url_name = view.__name__
            url_patt = path(endpoint, bound_view, name=url_name, **kwargs)
            self.url_patts.append(url_patt)
            return view  # Return the original view
        return decor

    def get_urlpatterns(self):
        """Returns the urlpatterns for the app."""
        return self.url_patts


# def str_to_date(date_str):
#     """Converts a string to a date object, if not None."""
#     if not date_str:
#         return date_str
#     return datetime.datetime.strptime(date_str, "%Y-%m-%d").date()


def pascal_to_snake(string):
    """Converts a PascalCase string to a snake_case string."""
    new = ""
    for char in string:
        if char.isupper():
            new += "_" + char.lower()
        else:
            new += char
    return new.lstrip("_")
