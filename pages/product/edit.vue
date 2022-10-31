<template>
  <div>
    <ProductForm resource="update"></ProductForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EditProduct',
  data(){
    return {
      uuid: ''
    }
  }
})
</script>
