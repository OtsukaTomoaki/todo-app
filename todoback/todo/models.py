from django.db import models
from django.conf import settings
import uuid
from enum import Enum

# Choiceで使えるEnumクラス
class Choosable(Enum):
    @classmethod
    def choices(cls):
        return [(m.name, m.value) for m in cls]
        
    @classmethod
    def contains(cls, val):
        return val in [m.name for m in cls]

# Choosableを継承して利用s
class TodoStatus(Choosable):
    PARKING = 'PARKING'
    TODO = 'TODO'
    DOING = 'DOING'
    DONE = 'DONE'

# Create your models here.
class Todo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField('タイトル', max_length=128)
    memo = models.TextField('メモ', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='作成者', on_delete=models.CASCADE)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    state = models.CharField(max_length=10, choices=TodoStatus.choices())
    class Meta:
        db_table = 'todo'

    def __str__(self):
        return f'{self.pk} {self.title}'

class TodoHistories(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    days_required = models.IntegerField()
    memo = models.TextField('メモ', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='作成者', on_delete=models.CASCADE)
    created_at = models.DateTimeField('作成日', auto_now_add=True)
    updated_at = models.DateTimeField('更新日', auto_now=True)
    start_date = models.DateTimeField('開始日', auto_now=True)
    end_date = models.DateTimeField('終了日', auto_now=True)
    class Meta:
        db_table = 'todo_histories'

    def __str__(self):
        return f'{self.pk} {self.memo}'

class TodoComments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    commented_to = models.ForeignKey(TodoHistories, on_delete=models.CASCADE)
    text = models.TextField('本文', blank=False)
    commented_at = models.DateTimeField('投稿日', auto_now_add=True)
    commented_by = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='投稿者', on_delete=models.CASCADE)
    class Meta:
        db_table = 'todo_comments'