const useAuth = () => {
    const login_boo =() => {
        const cookie_login = useCookie('login');
        let data = false;
        if(cookie_login.value){
            data = true;
        }else{
            data = false;
        }
        return data;
    }
    const login_boo_link = () => {
        const cookie_login = useCookie('login');
        if(!cookie_login.value){
            navigateTo('/login');
        }
        return cookie_login.value;
    }
    const login_user = () => {
        const cookie_user = useCookie('user');
        return cookie_user.value;
    }
    const login_out = () => {
        const cookie_login = useCookie('login');
        const cookie_user = useCookie('user');
        cookie_login.value = null;
        cookie_user.value = null;
        navigateTo('/');
        location.reload();
        return cookie_login.value;
    }
    return {
        login_boo,login_user,login_out,login_boo_link
    }
}
export default useAuth;