<template>
  <div class="flex flex-col">
    <!-- Header -->
    <PageHeader
      title="Calendar"
      description="Schedule and track your interviews and deadlines"
      :icon="CalendarIcon"
    >
    
    </PageHeader>

     <div style="height: 800px;">
    <vue-cal
      style="height: 100%;"
      default-view="month"
      :events="jobevent"
      event-overlap-mode="stack"
      hide-view-selector
      class="vuecal"
      @event-click="onEventClick"
      :views="['month']"
      :theme="false"
      hide-navigation
    />
  </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'


const events = [
  {
    start: '2025-07-01',
    end: '2025-07-01',
    title: 'Google Internship Deadline',
    content: 'Submit resume & cover letter',
    class: 'deadline-event'
  },
  {
    start: '2025-07-10',
    end: '2025-07-10',
    title: 'Microsoft SDE Assessment',
    content: 'Complete assessment',
    class: 'deadline-event green-event'
  },
  {
    start: '2025-07-10',
    end: '2025-07-10',
    title: 'Microsoft Assessment',
    content: 'Technical round',
    class: 'deadline-event red-event'
  },
  {
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    id: 'event-1',
    title: 'Meeting with Alice',
    draggable: true,
    resizable: true,
    deletable: true,
    allDay: false,
    recurring: { frequency: 'week', amount: 1, start: new Date() },
    class: 'meeting'
  }
]

const jobdata = ref([]);

onMounted(async ()=>{
  const fetched = await useJobStore().fetchApplications();
  jobdata.value = [...fetched].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
})

watch(()=>useJobStore().applications,async ()=>{
  const fetched = await useJobStore().fetchApplications();
  jobdata.value = [...fetched].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
})

const jobevent = computed(()=>{
  
  let ary= [];

  let index=0;

   // dates.sort((a, b) => new Date(a) - new Date(b));
  jobdata.value.forEach(element => {
    //   start: '2025-07-10',
    // end: '2025-07-10',
    // title: 'Microsoft Assessment',
    // content: 'Technical round',
    // class: 'deadline-event red-event'
   
    let obj ={};
    obj.start= element.deadline ;
    obj.end  =element.deadline ;
    obj.title=element.company.toUpperCase();
    obj.content=element.position;
    obj.class= index%2==0?'deadline-event green-event':'deadline-event red-event';
    index+=1;
    ary.push(obj);
  });

  return ary;
})


</script>

<style>
.vuecal {
  --vuecal-primary-color: #f32929;
  --vuecal-secondary-color: #2e2e2e;
  --vuecal-base-color: #ffffff;
  --vuecal-contrast-color: #000000;
  --vuecal-border-color: color-mix(in srgb, var(--vuecal-base-color) 8%, transparent);
  --vuecal-header-color: var(--vuecal-base-color);
  --vuecal-event-color: var(--vuecal-base-color);
  --vuecal-event-border-color: currentColor;
  --vuecal-border-radius: 6px;
  --vuecal-height: 500px;
  --vuecal-min-schedule-width: 0px;
  --vuecal-min-cell-width: 0px;
  --vuecal-transition-duration: 0.25s;
}

/* Day number styling */
.vuecal__cell-date {
  position: absolute;
  bottom: 6px;
  right: 6px;
  font-size: 0.75rem;
  color: #aaa;
}

/* Cell padding */
.vuecal__cell {
  position: relative;
  padding: 6px;
}

/* Main event appearance */
.vuecal__event {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 2px;
  padding: 2px 4px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
  color: #000000;
}

/* Event colors */
.deadline-event {
  background-color: #ffb2b0;
}

.deadline-event.green-event {
  background-color: rgb(79, 255, 79);
  
}

.deadline-event.red-event {
  background-color: rgb(255, 86, 86);
}

.meeting {
  background-color: #0113ad;
}

/* "1" badge count styling */
.vuecal__cell-events-count {
  background-color: #ff0000 ;
  color: white ;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 40px;
  min-height: 24px;
  text-align: center;
  line-height: 1.2;
  display: inline-block;
}
</style>
