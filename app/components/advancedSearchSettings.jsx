import { GOOGLE_FILTER_CONFIG } from "@constants/searchFilters";
import { SUPPORTED_LANGUAGES } from "@constants/constants";

import FieldSetGroup from "./ui/Forms/FieldSetGroup";
import RadioButtonsPanel from "./ui/Forms/Radio/RadioButtonsPanel";
import RangeSlider from "./ui/Forms/RangeSlider";
import Select from "./ui/Forms/Select";

const langNames = new Intl.DisplayNames(["en"], { type: "language" });

export default function AdvancedSearchSettings({ updateSetting, settings }) {
  return (
    <aside className="bg-surface border-border/50 flex flex-col gap-6 rounded-2xl border p-4 shadow-xl">
      <FieldSetGroup openByDefault={true} legend={"Filters"}>
        <div className="space-y-6">
          {GOOGLE_FILTER_CONFIG.map((filter) => {
            const value = settings[filter.id] || filter.defaultValue;
            const onChange = updateSetting(filter.id);

            switch (filter.type) {
              case "range":
                return (
                  <RangeSlider
                    key={filter.id}
                    labelText={filter.label}
                    value={value}
                    onChange={onChange}
                    {...filter.props}
                  />
                );

              case "select":
                return (
                  <Select
                    key={filter.id}
                    labelText={filter.label}
                    value={value}
                    onChange={onChange}
                    options={filter.options}
                    formatDisplay={(code) => (filter.needsTranslation ? langNames.of(code) : code)}
                  />
                );

              case "radio":
                return (
                  <RadioButtonsPanel
                    key={filter.id}
                    groupName={filter.label}
                    currentValue={value}
                    setterFunction={onChange}
                    arrayOButtons={filter.options}
                  />
                );

              default:
                return null;
            }
          })}

          <p className="text-text-muted font-mono text-xs italic opacity-90">
            * Filters apply only to new queries and do not affect existing results.
          </p>
        </div>
      </FieldSetGroup>
    </aside>
  );
}
