import time
import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from django.contrib.auth import authenticate, get_user_model
from django.forms.fields import EmailField
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _

UserModel = get_user_model()

class UserCredentialAuthentication(BaseAuthentication):
    def authenticate(self, request):
        username = request._request.POST.get("username")
        password = request._request.POST.get("password")
        print(username, password)
        user_obj = UserModel.objects.filter(username=username).first()
        #self.user_can_authenticate(user_obj)
        if not user_obj or not user_obj.check_password(password):
            raise exceptions.AuthenticationFailed('Eメールアドレス　または　パスワードに誤りがあります。')
        token = generate_jwt(user_obj)
        return (token, None)

    def authenticate_header(self, request):
        pass

def generate_jwt(user):
    timestamp = int(time.time()) + 60*60*24*7#1週間を期限とする
    return jwt.encode(
        {
            "userid": user.pk,
            #"username": user.username,#emailをユーザIDに持つのでclaimにユーザ名は含めない
            "exp": timestamp
        },
        'sample').decode("utf-8")