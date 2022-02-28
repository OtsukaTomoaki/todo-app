
from rest_framework import serializers

from .models import Todo, TodoHistories, TodoComments

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'memo', 'created_at', 'updated_at', 'state')
        extra_kwargs = {
            # モデル上は必須フィールドだけれど、シリアライザでは Not必須にしたい場合は、required を上書きする
            'state': {'required': False}
        }

class TodoHistoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoHistories
        fields = ('id', 'todo', 'days_required', 'memo', 'created_by', 'created_at', 'updated_at', 'start_date', 'end_date')

class TodoCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoComments
        fields = ('id', 'commented_to', 'text', 'memo', 'commented_at', 'commented_by')