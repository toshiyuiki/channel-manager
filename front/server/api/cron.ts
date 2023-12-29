import { prisma } from '@/middleware/prisma';

export default defineEventHandler(async (e) => {
  let user = await prisma.user.findMany();
  let channel = await prisma.channel.findMany();
  let video = await prisma.video.findMany();

  video.sort((a:any,b:any) => {
    if( a.video_post < b.video_post ) return -1;
    if( a.video_post > b.video_post ) return 1;
    return 0;
  })


  user.forEach(async (u) => {
    channel.forEach(async (ch) => {
      const feed_url = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channel_id}`);
      const rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
      const rss2json_feed_url = rss2json+feed_url;
      const get_feed = await fetch(rss2json_feed_url);
      const feed = await get_feed.json();
      const videos = feed.items;
      await videos.forEach(async (v,index) => {
        if(index < 5){
          const time = new Date(v.pubDate);
          if(video[0].video_post < time){
            await prisma.video.create({
              data: {
                channel_id : ch.channel_id,
                user_name : u.user_name,
                video_id : v.link,
                video_tag : v.value,
                video_title : v.title,
                video_thumb : v.enclosure.thumbnail,
                video_post : time.toISOString()
              },
            });
          };
        }
      });
    });
  });

  return video;
});