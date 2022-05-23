<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import * as auth from '@discostudebaker/auth';
import { createStore, useStore } from '@/store';

export default defineComponent({
  name: "App",
  setup() {
    let userMenuOpen:Ref<boolean> = ref(false);
    
    function toggleUserMenuOpen(e : any) {
      e.preventDefault();
      userMenuOpen.value = !userMenuOpen.value;
    }
    const userMenuClasses = computed(() => {
      const classes = {
        invisible: !userMenuOpen.value,
      };
      return classes;
    });

    createStore();
    const { session, setSession } = useStore();
    // TODO: make ts happy
    // @ts-ignore
    auth.emitter.on('authStateUpdated', e => {
      if (setSession) {
        setSession(e.token, e.user);
      }
    });

    return { session, toggleUserMenuOpen, userMenuClasses };
  },
});
</script>
<template>
  <div class="p-4">
      <template v-if="session?.user">
        <div class="relative">
          <button class="bg-gray-800 text-white px-6 h-10 rounded" @click="toggleUserMenuOpen">
            {{ session?.user?.email }}
          </button>
          <nav tabindex="0" class="border border-2 bg-white border-gray-800 rounded w-60 absolute left-0 top-full transition-all" v-bind:class="userMenuClasses">
            <ul class="py-1">
              <li class="mr-6">
                <router-link to="/me" class="block px-4 py-2 hover:bg-gray-100">Settings</router-link>
              </li>
              <li class="mr-6">
                <router-link to="/logout" class="block px-4 py-2 hover:bg-gray-100">Logout</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </template>
      <template v-else>
        <div class="relative">
          <router-link to="/login" v-slot="{ navigate }">
            <button class="bg-gray-800 text-white px-6 h-10 rounded" @click="navigate">
              Login
            </button>
          </router-link>
        </div>
      </template>
  </div>
</template>

