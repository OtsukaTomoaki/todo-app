from datetime import datetime
import json;
import uuid
from rest_framework import viewsets, filters
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.contrib.auth import authenticate, get_user_model
from accounts.common.auth import JWTAuthentication
from .models import Todo, TodoHistories, TodoComments
from .serializers import TodoSerializer, TodoHistoriesSerializer, TodoCommentsSerializer

class TodoList(ListAPIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('id', 'created_at', )
    ordering = ('created_at', )

class TodoAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 

    def get(self, request):
        todo = get_object_or_404(Todo, pk=id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def post(self, request):
        print(request.user)

        UserModel = get_user_model()
        user = UserModel.objects.get(username=request.user)  
        todo_serializer = TodoSerializer(data=request.data)
        if todo_serializer.is_valid():
            todo_serializer.save(created_by=user, state='PARKING')

            return Response(todo_serializer.data, status=status.HTTP_201_CREATED)
        return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

