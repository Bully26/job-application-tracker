<template>
  <div class="text-black z-10 bg-white w-[100%] h-full p-5">
    <div class="bg-white w-[100%] h-full">
      <div class="p-5 text-4xl border-b-10">Your Applications</div>
      <div>
        <div class="flex justify-between text-2xl my-2 p-2">
          <div class="bg-slate-200 rounded-4xl p-2">
            <input
              type="text"
              class="bg-red focus:outline-none pl-5"
              v-model="searchKey"
            />
            <Icon
              name="material-symbols:search"
              size="lg"
              class="transform translate-y-1 -translate-x-2"
            />
          </div>
        </div>

        <div
          id="tableHeader"
          class="flex gap-1 w-[100%] bg-white justify-around border-b-2"
        >
          <div
            v-for="title in applicationFields"
            :style="{ width: getWidth(title.name) }"
            class="text-xl p-3 bg-white rounded-2xl mx-4 my-1 overflow-auto transform -translate-x-3"
          >
            <Icon :name="title.icon" class="align-middle" /> {{ title.name }}
          </div>
        </div>
        <div id="table data" class="overflow-auto h-200 text-xl">
          <draggable
            v-if="searchKey == ''"
            v-model="listStaticView"
            item-key="id"
            tag="ul"
            v-auto-animate
          >
            <template #item="{ element }">
              <li
                class="flex gap-1 w-[100%] bg-slate-100 justify-around mb-2 rounded-3xl h-20"
              >
                <div
                  class="w-[15%] content-center overoverflow-x-auto whitespace-nowrap"
                >
                  {{ element.Company }}
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                    :class="stage_color(element.Stage)"
                  >
                    {{ element.Stage }}
                  </div>
                </div>
                <div class="w-[20%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Position }}
                  </div>
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Deadline }}
                  </div>
                </div>
                <div class="w-[10%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Url }}
                  </div>
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Resumelink }}
                  </div>
                </div>
                <div class="absolute z-10 end-0 self-center">
                  <Icon
                    name="simple-line-icons:options-vertical"
                    class="transform -translate-x-6 size-6 bg-slate-500"
                    @click="showModal = element"
                  />
                  <Teleport to="body">
                    <modal
                      :show="showModal == element"
                      @close="closeModal()"
                      :mdata="element"
                    >
                    </modal>
                  </Teleport>
                </div>
              </li>
            </template>
          </draggable>
          <draggable
            v-if="searchKey != ''"
            v-model="searchedList"
            item-key="id"
            tag="ul"
            v-auto-animate
          >
            <template #item="{ element }">
              <li
                class="flex gap-1 w-[100%] bg-slate-100 justify-around mb-2 rounded-3xl h-20"
              >
                <div
                  class="w-[15%] content-center overoverflow-x-auto whitespace-nowrap"
                >
                  {{ element.Company }}
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                    :class="stage_color(element.Stage)"
                  >
                    {{ element.Stage }}
                  </div>
                </div>
                <div class="w-[20%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Position }}
                  </div>
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Deadline }}
                  </div>
                </div>
                <div class="w-[10%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Url }}
                  </div>
                </div>
                <div class="w-[15%] content-center">
                  <div
                    class="m-4 ml-0 p-2 rounded-2xl w-[70%] overflow-x-auto whitespace-nowrap"
                  >
                    {{ element.Resumelink }}
                  </div>
                </div>
                <div class="absolute z-10 end-0 self-center">
                  <Icon
                    name="simple-line-icons:options-vertical"
                    class="transform -translate-x-6 size-6 bg-slate-500"
                    @click="showModal=element"
                  />
                  <Teleport to="body">
                    <modal
                      :show="showModal == element"
                      @close="closeModal()"
                      :mdata="element"

                    >
                    </modal>
                  </Teleport>
                </div>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { useUserStore } from "~/stores/user";

let searchKey = ref("");
let showModal = ref(null);

function open_modal(val) {
  showModal = val;
}


function closeModal() {
    alert('object copied');
    showModal.value = null;
    listStaticView.value = [...applicationsData.value];
   
}

const searchedList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return applicationsData.value.filter((app) => {
    return Object.values(app).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });
});

function retval() {
  if (searchKey != "") return searchedList;
  else return applicationsData;
}
function at() {
  alert("edit option clicked");
}

function setbye(){
       useUserStore().list = useUserStore().list.filter(
        (app) => app.Company !== 'Apple'
      );
  };

const search = ref(true);

const applicationFields = ref([
  {
    name: "Company",
    icon: "mdi-domain",
  },
  {
    name: "Stage",
    icon: "mdi-flag-checkered",
  },
  {
    name: "Position",
    icon: "mdi-briefcase",
  },
  {
    name: "Deadline",
    icon: "mdi-calendar",
  },
  {
    name: "Url",
    icon: "mdi-link-variant",
  },
  {
    name: "Resumelink",
    icon: "mdi-file-document",
  },
]);




const applicationsData = computed(() => useUserStore().list);
const listStaticView = ref([...applicationsData.value]);

function getWidth(name) {
  const widthMap = {
    Company: "15%",
    Stage: "15%",
    Position: "20%",
    Deadline: "15%",
    Url: "10%",
    Resumelink: "15%",
  };

  return widthMap[name] || "10%";
}

function clickedSearch() {}

function stage_color(stage) {
  const stageMap = {
    "Not Applied": "bg-red-500",
    Rejected: "bg-red-200",
    "Waiting for a referral": "bg-amber-200",
    Applied: "bg-green-200",
    Interview: "bg-blue-200",
    Offered: "bg-green-200",
  };

  return stageMap[stage] || "bg-text-black";
}
</script>
<!-- <ul v-auto-animate="{ duration: 500 }">
            <li
              v-for="data in searchedList"
              class="flex gap-1 w-[100%] bg-white justify-around border-b-2"
            >
              <div class="w-[15%] content-center">
                {{ data.Company }}
              </div>
              <div class="w-[15%] content-center">
                <div
                  class="m-4 ml-0 p-2 rounded-2xl w-[70%"
                  :class="stage_color(data.Stage)"
                >
                  {{ data.Stage }}
                </div>
              </div>
              <div class="w-[20%] content-center">
                <div class="m-4 ml-0 p-2 rounded-2xl w-[70%]">
                  {{ data.Position }}
                </div>
              </div>
              <div class="w-[15%] content-center">
                {{ data.Deadline }}
              </div>
              <div class="w-[10%] content-center">
                {{ data.Url }}
              </div>
              <div class="w-[15%] content-center">
                {{ data.Resumelink }}
              </div>
            </li>
          </ul> -->
