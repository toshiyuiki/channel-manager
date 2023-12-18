<template>
    <div>
        <the-header />
        <section class="sec__hero">
            <div class="bg">
                <div class="sec__in__l">
                    <h1 class="fs__txt__40 color__txt__white">Log in</h1>
                </div>
            </div>
        </section>
        <section class="sec__login">
            <div class="sec__in__l">
                <div class="inner">
                <h2 class="fs__txt__en__24">ログイン</h2>
                    <div class="form color__bg__white">
                        <p class="fs__txt__14 color__txt__qua">{{ logincomment }}</p>
                        <form v-on:submit.prevent>
                            <ul>
                                <li>
                                    <label>
                                        <span>ユーザー名</span>
                                        <input v-model="username" type="text" placeholder="" required>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <span>パスワード</span>
                                        <input v-model="userpass" type="text" placeholder="" required>
                                    </label>
                                </li>
                            </ul>
                            <button type="submit" class="color__bg__ter fs__txt__18" @click="user_login">ログイン</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <section class="sec__login">
            <div class="sec__in__l">
                <div class="inner">
                <h2 class="fs__txt__en__24">サインアップ</h2>
                    <div class="form color__bg__white">
                        <p class="fs__txt__14 color__txt__qua">{{ signcomment }}</p>
                        <form v-on:submit.prevent>
                            <ul>
                                <li>
                                    <label>
                                        <span>ユーザー名</span>
                                        <input v-model="signname" type="text" placeholder="" required>
                                    </label>
                                </li>
                                <li>
                                    <label>
                                        <span>パスワード</span>
                                        <input v-model="signpass" type="text" placeholder="" required>
                                    </label>
                                </li>
                            </ul>
                            <button type="submit" class="color__bg__ter fs__txt__18" @click="post_user({user_name:signname,user_pass:signpass})">作成</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <the-footer />
    </div>
</template>
<style lang="scss">
    .sec__login{
        padding:60px 0;
        .inner{
            max-width:600px;
            margin:0 auto;
            background:rgba($color-sec,0.2);
            padding:20px;
            box-sizing: border-box;
        }
        h2{
            text-align:center;
            margin:0 0 10px;
        }
        p{
            text-align:center;
        }
        .form{
            padding:20px 20px 40px;
        }
        ul{
            padding:10px 40px;
            margin:0 0 30px;
        }
        li{
            margin:0 0 5px;
        }
        li:last-child{
            margin:0;
        }
        li input{
            display:block;
            width:100%;
            font-size:1.8rem;
            padding:10px;
            box-sizing: border-box;
            border:1px solid $color-sec;
        }
        li input:invalid{
            border:1px solid $color-qua;
        }
        li label{
            display:block;
            position:relative;
            padding:2rem 0 0;
        }
        li span{
            position:absolute;
            display:block;
            top:25px;
            left:10px;
            font-size:1.8rem;
            transition: font-size .3s ease 0s, top .3s ease 0s, opacity .3s ease 0s;
        }
        li:has(input:placeholder-shown) span{
            top:25px;
            font-size:1.8rem;
            opacity:0.2;
        }
        li:has(input:focus) span,
        li:has(input:not(:placeholder-shown)) span{
            top:0;
            font-size:1.2rem;
            opacity:1;
        }
        button{
            border:none;
            display:block;
            width:50%;
            margin:0 auto;
            box-sizing: border-box;
            padding:10px;
            text-align:center;
        }
        @include sp{
            padding:40px per(10, 375);
            .inner{
                padding:10px;
            }
            .form{
                padding:10px 10px 40px;
            }
            ul{
                padding:10px 10px;
            }
            button{
                width:80%;
            }
        }
    }
</style>
<script lang="ts" setup>
const cookie_login = useCookie('login');
const cookie_user = useCookie('user');
if(cookie_login.value){
    navigateTo('/user-' + cookie_user.value);
}

const { getDb,postDb } = useDb();

const username = ref(null);
const userpass = ref(null);

const logincomment = ref("");
async function user_login() {
    const get_user = await getDb('user');
    if(get_user.value){
        get_user.value.forEach((val:string) => {
            console.log(val.user_name,username.value,val.user_pass,userpass.value)
            if(val.user_name == username.value && val.user_pass == userpass.value){
                logincomment.value = "ログイン";
                cookie_login.value = "true";
                cookie_user.value = username.value;
                navigateTo('/user-' + cookie_user.value);
            }else{
                logincomment.value = "ログイン失敗";
            }
        });
    }else{
        logincomment.value = "入力内容を確認してください"
    }
}

const signname = ref(null);
const signpass = ref(null);

const signcomment = ref("");

const post_user = async (val:{}) => {
    const get_user = await getDb('user');
    const table = 'user'
    let comment = '';
    if(get_user.value){
        if(get_user.value?.length !== 0){
            get_user.value?.forEach((data:string) => {
                if(data.user_name === signname.value){
                    signcomment.value = "違う名前で登録してください。";
                }else{
                    postDb(table,val);
                    comment = "作成しました。";
                }
            });
        }else{
            postDb(table,val);
            comment = "作成しました。";
        }
    }else{
        postDb(table,val);
        comment = "作成しました。"; 
    }
    signcomment.value = comment;
    location.reload();
}

</script>