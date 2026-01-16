import idFromName from "@utils/idFromName";

export default function Checkbox({ setterFunction, isChecked, label }) {
  const fieldId = idFromName(label);

  return (
    <div className="flex items-center gap-2 px-2 text-balance">
      <input
        type="checkbox"
        id={fieldId}
        checked={isChecked}
        onChange={(e) => setterFunction(e.target.checked)}
        className="accent-primary h-4 w-4 cursor-pointer"
      />
      <label htmlFor={fieldId} className="text-text-primary cursor-pointer text-sm select-none">
        {label}
      </label>
    </div>
  );
}
