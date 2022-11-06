<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <Menu></Menu>
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-center pt-8 sm:justify-start sm:pt-0">
        <h1 class="text-4xl text-gray-600">Products</h1>
      </div>
      <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-6">
            <div class="flex items-center">
              <div class="ml-4 text-lg text-gray-600 leading-7 font-semibold"><a href="/product/create">Create Product</a></div>
            </div>
          </div>
        </div>
      </div>


      <div class="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  Our products
                  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="py-3 px-6">
                          Img Product
                      </th>
                      <th scope="col" class="py-3 px-6">
                          Name Product
                      </th>
                      <th scope="col" class="py-3 px-6">
                          Category
                      </th>
                      <th scope="col" class="py-3 px-6">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="product in products.data">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <img :src="product.image_url" class="w-20 h-20 rounded-full" alt="avatar">
                      </th>
                      <td class="py-4 px-6">
                          {{ product.name }}
                      </td>
                      <td class="py-4 px-6">
                          {{ product.category_name }}
                      </td>

                      <td class="py-4 px-6 text-right">
                        <a :href="'/product/edit?uuid='+product.uuid" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <button class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="deleteProduct(product.uuid)">Delete</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

    </div>
  </div>
</template>

<script>
require('dotenv').config()
import Menu from './Menu.vue'
export default {

  name: 'Products',
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    if(!this.$store.getters['token']) {
      this.$router.push('/login')
    }    

    this.getProducts()
  },
  methods: {
    async getProducts() {
      this.products = await this.$axios
        .get('api/product', {
          headers: {
            'R4-Token': this.$store.getters['token']
          }
        })
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        }) 
    },

    async deleteProduct(uuid) {
      await this.$axios
        .delete('/api/product/'+uuid, {
          headers: {
            'R4-Token': this.$store.getters['token']
          }
        })
        .then(function (response) {
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error)
        }) 
    }
  }

}
</script>
