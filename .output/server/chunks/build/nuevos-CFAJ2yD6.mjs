import { _ as __nuxt_component_2, a as __nuxt_component_3, b as __nuxt_component_4 } from './CheckoutModal-CuA_vxIn.mjs';
import { defineComponent, ref, watch, computed, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { p as productsData } from './products-CNLOKX8L.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nuevos",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref(productsData);
    const cart = ref([]);
    const showCheckout = ref(false);
    watch(cart, (newCart) => {
    }, { deep: true });
    const newProducts = computed(() => {
      return products.value.slice(-6);
    });
    const addToCart = (product) => {
      const existing = cart.value.find((p) => p.id === product.id);
      if (existing) {
        if (existing.qty < product.stock) {
          existing.qty++;
        } else {
          alert("No hay más stock disponible");
        }
      } else {
        cart.value.push({ ...product, qty: 1 });
      }
    };
    const removeFromCart = (id) => {
      cart.value = cart.value.filter((p) => p.id !== id);
    };
    const increaseQty = (id) => {
      const item = cart.value.find((p) => p.id === id);
      const product = products.value.find((p) => p.id === id);
      if (item && product && item.qty < product.stock) {
        item.qty++;
      }
    };
    const decreaseQty = (id) => {
      const item = cart.value.find((p) => p.id === id);
      if (item && item.qty > 1) {
        item.qty--;
      }
    };
    const completeCheckout = () => {
      showCheckout.value = false;
      cart.value = [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_ProductList = __nuxt_component_2;
      const _component_Cart = __nuxt_component_3;
      const _component_CheckoutModal = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-7b84816a><header class="header" data-v-7b84816a><div class="header-content" data-v-7b84816a><img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" data-v-7b84816a><div class="header-text" data-v-7b84816a><h1 data-v-7b84816a>NUEVOS PRODUCTOS</h1><p data-v-7b84816a>Lo último en tecnología</p></div></div><nav class="header-nav" data-v-7b84816a>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tienda`);
          } else {
            return [
              createTextVNode("Tienda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/ofertas",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Ofertas`);
          } else {
            return [
              createTextVNode("Ofertas")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/nuevos",
        class: "nav-link active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Nuevos`);
          } else {
            return [
              createTextVNode("Nuevos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/about",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Nosotros`);
          } else {
            return [
              createTextVNode("Nosotros")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></header><div class="new-hero" data-v-7b84816a><svg class="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-7b84816a><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-7b84816a></polygon></svg><h2 data-v-7b84816a>Recién Llegados</h2><p data-v-7b84816a>Descubre los productos más recientes de nuestro catálogo</p></div><div class="layout" data-v-7b84816a><div class="products-section" data-v-7b84816a>`);
      _push(ssrRenderComponent(_component_ProductList, {
        products: newProducts.value,
        title: "Nuevos Ingresos",
        "active-tab": "new",
        onAddToCart: addToCart
      }, null, _parent));
      _push(`</div><div class="cart-section" data-v-7b84816a>`);
      _push(ssrRenderComponent(_component_Cart, {
        cart: cart.value,
        onRemove: removeFromCart,
        onIncrease: increaseQty,
        onDecrease: decreaseQty,
        onCheckout: ($event) => showCheckout.value = true
      }, null, _parent));
      _push(`</div></div>`);
      if (showCheckout.value) {
        _push(ssrRenderComponent(_component_CheckoutModal, {
          cart: cart.value,
          onClose: ($event) => showCheckout.value = false,
          onComplete: completeCheckout
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/nuevos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nuevos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b84816a"]]);

export { nuevos as default };
//# sourceMappingURL=nuevos-CFAJ2yD6.mjs.map
