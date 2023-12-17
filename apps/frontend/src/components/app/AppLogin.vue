<template>
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="authArgs.requiredAuth" modal>
      <template #container="{ closeCallback }">
        <div class="flex align-items-center gap-2">
          <div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
          </div>
          <Button
            label="Cancel"
            text
            class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            @click="closeCallback"
          ></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/auth';
import { auth } from '@/composables/firebase';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';
const { authArgs } = useAuth();

const uiConfig = {
  callbacks: {
    uiShown: () => {
      document.getElementById('loader')!.style.display = 'none';
    },
  },
  signInSuccessUrl: '/', // 성공 시 리다이렉트 URL
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>', // 서비스이용약관
  privacyPolicyUrl: () => window.location.assign('<your-privacy-policy-url>'), // 개인정보처리방침
};

const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth);

onMounted(() => {
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>
