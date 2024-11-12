import {Home} from '../pages/Home';
import { Settings } from '../pages/Settings';
import { Layout } from '../components/Layout';

export const AppRoutes = [{
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: "settings", element: <Settings /> }  
  ],
}];
