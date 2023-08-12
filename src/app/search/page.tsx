//'use client'

import Search from '@/components/(search)/Search';

//import

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
	return (
		<section className='flex flex-col h-full'>
			<h2 className='text-xl font-semibold my-2 px-1'>Search</h2>
			<Search />
		</section>
	);
};

export default SearchPage;
