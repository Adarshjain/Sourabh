import {Platform} from 'react-native';

const Router = Platform.OS === 'web' ? require('./routing.web').Router : require('./routing.native').Router;
const matchPath = Platform.OS === 'web' ? require('./routing.web').matchPath : require('./routing.native').matchPath;
const MemoryRouter = Platform.OS === 'web' ? require('./routing.web').MemoryRouter : require('./routing.native').MemoryRouter;
const Prompt = Platform.OS === 'web' ? require('./routing.web').Prompt : require('./routing.native').Prompt;
const Redirect = Platform.OS === 'web' ? require('./routing.web').Redirect : require('./routing.native').Redirect;
const Route = Platform.OS === 'web' ? require('./routing.web').Route : require('./routing.native').Route;
const StaticRouter = Platform.OS === 'web' ? require('./routing.web').StaticRouter : require('./routing.native').StaticRouter;
const Switch = Platform.OS === 'web' ? require('./routing.web').Switch : require('./routing.native').Switch;
const withRouter = Platform.OS === 'web' ? require('./routing.web').withRouter : require('./routing.native').withRouter;
const useHistory = Platform.OS === 'web' ? require('./routing.web').useHistory : require('./routing.native').useHistory;
const useLocation = Platform.OS === 'web' ? require('./routing.web').useLocation : require('./routing.native').useLocation;
const useParams = Platform.OS === 'web' ? require('./routing.web').useParams : require('./routing.native').useParams;
const useRouteMatch = Platform.OS === 'web' ? require('./routing.web').useRouteMatch : require('./routing.native').useRouteMatch;
const Link = Platform.OS === 'web' ? require('./routing.web').Link : require('./routing.native').Link;

export {
    Router,
    matchPath,
    MemoryRouter,
    Prompt,
    Redirect,
    Route,
    StaticRouter,
    Switch,
    withRouter,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
    Link
};