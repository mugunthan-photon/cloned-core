import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import Banner from './Banner';

				window.Banner = Banner;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    Banner,
				};