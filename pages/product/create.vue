<template>
  <div>
    <ProductForm :resource="'create'"></ProductForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductForm from '~/components/ProductForm.vue'

export default Vue.extend({
  name: 'ProductCreate',
  mounted() {
  }
})
</script>
