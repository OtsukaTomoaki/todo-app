# todo-app

todo管理アプリケーション
進捗の確認やカイゼンジャーニーに記載のプロジェクト進行に必要なツールを持つ
## todoback
### 概要

- バックエンド側のアプリケーション
- Djangoで実装

- pip
  - django
  - routers
  - djangorestframework
  - djangorestframework-jwt
  - django-filter

## todofront
### 概要

- フロントエンド側のアプリケーション
- Reactで実装

## DB

```plantuml
@startuml
!define MAIN_ENTITY #E2EFDA-C6E0B4
!define MAIN_ENTITY_2 #FCE4D6-F8CBAD

!define METAL #F2F2F2-D9D9D9
!define MASTER_MARK_COLOR AAFFAA
!define TRANSACTION_MARK_COLOR FFAA00

entity m_projects <<M,TRANSACTION_MARK_COLOR>> {
  +guid: char(32) [PK]
  title: varchar(60)
  start_date: datetime
  end_date: datetime
  description: varchar(400)
  created_at : datetime
  created_by : varchar
}

entity accounts <<M,TRANSACTION_MARK_COLOR>> {


} 

entity t_todo <<T, TRANSACTION_MARK_COLOR>> {
    + guid_projects : char(32) 
    + guid_todo : char(32) 
    title : varchar(60)
    created_at : datetime
    created_by : varchar
    memo: varchar(4000)
}

entity t_todo_histories <<T, TRANSACTION_MARK_COLOR>> {
    + guid_todo : char(32) 
    + seq_histories : number
    day : number
    created_at : datetime
    created_by : varchar
    responsible_by : varchar
    start_date : datetime
    end_date : datetime
    state : 1( 0: icebox, 1: to, 2: do, 3: done) 
    memo: varchar(4000)   
}

entity t_todo_comments <<T, TRANSACTION_MARK_COLOR>> {
    + guid_todo : char(32) 
    + seq_history : number
    day : number
}

@enduml 
```