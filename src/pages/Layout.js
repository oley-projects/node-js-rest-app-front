import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Layout = (props) => (
  <>
    <Navigation onLogout={props.onLogout} isAuth={props.isAuth} />
    <div className='container'>
      <Outlet />
    </div>
    <Footer />
  </>
)

export default Layout;