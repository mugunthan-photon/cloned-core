import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Input from './Input';

				window.Input = Input;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Input,
				};