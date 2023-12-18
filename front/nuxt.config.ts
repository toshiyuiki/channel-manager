// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apikey: process.env.NUXT_API_KEY
    }
  },
  devtools: { enabled: true },
  app:{
    head:{
      title:"Channel Manager",
      htmlAttrs: {
        lang: "ja",
      },
      meta:[
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {name:"SKYPE_TOOLBAR", content:"SKYPE_TOOLBAR_PARSER_COMPATIBLE"},
        {'http-equiv':"X-UA-Compatibl", content:"IE=edg"},
        //ogp
        {property:"og:type", content:"website"},
        {property:"og:locale", content:"ja_JP"},
        {property:"og:title", content:"Log."},
        {property:"og:description", content:"Channel Manager"},
        {property:"og:url", content:"https://xxx.xxx.xxx/"},
        {property:"og:site_name", content:"Channel Manager"},
        {property:"og:image", content:"/ogp.jpg"},
        //thumnail
        {name:"thumbnail", content:"/thumnail.png"},
      ],
      link:[
        {rel:"shortcut icon", href:"/favicon.ico"},
        {rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,1,0"},
        {rel:"preconnect",href:"https://fonts.googleapis.com"},
        {rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600&family=Roboto:wght@400;600&display=swap",crossorigin: "",}
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['nuxt-jsonld'],
  css: ["@/assets/sass/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/sass/ini/_function.scss"; @import "@/assets/sass/setting/_setting_pak.scss";',
        },
      },
    },
  }
})
