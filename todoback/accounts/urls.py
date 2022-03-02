from django.urls import path

from .views import Login, AccountsListAPIView

urlpatterns = [
    path('token', Login.as_view()),
    path('list', AccountsListAPIView.as_view())
]