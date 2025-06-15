<template>
  <div class="w-full min-h-screen white text-black">
    <div class="h-auto lg:h-[30vh] w-full bg-white pl-6">
      <div
        class="flex flex-col lg:flex-row h-full mt-10  m-3 rounded-2xl px-2"
      >
        <div
          class="w-full lg:w-[30%] h-auto  rounded-2xl p-4 m-2 flex flex-col items-center border-4"
        >
          <div class="overflow-hidden flex justify-center ">
            <img
              src="/public/image.png"
              class="w-40 h-40 object-contain rounded-[100%] border-4 "
            />
          </div>
          <div class="w-full p-4 text-2xl lg:text-4xl text-center">
            Priyanshu Pradhan
          </div>
          <div class="w-full p-1 text-lg lg:text-xl text-blue-500 text-center">
            priyahupradhan26@gmail.com
          </div>
        </div>

        <div
          class="w-full lg:w-[70%] p-2 flex flex-col  rounded-2xl m-2 border-4"
        >
          <div class="w-full flex-1 flex flex-col mb-2">
            <div class="text-2xl lg:text-4xl pl-2">About</div>
            <div class="p-2 text-lg lg:text-2xl overflow-y-auto flex-1 mt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Perferendis voluptatibus possimus labore dicta architecto sed
              eligendi, aut laboriosam sunt consequuntur iusto adipisci
              repellendus maiores vitae? Veniam adipisci labore non quis?
            </div>
          </div>
          <div class="w-full h-[100px] lg:h-[20%] p-2  mb-5">
            <div class="h-full w-full">
              <div class="flex gap-5 text-4xl text-black">
                <Icon name="mdi:face-man" class="bg-teal-500 size-12" />
                <Icon name="mdi:youtube" class="bg-red-500 size-12" />
                <Icon name="mdi:github" class="bg-slate-700 size-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[60%] m-4 px-10">
      <div
        class="flex  lg:flex-row gap-4 w-full h-[100%] pt-20 justify-around  rounded-3xl border-4"
      >
        <div class="w-[30%] h-[100%]  p-2 text-3xl ">
          <div class="max-w-sm   space-y-2 font-medium ">
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Applied</span>
              <span class="font-bold text-gray-800">12</span>
            </div>
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Rejected</span>
              <span class="font-bold text-red-600">4</span>
            </div>
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Interview</span>
              <span class="font-bold text-blue-600">3</span>
            </div>
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Offered</span>
              <span class="font-bold text-green-600">2</span>
            </div>
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Waiting</span>
              <span class="font-bold text-yellow-600">5</span>
            </div>
            <div
              class="flex justify-between items-center px-4 py-2 rounded-lg"
            >
              <span>Not Applied</span>
              <span class="font-bold text-gray-500">10</span>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-[55%] bg-white p-2 text-3xl">
          <DonutChart
            :data="donutData"
            :height="400"
            :radius="0"
            :type="'half'"
            :labels="marketShareLabels"
          >
            <div class="absolute text-center">
              <div class="font-semibold">Label</div>
              <div class="text-(--ui-text-muted)">2 seconds ago</div>
            </div>
          </DonutChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const donutData = ref([35, 25, 20, 15, 5]); // Percentages

const marketShareLabels = [
  { color: "#3b82f6" }, // Blue
  { color: "#22c55e" }, // Green
  { color: "#f59e0b" }, // Amber
  { color: "#a855f7" }, // Purple
  { color: "#06b6d4" }, // Cyan
];
</script>
