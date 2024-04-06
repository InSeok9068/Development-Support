<template>
  <Dialog v-model:visible="visible" modal>
    <template #container="{ closeCallback }">
      <div class="flex-column align-items-center flex gap-2 bg-white p-5">
        <span class="text-xl font-bold">로그인</span>
        <div>
          <div id="firebaseui-auth-container" class="w-20rem md:w-25rem" />
        </div>
        <Button
          label="Cancel"
          class="w-full p-3"
          @click="$navi.newsletter($router).newsletter().go() && closeCallback"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { auth } from '@/composables/firebase';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onMounted, ref } from 'vue';
const visible = ref(true);

const uiConfig = {
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
  setTimeout(() => ui.start('#firebaseui-auth-container', uiConfig), 1);
});
</script>
