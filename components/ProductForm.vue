<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100">
    <Menu></Menu>

    <div class="w-full flex items-center justify-center ">
      <form @submit.prevent="send()" class="form-group relative bg-white p-4 w-1/2 h-[33rem]">
        <div class="mt-4">
            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name to product</label>
            <input v-model="name" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="mt-4">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a category to produt</label>
          <select v-model="category" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="item in categories" :value="item.uuid">{{item.name}}</option>
          </select>
        </div>
        <div class="flex justify-center items-center w-full mt-4">
            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" @change="onFileChange">
                <input id="dropzone-file" type="file" class="hidden"  />
            </label>
        </div> 
        <div class="mt-4 absolute right-2">
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{{ resource}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
require('dotenv').config()
import Menu from './Menu.vue'
export default {
  props: {
    "resource": {
      type: String,
      default: 'create'
    }
  },
  name: 'ProductForm',
  data(){
    return {
      image: '',
      name: '',
      description: '',
      category: '',
      categories: [],
    }
  },
  mounted(){
    if(!this.$store.getters['token']) {
      this.$router.push('/login')
    }    
    this.getCategories()
  },
  methods: {
    getCategories(){
      this.$axios.get('/api/categories', {
        headers: {
          'R4-Token': this.$store.getters['token'],
        }
      })
      .then(response => {
        this.categories = response.data
      })
    },
    send(){
      if(this.resource == 'create'){
        this.create()
      }
      if(this.resource == 'update'){
        this.update()
      }
    },
    async create() {

      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.name);
      formData.append('category_uuid', this.category);
      
      await this.$axios.post('/api/product', formData, {
        headers: {
          'R4-Token': this.$store.getters['token'],
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(response => {
        this.$router.push({ name: 'product' })
      })
      .catch(error => {
        console.log(error)
      })
    },
    async update() {

      let data = new FormData();
      data.append('image', this.image);
      data.append('name', this.name);
      data.append('category_uuid', this.category);
      data.append('_method', 'PATCH');

      await this.$axios.post('/api/product/'+this.$route.query.uuid, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json',
          'R4-Token': this.$store.getters['token']
        }
      })
      .then(response => {
        this.$router.push({ name: 'product' })
      })
      .catch(error => {
        console.log(error)
      })
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file
    }

  }
}
</script>
