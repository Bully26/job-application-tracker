import { defineStore } from "pinia";

export const useJobStore = defineStore('job', () => {


  // just contain all the job applications 

  const applications = ref([]);

  // if empty then fetch from supabase
  async function fetchApplications() {
    console.log('job fetch called');
    const supabase = useSupabaseClient();

    if (applications.value.length > 0) {
      return applications.value;

    } else {
      const { data, error } = await supabase.from('user_application').select('company, stage, position, deadline, url, resume').order('order', { ascending: true });

      if (error) {
        console.log("ERROR IN FETCHING JOBS__", error);
        return [];
      }
      applications.value = data;


    }
    return applications.value;
  }

  async function addjob(jobobj) {
    const supabase = useSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;
    jobobj.client_id = userid;

    const { data, error } = await supabase.from('user_application').insert(jobobj);

    if (error) {
      console.log("ERROR IN JOB ADDING", error);
      return;
    }
    applications.value.push(jobobj);
  }

  async function editjob(newobj, prevobj) {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase.from('user_application').update(
      newobj
    ).match({
      company: prevobj.company,
      position: prevobj.position
    });

    if (error) {
      console.log("error in updating");
    }
    const index = applications.value.findIndex(obj => obj === prevobj);
    if (index !== -1) {
      applications.value[index] = newobj;
    }
  }

  const deletejob = async (comp, pos) => {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase.from('user_application').delete().match({
      company: comp,
      position: pos
    });

    if (error) {
      console.log('error in deleting job', error);
      return;
    }

    applications.value = applications.value.filter((element) => {
      return !(element.company == comp && element.position == pos);
    });
  }

  const savePos = async () => {
    let index = 1;
    let payload = [];
    const supabase = useSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    const userid = user?.id;

    applications.value.forEach(ele => {
      ele.order = index;
      payload.push({
        company: ele.company,
        position: ele.position,
        order: ele.order,
        client_id:userid
      })
      index += 1;
    });

   
    

    const { data, error } = await supabase.from('user_application')
      .upsert(payload,{ onConflict: ['position', 'company'],updateColumns: ['order'] });

    if (error) {
      console.log("error in updating position");
       console.log(payload);
      return;
    }
    console.log("updating position");
    console.log(payload);
  }

  return {
    fetchApplications, applications, deletejob, addjob, editjob, savePos
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