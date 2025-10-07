<script setup>
import { BASE_API_URL } from '../constants'

const props = defineProps({
  fullUrl: String,
  shortLabel: String,
  visits: Number
});

async function deleteUrl() {

}
</script>

<template>
  <ul class="table-row">
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="props.fullUrl">{{ fullUrl }}</a>
    </li>
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="BASE_API_URL + '/' + props.shortLabel">{{ shortLabel }}</a>
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
