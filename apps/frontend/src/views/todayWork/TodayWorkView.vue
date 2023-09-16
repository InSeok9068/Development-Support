<template>
  <div class="form-control join w-1/2">
    <label class="label">
      <span class="label-text">오늘 무슨 일을 하셨나요?</span>
    </label>
    <input v-model="todayWorkInputArgs.title" class="input input-bordered w-1/2" type="text" placeholder="제목" />
    <div class="mt-1"></div>
    <textarea v-model="todayWorkInputArgs.desc" class="textarea textarea-bordered w-1/2" placeholder="내용"></textarea>
    <div class="mt-3"></div>
    <button class="btn btn-primary float-right w-1/3" @click.prevent.stop="onClickRegist()">등록</button>
  </div>
  <div class="form-control join w-1/2">
    <b>오늘 한일</b>
    <div class="mt-1"></div>
    <ul>
      <li v-for="(item, index) in todayWorkListArgs.item" :key="index">
        - {{ item.title }}
        <ul class="ml-3">
          <li v-for="(subItem, subIndex) in item.subItem" :key="subIndex">* {{ subItem.desc }}</li>
        </ul>
        <button class="btn btn-square btn-ghost" @click.prevent.stop="onClickItemRemove(index)">
          <svg
            class="w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodayWork } from '@/composables/todayWork/today.work';
const { todayWorkInputArgs, todayWorkListArgs, createTodayWorkItem, works } = useTodayWork();

const onClickRegist = () => {
  createTodayWorkItem({
    title: todayWorkInputArgs.value.title,
    content: todayWorkInputArgs.value.desc,
  });
};

const onClickItemRemove = (removeIndex: number) => {
  todayWorkListArgs.value.item = todayWorkListArgs.value.item.filter((_, index) => index !== removeIndex);
};
</script>
