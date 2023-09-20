<template>
  <div class="form-control join w-1/2">
    <label class="label">
      <span class="label-text">오늘 무슨 일을 하셨나요?</span>
    </label>
    <input v-model="todayWorkInputArgs.title" class="input input-bordered w-1/2" type="text" placeholder="제목" />
    <div class="mt-1"></div>
    <textarea
      v-model="todayWorkInputArgs.content"
      class="textarea textarea-bordered w-1/2"
      placeholder="내용"
    ></textarea>
    <div class="mt-3"></div>
    <input v-model="todayWorkInputArgs.time" type="range" min="1" max="8" class="range range-info w-1/2" step="1" />
    <div class="flex w-1/2 justify-between px-2 text-xs">
      <span v-for="(item, index) in 8" :key="index">{{ item }}</span>
    </div>
    <div class="mt-3"></div>
    <button class="btn btn-primary w-1/3" @click.prevent.stop="onClickRegist()">등록</button>
  </div>
  <div class="form-control join w-1/2">
    <div>
      <b class="text-2xl">오늘 한일</b>
      <input
        v-model="todayWorkSearchArgs.date"
        type="date"
        class="m-2 w-min border border-black pl-1"
        @change="works(todayWorkSearchArgs)"
      />
    </div>
    <div class="mt-1"></div>
    <ul>
      <li v-for="(item, index) in todayWorkListArgs.item" :key="index" class="mb-2">
        <p class="text-lg">- {{ item.title }}</p>
        <ul class="ml-3">
          <li v-for="(subItem, subIndex) in item.subItem" :key="subIndex">
            {{ `${subIndex + 1}) ${subItem.content}` }}
            <button class="btn btn-square btn-ghost" @click.prevent.stop="onClickItemRemove(subItem.id)">
              <TrashIcon />
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TrashIcon from '@/components/icon/TrashIcon.vue';
import { useTodayWork } from '@/composables/todayWork/today.work';
import { onMounted } from 'vue';
const { todayWorkInputArgs, todayWorkListArgs, todayWorkSearchArgs, createTodayWorkItem, deleteTodayWorkItem, works } =
  useTodayWork();

onMounted(() => works(todayWorkSearchArgs.value));

const onClickRegist = () => {
  createTodayWorkItem({
    title: todayWorkInputArgs.value.title,
    content: todayWorkInputArgs.value.content,
    time: String(todayWorkInputArgs.value.time),
  });

  todayWorkInputArgsClear();
};

const onClickItemRemove = (subIndex: number) => {
  deleteTodayWorkItem(subIndex);
};

const todayWorkInputArgsClear = () => {
  todayWorkInputArgs.value = {
    title: '',
    content: '',
    time: 1,
  };
};
</script>
