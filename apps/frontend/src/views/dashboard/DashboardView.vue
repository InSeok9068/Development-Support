<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="justify-content-between mb-3 flex">
          <div>
            <span class="text-500 mb-3 block font-medium">Orders</span>
            <div class="text-900 text-xl font-medium">152</div>
          </div>
          <div
            class="align-items-center justify-content-center border-round flex bg-blue-100"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-xl text-blue-500" />
          </div>
        </div>
        <span class="font-medium text-green-500">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="justify-content-between mb-3 flex">
          <div>
            <span class="text-500 mb-3 block font-medium">Revenue</span>
            <div class="text-900 text-xl font-medium">$2.100</div>
          </div>
          <div
            class="align-items-center justify-content-center border-round flex bg-orange-100"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-xl text-orange-500" />
          </div>
        </div>
        <span class="font-medium text-green-500">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="justify-content-between mb-3 flex">
          <div>
            <span class="text-500 mb-3 block font-medium">Customers</span>
            <div class="text-900 text-xl font-medium">28441</div>
          </div>
          <div
            class="align-items-center justify-content-center border-round flex bg-cyan-100"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-xl text-cyan-500" />
          </div>
        </div>
        <span class="font-medium text-green-500">520 </span>
        <span class="text-500">newly registered</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="justify-content-between mb-3 flex">
          <div>
            <span class="text-500 mb-3 block font-medium">Comments</span>
            <div class="text-900 text-xl font-medium">152 Unread</div>
          </div>
          <div
            class="align-items-center justify-content-center border-round flex bg-purple-100"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-xl text-purple-500" />
          </div>
        </div>
        <span class="font-medium text-green-500">85 </span>
        <span class="text-500">responded</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Sales</h5>
        <DataTable :value="products" :rows="5" :paginator="true" responsive-layout="scroll">
          <Column style="width: 15%">
            <template #header> Image </template>
            <template #body="slotProps">
              <img
                :src="'demo/images/product/' + slotProps.data.image"
                :alt="slotProps.data.image"
                width="50"
                class="shadow-2"
              />
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="true" style="width: 35%" />
          <Column field="price" header="Price" :sortable="true" style="width: 35%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%">
            <template #header> View </template>
            <template #body>
              <Button icon="pi pi-search" type="button" class="p-button-text" />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="justify-content-between align-items-center mb-5 flex">
          <h5>Best Selling Products</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu2.toggle($event)"
            />
            <Menu ref="menu2" :popup="true" :model="items" />
          </div>
        </div>
        <ul class="m-0 list-none p-0">
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Space T-Shirt</span>
              <div class="text-600 mt-1">Clothing</div>
            </div>
            <div class="align-items-center mt-2 flex md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-orange-500" style="width: 50%" />
              </div>
              <span class="ml-3 font-medium text-orange-500">%50</span>
            </div>
          </li>
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Portal Sticker</span>
              <div class="text-600 mt-1">Accessories</div>
            </div>
            <div class="align-items-center ml-0 mt-2 flex md:ml-8 md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-cyan-500" style="width: 16%" />
              </div>
              <span class="ml-3 font-medium text-cyan-500">%16</span>
            </div>
          </li>
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Supernova Sticker</span>
              <div class="text-600 mt-1">Accessories</div>
            </div>
            <div class="align-items-center ml-0 mt-2 flex md:ml-8 md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-pink-500" style="width: 67%" />
              </div>
              <span class="ml-3 font-medium text-pink-500">%67</span>
            </div>
          </li>
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Wonders Notebook</span>
              <div class="text-600 mt-1">Office</div>
            </div>
            <div class="align-items-center ml-0 mt-2 flex md:ml-8 md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-green-500" style="width: 35%" />
              </div>
              <span class="ml-3 font-medium text-green-500">%35</span>
            </div>
          </li>
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Mat Black Case</span>
              <div class="text-600 mt-1">Accessories</div>
            </div>
            <div class="align-items-center ml-0 mt-2 flex md:ml-8 md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-purple-500" style="width: 75%" />
              </div>
              <span class="ml-3 font-medium text-purple-500">%75</span>
            </div>
          </li>
          <li class="flex-column md:align-items-center md:justify-content-between mb-4 flex md:flex-row">
            <div>
              <span class="text-900 mb-1 mr-2 font-medium md:mb-0">Robots T-Shirt</span>
              <div class="text-600 mt-1">Clothing</div>
            </div>
            <div class="align-items-center ml-0 mt-2 flex md:ml-8 md:mt-0">
              <div class="surface-300 border-round w-10rem lg:w-6rem overflow-hidden" style="height: 8px">
                <div class="h-full bg-teal-500" style="width: 40%" />
              </div>
              <span class="ml-3 font-medium text-teal-500">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Sales Overview</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="align-items-center justify-content-between mb-4 flex">
          <h5>Notifications</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"
            />
            <Menu ref="menu1" :popup="true" :model="items" />
          </div>
        </div>

        <span class="text-600 mb-3 block font-medium">TODAY</span>
        <ul class="mx-0 mb-4 mt-0 list-none p-0">
          <li class="align-items-center border-bottom-1 surface-border flex py-2">
            <div
              class="w-3rem h-3rem align-items-center justify-content-center border-circle mr-3 flex flex-shrink-0 bg-blue-100"
            >
              <i class="pi pi-dollar text-xl text-blue-500" />
            </div>
            <span class="text-900 line-height-3"
              >Richard Jones
              <span class="text-700">has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span>
            </span>
          </li>
          <li class="align-items-center flex py-2">
            <div
              class="w-3rem h-3rem align-items-center justify-content-center border-circle mr-3 flex flex-shrink-0 bg-orange-100"
            >
              <i class="pi pi-download text-xl text-orange-500" />
            </div>
            <span class="text-700 line-height-3"
              >Your request for withdrawal of <span class="font-medium text-blue-500">2500$</span> has been
              initiated.</span
            >
          </li>
        </ul>

        <span class="text-600 mb-3 block font-medium">YESTERDAY</span>
        <ul class="m-0 list-none p-0">
          <li class="align-items-center border-bottom-1 surface-border flex py-2">
            <div
              class="w-3rem h-3rem align-items-center justify-content-center border-circle mr-3 flex flex-shrink-0 bg-blue-100"
            >
              <i class="pi pi-dollar text-xl text-blue-500" />
            </div>
            <span class="text-900 line-height-3"
              >Keyser Wick
              <span class="text-700">has purchased a black jacket for <span class="text-blue-500">59$</span></span>
            </span>
          </li>
          <li class="align-items-center border-bottom-1 surface-border flex py-2">
            <div
              class="w-3rem h-3rem align-items-center justify-content-center border-circle mr-3 flex flex-shrink-0 bg-pink-100"
            >
              <i class="pi pi-question text-xl text-pink-500" />
            </div>
            <span class="text-900 line-height-3"
              >Jane Davis
              <span class="text-700">has posted a new questions about your product.</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { reactive, ref, watch } from 'vue';

const { isDarkTheme } = useLayout();

const products = ref(null);
const lineData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4,
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4,
    },
  ],
});
const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' },
]);
const lineOptions = ref(null);

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };
};

const applyDarkTheme = () => {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
      y: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)',
        },
      },
    },
  };
};

watch(
  isDarkTheme,
  (val) => {
    if (val) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  },
  { immediate: true },
);
</script>
