<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar></AppTopbar>
    <div class="layout-sidebar">
      <AppSidebar></AppSidebar>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <AppFooter></AppFooter>
      <AppConfig></AppConfig>
    </div>
    <div class="layout-mask"></div>
    <AppConfirmDialog />
    <AppDialog />
    <AppToast />
    <AppLoading />
  </div>
</template>

<script setup>
import AppConfirmDialog from '@/components/app/AppConfirmDialog.vue';
import AppDialog from '@/components/app/AppDialog.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppToast from '@/components/app/AppToast.vue';
import { useAuth } from '@/composables/auth';
import { auth } from '@/composables/firebase';
import { useLayout } from '@/layouts/composables/layout';
import { computed, ref, watch } from 'vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const { authArgs, initAuthArgs } = useAuth();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfig.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-input-filled': layoutConfig.inputStyle.value === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple.value,
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
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
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

auth.onAuthStateChanged(async (user) => {
  if (user) {
    authArgs.value.isAuth = true;
    authArgs.value.token = await user.getIdToken();
    authArgs.value.userName = user.displayName;
  } else {
    initAuthArgs();
  }
});
</script>

<style lang="scss" scoped></style>
