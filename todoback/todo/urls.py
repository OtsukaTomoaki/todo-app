from django.urls import path

from todo import views

urlpatterns = [
    path('', views.todo_list, name='todo_top')
    #path('detail/<str:id>/', BlogDetailView.as_view(), name='blog_detail' )
]