export default function Spinner({w, h}) {
  return (
    <>
      <div className="flex justify-center items-center h-6">
        <div className={`w-${w} h-${h} border-2 border-dashed rounded-full animate-spin border-white]`}></div>
      </div>
    </>
  );
}
