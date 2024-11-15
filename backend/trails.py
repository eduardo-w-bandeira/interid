import inspect
from types import SimpleNamespace
from typing import Callable
from django.urls import path
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.routers import DefaultRouter


class Wizrouter:
    REST_VIEW_PLURAL_SUFFIXES: list = ["APIViews", "ViewSet", "Views"]
    REST_VIEW_SINGULAR_SUFFIXES: list = ["APIView", "View"]
    REST_API_VIEWS: tuple = (APIView, GenericAPIView)
    REST_API_VIEW_FUNC_GENTOR: str = "as_view"

    def __init__(self):
        self.rest_router = DefaultRouter()
        self.non_view_set_url_patts = []

    def _is_immediate_subclass(self, child, parent_or_parents):
        """Checks if a class is an immediate subclass of another class."""
        if not inspect.isclass(child):
            return False
        if isinstance(parent_or_parents, tuple):
            parents = parent_or_parents
        else:
            parents = (parent_or_parents,)
        for parent in parents:
            if issubclass(child, parent) and child.__bases__[0] is parent:
                return True
        return False

    def _break_down_edge_underscores(self, string):
        """Breaks down a string with leading and trailing underscores."""
        leading_times = len(string) - len(string.lstrip('_'))
        trailing_times = len(string) - len(string.rstrip('_'))
        prefix = '_' * leading_times
        suffix = '_' * trailing_times
        core = string.strip('_')
        return SimpleNamespace(core=core, prefix=prefix, suffix=suffix)

    def _pascal_to_kebab(self, string):
        """Converts a PascalCase to a snake_case, ignoring leading and trailing underscores."""
        breakdown = self._break_down_edge_underscores(string)
        kebab = ""
        for char in breakdown.core:
            if char.isupper():
                kebab += "-" + char.lower()
            else:
                kebab += char
        kebab = kebab.lstrip("-")
        return breakdown.prefix + kebab + breakdown.suffix

    def _snake_to_kebab(self, string):
        """Converts a snake_case to a kebab-case, ignoring leading and trailing underscores."""
        breakdown = self._break_down_edge_underscores(string)
        kebab = breakdown.core.replace('_', '-')
        return breakdown.prefix + kebab + breakdown.suffix

    def auto_route(self, endpoint: str | None = None, url_name: str | None = None, **kwargs):
        """A decorator to automatically generate and register a django.urls.path() for a given view.

        Args:
            endpoint: The URL endpoint for the view. Defaults to the view's name.
            url_name: The name of the URL pattern. Defaults to the view's name.
            **kwargs: Additional keyword arguments to pass to the URL pattern.

        Returns:
            Callable: The original view function.

        Example:
            @wizrouter.auto_route()
            def my_view(request):
                ...

        If the view is an APIView subclass, the decor will use tha class name and:
        - Remove the APIView suffix from it (see API_VIEW_SUFFIXES).
        - Convert it to snake_case.
        - Add an "s" to it if it hasn't already.
        - Use the API_VIEW_FUNC_GENTOR method to generate the view func for django.urls.path().
        """

        def decorator(view: Callable):
            """The actual decorator function."""
            nonlocal self, endpoint, url_name, kwargs
            is_view_set = self._is_immediate_subclass(view, ModelViewSet)
            is_api_view = self._is_immediate_subclass(
                view, self.REST_API_VIEWS)
            bound_view = view
            if is_api_view:
                # APIView.as_view() returns a view function
                gentor = getattr(view, self.REST_API_VIEW_FUNC_GENTOR)
                bound_view = gentor()
            if endpoint:
                endpoint = endpoint.strip("/")
            elif endpoint is None:
                endpoint = view.__name__
                if is_view_set or is_api_view:
                    suffixes = self.REST_VIEW_PLURAL_SUFFIXES + self.REST_VIEW_SINGULAR_SUFFIXES
                    for suffix in suffixes:
                        if endpoint.endswith(suffix):
                            endpoint = endpoint[:-len(suffix)]
                            endpoint = self._pascal_to_kebab(endpoint)
                            if not endpoint.endswith("s") and suffix in self.REST_VIEW_PLURAL_SUFFIXES:
                                endpoint += "s"
                            break
                else:
                    endpoint = self._snake_to_kebab(endpoint)
            url_name = url_name or endpoint
            if is_view_set:
                self.rest_router.register(endpoint, view, **kwargs)
                # print("is_view_set:", endpoint, view, kwargs)
            else:
                endpoint += "/"
                url_patt = path(endpoint, bound_view, name=url_name, **kwargs)
                # print("is_not_view_set:", endpoint, bound_view, kwargs)
                self.non_view_set_url_patts.append(url_patt)
            return view  # Return the original view
        return decorator

    def get_urlpatterns(self):
        """Returns the urlpatterns of the app."""
        return self.rest_router.urls + self.non_view_set_url_patts

    def include_urlpatterns(self, urlpatterns: list) -> None:
        """Includes the given urlpatterns in the app's urlpatterns."""
        for url_patt in self.get_urlpatterns():
            urlpatterns.append(url_patt)
