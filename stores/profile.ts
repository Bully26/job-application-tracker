// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useSupabase } from "@/composables/useSupabase"; // Adjust path if needed

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProfile = async (again) => {
    if (profile.value && !again) return profile.value;

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
        linkedin: data.links || "your linkedin",
      };
    }

    loading.value = false;
    return profile.value;
  };

  const saveProfile= async (form)=>{
      const { supabase } = useSupabase();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      const userid = user?.id;
      const { data, error: fetchError } = await supabase
      .from("user_profile")
      .upsert({
        client_id: userid,
        name:form.name,
        status:form.title,
        email:form.email,
        phone:form.phone,
        location:form.location,
        description:form.description,
        links:form.linkedin

      });
      
      if(error)
      {
        console.log('error  while editing profile',error);
        return;
      }
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    saveProfile
  };
});
