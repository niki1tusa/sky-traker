import { Helmet } from 'react-helmet';

export default function PageMeta({ title }: { title: string }) {
	return (
		<Helmet>
			<title> Sky Traker {title ? `| ${title}` : ''}</title>
		</Helmet>
	);
}
