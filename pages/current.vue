<template>
  <div class="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-6">
      <h1 class="text-3xl font-bold text-center">Auth Panel</h1>

      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex justify-between gap-4">
        <button @click="signup" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Sign Up
        </button>
        <button @click="login" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>

      <div v-if="msg" class="text-red-500 text-center font-medium">{{ msg }}</div>
    </div>

    <div class="bg-gray-800 p-6 mt-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
      <div class="text-center space-y-1">
        <div class="text-lg font-semibold">Logged in as:</div>
        <div class="text-white font-mono">{{ user?.email || 'Not logged in' }}</div>
        <div class="text-sm text-gray-400">User ID: {{ user?.id || '—' }}</div>
      </div>

      <div class="flex flex-col space-y-3">
        <button @click="refresh" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Refresh
        </button>
        <button @click="storefile" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Upload File
        </button>
        <input type="file" ref="fileInput" id="fileInput" class="w-full text-white bg-gray-700 px-4 py-2 rounded-lg" />

        <button @click="uploadfile" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          Upload Selected File
        </button>
        <button @click="signOut" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
          Sign Out
        </button>
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-2">User Main Table</h2>
        <pre class="bg-gray-700 p-4 rounded text-sm overflow-auto text-white">{{ resumeStore.resume  }}</pre>
      </div>

      <button @click="fileurlgen" class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
        fileurl
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">

const {supabase} = useSupabase();

const email = ref('');
const password = ref('');
const user = ref<any>(null);
const rows = ref<any>('not initialized');
const msg = ref('');
const user_dt=ref('');

onMounted(async () => {
  await refresh();
});

async function signup() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    msg.value = 'Signup error: ' + error.message;
  } else {
    msg.value = 'Signup successful!';
    await refresh();
  }
}

async function storefile() {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  const { data, error } = await supabase.from('user_file').insert({file_url: 'https://example.com/file.pdf', file_name: 'file.pdf',client_id:userData.user.id});

  if (error) {
    msg.value = 'File upload error: ' + error.message;
  } else {
    msg.value = 'File uploaded successfully!';
    console.log('File uploaded:', data);
  }
}

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    msg.value = 'Login error: ' + error.message;
  } else {
    msg.value = 'Login successful!';
    await refresh();
  }
}

async function refresh() {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    console.error("User not found or not logged in", authError);
    user.value = null;
    rows.value = 'Not logged in';
    return;
  }

  user.value = userData.user;

  const result = await supabase
    .from('user_application')
    .select('*');

  rows.value = result;
}

async function deleteUserMainRow() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error("User not logged in:", error?.message);
    return;
  }

  const uid = data.user.id;

  const { error: delError } = await supabase
    .from('user_main')
    .delete()
    .eq('client_id', uid);

  if (delError) {
    console.error("Error deleting from user_main:", delError.message);
    alert("Delete failed: " + delError.message);
  } else {
    console.log("Deleted user_main row successfully");
    alert("Your row in user_main has been deleted.");
    await refresh();
  }
}

async function fileurlgen() {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    console.error("User not found or not logged in", authError);
    return;
  }
  const urllink= await useResumeStore().getfileUrl("first.png");
  alert('File URL: ' + JSON.stringify(urllink));
}


// Set upload path: userId/folder/filename
async function uploadfile(){
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
const user = await supabase.auth.getUser();
const userId = user.data.user?.id;
const filePath = `${userId}/resume/${file.name}`;
const { data, error } = await supabase.storage
  .from('files')  // your bucket
  .upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
});
rows.value = filePath;
  if (error) {
    console.error('Upload error:', error);
    alert('Upload failed: ' + error.message);
  } else {
    console.log('File uploaded successfully:', data);
    alert('File uploaded successfully!');
  }

} 
async function signOut() {
  const { error } = await supabase.auth.signOut()
}

const resumeStore = useResumeStore()
onMounted(async () => {
  await resumeStore.getResume();
});

</script>
