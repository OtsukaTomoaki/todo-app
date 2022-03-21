from django.contrib.auth import authenticate, get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework.generics import get_object_or_404

from .common.auth import UserCredentialAuthentication, JWTAuthentication, generate_jwt

from .serializers import UserSerializer, RegisterSerializer

class Login(APIView):

    authentication_classes = [UserCredentialAuthentication,]

    def post(self, request, *args, **kwargs):
        return Response({"token": request.user})

class AccountsAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    
    def get(self, request, id):
        UserModel = get_user_model()
        account = get_object_or_404(UserModel, pk=id)
        serializer = UserSerializer(account)
        return Response(serializer.data)
    def delete(self, request, id, format=None):
        UserModel = get_user_model()
        account = get_object_or_404(UserModel, pk=id)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SignUpAPIView(GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = generate_jwt(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
        })
    

class AccountsListAPIView(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    
    def get(self, request):
        UserModel = get_user_model()
        queryset = UserModel.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)