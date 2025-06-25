// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSupabase } from "@/composables/useSupabase"; // Adjust path if needed

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    if (profile.value) return profile.value;

    loading.value = true;
    const { supabase } = useSupabase();
    const { data, error: fetchError } = await supabase
      .from("user_profile")
      .select("*")
      .single();

    if (fetchError) {
      error.value = fetchError;
      console.error("Error fetching profile:", fetchError.message);
    } else {
      profile.value = {
        name: data.name || "your name",
        title: data.status || "your title",
        email: data.email || "your email",
        phone: data.phone || "your phone",
        location: data.location || "your location",
        bio: data.description || "your bio",
        linkedin: data.links?.linkedin || "your linkedin",
      };
    }

    loading.value = false;
    return profile.value;
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
  };
});
