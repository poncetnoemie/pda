<template>
  <div class="flex items-stretch">
    <div
      class="font-bold md:text-lg bg-grey-lightest p-4 w-1/6 text-center flex flex-shrink-0 items-center justify-center"
      v-html="(item.place < 10 ? '0' : '') + item.place"
    ></div>
    <div class="flex flex-grow justify-between items-center">
      <div class="flex items-center">
        <a
          :href="'mailto:' + item.email"
          class="opacity-25 hover:opacity-75 transition-opacity cursor-pointer text-lg hidden md:inline-block text-center w-24 py-4 px-6"
          title="Envoyer un email à cet artiste"
        >
          <font-awesome-icon icon="envelope" />
        </a>
        <span class="inline-block ml-6 md:ml-0"
          >{{ item.firstName }} {{ item.lastName }}</span
        >
      </div>
      <div class="p-4">
        <span
          v-for="(category, index) in categories"
          :key="index"
          class="py-1 px-2 ml-1 uppercase text-xs rounded text-center"
          :class="
            item.categories[category.name]
              ? category.color + ' block md:inline-block mb-1 md:mb-0'
              : 'hidden'
          "
          v-html="category.label"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    categories: Array
  }
};
</script>
