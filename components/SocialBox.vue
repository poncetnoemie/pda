<template>
  <div class="flex items-center justify-center">
    <a
      class="mr-4 last:mr-0 opacity-75 hover:opacity-100 cursor-pointer"
      v-for="(item, index) in socials"
      :key="index"
      :href="item.url"
    >
      <font-awesome-icon :icon="['fab', item.icon]" :class="item.styles" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socials: Array
  }
};
</script>
