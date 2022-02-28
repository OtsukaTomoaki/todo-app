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
            print(request.data)
            start_date = datetime.datetime.now() if request.data.get('start_date') == None else datetime.datetime.strptime(request.data.get('start_date') , '%Y-%m-%d')
            end_date = start_date + datetime.timedelta(days=request.data.get('days_required'))
            todo_serializer.save(
                created_by=user, 
                start_date=start_date,
                end_date=end_date,
                state='PARKING')
            return Response(todo_serializer.data, status=status.HTTP_201_CREATED)
        return Response(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

