import { _ as __nuxt_component_0 } from './nuxt-link-B7BZdsR2.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "About – FunInATL" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, _attrs))}><h1 class="text-4xl font-bold text-gray-900 mb-6">About FunInATL</h1><div class="prose prose-gray max-w-none text-gray-700 space-y-4 text-lg leading-relaxed"><p> FunInATL is Atlanta&#39;s go-to guide for discovering events happening around the city. We focus on the smaller, independent venues and lesser-known events that make Atlanta&#39;s cultural scene unique. </p><p> Whether you&#39;re looking for live music, comedy shows, food festivals, or art exhibitions, we&#39;ve got you covered. Our mission is to help Atlantans find fun things to do without the noise of the mainstream event platforms. </p><p> Have an event you&#39;d like to share? We&#39;d love to feature it. </p></div><div class="mt-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get in Touch `);
          } else {
            return [
              createTextVNode(" Get in Touch ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DjlJPW6K.mjs.map
