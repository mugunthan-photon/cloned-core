import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import AdMonetization from './AdMonetization';

				window.AdMonetization = AdMonetization;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    AdMonetization,
				};