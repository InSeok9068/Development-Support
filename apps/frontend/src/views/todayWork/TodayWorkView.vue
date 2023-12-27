<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex flex-column gap-2">
          <label class="font-bold text-lg">오늘 무슨 일을 하셨나요?</label>
          <AutoComplete
            v-model="todayWorkInputArgs.title"
            class="flex-column"
            placeholder="제목"
            :suggestions="suggestionsArgs.suggestion"
            @complete="onCompleteSuggestions"
          />
        </div>
        <div class="mt-1"></div>
        <Textarea v-model="todayWorkInputArgs.content" class="col-12" auto-resize rows="5" placeholder="내용" />
        <div class="mt-3"></div>
        <Slider v-model="todayWorkInputArgs.time" class="w-auto mb-2" :min="1" :max="8" :step="1" />
        <div class="flex align-items-center justify-content-between flex-row">
          <span v-for="(item, index) in 8" :key="index">{{ item }}H</span>
        </div>
        <div class="mt-3"></div>
        <Button label="등록" @click.prevent.stop="onClickRegist()"></Button>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card flex align-items-center md:flex-row gap-2">
        <div class="flex">
          <Calendar
            v-model="todayWorkSearchArgs.date"
            show-icon
            date-format="yy-mm-dd"
            @date-select="works(todayWorkSearchArgs)"
          />
        </div>
        <div class="flex">
          <Button icon="pi pi-caret-left" @click.prevent.stop="onClickCalendarPre()" />
        </div>
        <div class="flex">
          <Button icon="pi pi-caret-right" @click.prevent.stop="onClickCalendarNext()" />
        </div>
        <div class="flex">
          <Button label="주간보고서 전송" @click.prevent.stop="onClickRegist()"></Button>
        </div>
      </div>
      <div class="card">
        <label class="font-bold text-lg block mb-2"> 오늘 한일 </label>
        <ul>
          <li
            v-for="(item, index) in todayWorkListArgs.item"
            :key="index"
            class="mb-2"
            @drop.prevent="onDrop($event, item.id)"
            @dragenter.prevent
            @dragover.prevent
          >
            <span class="text-lg font-bold">{{ `${item.title} ` }}</span>
            <span class="text-lg font-bold text-red-700">{{ `[${item.time}H]` }}</span>
            <ul>
              <li
                v-for="(subItem, subIndex) in item.subItem"
                :key="subIndex"
                draggable="true"
                @dragstart="onDragStart($event, subItem.id)"
              >
                {{ `${subIndex + 1}) ${subItem.content} [${subItem.time}H]` }}
                <Button
                  class="vertical-align-baseline"
                  icon="pi pi-eraser"
                  text
                  @click.prevent.stop="onClickItemRemove(subItem.id)"
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlugin } from '@/composables/plugin';
import { useTodayWork } from '@/composables/todayWork/today.work';
import type { CreateTodayWorkItemInput, UpdateTodayWorkItemForTransferInput } from '@support/shared/types';
import { onMounted } from 'vue';
const {
  todayWorkInputArgs,
  todayWorkListArgs,
  todayWorkSearchArgs,
  suggestionsArgs,
  createTodayWorkItem,
  deleteTodayWorkItem,
  updateTodayWorkItemForTransfer,
  sendWeeklyReport,
  suggestions,
  works,
} = useTodayWork();
const { $time } = usePlugin();

onMounted(() => works(todayWorkSearchArgs.value));

const onClickRegist = () => {
  createTodayWorkItem({
    title: todayWorkInputArgs.value.title,
    content: todayWorkInputArgs.value.content,
    time: todayWorkInputArgs.value.time,
    date: todayWorkSearchArgs.value.date,
  } as CreateTodayWorkItemInput);

  todayWorkInputArgsClear();
};

const onClickItemRemove = (subIndex: number) => {
  deleteTodayWorkItem(subIndex);
};

const onDragStart = (event: DragEvent, id: number) => {
  event.dataTransfer?.setData('text', String(id));
};

const onDrop = (event: DragEvent, id: number) => {
  updateTodayWorkItemForTransfer({
    id: String(id),
    itemId: event.dataTransfer?.getData('text'),
  } as UpdateTodayWorkItemForTransferInput);
};

const onSendWeeklyReport = () => {
  sendWeeklyReport();
};

const onCompleteSuggestions = async (event: any) => {
  await suggestions(event.query);
};

const onClickCalendarPre = () => {
  todayWorkSearchArgs.value.date = $time.minusTime(todayWorkSearchArgs.value.date, 1, 'day', 'YYYY-MM-DD');
  works(todayWorkSearchArgs.value);
};

const onClickCalendarNext = () => {
  todayWorkSearchArgs.value.date = $time.plusTime(todayWorkSearchArgs.value.date, 1, 'day', 'YYYY-MM-DD');
  works(todayWorkSearchArgs.value);
};

const todayWorkInputArgsClear = () => {
  todayWorkInputArgs.value = {
    title: '',
    content: '',
    time: 1,
  };
};
</script>
