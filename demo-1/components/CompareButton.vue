<template>
  <button class="compare-button" @click="addToCompare(product)">
    <SfImage
      :src="addBasePath('/icons/compare.svg')"
      :width="24"
      :height="24" alt="Compare"
    />
  </button>
</template>

<script>
// import { toRefs } from '@nuxtjs/composition-api';
import { SfImage } from '@storefront-ui/vue';
import { useCompare } from '../composables';
import { addBasePath } from '@vue-storefront/core';

export default {
  name: 'CompareButton',
  components: {
    SfImage
  },
  props: [
    'product'
  ],
  setup(){
    const { addProductToCompare } = useCompare();

    return {
      addProductToCompare,
      addBasePath,
    }
  },
  mounted(){
    // nconsole.log(product)
  },
  methods: {
    addToCompare: function(product){
      console.log("Adicionar para comparar: ", product)
      this.addProductToCompare(product)
    }
  }
};
</script>

<style lang="css" scoped>
.compare-button{
  position: absolute;
  top: 66px;
  right: 39px;
  z-index: 1;
  display: none;
  opacity: 0;
  transition: var(--product-card-wishlist-icon-transition, opacity 150ms ease-in-out);
}

.carousel__item:hover .compare-button{
  display: block;
  opacity: var(--product-card-wishlist-icon-opacity, 1);
  transition: var(--product-card-wishlist-icon-transition, opacity 150ms ease-in-out);
  cursor: pointer;
}
</style>
