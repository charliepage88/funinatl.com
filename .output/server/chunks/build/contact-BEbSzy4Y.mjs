import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "Contact – FunInATL" });
    useApi();
    const form = reactive({ name: "", email: "", body: "" });
    const submitting = ref(false);
    const successMsg = ref("");
    const errorMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-xl mx-auto px-4 sm:px-6 py-16" }, _attrs))}><h1 class="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1><p class="text-gray-500 mb-8">Have a question or feedback? We&#39;d love to hear from you.</p><form><div class="space-y-5"><div><label class="block text-sm font-medium text-gray-700 mb-1">Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Your name"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="your@email.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea required rows="6" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="What&#39;s on your mind?">${ssrInterpolate(unref(form).body)}</textarea></div>`);
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
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">${ssrInterpolate(unref(submitting) ? "Sending..." : "Send Message")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-BEbSzy4Y.mjs.map
