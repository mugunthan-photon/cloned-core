import configureStore from 'redux-mock-store';
				import { Provider } from 'react-redux';
				import VisualNav from './VisualNav';

				window.VisualNav = VisualNav;
				window.configureStore = configureStore;
				window.Provider = Provider;

				export default {
				    VisualNav,
				};