from django.urls import path

from .views import TodoList

urlpatterns = [
    path('', TodoList.as_view()),
    #path('detail/<str:id>/', BlogDetailView.as_view(), name='blog_detail' )
]