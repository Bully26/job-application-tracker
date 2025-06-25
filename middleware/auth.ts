

export default defineNuxtRouteMiddleware(async (to,from) => {
    const supabase = useSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
        console.error("Error fetching session:", error);
        return navigateTo('/');
    }
    
})
