import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Icon from './Icon';
import LoadSVG from '../../helpers/LoadSVG/LoadSVG';
import coreSprite from '../../../src/assets/sprite.svg';

window.Icon = Icon;
window.LoadSVG = LoadSVG;
window.coreSprite = coreSprite;

window.configureStore = configureStore;
window.Provider = Provider;

export default {
    Icon,
    LoadSVG,
};