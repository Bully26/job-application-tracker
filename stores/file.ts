import { defineStore } from 'pinia'

export const usefileStore = defineStore('file', () => {
  const supabase = useSupabaseClient();
  const file = ref([]);


  const getfile = async (again:false) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }

    if (file.value.length > 0 && !again) {
      return file.value; // Iffile is already fetched, skip the request
    }

    const { data, error } = await supabase
      .storage
      .from('files') // replace with your actual bucket name
      .list(`${userid}/file`);

    if (error) {
      console.error('Error fetching file:', error);
      return;
    }

   file.value = data || [];
   return file.value;
  };

  const deletefile = async (fileName) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }
    const { data, error } = await supabase.storage.from('files').remove([`${userid}/file/${fileName}`]);
    if (error) {
      console.error('Error deletingfile:', error);
      return;
    }
   file.value =file.value.filter(file => file.name !== fileName); // Update the local state
  }

  const getfileUrl = async (fileName) => {

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    if (userError || !userid) {
      console.error('Error fetching user:', userError);
    }
    const { data: { signedUrl }, error } = await supabase.storage.from('files').createSignedUrl(`${userid}/file/${fileName}`, 120);
    if (error) {
      console.error('Error creating signed URL:', error);
      return;
    }
    return signedUrl;
  }

  const downloadFile = async (fileName: string) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    const filePath = `${userid}/file/${fileName}` // <- use passed-in fileName
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
    const filePath = `${userid}/file/${file.name}`
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
   file,
    getfile,
    deletefile,
    getfileUrl,
    downloadFile,uploadfile
  };
});
