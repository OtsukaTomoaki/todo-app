import json
import uuid
import datetime
from datetime import date

from rest_framework import viewsets, filters
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.contrib.auth import authenticate, get_user_model
from accounts.common.auth import JWTAuthentication
from .models import Todo, TodoComments
from .serializers import TodoSerializer, TodoCommentsSerializer

class TodoListAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    
    def get(self, request):
        queryset = Todo.objects.all()
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        UserModel = get_user_model()
        user = UserModel.objects.get(username=request.user)  
        todo_serializer = TodoSerializer(data=request.data)
        if todo_serializer.is_valid():
            start_date = datetime.datetime.now() if request.data.get('start_date') == None else datetime.datetime.strptime(request.data.get('start_date') , '%Y-%m-%d')
            end_date = start_date + datetime.timedelta(days=request.data.get('days_required'))
            todo_serializer.save(
                created_by=user, 
                start_date=start_date,
                end_date=end_date,
                state='PARKING')
            return Response(todo_serializer.data, status=status.HTTP_201_CREATED)
        return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class TodoAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 

    def get(self, request, id):
        todo = get_object_or_404(Todo, pk=id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, id):
        todo = get_object_or_404(Todo, pk=id)
        todo_serializer = TodoSerializer(data=request.data, instance=todo)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return Response(todo_serializer.data, status=status.HTTP_201_CREATED)
        return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id, format=None):
        todo = get_object_or_404(Todo, pk=id)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


