<template>
    <div>
        <the-header />
        <section class="sec__hero">
            <div class="bg">
                <div class="sec__in__l">
                    <h1 class="fs__txt__40 color__txt__white">チャンネル</h1>
                </div>
            </div>
        </section>
        <section class="sec__channel__add color__bg__ter">
            <div class="sec__in__l">
                <form v-on:submit.prevent>
                    <dl class="ch">
                        <dt class="fs__txt__40">Youtube Channel URL</dt>
                        <dd>
                            <label><span>https://www.youtube.com/channel/~</span>
                                <input v-model="add_channel_url" type="text" placeholder=" " required>
                            </label>
                        </dd>
                    </dl>
                    <dl class="tag">
                        <dt>初期タグ<small class="fs__txt__12">（あとから変更できます）</small></dt>
                        <dd>
                            <ul class="dp__flex">
                                <li>
                                    <input v-model="add_tag" type="text" required>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <button @click="add_channel()" type="submit">追加</button>
                </form>
            </div>
        </section>
        <section class="sec__channel__list">
            <div class="sec__in__l">
                <h2>チャンネル一覧</h2>
                <ul class="channel dp__flex">
                    <li
                        v-for="(data, index) in get_user_channel"
                    >
                        <dl>
                            <dt class="fs__txt__14">
                                <a :href="'https://www.youtube.com/channel/' + data.channel_id" target="_blank">{{ data.channel_name }}</a>
                            </dt>
                            <dd>
                                <a :href="'https://www.youtube.com/channel/' + data.channel_id" target="_blank">
                                    <figure class="img__reset"><img :src="data.channel_thumb"></figure>
                                </a>
                                <ul class="tag fs__txt__14 dp__flex">
                                    <li>
                                        <NuxtLink :to="'/user-'+ route.params.name +'/tag/channel/' + data.channel_tag">
                                            {{ data.channel_tag }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <div class="tagedit">
                            <p class="fs__txt__12">タグ変更</p>
                            <div class="edit dp__flex">
                                <input v-model="putchanneltag[index]" type="text">
                                <button @click="put_channel(data.id,{channel_tag:putchanneltag[index]})">変更</button>
                            </div>
                        </div>
                        <p class="delete"><button @click="del_db('channel',data.id)">チャンネル削除</button></p>
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
    //get post
    const { getDb,postDb,putDb,delDb } = useDb();
    //feed
    const { useYoutubeFeedGet } = useYoutubeFeed();

    const add_channel_url:Ref<string> = ref("");
    const add_tag:Ref<string> = ref("");

    const get_channel = await getDb('channel');
    const get_user_channel = await user_channel();
    function user_channel () {
        let db = null;
        db = get_channel.value.filter(val => {
            return val.user_name === route.params.name
        });
        return db;
    }

    const post_channel = async (val:{}) => {
        const table = 'channel'
        await postDb(table,val);
    }
    const post_video = async (val:{}) => {
        const table = 'video'
        await postDb(table,val);
    }

    const add_channel = async () => {
        const url:string = add_channel_url.value;
        const {feed:temp} = await useYoutubeFeedGet(url);
        await post_channel({
            user_name : route.params.name,
            channel_id : temp.channel_id,
            channel_name : temp.channel_name,
            channel_thumb : temp.channel_thumb,
            channel_tag : add_tag.value
        });
        await temp.video.forEach (async (val,index) => {
            const time = new Date(val.pubDate);
            if(index < 5){                
                await post_video({
                    channel_id : temp.channel_id,
                    user_name : route.params.name,
                    video_id : val.link,
                    video_tag : add_tag.value,
                    video_title : val.title,
                    video_thumb : val.enclosure.thumbnail,
                    video_post : time.toISOString()
                });
            }
            return index;
        });
        location.reload();
    }

    const putchanneltag:Ref<string> = ref([""]);
    const put_channel = async (target:number,val:{}) => {
        const table = 'channel'
        await putDb(table,target,val);
        location.reload();
    }
    const del_db = async (table:string,target:number) => {
        await delDb(table,target);
        location.reload();
    }
</script>
<style lang="scss">
    .sec__channel__add{
        padding:60px 0;
        .ch{
            padding:0 0 30px;
            dt{
                text-align:center;
            }
            dd input{
                width:100%;
                font-size:4.0rem;
                box-sizing: border-box;
                padding:10px;
                display:block;
            }
            dd label{
                display:block;
                position:relative;
                padding:2rem 0 0;
            }
            dd span{
                position:absolute;
                display:block;
                top:25px;
                left:10px;
                font-size:1.8rem;
                transition: font-size .3s ease 0s, top .3s ease 0s, opacity .3s ease 0s;
            }
            dd:has(input:placeholder-shown) span{
                top:15px;
                font-size:4.0rem;
                opacity:0.2;
            }
            dd:has(input:focus) span,
            dd:has(input:not(:placeholder-shown)) span{
                top:0;
                font-size:1.2rem;
                opacity:1;
            }
        }
        .tag{
            dt{
                text-align:right;
            }
            dd ul{
                justify-content: flex-end;
            }
            dd input{
                width:100%;
                max-width:300px;
                font-size:1.8rem;
                box-sizing: border-box;
                padding:10px;
                display:block;
            }
        }
        button{
            background:$color-pri;
            color:$color-white;
            border:none;
            width:per(400, 1180);
            margin:0 auto;
            font-size:4.0rem;
            border:1px solid $color-white;
            text-align:center;
            padding:10px;
            margin:0 auto;
            display:block;
            cursor: pointer;
        }
        @include sp{
            padding:40px per(10, 375);
            .ch{
                padding:0 0 30px;
                dt{
                    margin:0 0 10px;
                }
                dd{
                    overflow: hidden;
                }
                dd input{
                    font-size:2.0rem;
                }
                dd label{
                    padding:3rem 0 0;
                }
                dd span{
                    top:35px;
                    font-size:2.0rem;
                }
                dd:has(input:placeholder-shown) span{
                    top:35px;
                    font-size:2.0rem;
                }
                dd:has(input:focus) span,
                dd:has(input:not(:placeholder-shown)) span{
                    top:0;
                    font-size:1.2rem;
                    opacity:1;
                }
            }
            .tag{
                padding:0 0 40px;
                dt{
                    text-align:center;
                }
                dd ul{
                    display:block;
                }
                dd input{
                    width:80%;
                    max-width:100%;
                    font-size:1.6rem;
                    margin:0 auto;
                }
            }
            button{
                border:none;
                width:90%;
                font-size:3.0rem;
            }
        }
    }
    .sec__channel__list{
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
            border-radius: 100%;
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
        .channel .tagedit{
            padding:10px 0;
        }
        .channel .tagedit div.dp__flex{
            gap:0 5px;
        }
        .channel .tagedit div.dp__flex input{
            width:100%;
            box-sizing: border-box;
            padding:5px;
        }
        .channel .tagedit div.dp__flex button{
            width:100%;
            flex-basis: 4em;
            text-align:center;
            box-sizing: border-box;
            padding:5px;
            background:rgba($color-pri,0.8);
            color:$color-white;
            border:none;
        }
        .channel .delete button{
            display:block;
            width:100%;
            text-align:center;
            background:$color-qua;
            border:none;
            padding:5px;

        }
        @include sp{
            padding:40px per(10, 375);
            .channel > li{
                width:calc(per(1,3) - 7px);
            }
        }
    }
</style>
