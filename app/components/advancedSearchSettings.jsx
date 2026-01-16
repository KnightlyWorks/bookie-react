//advancedSearchSettings.jsx
import { SUPPORTED_LANGUAGES } from "@constants/constants";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import RangeSlider from "@components/ui/Forms/RangeSlider";
import FieldSetGroup from "@components/ui/Forms/FieldSetGroup";
import RadioButtonsPanel from "@components/ui/Forms/Radio/RadioButtonsPanel";
import Select from "@components/ui/Forms/Select";

const langNames = new Intl.DisplayNames(["en"], { type: "language" });

export default function AdvancedSearchSettings({ updateSetting, settings }) {
  const setMaxResults = updateSetting("maxResults");
  const setLang = updateSetting("langRestrict");

  const currentMaxResults = settings?.maxResults || 40;
  const currentLang = settings?.langRestrict || "en";

  return (
    <aside className="bg-surface text-secondary border-border/50 flex flex-col gap-6 rounded-2xl border p-4 shadow-xl">
      <FieldSetGroup openByDefault={true} legend={"Filters"}>
        <div className="space-y-6">
          <RangeSlider
            onChange={setMaxResults}
            max={40}
            min={1}
            value={currentMaxResults}
            labelText={"Max Batch Size"}
          />

          <Select
            labelText="Language Filter"
            value={settings?.langRestrict || "en"}
            options={SUPPORTED_LANGUAGES}
            onChange={updateSetting("langRestrict")}
            formatDisplay={(code) => langNames.of(code)}
          />

          <RadioButtonsPanel
            groupName="Print Type"
            currentValue={settings.printType}
            setterFunction={updateSetting("printType")}
            arrayOButtons={[
              { label: "All", value: "all" },
              { label: "Books only", value: "books" },
              { label: "Magazines only", value: "magazines" },
            ]}
          />

          <RadioButtonsPanel
            groupName="Sort By"
            currentValue={settings.orderBy}
            setterFunction={updateSetting("orderBy")}
            arrayOButtons={[
              { label: "Relevance", value: "relevance" },
              { label: "Newest", value: "newest" },
            ]}
          />
          {/*After adding more APIs will be in configs. Hardcode components for now.  :/ */}
          <p className="text-text-muted font-mono text-xs tracking-wider text-balance italic opacity-90">
            * Filters apply only to new queries and do not affect existing results.{" "}
          </p>
        </div>
      </FieldSetGroup>
    </aside>
  );
}
