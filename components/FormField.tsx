type Props = {
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  isNumber?: boolean;
  min?: number;
  setState: (value: string) => void;
};

const FormField = ({
  title,
  state,
  placeholder,
  isTextArea,
  isNumber,
  min,
  setState,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-700 font-medium">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full outline-0 bg-light-white-100 rounded-xl p-4"
        />
      ) : (
        <input
          type={isNumber ? "number" : "text"}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="w-full outline-0 bg-light-white-100 rounded-xl p-4"
          min={isNumber && min ? min : undefined}
        />
      )}
    </div>
  );
};

export default FormField;
