from django.shortcuts import render
from django.contrib.auth import authenticate, get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, filters
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

from .common.auth import UserCredentialAuthentication
from .common.auth import JWTAuthentication

from .serializers import UserSerializer

class Login(APIView):

    authentication_classes = [UserCredentialAuthentication,]

    def post(self, request, *args, **kwargs):
        return Response({"token": request.user})

class AccountsListAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    
    def get(self, request):
        UserModel = get_user_model()
        queryset = UserModel.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)