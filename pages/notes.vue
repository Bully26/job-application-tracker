<template>
  <div>
    <!-- Header -->
    <PageHeader
      title="Notes"
      description="Keep track of your job search insights and ideas"
      :icon="DocumentTextIcon"
    >
      <template #actions>
      <button 
          @click="showCreateForm = true"
          class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          New Note
        </button>
      </template>
    </PageHeader>

    <!-- Search -->
    <div class="mb-6">
      <SearchInput 
        v-model="searchQuery" 
        placeholder="Search notes..." 
      />
    </div>

    <!-- Create Note Form -->
    <CreateNoteForm
      v-if="showCreateForm"
      @create="createNote"
      @cancel="cancelCreate"
    />
    <viewNote
    v-if="openNote && showview"
    :notedata="openNote"
    @cancel="cancelview"
    />

    <!-- Notes Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
        @click="showview=true;openNote=note;"
      />
    </div>

    <!-- Empty State -->
    <div v-if="notes.length === 0" class="text-center py-12">
      <DocumentTextIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
      <p class="text-gray-500 mb-4">Start by creating your first note to track insights and ideas.</p>
      <button 
        @click="showCreateForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Your First Note
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DocumentTextIcon, PlusIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import CreateNoteForm from '~/components/notes/CreateNoteForm.vue'
import viewNote from '~/components/notes/viewNote.vue'
import NoteCard from '~/components/notes/NoteCard.vue'


definePageMeta({
  layout:'default'
})

onMounted(async ()=>{
  await useNoteStore().fetchnote();
})

const notes = computed(()=>useNoteStore().note);
const showCreateForm = ref(false)
const showview=ref(false)
const searchQuery = ref('')
const openNote=ref('')



const filteredNotes = computed(() => {
  if (!searchQuery.value.trim()) return notes.value;

  const q = searchQuery.value.toLowerCase();

  return notes.value.filter(note => {
    const titleMatch = note.title?.toLowerCase().includes(q);
    const contentMatch = note.content?.toLowerCase().includes(q);
    const tagsMatch = note.tags?.toLowerCase().includes(q);

    return titleMatch || contentMatch || tagsMatch;
  });
});



const createNote = (noteData) => {
  const note = {
    id: notes.value.length + 1,
    ...noteData,
    updatedAt: new Date(),
    createdAt: new Date()
  }
  
  notes.value.unshift(note)
  cancelCreate()
}

const cancelCreate = () => {
  showCreateForm.value = false
}
const cancelview = () => {
  showview.value = false
}

const editNote = (note) => {
  console.log('Edit note:', note)
}

const deleteNote = (id) => {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.value = notes.value.filter(note => note.id !== id)
  }
}

const selectNote = (note) => {
  console.log('Select note:', note)
}
</script>