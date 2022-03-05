<script lang="ts">
import { defineComponent } from "vue";
import * as auth from '@discostudebaker/auth';
import { createStore, useStore } from '@/store';

export default defineComponent({
  name: "App",
  setup() {
    createStore();
    const { session, setSession } = useStore();
    // @ts-ignore
    auth.emitter.on('sessionUpdated', e => {
      console.log(e);
      if (setSession) {
        console.log('setting session');
        setSession(e.token, e.user);
      }
    });

    return { session };
  },
});
</script>
<template>
  <div id="nav">
    <template v-if="session?.user">
      <router-link to="/me">{{ session?.user?.email }}</router-link> |
      <router-link to="/logout">Logout</router-link>
    </template>
    <template v-else>
    </template>
  </div>
  <router-view />
</template>

