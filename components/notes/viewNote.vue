<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <form @submit.prevent>
      <div class="space-y-4">
        <div>
          <input v-model="form.title" type="text" placeholder="Note title..."
            class="w-full px-3 py-2  rounded-lg  outline-none focus:outline-none focus:border-none text-3xl text-500 font-semibold"
           >
            <div class="text-red-500 mt-1 ml-1" v-if="form.title=='' && oncesubmit">
              required
            </div>
        </div>
        <div>
          <textarea v-model="form.content" placeholder="Write your note content here..." rows="4"
            class="w-full px-3 py-2  rounded-lg  outline-none focus:outline-none focus:border-none text-xl"
          ></textarea>
             <div class="text-red-500 mt-1 ml-1"
             v-if="form.content=='' && oncesubmit"
             >
              required
            </div>
        </div>
        <div>
          <input v-model="form.tags" type="text" placeholder="Tags (comma separated)..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div class="flex space-x-3">
          <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            @click="handleSubmit">
            Save Note
          </button>
          <button type="button" @click="$emit('cancel')"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { Redo } from 'lucide-vue-next'
import { reactive } from 'vue'

const supabase = useSupabaseClient();

const props = defineProps({
  notedata:{
    type:JSON,
    require:true
  }
})
const form = reactive({...props.notedata});

const note = ref("x");
const oncesubmit = ref(false);

const emit = defineEmits(['create', 'cancel'])

const handleSubmit = async () => {
  if (!form.title.trim() || !form.content.trim()) {
    oncesubmit.value=true;
    return; 
  }
  emit('cancel');
  await useNoteStore().updatenote(form,props.notedata);
}
</script>