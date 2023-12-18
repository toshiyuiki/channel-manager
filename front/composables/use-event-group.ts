import type { Ref } from 'vue'

export const useEventGroup = () => {
    const event_is: Ref<boolean> = useState('event_is', () => false);
    const event_name: Ref<string> = useState('event_name', () => '');

    const updateEventGroup = (event_name: Ref<string>) => (name: string) => {
        event_is.value = !event_is.value;
        event_name.value = name;
        const elements = Array.from(document.querySelectorAll(`[data-event-group="${name}"]`));
        elements.forEach((ele) => {
            if(!ele.classList.contains('js--on')){
                ele.classList.add('js--on');
            }else{
                ele.classList.remove('js--on');
            }
        });
    }
    return {
        event_is: readonly(event_is),
        event_name: readonly(event_name),
        updateEventGroup: updateEventGroup(event_name),  
    }
}