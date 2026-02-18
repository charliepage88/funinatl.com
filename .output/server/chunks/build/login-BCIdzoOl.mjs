import { _ as __nuxt_component_0 } from './nuxt-link-B7BZdsR2.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Sign In – FunInATL" });
    useApi();
    useAuthStore();
    const form = reactive({ email: "", password: "" });
    const submitting = ref(false);
    const errorMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[70vh] flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md"><div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"><h1 class="text-3xl font-bold text-gray-900 mb-1">Sign In</h1><p class="text-gray-500 text-sm mb-8">Welcome back to FunInATL.</p><form><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required autocomplete="email" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="your@email.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Password</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required autocomplete="current-password" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="••••••••"></div>`);
      if (unref(errorMsg)) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(unref(errorMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">${ssrInterpolate(unref(submitting) ? "Signing in..." : "Sign In")}</button></div></form><p class="mt-6 text-center text-sm text-gray-500"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-orange-500 hover:underline font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create one`);
          } else {
            return [
              createTextVNode("Create one")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-BCIdzoOl.mjs.map
