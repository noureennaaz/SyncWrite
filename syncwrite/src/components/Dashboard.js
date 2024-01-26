const Dashboard= ()=>{
    return(
        <div className="m-0 p-0 min-h-screen w-screen">
            <header >
                <div className="bg-slate-100 flex justify-between px-20 py-5">
                    <button className="group shadow-2xl py-2 px-7 text-xl flex rounded-[20px] border border-slate-300 text-slate-700 font-semibold gap-1 hover:border-blue-600 "> <div className="font-bold leading-6 text-blue-600 group-hover:rotate-90 group-hover:translate-y-[3px] text-2xl transition-all duration-100">+ </div> Create </button>
                    
                    <span className="flex gap-2">
                        <span className="rounded-full w-9 h-9">
                           <img src="https://api.dicebear.com/7.x/initials/svg/seed=noureen naaz" className="object-cover rounded-full"/>
                        </span>
                        <div className="text-lg text-slate-500">Noureen Naaz</div>
                    </span>
                </div>
                
            </header>
            <section>
                 <div className="flex py-2 px-16 gap-10">
                     <div className="w-20">
                         <p>My Files</p>
                         <div className="h-1 w-full bg-blue-600 my-2" ></div>
                      </div>
                     <div className="w-24">
                        <p>Shared Files</p>
                        <div className="h-1 w-full bg-blue-600 my-2"></div>
                     </div>
                 </div>
            </section>
        </div>
    )

}
export default Dashboard