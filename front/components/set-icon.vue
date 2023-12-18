<template>
  <span v-if="icon === 'home'" class="material-symbols-rounded">home</span>
  <span v-else-if="icon === 'login'" class="material-symbols-rounded">login</span>
  <span v-else-if="icon === 'star'" class="material-symbols-rounded">star</span>
  <span v-else-if="icon === 'sell'" class="material-symbols-rounded">sell</span>
  <span v-else-if="icon === 'videocam'" class="material-symbols-rounded">videocam</span>
  <span v-else-if="icon === 'tv'" class="material-symbols-rounded">tv</span>
  <span v-else-if="icon === 'logout'" class="material-symbols-rounded">logout</span>
  <span v-else-if="icon === 'menu'" class="material-symbols-rounded">menu</span>
  <span v-else-if="icon === 'close'" class="material-symbols-rounded">close</span>
  <span v-else-if="icon === 'open_in_new'" class="material-symbols-rounded">open_in_new</span>
  <span v-else-if="icon === 'arrow_forward'" class="material-symbols-rounded">arrow_forward</span>
  <span v-else-if="icon === 'person'" class="material-symbols-rounded">person</span>
  <span v-else-if="icon === 'mail'" class="material-symbols-rounded">mail</span>
  <span v-else-if="icon === 'description'" class="material-symbols-rounded">description</span>
  <span v-else-if="icon === 'build'" class="material-symbols-rounded">build</span>
  <span v-else-if="icon === 'deployed_code'" class="material-symbols-rounded">deployed_code</span>
</template>

<style lang="scss">
</style>

<script lang="ts" setup>
  const props = defineProps<{
    icon:string
  }>();
</script>
