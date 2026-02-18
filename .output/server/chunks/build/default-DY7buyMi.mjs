import { _ as __nuxt_component_0$1 } from './nuxt-link-B7BZdsR2.mjs';
import { mergeProps, defineComponent, ref, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-Fe-QvPgl.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useApi } from './useApi-BCWnkEDe.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const logoSrc = "/images/funinatl-bg.png";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    auth.init();
    const menuOpen = ref(false);
    const navLinks = [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/submit-event", label: "Submit Event" },
      { to: "/subscribe", label: "Subscribe" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "bg-[#222] text-white sticky top-0 z-50 shadow-md",
        role: "navigation",
        "aria-label": "main navigation"
      }, _attrs))} data-v-9fef4b1a><div class="max-w-full px-4" data-v-9fef4b1a><div class="flex items-center justify-between navbar-height" data-v-9fef4b1a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-white no-underline shrink-0 relative",
        "aria-label": "Homepage"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", logoSrc)} alt="FunInATL" class="hidden sm:block" style="${ssrRenderStyle({ "max-height": "90px" })}" data-v-9fef4b1a${_scopeId}><span class="navbar-brand-name font-bold tracking-tight absolute" style="${ssrRenderStyle({ "left": "30px", "font-size": "2rem" })}" data-v-9fef4b1a${_scopeId}>FunInATL</span>`);
          } else {
            return [
              createVNode("img", {
                src: logoSrc,
                alt: "FunInATL",
                class: "hidden sm:block",
                style: { "max-height": "90px" }
              }),
              createVNode("span", {
                class: "navbar-brand-name font-bold tracking-tight absolute",
                style: { "left": "30px", "font-size": "2rem" }
              }, "FunInATL")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-1" data-v-9fef4b1a><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: "px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors",
          "active-class": "text-white bg-white/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(auth).isLoggedIn) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/user/dashboard",
          class: "px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dashboard `);
            } else {
              return [
                createTextVNode(" Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="ml-2 px-4 py-2 text-sm font-medium bg-danger hover:opacity-90 text-white rounded transition-opacity" data-v-9fef4b1a> Logout </button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer" aria-label="Toggle menu" data-v-9fef4b1a><!--[-->`);
      ssrRenderList(3, (i) => {
        _push(`<span class="block w-6 h-0.5 bg-white transition-all" data-v-9fef4b1a></span>`);
      });
      _push(`<!--]--></button></div>`);
      if (unref(menuOpen)) {
        _push(`<div class="md:hidden pb-4 flex flex-col border-t border-white/10 mt-1" data-v-9fef4b1a><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.to,
            to: link.to,
            class: "px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors",
            onClick: ($event) => menuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.label), 1)
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
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-9fef4b1a"]]), { __name: "AppHeader" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const email = ref("");
    const subscribing = ref(false);
    const msg = ref("");
    const err = ref(false);
    const categories = [
      { to: "/category/music", label: "Music" },
      { to: "/category/food-drinks", label: "Food & Drinks" },
      { to: "/category/comedy", label: "Comedy" },
      { to: "/category/arts-theatre", label: "Arts & Theatre" },
      { to: "/category/other", label: "Other" }
    ];
    const menuLinks = [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/submit-event", label: "Submit Event" },
      { to: "/subscribe", label: "Subscribe" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-whitesmoke pt-10 pb-6" }, _attrs))}><div class="container mx-auto px-4"><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"><div><h3 class="font-semibold text-base text-gray-800 mb-3">Categories</h3><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<div class="mb-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: cat.to,
          class: "text-primary hover:underline text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cat.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(cat.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div><h3 class="font-semibold text-base text-gray-800 mb-3">Menu</h3><!--[-->`);
      ssrRenderList(menuLinks, (item) => {
        _push(`<div class="mb-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: "text-primary hover:underline text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="col-span-2 sm:col-span-1 flex flex-col gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/get-listed",
        class: "flex items-center justify-center gap-2 bg-info hover:bg-info-dark text-white font-semibold py-3 px-4 rounded transition-colors text-sm no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-map fa-lg"${_scopeId}></i> Get Listed `);
          } else {
            return [
              createVNode("i", { class: "fas fa-map fa-lg" }),
              createTextVNode(" Get Listed ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "flex items-center justify-center gap-2 bg-indigo hover:opacity-90 text-white font-semibold py-3 px-4 rounded transition-colors text-sm no-underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fas fa-envelope fa-lg"${_scopeId}></i> Contact Us `);
          } else {
            return [
              createVNode("i", { class: "fas fa-envelope fa-lg" }),
              createTextVNode(" Contact Us ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="col-span-2 lg:col-span-2"><h3 class="font-semibold text-base text-gray-800 mb-3">Newsletter</h3><p class="text-sm text-gray-600 mb-3">Keep updated on events going on in Atlanta.</p><form><div class="mb-2"><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="Your email address" required aria-label="Your email address" class="w-full px-3 py-2 text-gray-900 text-sm rounded border border-gray-300 focus:outline-none focus:border-info"></div><button type="submit"${ssrIncludeBooleanAttr(unref(subscribing)) ? " disabled" : ""} class="bg-primary hover:opacity-90 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded transition-opacity">${ssrInterpolate(unref(subscribing) ? "Subscribing…" : "Subscribe")}</button>`);
      if (unref(msg)) {
        _push(`<p class="${ssrRenderClass([unref(err) ? "text-danger" : "text-success", "mt-2 text-xs"])}">${ssrInterpolate(unref(msg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div class="col-span-2 lg:col-span-1 flex items-end"><p class="text-sm text-gray-500 mt-6 lg:mt-0 text-center lg:text-right w-full"> Copyright ©2016–${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}<br><a href="https://www.charlespage.me" target="_blank" rel="noopener" class="text-primary hover:underline"> Charles Page </a></p></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AppFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-white text-gray-900" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-DY7buyMi.mjs.map
