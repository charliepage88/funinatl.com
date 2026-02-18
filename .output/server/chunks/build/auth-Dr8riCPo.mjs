import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-Fe-QvPgl.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(() => {
  const auth2 = useAuthStore();
  auth2.init();
  if (!auth2.isLoggedIn) {
    return navigateTo("/auth/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-Dr8riCPo.mjs.map
