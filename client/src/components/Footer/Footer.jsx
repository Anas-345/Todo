export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 border-t border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500 text-sm">
          &copy; {year}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
