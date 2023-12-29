# Youtube Channel Manager siteapp  
*Nodejs 20  
*Docker 24 - in Nodejs20 postgres15  
*Youtube API v3  

*YoutubeのAPIキーが必要になります。  

## about  
ログインからアカウントを作成してログイン。  
チャンネル一覧からYoutubeチャンネルのURLを入力するとチャンネル情報と動画を取得します。

## 手順

### DB設定  
/.envを作成してDB情報を入力します。  

    DB_HOST=db
    DB_NAME=db_name
    DB_USER=db_user
    DB_PASS=db_pass

### コンテナ起動→Prismaのinit

    docker-compose up -d
    cd front
    npm i
    npx prisma init

#### nuxtのenv設定

    /front/.env  

prisma init時に自動で生成されてます。  
コンテナのDBへの接続設定を入力。APIKEYも入れます。  

    DATABASE_URL="postgresql://db_user:db_pass@localhost:5432/db_name?schema=public"
    NUXT_API_KEY="APIKEY"


#### prismaスキーマの設定

    /front/prisma/schema.prisma  

prisma init時に自動で生成されてます。 
以下をもろもろを入力。  

    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
    }

    model user {
        id Int @id @default(autoincrement())
        user_name String
        user_pass String
        created_at DateTime @default(now())
        updated_at DateTime? @updatedAt
    }

    model channel {
        id Int @id @default(autoincrement())
        user_name String?
        channel_id String?
        channel_name String?
        channel_thumb String?
        channel_tag String?
        created_at DateTime @default(now())
        updated_at DateTime? @updatedAt
    }

    model video {
        id Int @id @default(autoincrement())
        user_name String?
        channel_id String?
        video_id String?
        video_tag String?
        video_title String?
        video_thumb String?
        video_post DateTime?
        created_at DateTime @default(now())
        updated_at DateTime? @updatedAt
    }

#### db push  
    npx prisma db push

#### nuxt3を起動
    npm run dev