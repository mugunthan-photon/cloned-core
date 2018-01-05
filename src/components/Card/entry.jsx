import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Card from './Card';

				window.Card = Card;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Card,
				};