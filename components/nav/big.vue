<template>
    <div class="bg-white w-60 h-screen flex flex-col items-center text-black">
        <div id="title">
            <div>
                <Icon name="carbon:calendar" />
            </div>
            <div>
                <p>JOB</p>
                <p>APPLICATION</p>
                <p>TRACKER</p>
            </div>
    
        </div>
        <div class="flex flex-col gap-3 mt-15 ">
            <div v-for="item in dash">
                <div class="flex items-center gap-3 text-2xl bg-slate-200 py-4 px-8 rounded-2xl w-55 overflow-auto" :class="item.name=='Logout'?'start-end':''">
                   <Icon :name="item.icon" class="size-10 justify-self-start"/>
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const dash = ref([
  {
    name: "Profile",
    icon: "mdi-account",
    to: "/profile"
  },
  {
    name: "View",
    icon: "mdi-view-dashboard",
    to: "/dashboard"
  },
  {
    name: "Notes",
    icon: "mdi-note-multiple",
    to: "/notes"
  },
  {
    name: "Resume",
    icon: "mdi-file-account",
    to: "/resume"
  }
]);
</script>
