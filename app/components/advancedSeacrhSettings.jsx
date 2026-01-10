import { SUPPORTED_LANGUAGES } from "~/constants/constants";
import ControlRangeSlider from "./widgets/ControlRangeSlider";
import FieldSetGroup from "./widgets/FieldSetGroup";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RadioButtonsPanel from "./widgets/RadioButtonsPanel";

const langNames = new Intl.DisplayNames(['ru'], { type: 'language' });

export default function AdvancedSearch({ updateSetting, settings }) {
    const setMaxResults = updateSetting('maxResults'); 
    const setLang = updateSetting('langRestrict');
    
    const currentMaxResults = settings?.maxResults || 40;
    const currentLang = settings?.langRestrict || 'en';

    return (
        <aside className="bg-surface text-secondary p-4 flex flex-col gap-6 shadow-xl rounded-2xl border border-border/50">
            <FieldSetGroup openByDefault={true} legend={'Filters'}>
                <div className="space-y-6">
                    <ControlRangeSlider 
                        onChange={setMaxResults}
                        max={40} 
                        min={1} 
                        value={currentMaxResults} 
                        labelText={'Max Batch Size'} 
                    />

                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-text-primary text-sm font-bold uppercase tracking-tight">
                            Language Filter
                        </label>
                        <div className="relative bg-background text-primary font-mono text-sm border-2 border-border rounded-sm cursor-pointer focus:border-primary outline-none transition-all hover:bg-surface-hover">
                            <select 
                                value={currentLang}
                                onChange={(e) => setLang(e.target.value)}
                                className="w-full appearance-none inset-0 p-2"
                            >
                                {SUPPORTED_LANGUAGES.map(code => (
                                    <option key={code} value={code} className="bg-surface">
                                        {langNames.of(code).toUpperCase()} ({code.toUpperCase()})
                                    </option>
                                ))}
                            </select>
                                <ChevronDownIcon className="size-6 absolute right-2 top-1/2 -translate-y-1/2 select-none pointer-events-none" />
                        </div>
                    </div>

                    <RadioButtonsPanel 
                        groupName="Sort By"
                        currentValue={settings.orderBy}
                        setterFunction={updateSetting('orderBy')}
                        arrayOButtons={[
                            { label: 'Relevance', value: 'relevance' },
                            { label: 'Newest', value: 'newest' }
                        ]} 
                    />{/*After adding more APIs will be in configs. Hardcode for now :/ */}

                </div>
            </FieldSetGroup >
        </aside>
    )
}