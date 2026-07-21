export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>

      <p className="text-gray-400 text-sm font-medium tracking-wide animate-pulse">
        Loading Todos...
      </p>
    </div>
  );
}
