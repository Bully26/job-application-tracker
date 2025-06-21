import { defineStore } from "pinia";

export const userProfileStore = defineStore("userprofile", () => {
  const userProfile = reactive({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
});
