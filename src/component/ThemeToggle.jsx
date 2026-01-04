// import React, { useEffect, useState } from "react";

// const ThemeToggle = () => {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light"
//   );

//   useEffect(() => {
//     // Apply theme to <html>
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <button
//       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//       className="p-2 rounded-full text-xl bg-gray-200 dark:bg-gray-700"
//     >
//       {theme === "light" ? "🌙" : "☀️"}
//     </button>
//   );
// };

// export default ThemeToggle;
