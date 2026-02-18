import { _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './EventList-sT6-ja1Y.mjs';
import { defineComponent, computed, ref, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import { u as useAsyncData } from './asyncData-Dcp7Xprb.mjs';
import { u as useHead } from './composables-DJvKiPhS.mjs';
import './nuxt-link-B7BZdsR2.mjs';
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

const DEFAULT_START = "2021-01-01";
const DEFAULT_END = "2021-12-31";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => route.params.slug);
    const { get } = useApi();
    const dateStart = ref(DEFAULT_START);
    const dateEnd = ref(DEFAULT_END);
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `location-${slug.value}`,
      () => get(`/events/location/${slug.value}/${dateStart.value}/${dateEnd.value}`),
      { watch: [dateStart, dateEnd] }
    )), __temp = await __temp, __restore(), __temp);
    const location = computed(() => data.value?.location);
    const mapsUrl = computed(() => {
      if (!location.value?.address) return "#";
      const q = [location.value.address, location.value.city, location.value.state, location.value.zip].filter(Boolean).join(", ").replace(/ /g, "+");
      return `https://www.google.com/maps/place/${q}`;
    });
    useHead(() => ({
      title: location.value ? `Atlanta Events – ${location.value.name} | FunInATL` : "Venue – FunInATL",
      meta: [{ name: "description", content: location.value ? `Atlanta events at ${location.value.name}.` : "" }]
    }));
    function onDateChange({ start, end }) {
      dateStart.value = start;
      dateEnd.value = end;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DateRangePicker = __nuxt_component_0$1;
      const _component_EventList = __nuxt_component_1;
      if (unref(location)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_DateRangePicker, {
          start: unref(dateStart),
          end: unref(dateEnd),
          onChange: onDateChange
        }, null, _parent));
        _push(`<div class="flex justify-center pt-6 pb-4 px-4"><div class="flex flex-wrap items-center gap-6 justify-center max-w-2xl w-full">`);
        if (unref(location).thumb_medium || unref(location).photo) {
          _push(`<div class="shrink-0"><img${ssrRenderAttr("src", unref(location).thumb_medium || unref(location).photo)}${ssrRenderAttr("alt", unref(location).name)} class="w-32 h-32 object-cover rounded"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center"><h1 class="text-4xl font-semibold text-gray-800 capitalize">${ssrInterpolate(unref(location).name)}</h1>`);
        if (unref(location).address) {
          _push(`<a${ssrRenderAttr("href", unref(mapsUrl))} target="_blank" rel="noopener" class="block mt-2 text-info hover:underline text-sm">${ssrInterpolate(unref(location).address)}<br> ${ssrInterpolate(unref(location).city)}`);
          if (unref(location).state) {
            _push(`<!--[-->, ${ssrInterpolate(unref(location).state)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(unref(location).zip)}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(location).website) {
          _push(`<div class="shrink-0"><a${ssrRenderAttr("href", unref(location).website)} target="_blank" rel="noopener" class="flex items-center gap-2 bg-indigo hover:opacity-90 text-white font-semibold px-5 py-3 rounded transition-opacity"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> Website </a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">`);
        if (unref(pending)) {
          _push(`<div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info"></div></div>`);
        } else {
          _push(ssrRenderComponent(_component_EventList, {
            groups: unref(data)?.events || []
          }, null, _parent));
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/location/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-Cn-UOXvZ.mjs.map
