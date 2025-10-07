<script setup>
import { BASE_API_URL } from '../constants'

const props = defineProps({
  fullUrl: String,
  shortLabel: String,
  visits: Number
});

const emit = defineEmits(['deleted']);

async function deleteUrl() {
  try {
    const confirm = window.confirm(`Are you sure you want to delete this URL? \n\n Full URL: ${props.fullUrl} \n Short Label: ${props.shortLabel}`);
    if (confirm) {
      const response = await fetch(`${BASE_API_URL}/api/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ shortLabel: props.shortLabel }),
      });
    }
    emit('deleted');
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <ul class="table-row">
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="props.fullUrl" target="_blank" rel="noopener noreferrer">{{ fullUrl }}</a>
    </li>
    <li class="table-cell px-2 py-1 border border-gray-300 underline">
      <a :href="BASE_API_URL + '/' + props.shortLabel" target="_blank" rel="noopener noreferrer">{{ shortLabel }}</a>
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300">
      {{ visits }}
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300">
      <button @click.prevent="deleteUrl"
        class="underline cursor-pointer"
      >
        Delete
      </button>
    </li>
  </ul>
</template>
