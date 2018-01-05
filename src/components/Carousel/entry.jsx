import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Carousel from './Carousel';

				window.Carousel = Carousel;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Carousel,
				};