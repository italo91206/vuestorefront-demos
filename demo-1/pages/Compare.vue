<template>
  <div id="compare-products-details">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <LazyHydrate when-visible>
      <div class="row products-row">
        <SfProductCard
          v-for="(product, i) in products"
          :key="i"
          :title="product.title"
          :product_id="product.product_id"
          :image="product.image"
          :imageWidth="216"
          :imageHeight="288"
          :nuxtImgConfig="{ fit: 'cover' }"
          image-tag="nuxt-img"
          :regular-price="product.price.regular"
          :max-rating="product.rating.max"
          :score-rating="product.rating.score"
          :show-add-to-cart-button="true"
          :is-on-wishlist="product.isInWishlist"
          :link="localePath({ name: 'home' })"
          class="carousel__item__product"
          @click:wishlist="toggleWishlist(i)"
        />
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <table id="details-table">
        <tbody>
          <tr v-for="attr in filtered_attributes" :key="attr.id">
            <td class="attribute_cell">{{ filters_keys[attr] }}</td>

            <td
              :class="`attribute_value col-${products.length}`"
              v-for="product in products"
              :key="product.product_id"
            >
              {{ product[attr] ? product[attr] : '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </LazyHydrate>
  </div>
</template>
<script>
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid,
  SfHeading,
  SfBreadcrumbs,
  SfArrow,
  SfButton,
} from '@storefront-ui/vue';
import LazyHydrate from 'vue-lazy-hydration';
import { addBasePath } from '@vue-storefront/core';
import { useCompare } from '~/composables';

export default {
  name: 'Compare',
  components: {
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfBreadcrumbs,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
  },
  setup(props, { root }) {
    const { getCompareProducts, getCompareQuantity } = useCompare();
    const products = getCompareQuantity.value > 1 ? getCompareProducts.value : []
    const filtered_attributes = [];
    const attributes = new Set();
    const filters_keys = {
      'product_code': 'Product code',
      'title': 'Title',
      'material': 'Material',
      'category': 'Category',
      'country': 'Country',
      'regular_price': 'Price',
    };
    const filters = [
      'product_code',
      'title',
      'material',
      'category',
      'country',
      'regular_price',
    ];

    if(products.length < 1)
      root.$router.go(-1)
    else {
      products.forEach((product) => {
        // need to manually sanitize tho
        product.regular_price = product.price.regular;

        for (const attribute in product) attributes.add(attribute);
      });

      attributes.forEach((attr) => {
        if (filters.includes(attr)) filtered_attributes.push(attr);
      });
    }

    const breadcrumbs = [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Compare products',
        link: '#',
      },
    ];

    return {
      addBasePath,
      products,
      filtered_attributes,
      filters,
      filters_keys,
      attributes,
      getCompareProducts,
      breadcrumbs,
      getCompareQuantity,
    };
  },
};
</script>

<style lang="css" scoped>
.col-3 {
  width: 29%;
}
.col-4 {
  width: 22%;
}
.col-2 {
  width: 43%;
}
.col-1 {
  width: 100%;
}
.sf-breadcrumbs {
  margin-top: 24px;
}

.products-row {
  max-width: 1080px;
  width: 100%;
  /* float: right; */
  margin: 34px 0 0 auto;
  justify-content: space-evenly;
}

.attribute_cell {
  font-family: 'Raleway';
  font-weight: 400;
  color: #8d8f9a;
  font-size: 16px;
}

.attribute_value {
  font-family: 'Raleway';
  font-weight: 700;
  line-height: 22px;
  font-size: 16px;
  padding: 19px;
}

#details-table {
  width: 100%;
  text-align: center;
  margin-top: 40px;
}

#details-table .attribute_cell {
  text-align: left;
  padding: 19px;
  width: 160px;
}

.products-row .sf-product-card {
  margin-right: 29px;
}

.products-row .sf-product-card:last-child {
  margin-right: 0px;
}

#details-table tr {
  border-bottom: solid 2px #f1f2f3;
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.carousel__item:hover .sf-product-card {
  --product-card-image-opacity: 1;
  --product-card-image-even-opacity: 1;
  --product-card-wishlist-icon-opacity: 1;
  --product-card-add-button-opacity: 1;
  --product-card-z-index: 1;
  --product-card-box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
}

.carousel__item {
  position: relative;
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}
</style>
