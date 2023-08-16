import { FaMoon, FaSun } from "react-icons/fa";

import { cookies } from "next/headers";

export async function toggleDarkMode() {
  "use server";
  const darkMode = cookies().get("darkMode")?.value == "true";
  cookies().set("darkMode", (!darkMode).toString());
}

export async function getDarkMode() {
  "use server";
  return cookies().get("darkMode")?.value;
}

async function DarkModeToggle() {
  const darkMode = (await getDarkMode()) == "true";
  return (
    <form action={toggleDarkMode} className="flex items-center">
      <button type="submit">
        {darkMode ? (
          <FaSun className="w-8 h-8" />
        ) : (
          <FaMoon className="w-8 h-8" />
        )}
      </button>
    </form>
  );
}

export default DarkModeToggle;
