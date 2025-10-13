import { SparklesCore } from "@/components/ui/sparkles";
import Globe1 from "@/components/mvpblocks/globe1"

export function Page() {
  return (
    <div className="h-3/4 bg-blur w-screen mb-0 overflow-hidden bg-gradient-to-b from-indigo-900 via-black to-black">
      <div className="mx-auto mt-32 w-screen max-w-2xl">
        <div className="text-center text-3xl text-white">
          <span className="text-white">Trusted by Students.</span>
          <br />
          <span>Built by the Students.</span>
        </div>
      </div>

      <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] 
      before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#342e9b,transparent_50%)] before:opacity-100 
      after:absolute after:top-1/2 after:-left-1/2 after:aspect-[1] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#342e9b] after:bg-zinc-900">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={300}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,trans]"
        />
        <Globe1/>
      </div>
   
    </div>
    
  );
}

export default Page;