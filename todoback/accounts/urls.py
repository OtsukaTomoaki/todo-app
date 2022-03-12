from django.urls import path

from .views import Login, AccountsAPIView, AccountsListAPIView, SignUpAPIView


urlpatterns = [
    path('token', Login.as_view()),
    path('detail/<str:id>', AccountsAPIView.as_view()),
    path('signup', SignUpAPIView.as_view()),
    path('list', AccountsListAPIView.as_view())
]