import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import RadioButton from './RadioButton';

				window.RadioButton = RadioButton;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    RadioButton,
				};