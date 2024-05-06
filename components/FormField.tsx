import { FormFieldProps } from "@/common/types/common.types";

const FormField = ({
  title,
  state,
  placeholder,
  isTextArea,
  isNumber,
  min,
  setState,
}: FormFieldProps) => {
  const inputId = `input-${title.replace(/\s+/g, "-").toLowerCase()}`; // Creates a unique ID based on the title

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={inputId} className="text-gray-700 font-medium">
        {title}
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full outline-none bg-gray-50 rounded-xl p-4 text-gray-700"
        />
      ) : (
        <input
          id={inputId}
          type={isNumber ? "number" : "text"}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full outline-none bg-gray-50 rounded-xl p-4 text-gray-700"
          {...(isNumber && min !== undefined && { min })}
        />
      )}
    </div>
  );
};

export default FormField;
