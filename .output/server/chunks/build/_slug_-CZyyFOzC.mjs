import { _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './EventList-CyVliHTp.mjs';
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
      `band-${slug.value}`,
      () => get(`/events/band/${slug.value}/${dateStart.value}/${dateEnd.value}`),
      { watch: [dateStart, dateEnd] }
    )), __temp = await __temp, __restore(), __temp);
    const band = computed(() => data.value?.band);
    useHead(() => ({
      title: band.value ? `Atlanta Events – ${band.value.name} | FunInATL` : "Artist – FunInATL",
      meta: [{ name: "description", content: band.value ? `Atlanta events for ${band.value.name}.` : "" }]
    }));
    function onDateChange({ start, end }) {
      dateStart.value = start;
      dateEnd.value = end;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DateRangePicker = __nuxt_component_0$1;
      const _component_EventList = __nuxt_component_1;
      if (unref(band)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_DateRangePicker, {
          start: unref(dateStart),
          end: unref(dateEnd),
          onChange: onDateChange
        }, null, _parent));
        _push(`<div class="flex justify-center pt-6 pb-4 px-4"><div class="flex flex-wrap items-center gap-6 justify-center">`);
        if (unref(band).photo) {
          _push(`<div class="shrink-0"><img${ssrRenderAttr("src", unref(band).photo)}${ssrRenderAttr("alt", unref(band).name)} class="w-32 h-32 object-cover rounded"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center"><h1 class="text-4xl font-semibold text-gray-800 capitalize">${ssrInterpolate(unref(band).name)}</h1></div></div></div><div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/band/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CZyyFOzC.mjs.map
