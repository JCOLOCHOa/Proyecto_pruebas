import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { c as categories } from './products-CNLOKX8L.mjs';
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
  __name: "category",
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
    const getCount = (category2) => {
      return props.products.filter((p) => p.category === category2).length;
    };
    const totalProducts = props.products.length;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "category-nav" }, _attrs))} data-v-53dcef8e><div class="nav-header" data-v-53dcef8e><button class="${ssrRenderClass([{ "active": isOpen.value }, "menu-toggle"])}" data-v-53dcef8e><svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-53dcef8e><line x1="3" y1="6" x2="21" y2="6" data-v-53dcef8e></line><line x1="3" y1="12" x2="21" y2="12" data-v-53dcef8e></line><line x1="3" y1="18" x2="21" y2="18" data-v-53dcef8e></line></svg><span class="menu-text" data-v-53dcef8e>Categorías</span></button><div class="quick-filters" data-v-53dcef8e><!--[-->`);
      ssrRenderList(quickTabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["tab-btn", { active: __props.activeTab === tab.id }])}" data-v-53dcef8e><svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-53dcef8e>`);
        if (tab.id === "all") {
          _push(`<path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" data-v-53dcef8e></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "offers") {
          _push(`<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-v-53dcef8e></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "new") {
          _push(`<path d="M12 3v18M3 12h18M7 8l10 8M7 16l10-8" data-v-53dcef8e></path>`);
        } else {
          _push(`<!---->`);
        }
        if (tab.id === "bestsellers") {
          _push(`<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-v-53dcef8e></path>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</svg> ${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (isOpen.value) {
        _push(`<div class="categories-dropdown" data-v-53dcef8e><div class="categories-grid" data-v-53dcef8e><!--[-->`);
        ssrRenderList(unref(categories), (cat, key) => {
          _push(`<button class="${ssrRenderClass(["category-btn", { active: __props.selectedCategory === key }])}" data-v-53dcef8e><svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-53dcef8e>`);
          if (cat.icon === "laptop") {
            _push(`<g data-v-53dcef8e><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-53dcef8e></rect><line x1="2" y1="20" x2="22" y2="20" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "desktop") {
            _push(`<g data-v-53dcef8e><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-53dcef8e></rect><line x1="8" y1="21" x2="16" y2="21" data-v-53dcef8e></line><line x1="12" y1="17" x2="12" y2="21" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "mouse") {
            _push(`<g data-v-53dcef8e><rect x="6" y="3" width="12" height="18" rx="6" ry="6" data-v-53dcef8e></rect><line x1="12" y1="7" x2="12" y2="11" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "headphones") {
            _push(`<g data-v-53dcef8e><path d="M3 18v-6a9 9 0 0 1 18 0v6" data-v-53dcef8e></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" data-v-53dcef8e></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "monitor") {
            _push(`<g data-v-53dcef8e><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-53dcef8e></rect><line x1="8" y1="21" x2="16" y2="21" data-v-53dcef8e></line><line x1="12" y1="17" x2="12" y2="21" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "storage") {
            _push(`<g data-v-53dcef8e><rect x="4" y="3" width="16" height="18" rx="2" ry="2" data-v-53dcef8e></rect><circle cx="12" cy="10" r="2" data-v-53dcef8e></circle></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "cable") {
            _push(`<g data-v-53dcef8e><path d="M4 22l4-10 4 10M12 22l4-10 4 10" data-v-53dcef8e></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "mobile") {
            _push(`<g data-v-53dcef8e><rect x="5" y="2" width="14" height="20" rx="2" ry="2" data-v-53dcef8e></rect><line x1="12" y1="18" x2="12.01" y2="18" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "printer") {
            _push(`<g data-v-53dcef8e><polyline points="6 9 6 2 18 2 18 9" data-v-53dcef8e></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" data-v-53dcef8e></path><rect x="6" y="14" width="12" height="8" data-v-53dcef8e></rect></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "wifi") {
            _push(`<g data-v-53dcef8e><path d="M5 12.55a11 11 0 0 1 14.08 0" data-v-53dcef8e></path><path d="M1.42 9a16 16 0 0 1 21.16 0" data-v-53dcef8e></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0" data-v-53dcef8e></path><line x1="12" y1="20" x2="12.01" y2="20" data-v-53dcef8e></line></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "chair") {
            _push(`<g data-v-53dcef8e><path d="M6 19v2M18 19v2M6 11V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4" data-v-53dcef8e></path><path d="M6 11h12v8H6z" data-v-53dcef8e></path></g>`);
          } else {
            _push(`<!---->`);
          }
          if (cat.icon === "camera") {
            _push(`<g data-v-53dcef8e><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" data-v-53dcef8e></path><circle cx="12" cy="13" r="4" data-v-53dcef8e></circle></g>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</svg><span class="category-name" data-v-53dcef8e>${ssrInterpolate(cat.name)}</span><span class="category-count" data-v-53dcef8e>${ssrInterpolate(getCount(key))}</span></button>`);
        });
        _push(`<!--]--><button class="${ssrRenderClass(["category-btn", "all-btn", { active: __props.selectedCategory === null }])}" data-v-53dcef8e><svg class="category-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-53dcef8e><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-53dcef8e></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-53dcef8e></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-53dcef8e></line></svg><span class="category-name" data-v-53dcef8e>Todos los Productos</span><span class="category-count" data-v-53dcef8e>${ssrInterpolate(unref(totalProducts))}</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const category = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-53dcef8e"]]);

export { category as default };
//# sourceMappingURL=category-9TiyeDJa.mjs.map
