<template>
  <div class="flex items-center">
    <div class="card mx-auto w-full max-w-5xl shadow-lg">
      <h2 class="mb-14 text-center text-2xl font-semibold">로그인</h2>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { auth } from '@/composables/firebase';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';

const uiConfig = {
  callbacks: {
    uiShown: () => {
      document.getElementById('loader')!.style.display = 'none';
    },
  },
  signInSuccessUrl: '/main', // 성공 시 리다이렉트 URL
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
