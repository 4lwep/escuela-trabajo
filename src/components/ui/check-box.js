// Es necesario instalar tailwind-merge:  npm install tailwind-merge
import { twMerge } from "tailwind-merge";

export default function CheckBox({
  name,
  value,
  defaultChecked = false,
  disabled = false,
  className,
  children,
}) {
  const defaultClassName =
    "cursor-pointer has-disabled:cursor-default has-checked:bg-indigo-200 has-checked:text-indigo-800 px-2 py-1 text-gray-500 border border-gray-300 rounded-md";
  const newClassName = twMerge(defaultClassName, className);

  return (
    <label className={newClassName}>
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="hidden"
      />
      {children}
    </label>
  );
}
