import idFromName from "@utils/idFromName";
import "./ControlRadioButton.css";

export default function RadioButtonsPanel({ 
  setterFunction, 
  currentValue, 
  groupName, 
  arrayOButtons = [{ label: '', value: null }] 
}) {
  const groupNameClean = groupName.replace(/\s+/g, '');
  
  return (
    <div className="flex flex-col gap-3 py-2">

      <h3 className="text-text-primary text-sm font-bold uppercase tracking-tight">
        {groupName}
      </h3>
      
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {arrayOButtons.map((button, index) => (
          <RadioButton 
            key={`${groupNameClean}-${index}`}
            name={groupNameClean}
            currentValue={currentValue}
            label={button.label}
            valueToSet={button.value}
            setterFunction={setterFunction}
          />
        ))}
      </div>
    </div>
  );
}

function RadioButton({ label, setterFunction, valueToSet, currentValue, name }) {
  const id = `${idFromName(label)}-${name}-radio`; 
  const isActive = valueToSet == currentValue; // Loose Equality pleease
  
  return (
    <div className="group flex items-center gap-2 cursor-pointer">
      <input 
        type="radio"
        id={id}
        name={name} 
        value={valueToSet}
        checked={isActive}
        onChange={(e) => setterFunction(e.target.value)}
        className="radio-input" 
      />
      <label 
        htmlFor={id}
        className={`text-xs font-mono font-bold uppercase cursor-pointer select-none transition-colors
          ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'}`}
      >
        {label ?? valueToSet}
      </label>
    </div>
  );
}