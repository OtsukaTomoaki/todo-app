import time
import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header
from django.contrib.auth import authenticate, get_user_model
from django.forms.fields import EmailField
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _

SECRET_KEY = 'sample';
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
        SECRET_KEY).decode("utf-8")

...
class JWTAuthentication(BaseAuthentication):
    keyword = 'bearer'
    model = None

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        print('auth', auth)
        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1 or len(auth) > 2:
            msg = "無効なjwtです"
            raise exceptions.AuthenticationFailed(msg)

        try:
            jwt_token = auth[1]
            jwt_info = jwt.decode(jwt_token, SECRET_KEY)
            userid = jwt_info.get("userid")
            print(userid)
            try:
                user = UserModel.objects.get(pk=userid)
                return (user, jwt_token)
            except:
                msg = "ユーザー存在しません"
                raise exceptions.AuthenticationFailed(msg)
        except jwt.ExpiredSignatureError:
            msg = "jwtの期限が切れています"
            raise exceptions.AuthenticationFailed(msg)

    def authenticate_header(self, request):
        pass
...