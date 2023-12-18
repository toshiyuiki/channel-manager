<template>
    <div>
        <the-header />
        <section class="sec__hero">
            <div class="bg">
                <div class="sec__in__l">
                    <h1 class="fs__txt__40 color__txt__white">管理画面</h1>
                </div>
            </div>
        </section>
        <section class="sec__user">
            <div class="sec__in__l">
                <div class="inner">
                    <h2 class="fs__txt__26">ユーザー情報</h2>
                    <ul>
                        <li>
                            <dl class="dp__flex">
                                <dt>ユーザー名</dt>
                                <dd>{{ route.params.name }}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl class="dp__flex">
                                <dt>パスワード</dt>
                                <dd>{{ pass }}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="sec__control">
            <div class="sec__in__l">
                <h2 class="fs__txt__26">メニュー</h2>
                <ul class="dp__flex">
                    <li>
                        <NuxtLink :to="'user-'+ route.params.name +'/video'">
                            <dl>
                                <dt>
                                    <set-icon icon="videocam" />
                                    <b class="fs__txt__14">最新動画</b>
                                </dt>
                                <dd>登録してある全チャンネルの最新動画が見れます。</dd>
                            </dl>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="'user-'+ route.params.name +'/channel'">
                            <dl>
                                <dt>
                                    <set-icon icon="tv" />
                                    <b class="fs__txt__14">チャンネル一覧</b>
                                </dt>
                                <dd>登録してあるチャンネル一覧が表示されます。<br>
                                    チャンネルの追加やタグの編集はこちらで行うことができます。</dd>
                            </dl>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink :to="'user-'+ route.params.name +'/tag'">
                            <dl>
                                <dt>
                                    <set-icon icon="sell" />
                                    <b class="fs__txt__14">タグ一覧</b>
                                </dt>
                                <dd>チャンネルにつけているタグ一覧を見れます。</dd>
                            </dl>
                        </NuxtLink>
                    </li>
                </ul>
                <button @click="login_out">ログアウト</button>
            </div>
        </section>
        <the-footer />
    </div>
</template>
<style lang="scss">
    .sec__user{
        padding:40px 0;
        .inner{
            max-width:600px;
            margin:0 auto;
            background:rgba($color-sec,0.2);
            padding:20px;
            box-sizing: border-box;
        }
        h2{
            margin:0 0 20px;
        }
        li{
            margin:0 0 2px;
        }
        dl{
            gap:0 2px;
            justify-content: flex-start;
            align-items: flex-start;
        }
        dt,dd{
            width:100%;
            flex-basis:10em;
            box-sizing: border-box;
            padding:5px 20px;
            background:#fff;
        }
        dd{
            flex-basis:auto;
        }
        @include sp{
            padding:30px per(10, 375);
            .inner{
                padding:10px;
            }
            h2{
                margin:0 0 10px;
            }
            dl{
                display:block;
            }
            dt{
                font-size:1.2rem;
                padding:10px;
            }
            dd{
                padding:0 10px 10px;
            }
        }
    }
    .sec__control{
        padding:0 0 80px;
        h2{
            margin:0 0 20px;
        }
        ul{
            gap:0 20px;
            margin:0 0 60px;
        }
        li{
            background:rgba($color-ter,0.4);
            padding:20px;
            box-sizing: border-box;
            width:100%;
            border-radius: 10px;
        }
        li dt b,
        li dt span{
            display:block;
            text-align:center;
        }
        dt span{
            font-size:4.0rem;
        }
        dt{
            margin:0 0 20px;
        }
        button{
            background:rgba($color-black,0.1);
            border:none;
            display:block;
            width:per(300, 1180);
            margin:0 auto;
            padding:20px;
            text-align:center;
            cursor: pointer;
        }
        @include sp{
            padding:0 per(10, 375) 40px;
            h2{
                margin:0 0 20px;
            }
            ul{
                display:block;
                margin:0 0 40px;
            }
            li{
                padding:10px;
                margin:0 0 10px;
            }
            dt{
                margin:0 0 10px;
                padding:0 0 10px;
                border-bottom:1px solid $color-white;
            }
            button{
                width:per(300, 355);
            }
        }
    }
</style>
<script lang="ts" setup>
const route = useRoute();
const { login_out,login_boo_link } = useAuth();
login_boo_link();

const { getDb } = useDb();
const get_user = await getDb('user');
const pass = ref('');
const get_pass = () => {
    if(get_user.value){
        get_user.value.forEach((val:string) => {
            if(val.user_name == route.params.name){
                pass.value = val.user_pass
            }
        });
    }
}
get_pass();

</script>