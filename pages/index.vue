<template>
  <Tutorial/>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted() {
    if(localStorage.getItem('r4-token')){
      this.$router.push('/dashboard')
    }else{
      this.$router.push('/login')
    }
  }
})
</script>
