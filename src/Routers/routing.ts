import {Platform} from 'react-native';

const Router = Platform.OS === 'web' ? require('./routing.web').Router : require('./routing.native').Router;
const Switch = Platform.OS === 'web' ? require('./routing.web').Switch : require('./routing.native').Switch;
const Route = Platform.OS === 'web' ? require('./routing.web').Route : require('./routing.native').Route;
const Link = Platform.OS === 'web' ? require('./routing.web').Link : require('./routing.native').Link;
const useHistory = Platform.OS === 'web' ? require('./routing.web').useHistory : require('./routing.native').useHistory;
const useRouteMatch = Platform.OS === 'web' ? require('./routing.web').useRouteMatch : require('./routing.native').useRouteMatch;
const useParams = Platform.OS === 'web' ? require('./routing.web').useParams : require('./routing.native').useParams;

export {
    Router,
    Switch,
    Route,
    Link,
    useHistory,
    useRouteMatch,
    useParams
};