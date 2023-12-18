<template>
    <div>
        <the-header />
        <section class="sec__hero">
            <div class="bg">
                <div class="sec__in__l">
                    <h1 class="fs__txt__40 color__txt__white">最新動画</h1>
                </div>
            </div>
        </section>
        <section class="sec__video__list">
            <div class="sec__in__l">
                <h2>動画一覧</h2>
                <ul class="channel dp__flex">
                    <li
                        v-for="(data, index) in get_user_video"
                    > 
                        <dl>
                            <dt class="fs__txt__14">
                                <a :href="data.video_id" target="_blank">{{ data.video_title }}</a>
                            </dt>
                            <dd>
                                <figure class="img__reset">
                                    <a :href="data.video_id" target="_blank"><img :src="data.video_thumb"></a>
                                </figure>
                                <ul class="tag fs__txt__14 dp__flex">
                                    <li>
                                        <NuxtLink :to="'/user-'+ route.params.name +'/tag/video/' + data.video_tag">
                                            {{ data.video_tag }}
                                        </NuxtLink>
                                    </li>
                                </ul>
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
    const route = useRoute();
    const { login_boo_link } = useAuth();
    login_boo_link();
    const { getDb } = useDb();

    const get_video = await getDb('video');

    const get_user_video = await user_video();
    function user_video () {
        let db = null;
        db = get_video.value.filter(val => {
            return val.user_name === route.params.name
        });
        return db;
    }

</script>
<style lang="scss">
    .sec__video__list{
        padding:60px 0;
        h2{
            margin:0 0 20px;
        }
        .channel{
            gap:10px;
            flex-wrap: wrap;
        }
        .channel > li{
            width:calc(per(1,5) - 10px);
            background:rgba($color-sec,0.2);
            box-sizing: border-box;
            padding:10px;
        }
        .channel > li figure{
            border-radius: 15px;
            overflow: hidden;
        }
        .channel > li dt{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 1;
            margin:0 0 10px;
        }
        .channel .tag{
            padding:10px 0 0;
        }
        .channel .tag li{
            background:$color-white;
            padding:2px 5px;
            border-radius: 2px;
        }
        @include sp{
            padding:40px per(10, 375);
            .channel > li{
                width:calc(per(1,3) - 7px);
            }
        }
    }
</style>
