import { defineStore } from "pinia";

export const useNoteStore = defineStore('notes', () => {

    const supabase = useSupabaseClient();
    const note = ref([]);


    const fetchnote = async (again: false) => {
        if (note.value.length > 0 && !again) {
            return note.value; // note is already fetched, skip the request
        }

        const { data, error } = await supabase.from('user_note').select('*');

        if (error) {
            console.log('error in detching notes!!');
            return note.value;
        }
        note.value = data;
        return note.value;
    }

    const updatenote = async (newobj, oldobj) => {
        const { data, error } = await supabase.from('user_note').update(
            newobj
        ).eq('id',oldobj.id);
        if (error) {
            console.log('error in updating note');
        }
        const index = note.value.findIndex(obj => obj.id === oldobj.id);
        if (index !== -1) {
           note.value[index] = newobj;
        }
    }

    const addnote = async (obj)=>{
        const {data,error} = await supabase.from('user_note')
        .insert(
            obj
        ).select();

        if(error)
        {
            console.log("error in adding note");
            return;
        }
       
        obj = data[0];
        note.value.push(obj);
        console.log(obj);
    }

    const deletenote = async (obj)=>{
        const {data,error} = await supabase
        .from('user_note')
        .delete()
        .eq('id',obj.id);

        if(error)
        {
            console.log('error in deleting note');
        }

        note.value= note.value.filter((element)=>{
            return  element.id !== obj.id;
        })
    }





return {
    note,
    fetchnote,
    addnote,
    updatenote,
    deletenote
};

});