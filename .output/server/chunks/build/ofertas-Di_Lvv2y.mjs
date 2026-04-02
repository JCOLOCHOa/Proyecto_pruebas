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
  __name: "ofertas",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref(productsData);
    const cart = ref([]);
    const showCheckout = ref(false);
    watch(cart, (newCart) => {
    }, { deep: true });
    const offerProducts = computed(() => {
      return products.value.filter((p) => p.price < 500);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-364a017e><header class="header" data-v-364a017e><div class="header-content" data-v-364a017e><img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" data-v-364a017e><div class="header-text" data-v-364a017e><h1 data-v-364a017e>OFERTAS ESPECIALES</h1><p data-v-364a017e>Los mejores precios en tecnología</p></div></div><nav class="header-nav" data-v-364a017e>`);
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
        class: "nav-link active"
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
        class: "nav-link"
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
      _push(`</nav></header><div class="offers-hero" data-v-364a017e><svg class="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-364a017e><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-364a017e></path></svg><h2 data-v-364a017e>Hasta 50% de descuento</h2><p data-v-364a017e>Productos seleccionados con precios increíbles</p></div><div class="layout" data-v-364a017e><div class="products-section" data-v-364a017e>`);
      _push(ssrRenderComponent(_component_ProductList, {
        products: offerProducts.value,
        title: "Ofertas del Mes",
        "active-tab": "offers",
        onAddToCart: addToCart
      }, null, _parent));
      _push(`</div><div class="cart-section" data-v-364a017e>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ofertas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ofertas = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-364a017e"]]);

export { ofertas as default };
//# sourceMappingURL=ofertas-Di_Lvv2y.mjs.map
