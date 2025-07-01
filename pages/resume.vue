<template>
  <div>
    <!-- Header -->
    
    <PageHeader title="Resume Management" description="Manage your resumes and track their performance"
      :icon="DocumentIcon">
      <template #actions>
        <div class="flex  space-x-3">
          <input id="fileInput" type="file" 
           class="cursor-pointer  border border-gray-300 text-gray-700 px-4 py-2 rounded-lg  transition-colors flex items-center bg-white"
            />
            <label 
           @click="upload"
          class="cursor-pointer  border border-gray-300 text-gray-700 px-4 py-2 rounded-lg  transition-colors flex items-center w-full bg-blue-200">
            <ArrowUpTrayIcon class="w-4 h-4 " />
          </label>
        </div>
      </template>
    </PageHeader>
    <div class="w-full text-xl text-red-500 text-center my-4 font-semibold" v-if="limitfile">
      Upgrade you plan to upload more resume
    </div>


    <!-- Resume List -->
    <ResumeList />

    <!-- Resume Tips -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Resume Tips</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Content Tips:</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Tailor your resume for each job application
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use action verbs and quantify achievements
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep it concise (1-2 pages max)
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Include relevant keywords from job descriptions
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Formatting Tips:</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use a clean, professional layout
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Ensure consistent formatting throughout
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Save as PDF to preserve formatting
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use readable fonts (10-12pt size)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { DocumentIcon, PlusIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatCard from '~/components/ui/StatCard.vue'
import ResumeList from '~/components/resume/ResumeList.vue'
import { get } from '@vueuse/core'
import { FoldHorizontal, TruckElectric, Upload } from 'lucide-vue-next'

const showUploadModal = ref(false)
const showCreateModal = ref(false)
const hasFile= ref(false);
const tap= ref(false);
const limitfile = ref(false);
const supabase = useSupabaseClient();

const plan=ref('');
const checkplan = async ()=>{
   const { data: { user }, error: userError } = await supabase.auth.getUser();
   const userid = user?.id;
   const {data,error} = await supabase.from('user_main').select('plan').eq('client_id',userid);
   plan.value=data[0].plan;
  
}
onMounted(async ()=>{
 await useResumeStore().getResume();
})

const files = computed(()=>{
  return useResumeStore().resume;
})

const filehandle= computed(() => {
  return !hasFile.value?'Click to upload':'Upload'
});

const upload = async () => {
    await checkplan();
    if(plan.value=='user' && files.value.length==2){
       limitfile.value=true;
       return;
    }
    else if(plan.value=='premium' && files.value.length==5){
        limitfile.value=true;
        return;
    }
    const input = document.getElementById('fileInput');
    const file = fileInput.files[0];
    await useResumeStore().uploadfile(file);
    await useResumeStore().getResume(true);
    fileInput.value = '';
};


</script>