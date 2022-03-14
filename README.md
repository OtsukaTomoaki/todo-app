# todo-app

## URL
https://bigmound26.com/home
## 概要

カレンダー形式でグループのTodoを管理します。
カレンダーをダブルクリックすると新規にTodoを追加、
カレンダー上のTodoをダブルクリックするとTodoを編集できます。

Todoは書籍「カイゼンジャーニー」に記載のファイブフィンガーを取り入れています。
ファイブフィンガーは自身の担当するタスクや自身の状態などYes, Noで表せないことを
５段階の数値で表現します。
これにより言いにくいことや不安に思っていることをメンバーに共有しやすくなります。
## バックエンド
### 言語、フレームワーク

- Python
- django

### 機能

- JWTの発行、検証
- アカウントの取得、追加
- Todoの追加、取得、更新、削除
### pip

  asgiref==3.5.0
  backports.zoneinfo==0.2.1
  Django==4.0.2
  django-cors-headers==3.11.0
  django-environ==0.8.1
  django-filter==21.1
  djangorestframework==3.13.1
  djangorestframework-jwt==1.11.0
  PyJWT==1.7.1
  pytz==2021.3
  routers==0.10.1
  six @ file:///AppleInternal/BuildRoot/Library/Caches/com.apple.xbs/Sources/python3/python3-103/six-1.15.0-py2.py3-none-any.whl
  sqlparse==0.4.2
  uWSGI==2.0.20

## フロントエンド

### 言語、フレームワーク

- JavaScript
- React
### 機能

- サインイン、サインアップ
- Todoの追加、取得、更新、削除
- 遅延したTodo、ファイブフィンガーが低いメンバーの通知

## インフラ

### クラウド

- AWS
- EC2
- ALB
- ACM
- Route53
### ルーティング

- nginx