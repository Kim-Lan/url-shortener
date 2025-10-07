<script setup>
import { useClipboard } from '@vueuse/core'
import { useAuthStore } from '../stores/auth.store.js'

const props = defineProps({
  fullUrl: String,
  shortLabel: String,
  visits: Number
});

const { copy } = useClipboard();

const auth = useAuthStore();

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL
const BASE_URL = import.meta.env.VITE_BASE_URL

const emit = defineEmits(['deleted']);

async function deleteUrl() {
  try {
    const confirm = window.confirm(`Are you sure you want to delete this URL? \n\n Full URL: ${props.fullUrl} \n Short Label: ${props.shortLabel}`);
    if (confirm) {
      const response = await fetch(`${BASE_API_URL}/api/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
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
      <div class="flex justify-between items-center">
        <a :href="BASE_URL + '/pp/' + props.shortLabel" target="_blank" rel="noopener noreferrer">{{ shortLabel }}</a>
        <button title="Copy" @click="copy(BASE_URL + '/pp/' + props.shortLabel)">
          <font-awesome-icon class="text-gray-500 hover:text-gray-200 active:text-gray-800 cursor-pointer" icon="fa-regular fa-copy" />
        </button>
      </div>
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300">
      {{ visits }}
    </li>
    <li class="table-cell text-center px-2 py-1 border border-gray-300">
      <button @click="deleteUrl"
        class="underline cursor-pointer"
      >
        Delete
      </button>
    </li>
  </ul>
</template>
