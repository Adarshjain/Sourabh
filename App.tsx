// import React from 'react';
import HybridApp from './src/App';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from "@ui-kitten/eva-icons";
import {Router} from "./src/Routers/routing";

export default () => (
    <Router>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <HybridApp/>
        </ApplicationProvider>
    </Router>
);