<template>
  <div class="p-8 max-w-2xl mx-auto space-y-6 bg-black">
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">Auth Panel</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 border rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-4 py-2 border rounded"/>

      <div class="flex space-x-4">
        <button @click="signup" class="bg-blue-600 text-fuchsia-600 px-4 py-2 rounded">Sign Up</button>
        <button @click="login" class="bg-green-600 text-fuchsia-600 px-4 py-2 rounded">Login</button>
      </div>
    </div>

    <div class="border-t pt-4 space-y-2">
      <div class="text-lg font-bold">Logged in as: {{ user?.email || 'Not logged in' }}</div>
      <div class="text-sm text-gray-600">User ID: {{ user?.id }}</div>

      <button @click="refresh" class="bg-blue-600 text-fuchsia-600 px-4 py-2 rounded">Refresh</button>
       <button @click="storefile" class="bg-green-600 text-fuchsia-600 px-4 py-2 rounded">fileup</button>

      <div class="mt-6">
        <h2 class="font-semibold text-xl mb-2">User Main Table</h2>
        <pre class="bg-gray-100 p-4 rounded text-sm">{{ rows }}</pre>
      </div>

      <button @click="deleteUserMainRow" class="bg-yellow-600 text-fuchsia-600 px-4 py-2 rounded">
        Delete My Row from user_main
      </button>
    </div>

    <div v-if="msg" class="text-red-600 font-medium">{{ msg }}</div>
  </div>
  <input type="file" ref="fileInput" id="fileInput" class="mt-4 bg-amber-300" />
  <button  @click="uploadfile">clicke me</button>
  <button   @click="signOut" class="bg-red-600">signOut</button>
</template>

<script setup lang="ts">

const {supabase} = useSupabase();

const email = ref('');
const password = ref('');
const user = ref<any>(null);
const rows = ref<any>('not initialized');
const msg = ref('');

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
definePageMeta({
  layout: false,

});
</script>
