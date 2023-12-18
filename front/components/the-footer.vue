<template>
    <footer class="footer color__bg__pri">
        <div class="inner">
            <div class="dp__flex">
                <nav class="nav__footer fs__txt__14" aria-label="フッターナビゲーション">
                    <ul class="nav dp__flex color__txt__white">
                        <li>
                            <NuxtLink :to="'/user-' + userurl + '/video'">
                                最新動画
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="'/user-' + userurl + '/channel'">
                                チャンネル一覧
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="'/user-' + userurl + '/tag'">
                                タグ一覧
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="'/user-' + userurl">
                                管理画面
                            </NuxtLink>
                        </li>
                    </ul>
                    <ul class="login dp__flex">
                        <li v-show="!login">
                            <NuxtLink to="/login" class="color__bg__ter">
                                ログイン
                            </NuxtLink>
                        </li>
                        <li v-show="login">
                            <NuxtLink class="color__bg__ter" @click="login_out()">
                                ログアウト
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
                <p class="copy fs__txt__12 color__txt__white">&copy; たかだ　としゆき</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
    .footer{
        .inner{
            padding:20px 40px;
        }
        div.dp__flex{
            justify-content: space-between;
            align-items: flex-end;
        }
        .nav__footer{
            order:2;
        }
        .nav__footer ul.dp__flex{
            justify-content: flex-end;
        }
        .nav__footer .nav{
            margin:0 0 20px;
        }
        .nav__footer .nav li{
            padding:0 10px;
            border-right:1px solid $color-white;
            line-height:1;
        }
        .nav__footer .nav li:last-child{
            border-right:none;
        }
        .nav__footer .login{
            gap:0 10px;
        }
        .nav__footer .login a{
            padding:5px 10px;
        }
        .copy{
            order:1;
        }
        @include sp{
            .inner{
                padding:20px per(10, 375) 40px;
            }
            div.dp__flex{
                display:block;
            }
            .nav__footer{
                margin:0 0 60px;
            }
            .nav__footer .nav.dp__flex{
                display:block;
                margin:0 0 40px;
            }
            .nav__footer .nav li{
                border-right:none;
                border-bottom:1px solid $color-white;
                line-height:1.4;
            }
            .nav__footer .nav li a{
                display:block;
                padding:20px 0;
            }
            .nav__footer .login a{
                padding:10px 30px;
            }
        }
    }
</style>

<script lang="ts" setup>
const { login_out,login_boo } = useAuth();
const login = ref(false);
login.value = login_boo();
const userurl = useCookie('user');
</script>
