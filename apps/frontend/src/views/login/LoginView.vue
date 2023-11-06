<template>
  <div class="flex items-center">
    <div class="card mx-auto w-full max-w-5xl shadow-lg">
      <div class="py-24">
        <h2 class="mb-20 text-center text-2xl font-semibold">로그인</h2>
        <div id="firebaseui-auth-container"></div>
      </div>
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
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: function () {
    window.location.assign('<your-privacy-policy-url>');
  },
};

const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth);

onMounted(() => {
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>
