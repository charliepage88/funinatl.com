import { defineComponent, ref, withAsyncContext, computed, unref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './EventList-sT6-ja1Y.mjs';
import { u as useHead } from './composables-DJvKiPhS.mjs';
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
import './nuxt-link-B7BZdsR2.mjs';
import 'perfect-debounce';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  props: {
    categories: {},
    locations: {}
  },
  emits: ["filter"],
  setup(__props, { emit: __emit }) {
    useApi();
    ref();
    const query = ref("");
    const results = ref([]);
    const highlight = ref(0);
    const loading = ref(false);
    const searched = ref(false);
    const filters = reactive({ category: "", location: "", is_family_friendly: false });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "text-white",
        style: { "background": "linear-gradient(141deg, #1d6fa4 0%, #3298dc 71%, #4eb8f6 100%)" }
      }, _attrs))}><div class="px-4 py-5"><div class="flex flex-wrap gap-3 items-start"><div class="relative flex-1 min-w-64"><input${ssrRenderAttr("value", unref(query))} type="search" placeholder="Search for an event" class="w-full px-4 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50">`);
      if (unref(query).length >= 2 && !unref(loading) && unref(results).length === 0 && unref(searched)) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded shadow-lg p-3 text-sm z-50"> No results found for <strong>${ssrInterpolate(unref(query))}</strong></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(results).length) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-xl z-50 overflow-y-auto" style="${ssrRenderStyle({ "max-height": "252px" })}"><!--[-->`);
        ssrRenderList(unref(results), (event, i) => {
          _push(`<div class="${ssrRenderClass([{ "bg-blue-50": i === unref(highlight) }, "flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors"])}">`);
          if (event.photo) {
            _push(`<img${ssrRenderAttr("src", event.photo)}${ssrRenderAttr("alt", event.name)} class="w-16 h-16 object-cover rounded shrink-0">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="min-w-0"><p class="text-sm text-gray-900 font-medium">${(event.highlight || event.name) ?? ""}</p><div class="flex items-center gap-2 mt-0.5"><span class="text-xs text-gray-500">${ssrInterpolate(event.start_date)}</span>`);
          if (event.category) {
            _push(`<span class="text-xs bg-success text-white px-2 py-0.5 rounded-full">${ssrInterpolate(event.category.name)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.categories && __props.categories.length) {
        _push(`<select class="px-3 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-36" aria-label="Filter by category"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, "") : ssrLooseEqual(unref(filters).category, "")) ? " selected" : ""}>Category</option><!--[-->`);
        ssrRenderList(__props.categories, (c) => {
          _push(`<option${ssrRenderAttr("value", c.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, c.id) : ssrLooseEqual(unref(filters).category, c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.locations && __props.locations.length) {
        _push(`<select class="px-3 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-36" aria-label="Filter by location"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).location) ? ssrLooseContain(unref(filters).location, "") : ssrLooseEqual(unref(filters).location, "")) ? " selected" : ""}>Location</option><!--[-->`);
        ssrRenderList(__props.locations, (l) => {
          _push(`<option${ssrRenderAttr("value", l.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).location) ? ssrLooseContain(unref(filters).location, l.id) : ssrLooseEqual(unref(filters).location, l.id)) ? " selected" : ""}>${ssrInterpolate(l.name)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label class="flex items-center gap-2 py-3 cursor-pointer text-sm font-medium whitespace-nowrap"><input${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_family_friendly) ? ssrLooseContain(unref(filters).is_family_friendly, null) : unref(filters).is_family_friendly) ? " checked" : ""} type="checkbox" class="w-4 h-4 rounded accent-white"> Family Friendly </label><button class="bg-danger hover:opacity-90 text-white font-semibold px-5 py-3 rounded transition-opacity text-sm whitespace-nowrap"> Reset </button></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "SearchBar" });
const DEFAULT_START = "2021-01-01";
const DEFAULT_END = "2021-12-31";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({ title: "FunInATL – Atlanta Events" });
    const { get } = useApi();
    const dateStart = ref(DEFAULT_START);
    const dateEnd = ref(DEFAULT_END);
    const activeFilters = ref({ category: "", location: "", is_family_friendly: false });
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "events-index",
      () => get(
        `/events/index/${dateStart.value}/${dateEnd.value}`
      ),
      { watch: [dateStart, dateEnd] }
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => data.value?.categories || []);
    const locations = computed(() => data.value?.locations || []);
    const filteredGroups = computed(() => {
      const groups = data.value?.events || [];
      const { category, location, is_family_friendly } = activeFilters.value;
      if (!category && !location && !is_family_friendly) return groups;
      return groups.map((g) => ({
        ...g,
        days: g.days.map((d) => ({
          ...d,
          events: d.events.filter((e) => {
            if (category && e.category?.id !== Number(category) && e.category?.slug !== category) return false;
            if (location && e.location?.id !== Number(location) && e.location?.slug !== location) return false;
            if (is_family_friendly && !e.is_family_friendly) return false;
            return true;
          })
        })).filter((d) => d.events.length)
      })).filter((g) => g.days.length);
    });
    function onDateChange({ start, end }) {
      dateStart.value = start;
      dateEnd.value = end;
    }
    function onFilter(filters) {
      activeFilters.value = filters;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchBar = __nuxt_component_0;
      const _component_DateRangePicker = __nuxt_component_0$1;
      const _component_EventList = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SearchBar, {
        categories: unref(categories),
        locations: unref(locations),
        onFilter
      }, null, _parent));
      _push(ssrRenderComponent(_component_DateRangePicker, {
        start: unref(dateStart),
        end: unref(dateEnd),
        onChange: onDateChange
      }, null, _parent));
      _push(`<div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info"></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-16 text-red-500"> Failed to load events. Please try again. </div>`);
      } else {
        _push(ssrRenderComponent(_component_EventList, { groups: unref(filteredGroups) }, null, _parent));
      }
      _push(`</div></div>`);
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
//# sourceMappingURL=index-n1Zyxd3a.mjs.map
