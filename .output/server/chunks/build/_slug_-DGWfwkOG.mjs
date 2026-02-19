import { _ as __nuxt_component_0 } from './nuxt-link-B7BZdsR2.mjs';
import { defineComponent, withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import { u as useAsyncData } from './asyncData-Dcp7Xprb.mjs';
import { u as useHead } from './composables-DJvKiPhS.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { get } = useApi();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `event-${route.params.slug}`,
      () => get(`/events/bySlug/${route.params.slug}`)
    )), __temp = await __temp, __restore(), __temp);
    const event = computed(() => data.value?.event);
    useHead(() => ({
      title: event.value ? `${event.value.name} | FunInATL` : "Event – FunInATL",
      meta: [{ name: "description", content: event.value?.short_description || "" }]
    }));
    function formatFriendlyDate(dateStr) {
      if (!dateStr) return "";
      const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-24"><div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info"></div></div>`);
      } else if (unref(event)) {
        _push(`<div class="container mx-auto px-4 lg:px-8 py-8"><div class="flex flex-wrap lg:flex-nowrap gap-6"><div class="w-full lg:w-1/2">`);
        if (unref(event).photo) {
          _push(`<div class="lg:hidden mb-4"><img${ssrRenderAttr("src", unref(event).photo)}${ssrRenderAttr("alt", unref(event).name)} class="w-full rounded"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 class="text-4xl md:text-3xl font-bold text-gray-900 mb-3">${ssrInterpolate(unref(event).name)}</h1><h3 class="text-2xl md:text-xl font-semibold text-gray-700 mb-1">${ssrInterpolate(formatFriendlyDate(unref(event).start_date))}</h3><h3 class="text-base text-gray-400 mb-4">${ssrInterpolate(unref(event).start_time)}`);
        if (unref(event).end_time) {
          _push(`<!--[--> – ${ssrInterpolate(unref(event).end_time)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h3><div class="flex items-center justify-between mb-4 flex-wrap gap-3"><span class="text-xl font-semibold text-gray-800"> Price: <span>${unref(event).price ?? ""}</span></span>`);
        if (unref(event).category) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/category/${unref(event).category.slug}`,
            class: "inline-block bg-success text-white no-underline px-4 py-1.5 rounded text-base font-medium hover:opacity-90 transition-opacity"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(event).category.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(event).category.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(event).tags && unref(event).tags.length) {
          _push(`<div class="flex flex-wrap gap-1 mb-4"><!--[-->`);
          ssrRenderList(unref(event).tags, (tag) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: typeof tag === "string" ? tag : tag.slug,
              to: `/tag/${typeof tag === "string" ? tag : tag.slug}`,
              class: "text-sm bg-info text-white px-3 py-0.5 rounded no-underline hover:opacity-90 transition-opacity"
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
        if (unref(event).short_description) {
          _push(`<div class="text-gray-700 mb-6"><p>${ssrInterpolate(unref(event).short_description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-wrap items-start gap-4 mt-4">`);
        if (unref(event).location) {
          _push(`<div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/location/${unref(event).location.slug}`,
            "aria-label": unref(event).location.name
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (unref(event).location.photo) {
                  _push2(`<img${ssrRenderAttr("src", unref(event).location.photo)}${ssrRenderAttr("alt", unref(event).location.name)} class="w-16 h-16 object-cover rounded hidden lg:block"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(event).location.photo) {
                  _push2(`<img${ssrRenderAttr("src", unref(event).location.photo)}${ssrRenderAttr("alt", unref(event).location.name)} class="w-24 h-24 object-cover rounded lg:hidden"${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  unref(event).location.photo ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref(event).location.photo,
                    alt: unref(event).location.name,
                    class: "w-16 h-16 object-cover rounded hidden lg:block"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                  unref(event).location.photo ? (openBlock(), createBlock("img", {
                    key: 1,
                    src: unref(event).location.photo,
                    alt: unref(event).location.name,
                    class: "w-24 h-24 object-cover rounded lg:hidden"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/location/${unref(event).location.slug}`,
            class: "text-gray-700 no-underline hover:text-info capitalize text-base font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(event).location.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(event).location.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).is_family_friendly) {
          _push(`<span class="inline-flex items-center gap-1 bg-warning text-gray-900 text-sm font-medium px-4 py-1.5 rounded"> Family Friendly </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).is_sold_out) {
          _push(`<span class="inline-flex items-center gap-1 bg-danger text-white text-sm font-medium px-4 py-1.5 rounded"> Sold Out </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).website) {
          _push(`<a${ssrRenderAttr("href", unref(event).website)} target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-indigo hover:opacity-90 text-white font-medium text-xl px-4 py-2 rounded transition-opacity no-underline"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg> Venue Website </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="w-full lg:w-1/2 hidden lg:block">`);
        if (unref(event).photo) {
          _push(`<figure class="mb-4"><img${ssrRenderAttr("src", unref(event).photo)}${ssrRenderAttr("alt", unref(event).name)} class="w-full rounded aspect-video object-cover"></figure>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).description) {
          _push(`<div class="${ssrRenderClass({ "mt-4": unref(event).photo })}"><p class="text-gray-700 leading-relaxed">${ssrInterpolate(unref(event).description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(event).description) {
          _push(`<div class="lg:hidden mt-6"><p class="text-gray-700 leading-relaxed">${ssrInterpolate(unref(event).description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(event).bands && unref(event).bands.length) {
          _push(`<!--[--><hr class="my-8 border-gray-200"><h3 class="text-3xl font-semibold text-gray-700 ml-2 mb-6">Bands</h3><div class="flex flex-wrap gap-4 ml-2"><!--[-->`);
          ssrRenderList(unref(event).bands, (band) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: band.id,
              to: `/band/${band.slug}`,
              class: "flex items-center gap-3 bg-info text-white rounded-lg p-4 no-underline hover:opacity-90 transition-opacity min-w-48"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  if (band.photo) {
                    _push2(`<img${ssrRenderAttr("src", band.photo)}${ssrRenderAttr("alt", band.name)} class="w-16 h-16 object-cover rounded hidden lg:block"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (band.photo) {
                    _push2(`<img${ssrRenderAttr("src", band.photo)}${ssrRenderAttr("alt", band.name)} class="w-12 h-12 object-cover rounded lg:hidden"${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="font-semibold text-base"${_scopeId}>${ssrInterpolate(band.name)}</span>`);
                } else {
                  return [
                    band.photo ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: band.photo,
                      alt: band.name,
                      class: "w-16 h-16 object-cover rounded hidden lg:block"
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    band.photo ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: band.photo,
                      alt: band.name,
                      class: "w-12 h-12 object-cover rounded lg:hidden"
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    createVNode("span", { class: "font-semibold text-base" }, toDisplayString(band.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center py-24 text-gray-400 text-lg">Event not found.</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/event/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-DGWfwkOG.mjs.map
