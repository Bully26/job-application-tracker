<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        
        <div class="flex items-center mb-2">
          <FolderIcon class="w-6 h-6 text-gray-600 mr-3" />
          <h1 class="text-2xl font-bold text-gray-900">Files </h1>
        </div>
        <p class="text-gray-600">Manage your documents and attachments</p>
      </div>
      <div class="flex  space-x-3">
        <input id="fileInput" type="file"
          class="cursor-pointer  border border-gray-300 text-gray-700 px-4 py-2 rounded-lg  transition-colors flex items-center bg-white" />
        <label @click="upload"
          class="cursor-pointer  border border-gray-300 text-gray-700 px-4 py-2 rounded-lg  transition-colors flex items-center w-full bg-blue-600">
          <ArrowUpTrayIcon class="w-4 h-4 text-white " />
        </label>
      </div>
    </div>
    <div class="w-full text-red-500 text-xl text-center my-4 font-semibold" v-if="limitfile">
      Upgrade your plan to upload more File.
    </div>
    <div class="mb-6">
      <SearchInput v-model="searchQuery" placeholder="Search applications..." />
    </div>
    
    


    <!-- File Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="file in searched" :key="file.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <component :is="getFileIcon(file.name).icon" :class="['w-8 h-8 ', getFileIcon(file.name).color]" />
            <div>
              <h3 class="font-medium text-gray-900 text-sm">{{ file.name }}</h3>
              <p class="text-xs text-gray-500">{{ file.size }}</p>
            </div>
          </div>
          <div class="flex space-x-1">
            <button class="text-gray-400 hover:text-gray-600 p-1" @click="download(file)">
              <ArrowDownTrayIcon class="w-4 h-4" />
            </button>
            <button @click="seefile(file)" class="text-gray-400 hover:text-gray-600 p-2">
              <EyeIcon class="w-4 h-4" />
            </button>
            <button class="text-gray-400 hover:text-red-600 p-1" @click="deletefile(file)">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="text-xs text-gray-500">
          Uploaded: {{ formatDate(file.uploadedAt) }}
        </div>
        <div class="text-xs text-gray-500">
          Size: {{ bytesToKB( file.metadata.size) }}
        </div>
        </div>
        
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="files.length === 0" class="text-center py-12">
      <FolderIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
      <p class="text-gray-500 mb-4">Upload your documents and keep them organized.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  FolderIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  DocumentArrowDownIcon,
  PresentationChartBarIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import SearchInput from '~/components/ui/SearchInput.vue'

const showUploadModal = ref(false)
const searchQuery = ref('');
const limitfile = ref(false);
const supabase = useSupabaseClient();
const plan=ref('');

onMounted(async () => {
  await usefileStore().getfile();
})
const files = computed(() => {
  return usefileStore().file;
})

const searched= computed(()=>{
  return files.value.filter(file =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

})
const checkplan = async ()=>{ 
   const { data: { user }, error: userError } = await supabase.auth.getUser();
   const userid = user?.id;
   const {data,error} = await supabase.from('user_main').select('plan').eq('client_id',userid);
   plan.value=data[0].plan;
  
}
const seefile = async (fileobj)=>{
  const url = await usefileStore().getfileUrl(fileobj.name);
  navigateTo(url,{external:true});
}

function bytesToKB(bytes) {
  const kb = bytes / 1024;
  return `${kb.toFixed(2)} kb`;
}


const deletefile = async (fileobj) => {
  await usefileStore().deletefile(fileobj.name);
}

const download = async (fileobj) => {
  await usefileStore().downloadFile(fileobj.name);
}
const upload = async () => {
    await checkplan();
    if(plan.value=='user' && files.value.length==3){
       limitfile.value=true;
       return;
    }
    else if(plan.value=='premium' && files.value.length==10){
        limitfile.value=true;
        return;
    }
    
    const input = document.getElementById('fileInput');
    const file = fileInput.files[0];
    await usefileStore().uploadfile(file);
    fileInput.value = '';
    await usefileStore().getfile(true);
};



const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();

  switch (ext) {
    case 'pdf':
      return { icon: DocumentTextIcon, color: 'text-red-600' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return { icon: PhotoIcon, color: 'text-yellow-600' };
    case 'mp4':
    case 'mov':
    case 'avi':
      return { icon: VideoCameraIcon, color: 'text-purple-600' };
    case 'zip':
    case 'rar':
      return { icon: ArchiveBoxIcon, color: 'text-gray-500' };
    case 'ppt':
    case 'pptx':
      return { icon: PresentationChartBarIcon, color: 'text-orange-600' };
    case 'doc':
    case 'docx':
      return { icon: DocumentIcon, color: 'text-blue-600' };
    case 'xls':
    case 'xlsx':
      return { icon: DocumentArrowDownIcon, color: 'text-green-600' };
    case 'js':
    case 'html':
    case 'css':
    case 'vue':
    case 'py':
      return { icon: CodeBracketIcon, color: 'text-indigo-600' };
    default:
      return { icon: ExclamationTriangleIcon, color: 'text-gray-400' };
  }
}
</script>