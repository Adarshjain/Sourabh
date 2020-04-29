import React, {useEffect} from 'react';
import {IndexPath, Menu, MenuItem} from '@ui-kitten/components';
import {useHistory, useLocation} from "../../Routers/routing";
import AdminRoutes from "../../Routers/AdminRoutes";

export const Nav = () => {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | undefined>(undefined);
    let history = useHistory();
    let loc = useLocation();
    let adminRoutes = AdminRoutes.items;

    useEffect(() => {
        if (loc.pathname === "/admin") {
            let i = AdminRoutes.getPathFromIndex(0);
            history.replace(i);
            loc.pathname = i;
        }
        console.log('sdf');
        let indexPath: IndexPath = new IndexPath(AdminRoutes.getIndexFromPath(loc.pathname));
        setSelectedIndex(indexPath);
    }, [loc.pathname, history]);

    function onSelectMenu(index: IndexPath) {
        history.push(`${AdminRoutes.getPathFromIndex(index.row)}`);
        setSelectedIndex(index);
    }

    return (
        <Menu
            selectedIndex={selectedIndex}
            onSelect={onSelectMenu}
        >
            {adminRoutes.map(route => <MenuItem title={route.title} key={route.path}/>)}
        </Menu>
    );
};

