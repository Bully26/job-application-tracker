<template>
  <div class="text-black 0 w-[100%] h-screen p-20">
    <div
      id="resume"
      class="w-[100%] border-t-4 border-r-4 border-l-4 rounded-t-lg border-slate overflow-hidden"
    >
      <div id="notes" class="flex gap-0 justify-around sticky border-b-4 border-slate-300 bg-slate-200">
        <div
          class="w-[90%] p-4 bg-slate-200 text-4xl text-center "
        >
          Your files
        </div>
        <div
          class="p-4 bg-slate-200 pl-10 text-4xl  "
        >
          <Icon name="material-symbols:add" class="mr-5 h-[100%]" />
        </div>
      </div>
    </div>
    <div
      id="resume"
      class="w-[100%] h-[90%] border-b-4 border-r-4 border-l-4 rounded-b-lg"
    >
      <div class="flex gap-5 h-[100%] flex-wrap p-10 overflow-y-scroll">
        <div
          v-for="item in list"
          class="w-[15%] h-[25%] p-4  text-3xl overflow-x-scroll rounded-2xl border-2"
        >
          <div class="flex flex-col w-[100%] h-[100%] end-0">
            <div class="flex w-[100%] justify-end">
              <div>
            
                <Icon name="tdesign:delete-1-filled" class="bg-slate-400"/>
              </div>
            </div>
            <div class="w-[100%] h-full"></div>
            <div class=" text-center">
              Name
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = ref([
  1, 2, 3, 4, 5, 2, 2, 2, 1, 2, 3, 4, 5, 2, 2, 21, 2, 3, 4, 5, 2, 2, 2,
]);
</script>
<
