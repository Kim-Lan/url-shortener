<script setup>
const props = defineProps({
  fullUrl: String,
  shortUrl: String,
  visits: Number
});
</script>

<template>
  <ul class="table-row">
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="props.fullUrl">{{ fullUrl }}</a>
    </li>
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="props.shortUrl">{{ shortUrl }}</a>
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300">
      {{ visits }}
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300 underline">
      Edit
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300 underline">
      Delete
    </li>
  </ul>
</template>
