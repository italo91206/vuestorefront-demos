import { useRouter } from '@nuxtjs/composition-api'
import { reactive, computed } from '@nuxtjs/composition-api'

const state = reactive({
  products: []
})

const useCompare = ():any => {

  const router = useRouter();

  /**
    * Method that pushes router to the compare products page details
  **/
  const goToComparePage = () => {
    router.push({ path: '/compare-products-details'})
  }

  /**
   *  Add new product to the collection of items to compare
   * @param {product} product - product object
  **/
  const addProductToCompare = (product) => {
    let existent = state.products.filter((p) => p.product_id == product.product_id)
    if(!existent[0] && state.products.length <= 3)
      state.products.push((product))
    else
      console.log("Product already set to compare.")
  }

  /**
   * Remove product from collection based on given id
   * @param {int} id - product id
  **/
  const removeProductFromCompare = (id) => {
    state.products = state.products.filter((p) => p.product_id != id)
  }

  const getCompareQuantity = computed(() => {
    return state.products.length
  })

  const getCompareProducts = computed(() => {
    return state.products
  })

  return {
    goToComparePage,
    addProductToCompare,
    removeProductFromCompare,
    getCompareQuantity,
    getCompareProducts,
  }
}

export default useCompare;
