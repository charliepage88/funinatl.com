import { a as __nuxt_component_0$1$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0$2 } from './nuxt-link-B7BZdsR2.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DateRangePicker",
  __ssrInlineRender: true,
  props: {
    start: {},
    end: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    function strToDate(s) {
      return /* @__PURE__ */ new Date(s + "T00:00:00");
    }
    ref(props.start ? strToDate(props.start) : null);
    ref(props.end ? strToDate(props.end) : null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-3 px-4 bg-white border-b border-gray-200 flex items-center gap-4 flex-wrap" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-sm text-gray-400"${_scopeId}>Loading…</span>`);
          } else {
            return [
              createVNode("span", { class: "text-sm text-gray-400" }, "Loading…")
            ];
          }
        })
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DateRangePicker.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$2, { __name: "DateRangePicker" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EventCard",
  __ssrInlineRender: true,
  props: {
    event: {}
  },
  setup(__props) {
    function formatDate(dateStr) {
      if (!dateStr) return "";
      const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/event/${__props.event.slug}`,
        class: "block overflow-hidden shrink-0",
        "aria-label": __props.event.name
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.event.photo || __props.event.thumb_desktop || __props.event.thumb_tablet || __props.event.thumb_mobile) {
              _push2(`<img${ssrRenderAttr("src", __props.event.photo || __props.event.thumb_desktop || __props.event.thumb_tablet || __props.event.thumb_mobile)}${ssrRenderAttr("alt", __props.event.name)} class="w-full object-cover" style="${ssrRenderStyle({ "height": "250px" })}" loading="lazy"${_scopeId}>`);
            } else {
              _push2(`<div class="w-full bg-gray-100 flex items-center justify-center" style="${ssrRenderStyle({ "height": "250px" })}"${_scopeId}><svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div>`);
            }
          } else {
            return [
              __props.event.photo || __props.event.thumb_desktop || __props.event.thumb_tablet || __props.event.thumb_mobile ? (openBlock(), createBlock("img", {
                key: 0,
                src: __props.event.photo || __props.event.thumb_desktop || __props.event.thumb_tablet || __props.event.thumb_mobile,
                alt: __props.event.name,
                class: "w-full object-cover",
                style: { "height": "250px" },
                loading: "lazy"
              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "w-full bg-gray-100 flex items-center justify-center",
                style: { "height": "250px" }
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-12 h-12 text-gray-300",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "1.5",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ]))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-4 flex-1 flex flex-col"><div class="flex gap-3 mb-3">`);
      if (__props.event.location?.thumb_small || __props.event.location?.photo) {
        _push(`<div class="shrink-0 flex flex-col items-center gap-1" style="${ssrRenderStyle({ "width": "128px" })}">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/location/${__props.event.location.slug}`,
          "aria-label": __props.event.location.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", __props.event.location.thumb_small || __props.event.location.photo)}${ssrRenderAttr("alt", __props.event.location.name)} class="object-cover rounded" style="${ssrRenderStyle({ "width": "128px", "height": "128px" })}" loading="lazy"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: __props.event.location.thumb_small || __props.event.location.photo,
                  alt: __props.event.location.name,
                  class: "object-cover rounded",
                  style: { "width": "128px", "height": "128px" },
                  loading: "lazy"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (__props.event.category) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/category/${__props.event.category.slug}`,
            class: "block text-center bg-success text-white text-xs font-medium py-1 rounded no-underline hover:opacity-90 transition-opacity",
            style: { "width": "128px" },
            "aria-label": __props.event.category.name
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.event.category.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.event.category.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (__props.event.category) {
        _push(`<div class="shrink-0">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/category/${__props.event.category.slug}`,
          class: "inline-block bg-success text-white text-xs font-medium px-2 py-1 rounded no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.event.category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.event.category.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 min-w-0"><h4 class="font-bold text-gray-900 text-lg leading-snug mb-1 capitalize">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/event/${__props.event.slug}`,
        class: "text-gray-900 no-underline hover:text-info transition-colors",
        "aria-label": __props.event.name
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.event.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.event.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h4>`);
      if (__props.event.location) {
        _push(`<h5 class="text-gray-600 text-base capitalize">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/location/${__props.event.location.slug}`,
          class: "text-gray-600 no-underline hover:text-info transition-colors",
          "aria-label": __props.event.location.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.event.location.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.event.location.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h5>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="text-center mb-1"><p class="text-sm font-medium text-gray-700">${ssrInterpolate(formatDate(__props.event.start_date))}`);
      if (__props.event.end_date) {
        _push(`<!--[--> – ${ssrInterpolate(formatDate(__props.event.end_date))}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><div class="text-center mb-2"><p class="text-sm text-gray-400">${ssrInterpolate(__props.event.start_time)}`);
      if (__props.event.end_time) {
        _push(`<!--[--> – ${ssrInterpolate(__props.event.end_time)}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><div class="flex justify-center mb-2"><span class="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded">${__props.event.price ?? ""}</span></div>`);
      if (__props.event.is_family_friendly) {
        _push(`<div class="flex justify-center mb-2"><span class="inline-flex items-center gap-1 bg-warning text-gray-900 text-xs font-medium px-3 py-1 rounded"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a3 3 0 100 6 3 3 0 000-6zm-6 9a1 1 0 000 2h12a1 1 0 000-2H6zm2 4a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4H8z"></path></svg> Family Friendly </span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.event.short_description) {
        _push(`<p class="text-sm text-gray-600 mt-1 mb-2">${ssrInterpolate(__props.event.short_description.length > 200 ? __props.event.short_description.slice(0, 200) + "…" : __props.event.short_description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.event.tags && __props.event.tags.length) {
        _push(`<div class="mt-auto pt-2 flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(__props.event.tags, (tag) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: typeof tag === "string" ? tag : tag.slug,
            to: `/tag/${typeof tag === "string" ? tag : tag.slug}`,
            class: "text-xs bg-info text-white px-2 py-0.5 rounded no-underline hover:opacity-90 transition-opacity"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(typeof tag === "string" ? tag : tag.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(typeof tag === "string" ? tag : tag.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "EventCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EventList",
  __ssrInlineRender: true,
  props: {
    groups: {}
  },
  setup(__props) {
    function formatDay(dateStr) {
      const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EventCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!__props.groups || !__props.groups.length) {
        _push(`<div class="text-center py-16 text-gray-500 text-lg"> No events found. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.groups, (group) => {
        _push(`<!--[--><h3 class="text-3xl font-semibold text-center text-gray-800 mt-10 mb-4">${ssrInterpolate(group.label)}</h3>`);
        if (group.days && group.days.length) {
          _push(`<!--[-->`);
          ssrRenderList(group.days, (day) => {
            _push(`<div><div class="flex items-center mb-3 mt-6"><h4 class="text-xl font-semibold text-gray-700">${ssrInterpolate(formatDay(day.date))}</h4></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4"><!--[-->`);
            ssrRenderList(day.events, (event) => {
              _push(ssrRenderComponent(_component_EventCard, {
                key: event.slug,
                event
              }, null, _parent));
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EventList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "EventList" });

export { __nuxt_component_0$1 as _, __nuxt_component_1 as a };
//# sourceMappingURL=EventList-sT6-ja1Y.mjs.map
