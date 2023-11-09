<template>
  <div class="mx-auto h-screen w-full p-5">
    <div class="dropdown dropdown-end float-right">
      <label tabindex="0" class="btn btn-accent m-1">프로필</label>
      <ul tabindex="0" class="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
        <li v-show="!certified"><a @click.prevent.stop="onClickLogin()">로그인</a></li>
        <li><a @click.prevent.stop="onClickLogout()">로그아웃</a></li>
      </ul>
    </div>
    <div class="flex space-x-4">
      <AppCard v-for="(item, index) in cardArgsList" :key="index" v-model="cardArgsList[index]" />
    </div>
    <div class="divider"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
  <footer class="footer footer-center absolute bottom-0 bg-base-300 p-4 text-base-content">
    <aside>
      <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
import AppCard from '@/components/app/AppCard.vue';
import { useAuth } from '@/composables/auth';
import { auth } from '@/composables/firebase';
import { usePlugin } from '@/composables/plugin';
import type { UiCardArgs } from '@/ui/common.ui';
import { useRouter } from 'vue-router';
const { certified } = useAuth();
const router = useRouter();
const { $navi } = usePlugin();
const cardArgsList: UiCardArgs[] = [
  {
    title: '메인',
    move: () => $navi.main(router).main().go(),
  },
  {
    title: '오늘 한일',
    move: () => $navi.todayWork(router).todayWork().go(),
  },
  {
    title: '대시보드',
    move: () => $navi.dashboard(router).dashboard().go(),
  },
  {
    title: '기술 스펙',
    move: () => $navi.techSpec(router).techSpec().go(),
  },
];

auth.onAuthStateChanged((user) => (certified.value = !!user));

const onClickLogin = () => $navi.login(router).login().go();
const onClickLogout = async () => {
  await auth.signOut();
  $navi.login(router).login().go();
};
</script>
