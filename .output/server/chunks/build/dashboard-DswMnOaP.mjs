import { _ as __nuxt_component_0 } from './nuxt-link-B7BZdsR2.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import { u as useAuthStore } from './auth-Fe-QvPgl.mjs';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Dashboard – FunInATL" });
    const auth = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto px-4 sm:px-6 py-16" }, _attrs))}><h1 class="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>`);
      if (unref(auth).user) {
        _push(`<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"><div class="flex items-center gap-4 mb-6"><div class="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-2xl font-bold">${ssrInterpolate(unref(auth).user.name?.[0]?.toUpperCase())}</div><div><p class="font-semibold text-gray-900 text-lg">${ssrInterpolate(unref(auth).user.name)}</p><p class="text-gray-500 text-sm">${ssrInterpolate(unref(auth).user.email)}</p></div></div><div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/submit-event",
          class: "bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit Event `);
            } else {
              return [
                createTextVNode(" Submit Event ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"> Logout </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-DswMnOaP.mjs.map
