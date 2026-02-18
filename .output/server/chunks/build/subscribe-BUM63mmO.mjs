import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "subscribe",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Subscribe – FunInATL" });
    useApi();
    const email = ref("");
    const submitting = ref(false);
    const successMsg = ref("");
    const errorMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto px-4 sm:px-6 py-16 text-center" }, _attrs))}><h1 class="text-4xl font-bold text-gray-900 mb-2">Stay in the Loop</h1><p class="text-gray-500 mb-8">Get the latest Atlanta events delivered to your inbox.</p><form><div class="space-y-4"><input${ssrRenderAttr("value", unref(email))} type="email" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="your@email.com">`);
      if (unref(successMsg)) {
        _push(`<p class="text-green-600 text-sm">${ssrInterpolate(unref(successMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMsg)) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(unref(errorMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">${ssrInterpolate(unref(submitting) ? "Subscribing..." : "Subscribe")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/subscribe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=subscribe-BUM63mmO.mjs.map
