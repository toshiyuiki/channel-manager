<template>
    <div>
        <the-header />
        <section class="sec__intro">
            <div class="bg">
                <div class="sec__in__l">
                    <h2 class="fs__txt__en__80 color__txt__white">You Only <br class="dp__block__sp">Channel List</h2>
                    <p class="fs__txt__14 color__txt__white">あなただけのチャンネルリストを作ろう</p>
                </div>
            </div>
        </section>
        <section class="sec__about">
            <div class="sec__in__l">
                <figure data-scroll="fin" class="anime__bottom-up">
                    <img src="@/assets/images/index/sec_about_ph.jpg" alt="image photo">
                </figure>
                <div data-scroll="fin" class="anime__bottom-up txt">
                    <h2 data-scroll="fin" class="fs__txt__40">あなただけのチャンネルリストを作成<br>あなただけの動画一覧を作成しよう</h2>
                    <ul>
                        <li>好きなチャンネルの好きな動画だけをチェック可能！</li>
                        <li>タグをつけてチャンネルをジャンル別に管理！</li>
                        <li>必要な動画だけが表示されるストレスのないYoutubeライフを！</li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="sec__sample">
            <div class="slider channel">
                <ul class="dp__flex img__reset">
                    <li
                        v-for="(data,index) in get_channel_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_channel_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_channel_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_channel_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section data-scroll="fin" class="sec__howto">
            <div class="sec__in__l">
                <div class="dp__flex">
                    <figure data-scroll="fin" class="anime__bottom-up">
                        <img src="@/assets/images/index/sec_howto_ph.jpg" alt="image photo">
                    </figure>
                    <div data-scroll="fin" class="txt anime__bottom-up">
                        <h2 data-scroll="fin" class="fs__txt__40">How To</h2>
                        <p>使い方は非常にシンプル</p>
                        <ol>
                            <li>１．ログインページのサインアップからユーザー名とパスワードでアカウントを作成</li>
                            <li>２．ログインから作ったアカウントでログイン</li>
                            <li>３．チャンネル一覧からチャンネルを登録。</li>
                        </ol>
                        <ul class="caution fs__txt__12">
                            <li>※チャンネルIDの入ったURL、またはハンドルURLのみの対応となります。</li>
                            <li>※チャンネルIDの入ったURLは「https://www.youtube.com/channel/～」</li>
                            <li>※ハンドルURLは「https://www.youtube.com/@～」</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="sec__sample">
            <div class="slider video">
                <ul class="dp__flex img__reset">
                    <li
                        v-for="(data,index) in get_video_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_video_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_video_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                    <li
                        v-for="(data,index) in get_video_thumb"
                    >
                        <div>
                            <img :src="data">
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="sec__join">
            <div class="sec__in__l">
                <h2 class="fs__txt__26">Join</h2>
                <ul v-show="!login" class="dp__flex">
                    <li>
                        <dl>
                            <dt>アカウントをお持ちの方</dt>
                            <dd>
                                <p class="color__bg__ter"><NuxtLink to="#">ログイン</NuxtLink></p>
                                <ul class="fs__txt__12 caution">
                                    <li>※登録しないでください</li>
                                </ul>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <ul v-show="login" class="dp__flex">
                    <li>
                        <dl>
                            <dt>ログイン済みです。</dt>
                            <dd>
                                <p class="color__bg__ter"><NuxtLink to="#">管理画面へ</NuxtLink></p>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </section>
        <the-footer />
    </div>
</template>
<script lang="ts" setup>
const login = ref(false);
const { login_boo } = useAuth();
login.value = login_boo();
onMounted(() => {
    useScrollEvent().ScrollEvent()
})
const { getDb } = useDb();
const get_channel = await getDb('channel');
const get_video= await getDb('video');
const get_channel_thumb = await get_thumb_db('channel');
const get_video_thumb = await get_thumb_db('video');
async function get_thumb_db(t:string){
    let get_data = [null];
    if(t === 'channel' && get_channel.value){
        get_channel.value.forEach((val:string,index:number) => {
            if(index < 5){
                get_data[index] = val.channel_thumb;
            }
        });
        return get_data;
    }else if(t === 'video' && get_video.value){
        get_video.value.forEach((val:string) => {
            if(index < 5){
                get_data[index] = val.video_thumb;
            }
        });
        return get_data; 
    }
}
</script>
<style lang="scss">
    .sec__sample{
        padding:20px 0;
        @keyframes channel_slide {
            0%{
                left:0;
            }
            100%{
                left:-100%;
            }
        }
        @keyframes video_slide {
            0%{
                right:0;
            }
            100%{
                right:-100%;
            }
        }
        .slider{
            width:100%;
            overflow: hidden;
            position:relative;
            opacity:0.5;
        }
        .slider ul{
            width:200%;
            position:absolute;
            top:0;
        }
        .slider li{
            width:5%;
            box-sizing: border-box;
            padding:0 10px;
        }
        .slider div{
            overflow: hidden;
        }
        .slider.channel{
            padding:10% 0 0;
        }
        .slider.channel ul{
            left:0;
            animation: 30s linear 0s infinite channel_slide;
        }
        .slider.channel li div{
            border-radius: 100%;
        }
        .slider.video{
            padding:6.5% 0 0;
        }
        .slider.video ul{
            right:0;
            animation: 30s linear 0s infinite video_slide;
        }
        .slider.video li div{
            border-radius: 20px;
        }
        @include sp{
            .slider ul{
                width:400%;
            }
            .slider li{
                width:20%;
                padding:0 5px;
            }
            .slider.channel{
                padding:20% 0 0;
            }
            .slider.channel ul{
                animation: 30s linear 0s infinite channel_slide;
            }
            .slider.video{
                padding:13% 0 0;
            }
            .slider.video li div{
                border-radius: 10px;
            }
        }
    }
    .sec__intro{
        background:url(@/assets/images/index/sec_intro_bg.jpg) no-repeat center center fixed rgba($color-sec,0.6);
        background-size:cover;
        background-blend-mode: multiply;
        .bg{
            padding:200px 0 250px;
        }
        h2{
            text-align:center;
            margin:0 0 60px;
            text-shadow: 
                2px 2px 15px $color-black,
                2px -2px 15px $color-black,
                -2px 2px 15px $color-black,
                -2px -2px 15px $color-black;
        }
        p{
            text-align:center;
        }
        @include sp{
            background:url(@/assets/images/index/sec_intro_bg.jpg) no-repeat center center rgba($color-sec,0.6);
            background-size:cover;
            background-blend-mode: multiply;
            .bg{
                padding:100px per(10, 375) 150px;
            }
            h2{
                line-height:1.3;
                margin:0 0 40px;
            }
        }
    }
    .sec__about{
        padding:60px 0;
        .sec__in__l{
            position:relative;
        }
        h2{
            margin:0 0 40px;
            position:relative;
        }
        h2::after{
            content:"";
            display:block;
            width:0%;
            height:4px;
            background:$color-qua;
            transition: width .5s ease .3s;
        }
        h2.js--on::after{
            width:100%;
        }
        figure{
            width:per(500, 1180);
        }
        .txt{
            width:per(800, 1180);
            position:absolute;
            inset:20% 0 auto auto;
            margin:auto;
            box-sizing: border-box;
            padding:80px 20px;
            background:rgba($color-white,.85);
        }
        @include sp{
            padding:40px per(10, 375) 0;
            .sec__in__l{
                position:relative;
            }
            h2{
                margin:0 0 20px;
            }
            figure{
                width:per(200, 355);
            }
            .txt{
                position:static;
                width:100%;
                inset:auto;
                padding:40px 0;
            }
        }
    }
    .sec__howto{
        position:relative;
        padding:60px 0;
        &::before,
        &::after{
            content:"";
            background:$color-sec;
            position:absolute;
            z-index:2;
        }
        &::after{
            width:calc(00% - 0px);
            height:100%;
            top:0;
            right:0;
            transition: width 1.2s ease .2s;
        }
        &::before{
            width:calc(0% - 0px);
            height:30%;
            bottom:14%;
            left:0;
            transition: width 1s ease .4s;
        }
        &.js--on::after{
            width:calc(50% - 200px);
        }
        &.js--on::before{
            width:calc(50% - 500px);
        }
        .sec__in__l{
            position:relative;
            z-index:3;
        }
        div.dp__flex{
            align-items: flex-start;
        }
        h2{
            margin:0 0 40px;
        }
        h2::after{
            content:"";
            display:block;
            width:0;
            height:4px;
            background:$color-qua;
            transition: width .5s ease .3s;
        }
        h2.js--on::after{
            width:100%;
        }
        p{
            margin:0 0 20px;
        }
        ol{
            margin:0 0 40px;
        }
        figure{
            order:2;
            width:calc(50% - 100px);
            padding:20px;
        }
        .txt{
            order:1;
            background:rgba($color-white,.85);
            padding:20px;
        }
        @include sp{
            position:relative;
            padding:40px per(10, 375);
            &::before,
            &::after{
                content:"";
                background:$color-sec;
                position:absolute;
                z-index:2;
            }
            &::after{
                width:40%;
            }
            &::before{
                width:10%;
            }
            .sec__in__l{
                position:relative;
                z-index:3;
            }
            div.dp__flex{
                display:block;
            }
            h2{
                margin:0 0 20px;
            }
            p{
                margin:0 0 20px;
            }
            ol{
                margin:0 0 30px;
            }
            figure{
                width:60%;
                padding:0;
                margin:0 6% 0 auto;
            }
        }
    }
    .sec__join{
        padding:60px 0;
        background:rgba($color-pri,0.2);
        h2{
            text-align:center;
            margin:0 0 20px;
        }
        ul.dp__flex{
            justify-content: space-between;
            align-items: stretch;
            gap:0 20px;
            max-width:600px;
            margin:0 auto;
        }
        ul.dp__flex > li{
            border-radius: 15px;
            width:100%;
            background:$color-white;
            overflow: hidden;
        }
        ul.dp__flex > li dt{
            padding:10px;
            text-align:center;
            background:$color-pri;
            color:$color-white;
        }
        ul.dp__flex > li dd{
            padding:30px 0;
        }
        ul.dp__flex > li p{
            width:60%;
            margin:0 auto;
        }
        ul.dp__flex > li p a{
            display:block;
            text-align:center;
            padding:20px;
        }
        ul.caution{
            padding:20px 20px 0;
        }
        @include sp{
            padding:40px per(10, 375);
            ul.dp__flex > li p{
                width:80%;
            }
        }
    }
</style>
