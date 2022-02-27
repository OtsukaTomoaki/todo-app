from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.forms import forms
from django.http import response
from django.http.response import HttpResponseForbidden, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_POST, require_GET
from django.shortcuts import render
import json;
import uuid
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from accounts.common.auth import JWTAuthentication

# from .serializers import TodoSerializer

# Create your views here.
class GridItemViewSet():
    pass
#     queryset = { 'title' : 'hogehoge', 'article' : "foo", 'created_at' : 1234, 'created_by': 'ootsuka' }
#     serializer_class = TodoSerializer

class TodoList(APIView):
    authentication_classes = [JWTAuthentication, ]
    # ログインしてるユーザーだけアクセスできるようにします。
    permission_classes = [IsAuthenticated, ] 
    def get(self, request, *args, **kwargs):
        context = {'todos': [
            {
                'project_id' : 1,
                'todo_id' : 1,
                'title' : 'テスト',
                'day' : 1,
                'created_user' : 'ootsuka',
                'responsible' : 'ootsuka2',
                'start_date' : str(datetime.today()),
                'end_date' : str(datetime.today()),
                'state' : 'icebox'
            }
        ]}
        json_str = json.dumps(context, ensure_ascii=False, indent=2) 
        response = HttpResponse(json_str, content_type='application/json')
        return response