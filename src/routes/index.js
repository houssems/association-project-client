import {Navigate, Outlet, useRoutes} from "react-router-dom";
import {lazy} from "react";
import {AssociationGovernance, AssociationHistory, AssociationStatus} from "../pages/association";

export default function Router() {
    return useRoutes([
        {
            path: 'homepage',
            element: <Homepage />,
        },
        {
            path: 'association',
            element: (
                <div>
                    <Outlet />
                </div>
            ),
            children: [
                {path: 'status', element: <AssociationStatus/>},
                {path: 'governance', element: <AssociationGovernance/>},
                {path: 'history', element: <AssociationHistory/>},
                {path: 'strategicPlan', element: <div/>},
                {path: 'members', element: <div/>},
            ],
        },
        {
            path: '/',
            element: <Navigate to="/homepage" replace/>
        }
    ]);
}


const Homepage = lazy(() => import('../pages/homepage/Homepage'));