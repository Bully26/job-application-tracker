<script setup>
import { useUserStore } from "~/stores/user";

const props = defineProps({
  show: Boolean,
  mdata: Object,
});
const emit = defineEmits(["close", "save"]);

const data = ref({ ...props.mdata });

function format_date(input) {
  const date = new Date(input);
  const formatted = date.toISOString().split("T")[0];
  return formatted;
}

function del() {
  try {
    useUserStore().del(data.value);
  } catch (err) {
    console.log(err);
  }

  emit("close");
}
function save() {
  useUserStore().replace(data.value, props.mdata);
  emit("close");
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask w-[100%] h-[100%]">
      <div class="modal-container h-[90%] w-[50%] bg-slate-700">
        <div
          class="h-full w-full bg-slate-100 p-6 rounded-2xl flex flex-col space-y-4 overflow-hidden"
        >
          <h2 class="text-2xl font-semibold text-gray-800 flex justify-between">
            Current Application Form
            <div @click="$emit('close')">
              <Icon name="material-symbols:close" />
            </div>
          </h2>

          <div class="flex-1 overflow-y-auto space-y-4 pr-1">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Company</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
                v-model="data.Company"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Stage {{ data.Stage }}</label
              >
              <select
                v-model="data.Stage"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
              >
                <option value="Applied">Applied</option>
                <option value="Not Applied">Not Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offered">Offered</option>
                <option value="Waiting for a referral">
                  Waiting for a referral
                </option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Position</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
                v-model="data.Position"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Deadline</label
              >
              <input
                type="date"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
                v-model="data.Deadline"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Job URL</label
              >
              <input
                type="url"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
                v-model="data.Url"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Resume Link</label
              >
              <input
                type="url"
                class="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-200 text-slate-800"
                v-model="data.Resumelink"
              />
            </div>
          </div>

          <div class="pt-4 flex justify-end space-x-4">
            <button
              class="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              @click="del"
            >
              Delete
            </button>
            <button
              class="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              @click="save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
