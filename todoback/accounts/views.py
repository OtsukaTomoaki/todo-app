from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .common.auth import UserCredentialAuthentication


class Login(APIView):

    authentication_classes = [UserCredentialAuthentication,]

    def post(self, request, *args, **kwargs):
        return Response({"token": request.user})