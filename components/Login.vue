<!-- Please remove this file from your project -->

<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    
    <form @submit.prevent="userLogin">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="mx-auto h-24 w-auto" src="https://avatars.dicebear.com/api/bottts/login-logo.svg?" alt="Workflow">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="login.email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="login.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
    
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block-text-sm text-gray-900">
                Remember me 
              </label>
            </div>
          </div>

          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>


          <div v-if="message" class="">
            <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">{{message}}</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
require('dotenv').config()
export default {
  name: 'Login',
  data(){
    return {
      login: {
        email: '',
        password: '',
      },
      message: false
    }
  },
  mounted(){
    if(this.$auth.loggedIn){
      this.$router.push('/dashboard')
    }
    // console.log(process.env.BASE_URL_API)
  },
  methods: {
    async userLogin(){
      await this.$auth.loginWith('laravelSanctum', {
        data: this.login
      }).then(() => {
        this.$router.push('/dashboard')
      }).catch((error) => {
        console.log(error)
        // this.message = error.response.data.message
      })

      this.$router.push('/dashboard')
    }
  }
}
</script>
