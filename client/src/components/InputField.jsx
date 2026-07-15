export default function InputField({ type, content, placeholder, handleChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={content} className="text-sm text-gray-400 font-medium">
        {content}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={content}
        className="bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-150" onChange={(e)=>handleChange(e,content)}
      />
    </div>
  );
}
