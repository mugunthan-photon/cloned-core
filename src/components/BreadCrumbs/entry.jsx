import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import BreadCrumbs from './BreadCrumbs';
import Crumbs from './Crumbs';

window.BreadCrumbs = BreadCrumbs;
window.Crumbs = Crumbs;
window.configureStore = configureStore;
window.Provider = Provider;

export default {
    BreadCrumbs,
    Crumbs,
};
