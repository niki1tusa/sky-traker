import { Outlet } from 'react-router';

// import { SideBar } from './components/sidebar/Sidebar';

export const Layout = () => {
	return (
		<div>
			{/* <SideBar /> */}
			<Outlet />
		</div>
	);
};
