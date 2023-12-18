<template>
    <header class="header color__bg__pri color__txt__white">
        <div class="inner">
            <div class="wrap dp__flex">
                <h1 class="fs__txt__en__26">
                    <NuxtLink to="/">Channel Manager</NuxtLink>
                </h1>
                <div data-event-group="menu" class="nav dp__flex__pc">
                    <div>
                        <nav class="nav__about fs__txt__12" aria-label="サイト説明ナビゲーション">
                            <ul class="dp__flex">
                                <li>
                                    <NuxtLink to="/about">このサイトについて</NuxtLink>
                                </li>
                                <li v-show="login">
                                    <NuxtLink :to="'/user-' + userurl">管理画面</NuxtLink>
                                </li>
                            </ul>
                        </nav>
                        <nav class="nav__sub fs__txt__14" aria-label="サインインナビゲーション">
                            <ul class="dp__flex">
                                <li v-show="!login" class="dp__block__sp">
                                    <NuxtLink to="/login" class="dp__flex">
                                        <b>ログイン</b>
                                    </NuxtLink>
                                </li>
                                <li v-show="login" class="dp__block__sp">
                                    <NuxtLink @click="login_out()" class="dp__flex">
                                        <b>ログアウト</b>
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink :to="'/user-' + userurl + '/video'" class="dp__flex">
                                        <set-icon icon="videocam" /><b>最新動画</b>
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink :to="'/user-' + userurl + '/channel'" class="dp__flex">
                                        <set-icon icon="tv" /><b>チャンネル一覧</b>
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink :to="'/user-' + userurl + '/tag'" class="dp__flex">
                                        <set-icon icon="sell" /><b>タグ一覧</b>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <nav class="nav__main" aria-label="メインナビゲーション">
                    <ul class="dp__flex">
                        <li class="login">
                            <p v-show="!login" class="fs__txt__12 color__bg__ter color__txt__black">
                                <NuxtLink to="/login">
                                    <set-icon icon="login" />
                                    <b class="dp__block__pc">ログイン</b>
                                </NuxtLink>
                            </p>
                            <p v-show="login" class="fs__txt__12 color__bg__ter color__txt__black">
                                <NuxtLink @click="login_out()">
                                    <set-icon icon="logout" />
                                    <b class="dp__block__pc">ログアウト</b>
                                </NuxtLink>
                            </p>
                        </li>
                        <li>
                            <button data-event-group="menu" @click="updateEventGroup('menu')" class="dp__block__sp"><span>MENU</span></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
    .header{
        position:sticky;
        width:100%;
        top:0;
        left:0;
        z-index:1000;
        .inner{
            padding:10px 40px;
        }
        .wrap{
            justify-content: space-between;
            align-items: center;
        }
        .nav{
            gap:0 20px;
            align-items: center;
            margin:0 40px 0 auto;
        }
        .nav__about{
            margin:0 0 10px;
        }
        .nav__about ul,
        .nav__sub ul{
            gap:0 20px;
            justify-content: flex-end;
        }
        .nav__sub a{
            justify-content: center;
            align-items: center;
            gap:0 5px;
        }
        .nav__sub a span{
            padding:0 0 5px;
            text-shadow: 
                1px 1px 2px $color-qua,
                -1px -1px 2px $color-qua,
                1px -1px 2px $color-qua,
                -1px 1px 2px $color-qua;
        }
        .login a{
            display:block;
            text-align:center;
            padding:10px 20px;
        }
        .login span{
            margin:0 0 3px;
        }
        .login span,
        .login b{
            display:block;
            text-align:center;
        }
        @include sp{
            .inner{
                position:relative;
                padding:10px per(10,375);
            }
            .wrap{
                justify-content: space-between;
                align-items: center;
            }
            .nav{
                display:block;
                position:fixed;
                width:calc(100% - 20px);
                height:calc(100dvh - 20px);
                inset:0 0 0 -200%;
                margin:auto;
                gap:0 20px;
                align-items: center;
                background:#333;
                transition: inset .5s ease 0s;
                overflow-y: auto;
            }
            .nav.js--on{
                inset: 0 0 0 0;
            }
            .nav > div{
                overflow: hidden;
            }
            .nav__about{
                margin:0 0 10px;
                padding:80px per(10,375) 0;
            }
            .nav__about ul{
                border:1px solid $color-white;
            }
            .nav__about ul li{
                width:100%;
            }
            .nav__about ul li a{
                display:block;
                text-align:center;
                padding:10px 0;
                border-right:1px solid $color-white;
            }
            .nav__about ul li:last-child a{
                border-right:none;
            }
            .nav__sub ul{
                display:block;
                padding:10px per(10, 375);
            }
            .nav__sub ul li a{
                justify-content: flex-end;
                padding:20px per(10, 355);
                text-align: right;
                border-bottom:1px solid $color-white;
            }
            .nav__sub ul li a span{
                display:none;
            }
            .nav__main{
                width:30%;
            }
            .nav__main ul{
                gap:0 5px;
            }
            .nav__main li{
                width:100%;
            }
            .login{
                width:100%;
                aspect-ratio: 1/1;
            }
            .login p,
            .login a{
                width:100%;
                height:100%;
                box-sizing: border-box;
                position:relative;
            }
            .login b{
                display:none;
            }
            .login span{
                position:absolute;
                inset:50% 0 0 50%;
                transform: translate(-50%,-50%);
                line-height:1;
                font-size:6vw;
                margin:0;
            }
            button{
                width:100%;
                background:transparent;
                font-size:0;
                line-height:0;
                border:none;
                background:#fff;
                aspect-ratio: 1/1;
                position:relative;
                cursor: pointer;
            }
            button::after,
            button::before{
                content:"";
            }
            button span,
            button::after,
            button::before{
                position:absolute;
                display:block;
                width:50%;
                height:2px;
                background:$color-black;
                margin:auto;
                transition: all .5s ease 0s;
            }
            button span{
                inset:0 0 0 0;
            }
            button::before{
                inset:20px 0 0 0;
            }
            button::after{
                inset:0 0 20px 0;
            }
            button.js--on{
                span{
                    inset:0 0 0 0;
                    width:0;
                }
                &::before{
                    inset:20px 0 0 -16.8%;
                    width:25%;
                    transform: rotate(45deg);
                }
                &::after{
                    inset:20px -16.8% 0 0;
                    width:25%;
                    transform: rotate(135deg);
                }
            }
        }
    }
</style>

<script lang="ts" setup>
    const { login_out,login_boo } = useAuth();
    const login = ref(false);
    login.value = login_boo();
    const userurl = useCookie('user');
    const { event_is, event_name, updateEventGroup } = useEventGroup();
</script>
