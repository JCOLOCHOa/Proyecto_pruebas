import { defineComponent, ref, watch, computed, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as productsData, c as categories } from './products-CNLOKX8L.mjs';
import { _ as __nuxt_component_2, a as __nuxt_component_3, b as __nuxt_component_4 } from './CheckoutModal-CuA_vxIn.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  emits: ["search"],
  setup(__props, { emit: __emit }) {
    const search = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-wrapper" }, _attrs))} data-v-b4887aa8><input type="text" placeholder="Buscar productos..."${ssrRenderAttr("value", search.value)} class="search-input" data-v-b4887aa8></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-b4887aa8"]]), { __name: "SearchBar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategoryMenu",
  __ssrInlineRender: true,
  props: {
    products: {},
    selectedCategory: {},
    activeTab: {}
  },
  emits: ["select-category", "select-tab"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = ref(false);
    const quickTabs = [
      { id: "all", name: "Todos" },
      { id: "offers", name: "Ofertas" },
      { id: "new", name: "Nuevos" },
      { id: "bestsellers", name: "Más Vendidos" }
    ];
    const getCount = (category) => {
      return props.products.filter((p) => p.category === category).length;
    };
    const totalProducts = props.products.length;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "category-nav" }, _attrs))} data-v-a3aef4bf><div class="nav-header" data-v-a3aef4bf><button class="${ssrRenderClass([{ "active": isOpen.value }, "menu-toggle"])}" data-v-a3aef4bf><svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a3aef4bf><line x1="3" y1="6" x2="21" y2="6" data-v-a3aef4bf></line><line x1="3" y1="12" x2="21" y2="12" data-v-a3aef4bf></line><line x1="3" y1="18" x2="21" y2="18" data-v-a3aef4bf></line></svg><span class="menu-text" data-v-a3aef4bf>Categorías</span></button><div class="quick-filters" data-v-a3aef4bf><!--[-->`);
      ssrRenderList(quickTabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["tab-btn", { active: __props.activeTab === tab.id }])}" data-v-a3aef4bf><svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a3aef4bf>`);
        if (tab.id === "all") {
          _push(`<path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" data-v-a3aef4bf></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "offers") {
          _push(`<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-a3aef4bf></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "new") {
          _push(`<path d="M12 3v18M3 12h18M7 8l10 8M7 16l10-8" data-v-a3aef4bf></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "bestsellers") {
          _push(`<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-v-a3aef4bf></path>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</svg> ${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (isOpen.value) {
        _push(`<div class="categories-dropdown" data-v-a3aef4bf><div class="categories-grid" data-v-a3aef4bf><!--[-->`);
        ssrRenderList(unref(categories), (cat, key) => {
          _push(`<button class="${ssrRenderClass(["category-btn", { active: __props.selectedCategory === key }])}" data-v-a3aef4bf><svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-a3aef4bf>`);
          if (cat.icon === "laptop") {
            _push(`<g data-v-a3aef4bf><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-a3aef4bf></rect><line x1="2" y1="20" x2="22" y2="20" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "desktop") {
            _push(`<g data-v-a3aef4bf><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-a3aef4bf></rect><line x1="8" y1="21" x2="16" y2="21" data-v-a3aef4bf></line><line x1="12" y1="17" x2="12" y2="21" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "mouse") {
            _push(`<g data-v-a3aef4bf><rect x="6" y="3" width="12" height="18" rx="6" ry="6" data-v-a3aef4bf></rect><line x1="12" y1="7" x2="12" y2="11" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "headphones") {
            _push(`<g data-v-a3aef4bf><path d="M3 18v-6a9 9 0 0 1 18 0v6" data-v-a3aef4bf></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" data-v-a3aef4bf></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "monitor") {
            _push(`<g data-v-a3aef4bf><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-a3aef4bf></rect><line x1="8" y1="21" x2="16" y2="21" data-v-a3aef4bf></line><line x1="12" y1="17" x2="12" y2="21" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "storage") {
            _push(`<g data-v-a3aef4bf><rect x="4" y="3" width="16" height="18" rx="2" ry="2" data-v-a3aef4bf></rect><circle cx="12" cy="10" r="2" data-v-a3aef4bf></circle></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "cable") {
            _push(`<g data-v-a3aef4bf><path d="M4 22l4-10 4 10M12 22l4-10 4 10" data-v-a3aef4bf></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "mobile") {
            _push(`<g data-v-a3aef4bf><rect x="5" y="2" width="14" height="20" rx="2" ry="2" data-v-a3aef4bf></rect><line x1="12" y1="18" x2="12.01" y2="18" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "printer") {
            _push(`<g data-v-a3aef4bf><polyline points="6 9 6 2 18 2 18 9" data-v-a3aef4bf></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" data-v-a3aef4bf></path><rect x="6" y="14" width="12" height="8" data-v-a3aef4bf></rect></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "wifi") {
            _push(`<g data-v-a3aef4bf><path d="M5 12.55a11 11 0 0 1 14.08 0" data-v-a3aef4bf></path><path d="M1.42 9a16 16 0 0 1 21.16 0" data-v-a3aef4bf></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0" data-v-a3aef4bf></path><line x1="12" y1="20" x2="12.01" y2="20" data-v-a3aef4bf></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "chair") {
            _push(`<g data-v-a3aef4bf><path d="M6 19v2M18 19v2M6 11V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4" data-v-a3aef4bf></path><path d="M6 11h12v8H6z" data-v-a3aef4bf></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "camera") {
            _push(`<g data-v-a3aef4bf><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" data-v-a3aef4bf></path><circle cx="12" cy="13" r="4" data-v-a3aef4bf></circle></g>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</svg><span class="category-name" data-v-a3aef4bf>${ssrInterpolate(cat.name)}</span><span class="category-count" data-v-a3aef4bf>${ssrInterpolate(getCount(key))}</span></button>`);
        });
        _push(`<!--]--><button class="${ssrRenderClass(["category-btn", "all-btn", { active: __props.selectedCategory === null }])}" data-v-a3aef4bf><svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-a3aef4bf><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-a3aef4bf></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-a3aef4bf></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-a3aef4bf></line></svg><span class="category-name" data-v-a3aef4bf>Todos los Productos</span><span class="category-count" data-v-a3aef4bf>${ssrInterpolate(unref(totalProducts))}</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-a3aef4bf"]]), { __name: "CategoryMenu" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref(productsData);
    const cart = ref([]);
    const searchText = ref("");
    const showCheckout = ref(false);
    const selectedCategory = ref(null);
    const activeTab = ref("all");
    watch(cart, (newCart) => {
    }, { deep: true });
    const updateSearch = (text) => {
      searchText.value = text;
    };
    const selectCategory = (category) => {
      selectedCategory.value = category;
    };
    const selectTab = (tab) => {
      activeTab.value = tab;
    };
    const currentTitle = computed(() => {
      if (searchText.value) return `Resultados para "${searchText.value}"`;
      if (selectedCategory.value) {
        const names = {
          laptops: "Laptops",
          computadoras: "Computadoras",
          perifericos: "Periféricos",
          audio: "Audio",
          monitores: "Monitores",
          almacenamiento: "Almacenamiento",
          accesorios: "Accesorios",
          "celulares-tablets": "Celulares y Tablets",
          impresion: "Impresión",
          redes: "Redes",
          mobiliario: "Mobiliario",
          camaras: "Cámaras"
        };
        return names[selectedCategory.value] || selectedCategory.value;
      }
      if (activeTab.value === "offers") return "Ofertas Especiales";
      if (activeTab.value === "new") return "Nuevos Productos";
      if (activeTab.value === "bestsellers") return "Más Vendidos";
      return "Todos los Productos";
    });
    const filteredProducts = computed(() => {
      let result = products.value;
      if (selectedCategory.value) {
        result = result.filter((p) => p.category === selectedCategory.value);
      }
      if (searchText.value) {
        const search = searchText.value.toLowerCase();
        result = result.filter(
          (p) => p.name.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search)
        );
      }
      return result;
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
      } else {
        alert("Stock máximo alcanzado");
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
      const _component_SearchBar = __nuxt_component_0;
      const _component_CategoryMenu = __nuxt_component_1;
      const _component_ProductList = __nuxt_component_2;
      const _component_Cart = __nuxt_component_3;
      const _component_CheckoutModal = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><header class="header"><div class="header-content"><img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo"><div class="header-text"><h1>ELECTRONICOS</h1><p>Tecnología de punta al mejor precio</p></div></div><nav class="header-nav">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "nav-link active"
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
      _push(`</nav></header>`);
      _push(ssrRenderComponent(_component_SearchBar, { onSearch: updateSearch }, null, _parent));
      _push(ssrRenderComponent(_component_CategoryMenu, {
        products: products.value,
        "selected-category": selectedCategory.value,
        "active-tab": activeTab.value,
        onSelectCategory: selectCategory,
        onSelectTab: selectTab
      }, null, _parent));
      _push(`<div class="layout"><div class="products-section">`);
      _push(ssrRenderComponent(_component_ProductList, {
        products: filteredProducts.value,
        title: currentTitle.value,
        "active-tab": activeTab.value,
        onAddToCart: addToCart
      }, null, _parent));
      _push(`</div><div class="cart-section">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-TnmjXGAX.mjs.map
