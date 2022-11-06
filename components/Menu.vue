<!-- Please remove this file from your project -->

<template>
  <div class="relative w-[8rem] h-screen bg-slate-900">
    <div class="relative flex justify-center items-center w-[8rem] h-[12rem]">
      <div class="flex flex justify-around absolute top-4 right-2 w-14 h-4">
        <div class="w-3 h-3 bg-cyan-700 rounded-full"></div>
        <div class="w-3 h-3 bg-cyan-700 rounded-full"></div>
        <div class="w-3 h-3 bg-cyan-700 rounded-full"></div>
      </div>
      <div class="flex justify-center items-center profile w-[6rem] h-[6rem] bg-white rounded-full">
        <img class="mx-auto h-20 w-auto " src="https://avatars.dicebear.com/api/bottts/login-logo.svg?" alt="Workflow"></img>
      </div>
    </div>

    <ul class="text-white">
      <li class="bg-slate-700 p-2 w-[6rem] rounded-lg ml-4">
        <a href="/product">Product</a>
      </li>
    </ul>

    <div class="absolute bottom-4 logout text-white">
      <button class="bg-slate-700 p-2 w-[6rem] rounded-lg ml-4 mt-2">
        <a href="/login"  @click="userLogout()">Logout</a>
      </button>
    </div>
  </div>
</template>

<script>

require('dotenv').config()
export default {
  name: 'Login',
  data(){
    return {
    
    }
  },
  mounted(){
    if(!this.$store.getters['token']){
      this.$router.push('/login')
    }      
  },
  methods: {
   userLogout(){
    this.$store.commit('logout')
   }
  }
}
</script>
