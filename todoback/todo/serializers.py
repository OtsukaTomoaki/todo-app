
from rest_framework import serializers

from .models import Todo, TodoComments

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'memo', 'created_by', 'engaged_user_id', 'created_at', 'updated_at', 'state', 'days_required', 'start_date', 'end_date', 'five_finger')
        extra_kwargs = {
            # モデル上は必須フィールドだけれど、シリアライザでは Not必須にしたい場合は、required を上書きする
            'state': {'required': False},
            'start_date': {'required': False},
            'end_date': {'required': False},
            'created_by':{'required': False},
            'five_finger':{'required': False}
        }
class TodoCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoComments
        fields = ('id', 'commented_to', 'text', 'memo', 'commented_at', 'commented_by')