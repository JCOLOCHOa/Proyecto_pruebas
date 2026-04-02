import { defineComponent, ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { c as categories } from './products-CNLOKX8L.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductList",
  __ssrInlineRender: true,
  props: {
    products: {},
    title: {},
    activeTab: {}
  },
  emits: ["add-to-cart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedProduct = ref(null);
    reactive({});
    const sortBy = ref("featured");
    const flyingItem = ref(null);
    const flyingStyle = reactive({
      left: "0px",
      top: "0px",
      width: "0px",
      height: "0px",
      opacity: 0
    });
    const sortedProducts = computed(() => {
      let result = [...props.products];
      if (props.activeTab === "offers") {
        result = result.filter((p) => p.price < 500);
      } else if (props.activeTab === "new") {
        result = result.slice(-5);
      } else if (props.activeTab === "bestsellers") {
        result = result.sort((a, b) => a.stock - b.stock);
      }
      switch (sortBy.value) {
        case "price-low":
          return result.sort((a, b) => a.price - b.price);
        case "price-high":
          return result.sort((a, b) => b.price - a.price);
        case "name":
          return result.sort((a, b) => a.name.localeCompare(b.name));
        case "stock":
          return result.sort((a, b) => b.stock - a.stock);
        default:
          return result;
      }
    });
    const isNew = (product) => product.id > 25;
    const isOffer = (product) => product.price < 200;
    const getCategoryName = (category) => {
      return categories[category]?.name || category;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-container" }, _attrs))} data-v-10bab366><div class="products-header" data-v-10bab366><h2 data-v-10bab366>${ssrInterpolate(__props.title)}</h2><div class="sort-controls" data-v-10bab366><select class="sort-select" data-v-10bab366><option value="featured" data-v-10bab366${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "featured") : ssrLooseEqual(sortBy.value, "featured")) ? " selected" : ""}>Destacados</option><option value="price-low" data-v-10bab366${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "price-low") : ssrLooseEqual(sortBy.value, "price-low")) ? " selected" : ""}>Precio: Menor a Mayor</option><option value="price-high" data-v-10bab366${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "price-high") : ssrLooseEqual(sortBy.value, "price-high")) ? " selected" : ""}>Precio: Mayor a Menor</option><option value="name" data-v-10bab366${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "name") : ssrLooseEqual(sortBy.value, "name")) ? " selected" : ""}>Nombre A-Z</option><option value="stock" data-v-10bab366${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "stock") : ssrLooseEqual(sortBy.value, "stock")) ? " selected" : ""}>Disponibilidad</option></select></div></div>`);
      if (sortedProducts.value.length === 0) {
        _push(`<div class="empty-state" data-v-10bab366><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-10bab366><circle cx="12" cy="12" r="10" data-v-10bab366></circle><line x1="12" y1="8" x2="12" y2="12" data-v-10bab366></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-10bab366></line></svg><p data-v-10bab366>No se encontraron productos en esta categoría</p></div>`);
      } else {
        _push(`<div class="products" data-v-10bab366><!--[-->`);
        ssrRenderList(sortedProducts.value, (product) => {
          _push(`<div class="product-card" data-v-10bab366><div class="product-image-wrapper" data-v-10bab366><img${ssrRenderAttr("src", product.image)} data-v-10bab366>`);
          if (product.stock < 5) {
            _push(`<span class="stock-badge low" data-v-10bab366> Solo ${ssrInterpolate(product.stock)} disponibles </span>`);
          } else if (isNew(product)) {
            _push(`<span class="stock-badge new" data-v-10bab366> Nuevo </span>`);
          } else if (isOffer(product)) {
            _push(`<span class="stock-badge offer" data-v-10bab366> Oferta </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="product-info" data-v-10bab366><span class="category-tag" data-v-10bab366>${ssrInterpolate(getCategoryName(product.category))}</span><h3 data-v-10bab366>${ssrInterpolate(product.name)}</h3><p class="price" data-v-10bab366>Q${ssrInterpolate(product.price)}</p></div><button${ssrIncludeBooleanAttr(product.stock === 0) ? " disabled" : ""} class="${ssrRenderClass({ "disabled": product.stock === 0 })}" data-v-10bab366>`);
          if (product.stock === 0) {
            _push(`<span data-v-10bab366>Agotado</span>`);
          } else {
            _push(`<span data-v-10bab366>Agregar al carrito</span>`);
          }
          _push(`</button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (selectedProduct.value) {
        _push(`<div class="modal" data-v-10bab366><div class="modal-content" data-v-10bab366><button class="close-btn" data-v-10bab366><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-10bab366><line x1="18" y1="6" x2="6" y2="18" data-v-10bab366></line><line x1="6" y1="6" x2="18" y2="18" data-v-10bab366></line></svg></button><span class="modal-category" data-v-10bab366>${ssrInterpolate(getCategoryName(selectedProduct.value.category))}</span><img${ssrRenderAttr("src", selectedProduct.value.image)} data-v-10bab366><h2 data-v-10bab366>${ssrInterpolate(selectedProduct.value.name)}</h2><p class="description" data-v-10bab366>${ssrInterpolate(selectedProduct.value.description)}</p><p class="modal-price" data-v-10bab366>Q${ssrInterpolate(selectedProduct.value.price)}</p><p class="stock" data-v-10bab366>Stock disponible: ${ssrInterpolate(selectedProduct.value.stock)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flyingItem.value) {
        _push(`<div class="flying-item" style="${ssrRenderStyle(flyingStyle)}" data-v-10bab366><img${ssrRenderAttr("src", flyingItem.value.image)} data-v-10bab366></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-10bab366"]]), { __name: "ProductList" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Cart",
  __ssrInlineRender: true,
  props: {
    cart: {}
  },
  emits: ["remove", "increase", "decrease", "checkout"],
  setup(__props) {
    const props = __props;
    const total = computed(
      () => props.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cart" }, _attrs))}><h2>Carrito</h2>`);
      if (__props.cart.length === 0) {
        _push(`<div class="empty-cart"><p>Carrito vacío</p></div>`);
      } else {
        _push(`<div><!--[-->`);
        ssrRenderList(__props.cart, (item) => {
          _push(`<div class="cart-item"><img${ssrRenderAttr("src", item.image)}><div class="info"><p class="name">${ssrInterpolate(item.name)}</p><p class="price">Q${ssrInterpolate(item.price)}</p><div class="controls"><button>−</button><span>${ssrInterpolate(item.qty)}</span><button>+</button></div><button class="remove"> Eliminar </button></div></div>`);
        });
        _push(`<!--]--><div class="cart-summary"><h3>Total: Q${ssrInterpolate(total.value)}</h3><button class="btn-buy"> Finalizar Compra </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Cart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "Cart" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckoutModal",
  __ssrInlineRender: true,
  props: {
    cart: {}
  },
  emits: ["close", "complete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const step = ref(1);
    const generating = ref(false);
    const form = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
      nit: ""
    });
    const total = computed(
      () => props.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-overlay" }, _attrs))} data-v-4381872b><div class="checkout-modal" data-v-4381872b><h2 data-v-4381872b>Finalizar Compra</h2>`);
      if (step.value === 1) {
        _push(`<form class="checkout-form" data-v-4381872b><h3 data-v-4381872b>Datos del Cliente</h3><div class="form-group" data-v-4381872b><label data-v-4381872b>Nombre completo *</label><input${ssrRenderAttr("value", form.value.name)} type="text" required placeholder="Nombre" data-v-4381872b></div><div class="form-group" data-v-4381872b><label data-v-4381872b>Email *</label><input${ssrRenderAttr("value", form.value.email)} type="email" required placeholder="ejemplo@gmail.com" data-v-4381872b></div><div class="form-group" data-v-4381872b><label data-v-4381872b>Teléfono *</label><input${ssrRenderAttr("value", form.value.phone)} type="tel" required placeholder="1234 5678" data-v-4381872b></div><div class="form-group" data-v-4381872b><label data-v-4381872b>Dirección de entrega *</label><textarea required rows="3" placeholder="Calle, número, zona, ciudad" data-v-4381872b>${ssrInterpolate(form.value.address)}</textarea></div><div class="form-group" data-v-4381872b><label data-v-4381872b>NIT (opcional)</label><input${ssrRenderAttr("value", form.value.nit)} type="text" placeholder="1234567-8" data-v-4381872b></div><div class="order-summary" data-v-4381872b><h4 data-v-4381872b>Resumen del Pedido</h4><!--[-->`);
        ssrRenderList(__props.cart, (item) => {
          _push(`<div class="summary-item" data-v-4381872b><span data-v-4381872b>${ssrInterpolate(item.name)} x${ssrInterpolate(item.qty)}</span><span data-v-4381872b>Q${ssrInterpolate(item.price * item.qty)}</span></div>`);
        });
        _push(`<!--]--><div class="summary-total" data-v-4381872b><strong data-v-4381872b>Total:</strong><strong data-v-4381872b>Q${ssrInterpolate(total.value)}</strong></div></div><div class="form-actions" data-v-4381872b><button type="button" class="btn-secondary" data-v-4381872b> Cancelar </button><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(generating.value) ? " disabled" : ""} data-v-4381872b>`);
        if (generating.value) {
          _push(`<span data-v-4381872b>Generando...</span>`);
        } else {
          _push(`<span data-v-4381872b>Descargar Factura PDF</span>`);
        }
        _push(`</button></div></form>`);
      } else {
        _push(`<div class="success-step" data-v-4381872b><div class="success-icon" data-v-4381872b></div><h3 data-v-4381872b>¡Factura Generada!</h3><p data-v-4381872b>Gracias por tu compra.</p><button class="btn-primary" data-v-4381872b> Cerrar </button></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CheckoutModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-4381872b"]]), { __name: "CheckoutModal" });

export { __nuxt_component_2 as _, __nuxt_component_3 as a, __nuxt_component_4 as b };
//# sourceMappingURL=CheckoutModal-CuA_vxIn.mjs.map
