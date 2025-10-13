import Earth from "@/components/ui/globe";
export default function Globe1() {
  return (
    <>
      <div className="bg-black text-white flex flex-col items-center justify-center overflow-hidden">
        <article className="relative mx-auto my-8 max-w-[500px] rounded-xl p-5 text-center">
          <div className="relative z-10">
            <h1 className="text-7xl leading-[100%] font-semibold tracking-tighter">
             
            </h1>
            {/* Normalized RGB values i.e (RGB or color / 255) */}
            <Earth
              baseColor={[0.263, 0.22, 0.792]}
              markerColor={[0.4, 0.34, 0.88]}
              glowColor={[0.263, 0.22, 0.792]}
            />
          </div>
        </article>
      </div>
    </>
  );
}