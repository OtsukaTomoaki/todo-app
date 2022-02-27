from django.urls import path

from .views import TodoList, TodoAPIView

urlpatterns = [
    path('list', TodoList.as_view()),
    path('', TodoAPIView.as_view()),

    #path('detail/<str:id>/', BlogDetailView.as_view(), name='blog_detail' )
]