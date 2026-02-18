import { defineComponent, reactive, ref, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import { u as useAsyncData } from './asyncData-Dcp7Xprb.mjs';
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
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "get-listed",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({ title: "Get Listed – FunInATL" });
    const { get } = useApi();
    const form = reactive({
      name: "",
      category: "",
      website: "",
      address: "",
      city: "Atlanta",
      zip: "",
      description: "",
      is_family_friendly: false
    });
    const submitting = ref(false);
    const successMsg = ref("");
    const errorMsg = ref("");
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("categories", () => get("/categories"))), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => data.value?.categories || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-xl mx-auto px-4 sm:px-6 py-16" }, _attrs))}><h1 class="text-4xl font-bold text-gray-900 mb-2">Get Your Venue Listed</h1><p class="text-gray-500 mb-8">Submit your venue so Atlanta can find you.</p><form><div class="space-y-5"><div><label class="block text-sm font-medium text-gray-700 mb-1">Venue Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="The Masquerade"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Category</label><select required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, c.slug) : ssrLooseEqual(unref(form).category, c.slug)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Website</label><input${ssrRenderAttr("value", unref(form).website)} type="url" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="https://example.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Address</label><input${ssrRenderAttr("value", unref(form).address)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="123 Main St"></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">City</label><input${ssrRenderAttr("value", unref(form).city)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Atlanta"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">ZIP</label><input${ssrRenderAttr("value", unref(form).zip)} type="text" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="30301"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label><textarea rows="4" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="Tell us about your venue...">${ssrInterpolate(unref(form).description)}</textarea></div><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_family_friendly) ? ssrLooseContain(unref(form).is_family_friendly, null) : unref(form).is_family_friendly) ? " checked" : ""} id="family" type="checkbox" class="rounded border-gray-300 text-orange-500"><label for="family" class="text-sm text-gray-700">Family-friendly venue</label></div>`);
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
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">${ssrInterpolate(unref(submitting) ? "Submitting..." : "Submit Venue")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/get-listed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=get-listed-L8NqYWkO.mjs.map
