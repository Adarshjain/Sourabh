import React from 'react';
import {IndexPath, Menu, MenuItem} from '@ui-kitten/components';
// @ts-ignore
import {useHistory, useRouteMatch} from "../../Routers/routing";

export const Nav = () => {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | undefined>(undefined);
    let {url} = useRouteMatch();
    let history = useHistory();

    function onSelectMenu(index: IndexPath) {
        switch (index.row) {
            case 0:
                history.push(`${url}/category`);
                break;
            case 1:
                history.push(`${url}/sub-category`);
                break;
            case 2:
                history.push(`${url}/data-entry`);
                break;
        }
        setSelectedIndex(index);
    }


    return (
        <Menu
            selectedIndex={selectedIndex}
            onSelect={onSelectMenu}
        >
            <MenuItem title='Add Category'/>
            <MenuItem title='Add Sub Category'/>
            <MenuItem title='Data Entry'/>
        </Menu>
    );
};

