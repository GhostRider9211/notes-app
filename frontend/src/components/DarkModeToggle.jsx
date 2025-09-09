import { useEffect, useState } from "react";

export default function DarkModeToggle() {
//   const [dark, setDark] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);
    function handleDarkMode(){
        document.documentElement.classList.toggle("dark");

    }

  return (
    <button
    //   onClick={() => setDark(!dark)}
        onClick={handleDarkMode}
      className="ml-4 px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {dark ? " Light" : "Dark"}
    </button>
  );
}
