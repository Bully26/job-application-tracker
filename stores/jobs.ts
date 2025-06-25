import { defineStore } from "pinia";

export const useJobStore = defineStore('job',()=>{
        
         
      // just contain all the job applications 
   
      const applications = ref([]);

      // if empty then fetch from supabase
      async function fetchApplications(){
        console.log('job fetch called');
        const supabase = useSupabaseClient();

        if(applications.value.length>0)
        { 
          return applications.value;

        }else{
            const {data,error} = await supabase.from('user_application').select('company, stage, position, deadline, url, resume').order('order', { ascending: true });

            if(error)
            {
               console.log("ERROR IN FETCHING JOBS__",error);
               return [];
            }
            applications.value = data;
           

          }
         return applications.value;
      }

       async function addjob(jobobj){
        const supabase = useSupabaseClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        const userid = user?.id;
        jobobj.client_id=userid;

        const {data,error} = await supabase.from('user_application').insert(jobobj);

        if(error)
        {
          console.log("ERROR IN JOB ADDING",error);
          return;
        }
        applications.value.push(jobobj);
      }

      const deletejob = async (comp,pos)=>{
        const supabase = useSupabaseClient();
         const {data,error} = await supabase.from('user_application').delete().match({
           company:comp,
           position:pos
         });

         if(error)
         {
           console.log('error in deleting job',error);
           return;
         }

         applications.value= applications.value.filter((element)=>{
          return !(element.company==comp && element.position==pos);
         });
      }

      return {
       fetchApplications,applications, deletejob,addjob
      }
});

// const applications = ref([
//   {
//     id: 1,
//     company: 'Apple',
//     stage: 'Not Applied',
//     position: 'Staff Product Manager',
//     deadline: new Date('2025-01-13'),
//     url: 'https://linkedin.com',
//     resume: 'Resume Template'
//   },