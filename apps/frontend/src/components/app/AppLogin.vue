<template>
  <Dialog v-model:visible="authArgs.requiredAuth" modal>
    <template #container="{ closeCallback }">
      <div class="flex flex-column align-items-center gap-2 bg-white p-5">
        <span class="text-xl font-bold">로그인</span>
        <div>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
        </div>
        <Button label="Cancel" class="p-3 w-full" @click="closeCallback"></Button>
      </div>
    </template>
  </Dialog>
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
  setTimeout(() => ui.start('#firebaseui-auth-container', uiConfig), 10);
});
</script>
