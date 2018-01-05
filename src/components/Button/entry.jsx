import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Button from './Button';

				window.Button = Button;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Button,
				};