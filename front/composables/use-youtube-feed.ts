
const useYoutubeFeed = () => {
    const useYoutubeFeedGet = async (url:string) => {
        const apikey = useRuntimeConfig().public.apikey;
        const url_domain = 'https://www.youtube.com/';
        const url_id = '/channel/';
        const url_name = '/@';
        let temp:string = "";
        let thumb:string = "";
        if(url.indexOf(url_domain) === -1){
            alert("YOUTUBEのチャンネルURLを入力してください");
            return url;
        }else if(url.indexOf('?') > -1){
            alert("クリーンURLを入力してください");
            return url;
        }else if(url.indexOf(url_id) === -1 && url.indexOf(url_name) === -1){
            alert("チャンネルURLを入力してください");
        }else if(url.indexOf(url_id) > -1){
            const channel = url.split(url_id);
            temp = channel[1];
        }else if(url.indexOf(url_name) > -1){
            const channel = url.split(url_name);
            temp = '@' + channel[1];
            //APIKEY
            const {data:user_query} = await useFetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${temp}&type=channel&key=${apikey}`);
            if(user_query.value){
                temp =  user_query.value.items[0].id.channelId;
            }
        }else{
            alert("URLを入力してください");
        }
        const {data:channel_query} = await useFetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${temp}&key=${apikey}`);
        if(channel_query.value){
            thumb = channel_query.value.items[0].snippet.thumbnails.high.url;
        }
        const feed_url = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${temp}`);
        const rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
        const rss2json_feed_url = rss2json+feed_url;
        const {data:get_feed} = await useFetch(rss2json_feed_url);
        let feed = null;
        if(get_feed.value){
            const feed_temp = {
                channel_id : temp,
                channel_name : get_feed.value.feed.title,
                channel_thumb : thumb,
                video : get_feed.value.items
            };
            feed = feed_temp;
        }
        return {
            feed 
        }
    }
    return {
        useYoutubeFeedGet
      }
}
export default useYoutubeFeed;