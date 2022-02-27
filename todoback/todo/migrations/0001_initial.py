# Generated by Django 4.0.2 on 2022-02-27 15:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=128, verbose_name='タイトル')),
                ('memo', models.TextField(blank=True, verbose_name='メモ')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='作成者')),
            ],
            options={
                'db_table': 'todo',
            },
        ),
        migrations.CreateModel(
            name='TodoHistories',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('days_required', models.IntegerField()),
                ('memo', models.TextField(blank=True, verbose_name='メモ')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日')),
                ('start_date', models.DateTimeField(auto_now=True, verbose_name='開始日')),
                ('end_date', models.DateTimeField(auto_now=True, verbose_name='終了日')),
                ('state', models.CharField(choices=[('PARKING', 'PARKING'), ('TODO', 'TODO'), ('DOING', 'DOING'), ('DONE', 'DONE')], max_length=10)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='作成者')),
                ('todo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.todo')),
            ],
            options={
                'db_table': 'todo_histories',
            },
        ),
        migrations.CreateModel(
            name='TodoComments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.TextField(verbose_name='本文')),
                ('commented_at', models.DateTimeField(auto_now_add=True, verbose_name='投稿日')),
                ('commented_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='投稿者')),
                ('commented_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.todohistories')),
            ],
            options={
                'db_table': 'todo_comments',
            },
        ),
    ]
