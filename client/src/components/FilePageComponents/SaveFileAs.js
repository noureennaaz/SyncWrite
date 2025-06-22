import { useForm } from "react-hook-form";
import { useDoc } from "../../middlewares/Doc";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import ".././inputStyle.css"
const SaveFileAs =({id, userId, oldTitle, toggleSaveAs})=>{

    const {renameDoc}= useDoc();

    const { register, handleSubmit } = useForm({
		shouldUseNativeValidation: true,
	  });
    const onSubmit = async (data) => {
              data.docId=id;
             data.currentUserId= userId;
            console.log("Data on submit is this::: ", data);
            
            try {
             
              const response = await renameDoc(data)
              
              console.log("recieced response saveAS: ", response);
              const doc = response.updatedDoc.Title;
              console.log("New created document id: ", id )
        
              if (response.success) {
                toast(`Saved as ${data.newTitle}`, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                console.log("Name updated", doc)
              
              } 
              else {
                toast.error("problem occured while creating document", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                console.log("Document creation failed")
                
              }
            } catch (err) {
              console.log("Unable to save changes", err);
              toast.error("Enter correct credentials", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
            toggleSaveAs(false)
          };  
    return (
        <div className="bg-black/10 backdrop-blur-sm flex-col w-screen min-h-screen fixed z-50 top-0 right-0 justify-center flex items-center">
            <div className="relative p-5 shadow-lg rounded-[30px] flex overflow-hidden bg-gradient-to-tr from-stone-900 to-neutral-800">
                <form className="relative top-0 w-1/2 aspect-square mx-10 min-h-[300px] max-h-[400px] min-w-[300px] max-w-[400px] p-10 flex flex-col justify-center item-center" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl font-bold text-indigo-700">Save As</h2>
                    <label className="border-2 rounded-2xl p-2 my-2">
                    <input type='text' value={oldTitle} className="min-w-full py-2 px-5 rounded-3xl border-2 border-slate-900 bg-transparent text-slate-600 font-semibold placeholder-slate-300" {...register("newTitle", {
              required: "Enter File Name",
            })} ></input>
            </label>

<button className="mt-6 min-w-full relative py-2 px-8 text-white text-base font-semibold overflow-hidden rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-bold hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-[300px] before:h-full bg-gradient-to-r from-amber-500 to-amber-300 hover:bg-gradient-to-r from-yellow-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 "
          type="submit">Save</button>
                </form>
                <button className="absolute top-5 right-5 flex p-3 border-2 rounded-full justify-center items-center transition ease-in-out duration-75 hover:bg-stone-800 h-10 w-10 border-stone-600 " onClick={()=>toggleSaveAs(false)}>
			<IoMdClose color="#94a3b8" size={100}/>
		   </button>
            </div>
        </div>
    )

} 
export default SaveFileAs