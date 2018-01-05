import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Accordion from './Accordion';
import AccordionSection from './AccordionSection';

window.Accordion = Accordion;
window.AccordionSection = AccordionSection;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    Accordion,
};
