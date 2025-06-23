import { Link } from 'react-router';

export const SideBar = () => {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/details'>Details</Link>
			<Link to='/save-favorite'>Save Favorite</Link>
		</nav>
	);
};
