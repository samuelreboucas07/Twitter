import {StackNavigator} from 'react-navigation';

import Login from './pages/login';
import Timeline from './pages/timeline';
import New from './pages/New';
export default StackNavigator(
    {
    Home: {
        screen: Login,
      },

    Timeline:{
        screen: Timeline,
    },
    New:{
        screen: New,
    },
    },
    {
        
        initialRouteName: 'Home',
    }
);

