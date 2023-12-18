<template>
    <div>
        <the-header />
        <section class="sec__hero">
            <div class="bg">
                <div class="sec__in__l">
                    <h1 class="fs__txt__40 color__txt__white">タグ一覧</h1>
                </div>
            </div>
        </section>
        <section class="sec__tag__list">
            <div class="sec__in__l">
                <h2>タグ</h2>
                <ul class="tag dp__flex">
                    <li
                        v-for="(data, index) in get_tag"
                    >
                        <dl>
                            <dt class="fs__txt__18">
                                {{ data }}
                            </dt>
                            <dd>
                                <ul>
                                    <li>
                                        <NuxtLink :to="'/user-'+ route.params.name +'/tag/video/' + data">
                                            <set-icon icon="videocam" />
                                            <b>動画一覧</b>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink :to="'/user-'+ route.params.name +'/tag/channel/' + data">
                                            <set-icon icon="tv" />
                                            <b>チャンネル一覧</b>
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
    const get_channel = await getDb('channel');
    const get_tag = await get_tag_db();

    async function get_tag_db() {
        let db = [null];
        db = get_channel.value.filter(val => {
            return val.user_name === route.params.name
        });
        db.forEach((val,index) => {
            db[index] = val.channel_tag;
        });
        const rs = [...new Set(db)]
        return rs;
    }

</script>
<style lang="scss">
    .sec__tag__list{
        padding:60px 0;
        h2{
            margin:0 0 20px;
        }
        .tag{
            gap:10px;
            flex-wrap: wrap;
        }
        .tag > li{
            width:calc(per(1,5) - 10px);
            background:rgba($color-sec,0.2);
            box-sizing: border-box;
            padding:10px;
        }
        .tag > li figure{
            border-radius: 15px;
            overflow: hidden;
        }
        .tag > li dt{
            margin:0 0 10px;
            padding:0 0 10px;
            border-bottom:1px solid $color-black;
        }
        .tag li li{
            margin:0 0 5px;
        }
        .tag li li:last-child{
            margin:0;
        }
        .tag > li a{
            display:flex;
            align-items: center;
            gap:0 10px;
            background:$color-ter;
            padding:10px;
        }
        @include sp{
            padding:40px per(10, 375);
            .tag > li{
                width:100%;
            }
            .tag li ul{
                display:flex;
                gap:0 10px;
            }
            .tag li ul li{
                width:100%;
                font-size:1.3rem;
            }
        }
    }
</style>
