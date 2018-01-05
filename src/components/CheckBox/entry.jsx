import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import CheckBox from './CheckBox';

				window.CheckBox = CheckBox;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    CheckBox,
				};