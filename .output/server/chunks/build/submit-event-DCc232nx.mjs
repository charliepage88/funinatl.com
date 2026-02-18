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
  __name: "submit-event",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({ title: "Submit Event – FunInATL" });
    const { get } = useApi();
    const today = /* @__PURE__ */ new Date();
    const maxD = new Date(today);
    maxD.setMonth(maxD.getMonth() + 4);
    const fmt = (d) => d.toISOString().split("T")[0];
    const minDate = fmt(today);
    const maxDate = fmt(maxD);
    const form = reactive({
      name: "",
      category_id: "",
      location_id: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      price: "",
      website: "",
      short_description: "",
      is_family_friendly: false
    });
    const submitting = ref(false);
    const successMsg = ref("");
    const errorMsg = ref("");
    const [catData, locData] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      useAsyncData("submit-cats", () => get("/categories")),
      useAsyncData("submit-locs", () => get("/locations"))
    ])), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => catData.data.value?.categories || []);
    const locations = computed(() => locData.data.value?.locations || []);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-xl mx-auto px-4 sm:px-6 py-16" }, _attrs))}><h1 class="text-4xl font-bold text-gray-900 mb-2">Submit an Event</h1><p class="text-gray-500 mb-8">Share your event with Atlanta.</p><form><div class="space-y-5"><div><label class="block text-sm font-medium text-gray-700 mb-1">Event Name</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Jazz Night at the Fox"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Category</label><select required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, c.id) : ssrLooseEqual(unref(form).category_id, c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Venue</label><select required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).location_id) ? ssrLooseContain(unref(form).location_id, "") : ssrLooseEqual(unref(form).location_id, "")) ? " selected" : ""}>Select a venue</option><!--[-->`);
      ssrRenderList(unref(locations), (l) => {
        _push(`<option${ssrRenderAttr("value", l.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).location_id) ? ssrLooseContain(unref(form).location_id, l.id) : ssrLooseEqual(unref(form).location_id, l.id)) ? " selected" : ""}>${ssrInterpolate(l.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input${ssrRenderAttr("value", unref(form).start_date)} type="date" required${ssrRenderAttr("min", unref(minDate))}${ssrRenderAttr("max", unref(maxDate))} class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">End Date</label><input${ssrRenderAttr("value", unref(form).end_date)} type="date"${ssrRenderAttr("min", unref(form).start_date || unref(minDate))}${ssrRenderAttr("max", unref(maxDate))} class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label><input${ssrRenderAttr("value", unref(form).start_time)} type="time" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">End Time</label><input${ssrRenderAttr("value", unref(form).end_time)} type="time" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Price</label><input${ssrRenderAttr("value", unref(form).price)} type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Free / $10 / $10–$20"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label><input${ssrRenderAttr("value", unref(form).website)} type="url" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="https://example.com/tickets"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label><textarea rows="4" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="Brief description of the event...">${ssrInterpolate(unref(form).short_description)}</textarea></div><div class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_family_friendly) ? ssrLooseContain(unref(form).is_family_friendly, null) : unref(form).is_family_friendly) ? " checked" : ""} id="family" type="checkbox" class="rounded border-gray-300 text-orange-500"><label for="family" class="text-sm text-gray-700">Family-friendly event</label></div>`);
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
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">${ssrInterpolate(unref(submitting) ? "Submitting..." : "Submit Event")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/submit-event.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=submit-event-DCc232nx.mjs.map
