<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>개발 도우미</span>
    </router-link>

    <Button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </Button>

    <Button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </Button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <span class="flex align-items-center">
        <p v-show="!!authArgs.userName">
          {{ `${authArgs.userName} 님` }}
        </p>
      </span>
      <Button class="p-link layout-topbar-button" @click="toggleMenu">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </Button>
      <Menu ref="menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/auth';
import { auth } from '@/composables/firebase';
import { usePlugin } from '@/composables/plugin';
import { useLayout } from '@/layouts/composables/layout';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const { authArgs } = useAuth();
const router = useRouter();
const { $navi } = usePlugin();
const { onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const menu = ref();

const onClickLogin = () => {
  $navi.login(router).login().go();
};

const onClickLogout = () => {
  auth.signOut();
  $navi.newsletter(router).newsletter().go();
};

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: '로그인',
        command: onClickLogin,
      },
      {
        label: '로그아웃',
        command: onClickLogout,
      },
    ],
  },
]);

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `layout/images/logo.svg`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const keyState = {};
window.onkeydown = (e) => {
  keyState[e.code] = true;

  keyState['ControlLeft'] && keyState['Backslash'] && onMenuToggle();
};
window.onkeyup = (e) => {
  keyState[e.code] = false;
};
</script>

<style lang="scss" scoped></style>
