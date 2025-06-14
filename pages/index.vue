<template>
  <div class="text-black z-10 bg-white w-[100%] h-full p-5">
    <div class="bg-white w-[100%] h-full">
      <div class="p-10 text-4xl border-b-10">
        Your Applications {{ searchKey }}
      </div>
      <div>
        <div class="flex justify-between text-2xl my-2 p-2">
          <div class="bg-slate-200 rounded-4xl p-2">
            <input
              type="text"
              class="bg-red focus:outline-none pl-5"
              v-model="searchKey"
              @click="clickedSearch"
            />
            <Icon
              name="material-symbols:search"
              size="lg"
              class="transform translate-y-1 -translate-x-2"
            />
          </div>
          <div>edit</div>
        </div>

        <div
          id="tableHeader"
          class="flex gap-1 w-[100%] bg-white justify-around border-b-2"
        >
          <div
            v-for="title in applicationFields"
            :style="{ width: getWidth(title.name) }"
            class="text-xl p-3 bg-white rounded-2xl mx-4 my-1 overflow-auto transform -translate-x-3"
          >
            <Icon :name="title.icon" class="align-middle" /> {{ title.name }}
          </div>
        </div>
        <div id="table data" class="overflow-auto h-200 text-xl">
          
          <draggable
            v-model="applicationsData"
            item-key="id"
            tag="ul"
            v-auto-animate
          >
            <template #item="{ element }">
              <li
                class="flex gap-1 w-[100%] bg-slate-100 justify-around  mb-2 rounded-3xl "
              >
                <div class="w-[15%] content-center">
                  {{ element.Company }}
                </div>
                <div class="w-[15%] content-center">
                  <div class="m-4 ml-0 p-2 rounded-2xl w-[70%"   :class="stage_color(element.Stage)" >
                    {{ element.Stage }}
                  </div>
                </div>
                <div class="w-[20%] content-center">
                  <div class="m-4 ml-0 p-2 rounded-2xl w-[70%]">
                    {{ element.Position }}
                  </div>
                </div>
                <div class="w-[15%] content-center">
                  {{ element.Deadline }}
                </div>
                <div class="w-[10%] content-center">
                  {{ element.Url }}
                </div>
                <div class="w-[15%] content-center">
                  {{ element.Resumelink }}
                </div>
              </li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";

let searchKey = ref("");
const searchedList = computed(() => {
  const search = searchKey.value.toLowerCase();
  return applicationsData.value.filter((app) => {
    return Object.values(app).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });
});

const applicationFields = ref([
  {
    name: "Company",
    icon: "mdi-domain",
  },
  {
    name: "Stage",
    icon: "mdi-flag-checkered",
  },
  {
    name: "Position",
    icon: "mdi-briefcase",
  },
  {
    name: "Deadline",
    icon: "mdi-calendar",
  },
  {
    name: "Url",
    icon: "mdi-link-variant",
  },
  {
    name: "Resumelink",
    icon: "mdi-file-document",
  },
]);
const applicationsData = ref([
  {
    id: 1,
    Company: "Apple",
    Stage: "Not Applied",
    Position: "Staff Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 2,
    Company: "Google",
    Stage: "Applied",
    Position: "Senior Product Manager",
    Deadline: "January 7, 2025",
    InterviewDate: "January 15, 2025",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 3,
    Company: "Cisco",
    Stage: "Interview",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "January 17, 2025",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 4,
    Company: "Netflix",
    Stage: "Rejected",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 5,
    Company: "Microsoft",
    Stage: "Rejected",
    Position: "Product Manager",
    Deadline: "January 9, 2025",
    InterviewDate: "January 11, 2025",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 6,
    Company: "Datadog",
    Stage: "Offered",
    Position: "Staff Product Manager",
    Deadline: "January 5, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 7,
    Company: "Samsara",
    Stage: "Interview",
    Position: "Product Manager",
    Deadline: "January 4, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 8,
    Company: "Databricks",
    Stage: "Waiting for a referral",
    Position: "Senior Product Manager",
    Deadline: "January 7, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 9,
    Company: "HP",
    Stage: "Rejected",
    Position: "Senior Product Manager",
    Deadline: "January 6, 2025",
    InterviewDate: "January 16, 2025",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 10,
    Company: "Meta",
    Stage: "Applied",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 11,
    Company: "Blind",
    Stage: "Rejected",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 12,
    Company: "Reddit",
    Stage: "Applied",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "January 11, 2025",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 13,
    Company: "AWS",
    Stage: "Rejected",
    Position: "Staff Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 14,
    Company: "Snowflake",
    Stage: "Rejected",
    Position: "Principal Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 15,
    Company: "TikTok",
    Stage: "Applied",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "No",
    Resumelink: "Resume Template",
  },
  {
    id: 16,
    Company: "Snap",
    Stage: "Waiting for a referral",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
  {
    id: 17,
    Company: "Block",
    Stage: "Rejected",
    Position: "Senior Product Manager",
    Deadline: "January 13, 2025",
    InterviewDate: "",
    Url: "linkedin.com/job",
    Referral: "Referred!",
    Resumelink: "Resume Template",
  },
]);

function getWidth(name) {
  const widthMap = {
    Company: "15%",
    Stage: "15%",
    Position: "20%",
    Deadline: "15%",
    Url: "10%",
    Resumelink: "15%",
  };

  return widthMap[name] || "10%";
}

function stage_color(stage) {
  const stageMap = {
    "Not Applied": "bg-red-500",
    Rejected: "bg-red-200",
    "Waiting for a referral": "bg-amber-200",
    Applied: "bg-green-200",
    Interview: "bg-blue-200",
    Offered: "bg-green-200",
  };

  return stageMap[stage] || "bg-text-black";
}
</script>
<!-- <ul v-auto-animate="{ duration: 500 }">
            <li
              v-for="data in searchedList"
              class="flex gap-1 w-[100%] bg-white justify-around border-b-2"
            >
              <div class="w-[15%] content-center">
                {{ data.Company }}
              </div>
              <div class="w-[15%] content-center">
                <div
                  class="m-4 ml-0 p-2 rounded-2xl w-[70%"
                  :class="stage_color(data.Stage)"
                >
                  {{ data.Stage }}
                </div>
              </div>
              <div class="w-[20%] content-center">
                <div class="m-4 ml-0 p-2 rounded-2xl w-[70%]">
                  {{ data.Position }}
                </div>
              </div>
              <div class="w-[15%] content-center">
                {{ data.Deadline }}
              </div>
              <div class="w-[10%] content-center">
                {{ data.Url }}
              </div>
              <div class="w-[15%] content-center">
                {{ data.Resumelink }}
              </div>
            </li>
          </ul> -->