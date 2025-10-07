<script setup>
import UrlRow from '../components/UrlRow.vue'

const urlArray = [{
  fullUrl: "https://kim-lan.com",
  shortUrl: "https://test.com",
  visits: 1 
}];
</script>

<template>
  <div class="flex flex-col mx-4 md:mx-12 lg:mx-20 my-4 gap-4">
    <h2 class="font-bold text-xl">
      Admin Dashboard
    </h2>
    <form class="p-4 flex flex-col items-center justify-center md:flex-row gap-6">
      <div class="w-full md:w-1/2 flex gap-2 items-center">
        <label class="sr-only">Full URL</label>
        <input type="url"
          class="flex-1 px-2 py-1 border-2 border-gray-500 bg-white drop-shadow-sm drop-shadow-gray-300 rounded"
          placeholder="Full URL"
        />
      </div>
      <div class="w-full md:w-1/3 flex gap-2 items-center">
        <label class="sr-only">Custom Shortened Label</label>
        <input type="text"
          class="flex-1 px-2 py-1 border-2 border-gray-500 bg-white drop-shadow-sm drop-shadow-gray-300 rounded"
          placeholder="Custom Shortened Label"
        />
      </div>
      <button
        class="px-2 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white drop-shadow-sm drop-shadow-gray-500 rounded"
      >Shorten</button>
    </form>

    <div class="table border border-collapse border-gray-300">
      <div class="table-header-group">
        <ul class="table-row font-bold">
          <li class="table-cell px-2 py-1 border border-gray-300">Full URL</li>
          <li class="table-cell px-2 py-1 border border-gray-300">Shortened URL</li>
          <li class="table-cell text-center px-2 py-1 border border-gray-300">Visits</li>
          <li class="table-cell text-center px-2 py-1 border border-gray-300">Edit</li>
          <li class="table-cell text-center px-2 py-1 border border-gray-300">Delete</li>
        </ul>
      </div>

      <url-row v-for="url in urlArray" v-bind="url" />

    </div>
  </div>
</template>
