import { MouseEventHandler, ReactNode } from "react";

function PopupCard({
  title,
  closeText = "Close",
  actionText = "Add",
  children,
  closePopup,
  action,
}: {
  title: string;
  closeText?: string;
  actionText?: string;
  children: ReactNode;
  closePopup: MouseEventHandler<HTMLButtonElement>;
  action: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen overflow-hidden bg-gray-200 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80">
      <div className="p-4 rounded-lg border-2 border-teal-400 bg-gray-100 dark:bg-gray-800 ring-offset-gray-600 bg-opacity-100">
        <h3 className="font-bold text-xl">{title}</h3>
        {children}
        <div className="flex justify-end items-center gap-2">
          <button
            className="text-lg px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            onClick={closePopup}
          >
            {closeText}
          </button>
          <button
            className={`text-lg px-4 py-2 rounded-md text-white ${actionText == "Remove" ?  "bg-red-700 hover:bg-red-600" : "bg-teal-700 hover:bg-teal-600"}`}
            onClick={action}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCard;
