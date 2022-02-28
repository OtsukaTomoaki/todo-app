from django.urls import path

from .views import TodoListAPIView, TodoAPIView

urlpatterns = [
    path('', TodoListAPIView.as_view()),
    path('detail/<str:id>', TodoAPIView.as_view()),

    #path('detail/<str:id>/', BlogDetailView.as_view(), name='blog_detail' )
]