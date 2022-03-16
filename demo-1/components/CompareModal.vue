<template>
  <div id="compare-modal">
    <section class="compare-modal--button">
      <SfButton
        class="sf-call-to-action__button"
        data-testid="cta-button"
        @click="toggleCompareModal"
        :class="{ active: getCompareQuantity > 0 || isCompareModalOpen }"
      >
        <SfImage
          :src="addBasePath('/icons/compare.svg')"
          :width="24"
          :height="24"
          alt="Compare"
        />

        {{ $t('Compare Products') }}

        <span class="compare-modal--quantity">
          {{ getCompareQuantity }}
        </span>
      </SfButton>
    </section>

    <section
      class="compare-modal--products"
      :class="{ active: isCompareModalOpen }"
    >
      <section class="compare-modal--items">
        <div
          class="compare-modal--item"
          v-for="(product, product_id) in products"
          :key="product_id"
        >
          <div class="compare-modal--item-image-wrapper">
            <img :src="product.image" :height="78" :width="54" />
          </div>

          <div class="compare-modal--item-text-wrapper">
            <strong>{{ product.title }}</strong>
            <p>{{ product.price.regular }}</p>
          </div>

          <button
            class="compare-modal--remove-button"
            @click="removeProductFromCompare(product.product_id)"
          >
            <SfImage
              :src="addBasePath('/icons/close.svg')"
              :width="5"
              :height="5"
              alt="Remove from compare"
            />
          </button>
        </div>
      </section>

      <section class="compare-modal--options">
        <NuxtLink to="/compare-products-details"
          :class="{'disabled' : getCompareQuantity < 2}"
        >
          <button class="color-primary sf-button">
            Compare
          </button>
        </NuxtLink >

        <button class="outlined sf-button" @click="toggleCompareModal">Done</button>
      </section>
    </section>
  </div>
</template>
<script>
import {
  SfCallToAction,
  SfButton,
  SfImage,
  SfProductCardHorizontal,
} from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { useUiState, useCompare } from '~/composables';

export default {
  name: 'CompareModal',
  components: {
    SfCallToAction,
    SfButton,
    SfImage,
    SfProductCardHorizontal,
  },
  setup() {
    const { isCompareModalOpen, toggleCompareModal } = useUiState();
    const {
      getCompareQuantity,
      getCompareProducts,
      removeProductFromCompare
    } = useCompare();
    const products = getCompareProducts;

    return {
      addBasePath,
      isCompareModalOpen,
      toggleCompareModal,
      getCompareQuantity,
      getCompareProducts,
      removeProductFromCompare,
      products,
    };
  },
};
</script>

<style scoped>
.compare-modal--options a.disabled {
  pointer-events: none;
  opacity: 0.3;
}

.compare-modal--button button{
  opacity: 0;
  z-index: -1;
  transition: opacity .01s ease-in-out;
}

.compare-modal--button button.active{
  z-index: 1;
  opacity: 1;
  transition: opacity .01s ease-in-out;
}

.compare-modal--products {
  width: 1240px;
  height: 136px;
  padding: 16px 15px;
  border: 1px solid #e0e0e1;
  box-sizing: border-box;
  background: #ffffff;
  position: fixed;
  bottom: 0px;
  z-index: -1;
  opacity: 0;
  display: flex;
  transition: bottom .01s ease-in-out, opacity .01s ease-in-out;
}

.compare-modal--products.active {
  bottom: 48px;
  opacity: 1;
  z-index: 1;
  transition: bottom .125s ease-in-out, opacity .125s ease-in-out;
  display: flex;
}


.compare-modal--options button {
  width: 100%;
  height: 48px;
}

.compare-modal--options {
  display: flex;
  flex-wrap: wrap;
  max-width: 143px;
  align-items: center;
}

button.outlined {
  background: unset;
  border: solid 1px #1d1f22;
  color: black;
}

.compare-modal--remove-button .sf-image {
  object-fit: unset;
}

.compare-modal--remove-button {
  width: 24px;
  height: 24px;
  background: #5ece7b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  box-shadow: 0px 4px 11px rgb(29 31 34 / 10%);
  z-index: 1;
  position: absolute;
  top: 1px;
  right: -12px;
}

.compare-modal--items {
  flex: 1;
  display: flex;
  align-items: center;
}

.compare-modal--item {
  display: flex;
  padding: 11px 10px;
  margin-right: 22px;
  position: relative;
}

.compare-modal--item:hover {
  box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
  transition: box-shadow 0.125s ease-in-out;
  cursor: pointer;
}

.compare-modal--item-image-wrapper {
  margin-right: 16px;
}

.compare-modal--item-text-wrapper {
  font-family: 'Raleway';
  font-size: 16px;
  max-width: 134px;
}

.compare-modal--button {
  position: fixed;
  bottom: 0;
  left: calc(50% - 247px / 2);
}
.compare-modal--quantity {
  background: #e81e2b;
  height: 17px;
  width: 17px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: 'Roboto';
  font-weight: 500;
  position: absolute;
  right: 21px;
  top: 6px;
}
.compare-modal--button button {
  width: 247px;
  height: 48px;
  font-size: 16px;
  font-family: 'Raleway';
  color: #000;
  /* padding: 16px 32px; */
}
.compare-modal--button button .sf-image--wrapper {
  margin-right: 7px;
}
</style>
