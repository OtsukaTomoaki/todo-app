
from rest_framework import serializers, validators

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_login', 'is_superuser', 'email', 'is_active', 'date_joined')

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validators.UniqueValidator(queryset=User.objects.all(), message='登録済みのメールアドレスです。')])
    class Meta:
        model = User
        fields = ('id','username','password','email')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],     
            password = validated_data['password'],
            email=validated_data['email'])
        return user