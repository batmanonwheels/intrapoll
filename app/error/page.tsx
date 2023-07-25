interface errorProps {
	params: { error: string };
}

const Error = ({ params }: errorProps) => {
	const { error } = params;
	return (
		<div className='text 2xl text-center flex flex-col justify-center h-full mx-auto'>
			<h1 className='text-2xl font-semibold'>An error has occurred.</h1>
			<h2 className='text-xl '>{error}</h2>
		</div>
	);
};

export default Error;
