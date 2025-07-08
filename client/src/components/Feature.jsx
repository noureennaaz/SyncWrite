import ScreenVid from "../assets/devicesGif.gif";
const feature = ()=>{
    return (
    <div className="bg-[#F8CB4F] p-10 md:p-20 min-h-[80vh]">
        <section className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-10">
          <div className="w-full max-w-[500px] h-auto">
            <img
              src={ScreenVid}
              alt="Collaboration Visual"
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-[50%]">
            <div className="flex flex-col justify-center h-full text-start">
              <h2 className="text-[32px] leading-[40px] lg:text-[45px] lg:leading-[55px] font-[650] text-white">
                Collaborate with
              </h2>
              <h2 className="text-[32px] leading-[40px] lg:text-[45px] lg:leading-[55px] font-[650] text-slate-700">
                anyone<span className="text-white"> and</span>
              </h2>
              <h2 className="text-[32px] leading-[40px] lg:text-[45px] lg:leading-[55px] font-[650] text-white">
                any<span className="text-slate-700"> device</span>
              </h2>
              <h2 className="text-[32px] leading-[40px] lg:text-[45px] lg:leading-[55px] font-[650] text-white">
                from<span className="text-slate-700"> anywhere</span>
              </h2>
            </div>
          </div>
        </section>
      </div>)

}

export default feature 