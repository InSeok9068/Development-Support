<template>
  <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
    <i class="pi pi-cog" />
  </button>

  <Sidebar
    v-model:visible="visible"
    position="right"
    :transition-options="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-config-sidebar w-20rem"
  >
    <h5>Scale</h5>
    <div class="align-items-center flex">
      <Button
        icon="pi pi-minus"
        type="button"
        class="p-button-text p-button-rounded w-2rem h-2rem mr-2"
        :disabled="layoutConfig.scale.value === scales[0]"
        @click="decrementScale()"
      />
      <div class="align-items-center flex gap-2">
        <i
          v-for="s in scales"
          :key="s"
          class="pi pi-circle-fill text-300"
          :class="{ 'text-primary-500': s === layoutConfig.scale.value }"
        />
      </div>
      <Button
        icon="pi pi-plus"
        type="button"
        p-button
        class="p-button-text p-button-rounded w-2rem h-2rem ml-2"
        :disabled="layoutConfig.scale.value === scales[scales.length - 1]"
        @click="incrementScale()"
      />
    </div>

    <template v-if="!simple">
      <h5>Menu Type</h5>
      <div class="flex">
        <div class="field-radiobutton flex-1">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="static" input-id="mode1" />
          <label for="mode1">Static</label>
        </div>

        <div class="field-radiobutton flex-1">
          <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="overlay" input-id="mode2" />
          <label for="mode2">Overlay</label>
        </div>
      </div>
    </template>

    <template v-if="!simple">
      <h5>Input Style</h5>
      <div class="flex">
        <div class="field-radiobutton flex-1">
          <RadioButton
            v-model="layoutConfig.inputStyle.value"
            name="inputStyle"
            value="outlined"
            input-id="outlined_input"
          />
          <label for="outlined_input">Outlined</label>
        </div>
        <div class="field-radiobutton flex-1">
          <RadioButton
            v-model="layoutConfig.inputStyle.value"
            name="inputStyle"
            value="filled"
            input-id="filled_input"
          />
          <label for="filled_input">Filled</label>
        </div>
      </div>

      <h5>Ripple Effect</h5>
      <InputSwitch v-model="layoutConfig.ripple.value" />
    </template>

    <h5>Bootstrap</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('bootstrap4-light-blue', 'light')">
          <img src="/layout/images/themes/bootstrap4-light-blue.svg" class="w-2rem h-2rem" alt="Bootstrap Light Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('bootstrap4-light-purple', 'light')">
          <img
            src="/layout/images/themes/bootstrap4-light-purple.svg"
            class="w-2rem h-2rem"
            alt="Bootstrap Light Purple"
          />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('bootstrap4-dark-blue', 'dark')">
          <img src="/layout/images/themes/bootstrap4-dark-blue.svg" class="w-2rem h-2rem" alt="Bootstrap Dark Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('bootstrap4-dark-purple', 'dark')">
          <img
            src="/layout/images/themes/bootstrap4-dark-purple.svg"
            class="w-2rem h-2rem"
            alt="Bootstrap Dark Purple"
          />
        </button>
      </div>
    </div>

    <h5>Material Design</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-light-indigo', 'light')">
          <img src="/layout/images/themes/md-light-indigo.svg" class="w-2rem h-2rem" alt="Material Light Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-light-deeppurple', 'light')">
          <img
            src="/layout/images/themes/md-light-deeppurple.svg"
            class="w-2rem h-2rem"
            alt="Material Light DeepPurple"
          />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-dark-indigo', 'dark')">
          <img src="/layout/images/themes/md-dark-indigo.svg" class="w-2rem h-2rem" alt="Material Dark Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('md-dark-deeppurple', 'dark')">
          <img
            src="/layout/images/themes/md-dark-deeppurple.svg"
            class="w-2rem h-2rem"
            alt="Material Dark DeepPurple"
          />
        </button>
      </div>
    </div>

    <h5>Material Design Compact</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('mdc-light-indigo', 'light')">
          <img src="/layout/images/themes/md-light-indigo.svg" class="w-2rem h-2rem" alt="Material Light Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('mdc-light-deeppurple', 'light')">
          <img
            src="/layout/images/themes/md-light-deeppurple.svg"
            class="w-2rem h-2rem"
            alt="Material Light Deep Purple"
          />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('mdc-dark-indigo', 'dark')">
          <img src="/layout/images/themes/md-dark-indigo.svg" class="w-2rem h-2rem" alt="Material Dark Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('mdc-dark-deeppurple', 'dark')">
          <img
            src="/layout/images/themes/md-dark-deeppurple.svg"
            class="w-2rem h-2rem"
            alt="Material Dark Deep Purple"
          />
        </button>
      </div>
    </div>

    <h5>Tailwind</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('tailwind-light', 'light')">
          <img src="/layout/images/themes/tailwind-light.png" class="w-2rem h-2rem" alt="Tailwind Light" />
        </button>
      </div>
    </div>

    <h5>Fluent UI</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('fluent-light', 'light')">
          <img src="/layout/images/themes/fluent-light.png" class="w-2rem h-2rem" alt="Fluent Light" />
        </button>
      </div>
    </div>

    <h5>PrimeOne Design - 2022</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-indigo', 'light')">
          <img src="/layout/images/themes/lara-light-indigo.png" class="w-2rem h-2rem" alt="Lara Light Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-blue', 'light')">
          <img src="/layout/images/themes/lara-light-blue.png" class="w-2rem h-2rem" alt="Lara Light Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-purple', 'light')">
          <img src="/layout/images/themes/lara-light-purple.png" class="w-2rem h-2rem" alt="Lara Light Purple" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-teal', 'light')">
          <img src="/layout/images/themes/lara-light-teal.png" class="w-2rem h-2rem" alt="Lara Light Teal" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-indigo', 'dark')">
          <img src="/layout/images/themes/lara-dark-indigo.png" class="w-2rem h-2rem" alt="Lara Dark Indigo" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-blue', 'dark')">
          <img src="/layout/images/themes/lara-dark-blue.png" class="w-2rem h-2rem" alt="Lara Dark Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-purple', 'dark')">
          <img src="/layout/images/themes/lara-dark-purple.png" class="w-2rem h-2rem" alt="Lara Dark Purple" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-teal', 'dark')">
          <img src="/layout/images/themes/lara-dark-teal.png" class="w-2rem h-2rem" alt="Lara Dark Teal" />
        </button>
      </div>
    </div>

    <h5>PrimeOne Design - 2021</h5>
    <div class="grid">
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('saga-blue', 'light')">
          <img src="/layout/images/themes/saga-blue.png" class="w-2rem h-2rem" alt="Saga Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('saga-green', 'light')">
          <img src="/layout/images/themes/saga-green.png" class="w-2rem h-2rem" alt="Saga Green" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('saga-orange', 'light')">
          <img src="/layout/images/themes/saga-orange.png" class="w-2rem h-2rem" alt="Saga Orange" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('saga-purple', 'light')">
          <img src="/layout/images/themes/saga-purple.png" class="w-2rem h-2rem" alt="Saga Purple" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('vela-blue', 'dark')">
          <img src="/layout/images/themes/vela-blue.png" class="w-2rem h-2rem" alt="Vela Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('vela-green', 'dark')">
          <img src="/layout/images/themes/vela-green.png" class="w-2rem h-2rem" alt="Vela Green" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('vela-orange', 'dark')">
          <img src="/layout/images/themes/vela-orange.png" class="w-2rem h-2rem" alt="Vela Orange" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('vela-purple', 'dark')">
          <img src="/layout/images/themes/vela-purple.png" class="w-2rem h-2rem" alt="Vela Purple" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('arya-blue', 'dark')">
          <img src="/layout/images/themes/arya-blue.png" class="w-2rem h-2rem" alt="Arya Blue" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('arya-green', 'dark')">
          <img src="/layout/images/themes/arya-green.png" class="w-2rem h-2rem" alt="Arya Green" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('arya-orange', 'dark')">
          <img src="/layout/images/themes/arya-orange.png" class="w-2rem h-2rem" alt="Arya Orange" />
        </button>
      </div>
      <div class="col-3">
        <button class="p-link w-2rem h-2rem" @click="onChangeTheme('arya-purple', 'dark')">
          <img src="/layout/images/themes/arya-purple.png" class="w-2rem h-2rem" alt="Arya Purple" />
        </button>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import RadioButton from 'primevue/radiobutton';
import Sidebar from 'primevue/sidebar';

import { useLayout } from '@/layouts/composables/layout';
import { ref } from 'vue';

defineProps({
  simple: {
    type: Boolean,
    default: false,
  },
});
const scales = ref([12, 13, 14, 15, 16]);
const visible = ref(false);

const { changeThemeSettings, setScale, layoutConfig } = useLayout();

const onConfigButtonClick = () => {
  visible.value = !visible.value;
};
const onChangeTheme = (theme, mode) => {
  const elementId = 'theme-css';
  const linkElement = document.getElementById(elementId);
  const cloneLinkElement = linkElement.cloneNode(true);
  const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
  cloneLinkElement.setAttribute('id', elementId + '-clone');
  cloneLinkElement.setAttribute('href', newThemeUrl);
  cloneLinkElement.addEventListener('load', () => {
    linkElement.remove();
    cloneLinkElement.setAttribute('id', elementId);
    changeThemeSettings(theme, mode === 'dark');
  });
  linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};
const decrementScale = () => {
  setScale(layoutConfig.scale.value - 1);
  applyScale();
};
const incrementScale = () => {
  setScale(layoutConfig.scale.value + 1);
  applyScale();
};
const applyScale = () => {
  document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};
</script>

<style lang="scss" scoped></style>
