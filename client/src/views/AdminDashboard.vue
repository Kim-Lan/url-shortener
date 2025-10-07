<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UrlRow from '../components/UrlRow.vue'
import { useAuthStore } from '../stores/auth.store.js'
import { BASE_API_URL } from '../constants'

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();

const urlArray = ref(null);
const fullUrl = ref('');
const shortLabel = ref('');
const errorMessage = ref('');

onMounted(() => getUrls());

async function getUrls() {
  try {
    const response = await fetch(`${BASE_API_URL}/api/urls`, {
      method: 'GET'
    });
    if (response && response.ok) {
      const data = await response.json();
      urlArray.value = data.reverse();
    }
  } catch (error) {
    errorMessage.value = error;
    console.error(error);
  }
}

async function shortenUrl(submitEvent) {
  try {
    errorMessage.value = '';
    const reqBody = { fullUrl: fullUrl.value };
    if (shortLabel.value !== '') {
      reqBody['shortLabel'] = shortLabel.value;
    }
    const response = await fetch(`${BASE_API_URL}/api/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(reqBody),
    });
    if (response && response.ok) {
      fullUrl.value = '';
      shortLabel.value = '';
      getUrls();
    } else {
      const data = await response.json()
      errorMessage.value = data.error;
    }
  } catch (error) {
    errorMessage.value = error;
    console.error(error);
  }
}

function logout() {
  auth.setUser(null);
  if (route.meta.requiresAuth) {
    router.push({ name: 'login' });
  }
}
</script>

<template>
  <div class="flex flex-col mx-4 md:mx-12 lg:mx-20 my-4 gap-4">
    <div class="flex justify-between">
      <h2 class="font-bold text-xl">
        Admin Dashboard
      </h2>
      <button class="underline cursor-pointer"
        @click.prevent="logout"
      >
        Logout
      </button>
    </div>

    <form
      class="p-4 flex flex-col items-center justify-center md:flex-row gap-6"
      id="urlForm"
      @submit.prevent="shortenUrl"
    >
      <div class="w-full md:w-1/2 flex gap-2 items-center">
        <label class="sr-only">Full URL</label>
        <input type="url"
          name="fullUrl"
          v-model="fullUrl"
          class="flex-1 px-2 py-1 border-2 border-slate-300 bg-slate-200 drop-shadow-sm drop-shadow-gray-300 rounded"
          placeholder="Full URL"
        />
      </div>
      <div class="w-full md:w-1/3 flex gap-2 items-center">
        <label class="sr-only">Custom Shortened Label (Optional)</label>
        <input type="text"
          name="shortLabel"
          v-model="shortLabel"
          class="flex-1 px-2 py-1 border-2 border-slate-300 bg-slate-200 drop-shadow-sm drop-shadow-gray-300 rounded"
          placeholder="Custom Shortened Label (Optional)"
        />
      </div>
      <button
        class="px-2 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white drop-shadow-sm drop-shadow-gray-500 rounded cursor-pointer"
      >Shorten</button>
    </form>

    <div v-if="errorMessage">
      Error: {{ errorMessage }}
    </div>

    <div class="table border border-collapse border-gray-300">
      <div class="table-header-group">
        <ul class="table-row font-bold">
          <li class="table-cell px-2 py-1 border border-gray-300">Full URL</li>
          <li class="table-cell px-2 py-1 border border-gray-300">Shortened URL</li>
          <li class="table-cell text-center px-2 py-1 border border-gray-300">Visits</li>
          <li class="table-cell text-center px-2 py-1 border border-gray-300">Delete</li>
        </ul>
      </div>

      <url-row v-for="url in urlArray" v-bind="url" @deleted="getUrls" />

    </div>
  </div>
</template>
