<template>
  <div>
    <NuxtPage />
  </div>
</template>
<style lang="scss">
  .sec__hero{
    background:url(@/assets/images/sec_hero_bg.jpg) no-repeat center center;
    background-size:cover;
    .bg{
      background:rgba($color-sec,0.6);
      padding:60px 0;
    }
    h1{
      text-shadow: 
        2px 2px 15px $color-black,
        2px -2px 15px $color-black,
        -2px 2px 15px $color-black,
        -2px -2px 15px $color-black;
    }
  }
  
</style>
