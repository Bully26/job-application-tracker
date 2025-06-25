import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', () => {
  const supabase = useSupabaseClient();
  const resume = ref([]);


  const getResume = async (again) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }

    if (resume.value.length > 0 && !again) {
      return resume.value; // If resume is already fetched, skip the request
    }

    const { data, error } = await supabase
      .storage
      .from('files') // replace with your actual bucket name
      .list(`${userid}/resume`, {
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) {
      console.error('Error fetching resume:', error);
      return;
    }

    resume.value = data || [];
    return resume.value;
  };

  const deleteResume = async (fileName) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }
    const { data, error } = await supabase.storage.from('files').remove([`${userid}/resume/${fileName}`]);
    if (error) {
      console.error('Error deleting resume:', error);
      return;
    }
    resume.value = resume.value.filter(file => file.name !== fileName); // Update the local state
  }

  const getfileUrl = async (fileName) => {

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }
    const { data: { signedUrl }, error } = await supabase.storage.from('files').createSignedUrl(`${userid}/resume/${fileName}`, 120);
    if (error) {
      console.error('Error creating signed URL:', error);
      return;
    }
    return signedUrl;
  }

  const downloadFile = async (fileName: string) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    const filePath = `${userid}/resume/${fileName}` // <- use passed-in fileName
    const { data: fileBlob, error: downloadError } = await supabase.storage.from('files').download(filePath)

  if (downloadError || !fileBlob) {
    console.error(' Failed to download file:', downloadError?.message)
    return
  }

    const blobUrl = URL.createObjectURL(fileBlob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filePath.split('/').pop() || 'download'
    document.body.appendChild(a) 
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)  
  }

  const uploadfile = async (file:File)=>{
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    const filePath = `${userid}/resume/${file.name}`
    const {data,error} = await supabase.storage.from('files').upload(filePath,file,{
       cacheControl: '3600',
         upsert: false,
    })
    if(error)
    {
      console.log("ERROR IN UPLOADING FILE",error);
    }
  }

  return {
    resume,
    getResume,
    deleteResume,
    getfileUrl,
    downloadFile,uploadfile
  };
});
