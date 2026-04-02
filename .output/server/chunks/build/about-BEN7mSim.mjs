import { _ as __nuxt_component_0 } from './nuxt-link-GLYRBd7D.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-ae285ef4><header class="header" data-v-ae285ef4><div class="header-content" data-v-ae285ef4><img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" data-v-ae285ef4><div class="header-text" data-v-ae285ef4><h1 data-v-ae285ef4>ELECTRONICOS</h1><p data-v-ae285ef4>Tecnología de punta al mejor precio</p></div></div><nav class="header-nav" data-v-ae285ef4>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
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
  _push(ssrRenderComponent(_component_NuxtLink, {
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
  _push(ssrRenderComponent(_component_NuxtLink, {
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
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about",
    class: "nav-link active"
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
  _push(`</nav></header><div class="about-content" data-v-ae285ef4><div class="about-card" data-v-ae285ef4><h1 data-v-ae285ef4>Acerca de nosotros</h1><div class="divider" data-v-ae285ef4></div><p class="subtitle" data-v-ae285ef4> Somos tu tienda de confianza en productos electrónicos de última generación </p><div class="info-sections" data-v-ae285ef4><div class="info-box" data-v-ae285ef4><svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-ae285ef4><circle cx="12" cy="12" r="10" data-v-ae285ef4></circle><path d="M12 6v6l4 2" data-v-ae285ef4></path></svg><h3 data-v-ae285ef4>Misión</h3><p data-v-ae285ef4>Brindar productos tecnológicos de calidad al mejor precio del mercado</p></div><div class="info-box" data-v-ae285ef4><svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-ae285ef4><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" data-v-ae285ef4></path><circle cx="12" cy="12" r="3" data-v-ae285ef4></circle></svg><h3 data-v-ae285ef4>Visión</h3><p data-v-ae285ef4>Ser la tienda líder de electrónicos en Guatemala</p></div><div class="info-box" data-v-ae285ef4><svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-ae285ef4><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-ae285ef4></polygon></svg><h3 data-v-ae285ef4>Valores</h3><p data-v-ae285ef4>Calidad, honestidad y servicio al cliente</p></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ae285ef4"]]);

export { about as default };
//# sourceMappingURL=about-BEN7mSim.mjs.map
