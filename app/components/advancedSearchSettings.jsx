import { SUPPORTED_LANGUAGES } from "~/constants/constants";
import ControlRangeSlider from "./widgets/ControlRangeSlider";
import FieldSetGroup from "./widgets/FieldSetGroup";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import RadioButtonsPanel from "./widgets/RadioButtonsPanel";
import ControlSelect from "./widgets/ControlSelect";



const langNames = new Intl.DisplayNames(['en'], { type: 'language' });

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

                    <ControlSelect 
                        labelText="Language Filter"
                        value={settings?.langRestrict || 'en'}
                        options={SUPPORTED_LANGUAGES}
                        onChange={updateSetting('langRestrict')}
                        formatDisplay={(code) => langNames.of(code)}
                    />

                    <RadioButtonsPanel 
                        groupName="Print Type"
                        currentValue={settings.printType}
                        setterFunction={updateSetting('printType')}
                        arrayOButtons={[
                            { label: 'All', value: 'all' },
                            { label: 'Books only', value: 'books' },
                            { label: 'Magazines only', value: 'magazines' }
                        ]} 
                    />

                    <RadioButtonsPanel 
                        groupName="Sort By"
                        currentValue={settings.orderBy}
                        setterFunction={updateSetting('orderBy')}
                        arrayOButtons={[
                            { label: 'Relevance', value: 'relevance' },
                            { label: 'Newest', value: 'newest' }
                        ]} 
                    />{/*After adding more APIs will be in configs. Hardcode components for now.  :/ */}
                    <p className="text-text-muted text-xs italic text-balance tracking-wider font-mono opacity-90">*    Filters apply only to new queries and do not affect existing results. </p>
                </div>
            </FieldSetGroup >
        </aside>
    )
}