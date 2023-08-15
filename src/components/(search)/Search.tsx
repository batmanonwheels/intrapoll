'use client';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Poll, User } from '@prisma/client';
import { MagnifyingGlassIcon as SearchIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { Suspense, useState } from 'react';
import MiniUserCard from '../(user)/MiniUserCard';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

interface SearchProps {}

const Search = ({}: SearchProps) => {
	const [params, setParams] = useState<string>('user');
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchResults, setSearchResults] = useState<User[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = async (value: string) => {
		setSearchValue(value);
		setIsLoading(true);
		try {
			const { data } = await axios.get('api/search', {
				params: { value, params },
			});
			setSearchResults(data);
		} catch (error: any) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<section className='relative flex flex-row gap-3'>
				<SearchIcon className='h-[1.35rem] w-[1.35rem] m-auto absolute text-sm left-1 inset-y-0 grid place-items-center text-gray-600' />
				<Input
					onChange={(e) => handleSearch(e.target.value)}
					placeholder={'Search "batmanonwheels"'}
					className='pl-8 flex-1 text-base'
				/>
				<Select onValueChange={(value) => setParams(value)}>
					<SelectTrigger className='absolute text-base right-0 w-20 mb-1 inset-y-0 border-none focus:border-none focus:ring-0'>
						<SelectValue placeholder='User' defaultValue={'user'} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem
								value='user'
								className='w-fit'
								onSelect={(e) => console.log(e.target)}
							>
								User
							</SelectItem>
							<SelectItem
								value='poll'
								className='w-fit'
								disabled={true}
								onSelect={(e) => console.log(e.target)}
							>
								Poll
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</section>

			<section className='h-fit'>
				{searchResults.length <= 0 || searchValue === '' ? (
					<p className='text-xs font-medium my-2 px-1'>
						Try searching for a user!
					</p>
				) : (
					<div className='flex flex-col gap-2 '>
						<p className='text-xs font-medium my-2 px-1 text-muted-foreground'>
							Results for
							<span className='italic px-1'>{`${searchValue}`}</span> (
							{`${searchResults.length}`} found)
						</p>

						{searchResults.map((user: Partial<User>, i) => (
							<Suspense
								fallback={<Skeleton />}
								// key={user.username}
								key={i}
							>
								<Link href={`/${user.username}`}>
									<MiniUserCard
										name={user.name}
										username={user.username}
										image={user.image}
										createdAt={user.createdAt}
										className={'border-none shadow-none dark:shadow-none'}
									/>
								</Link>
								{/* <Separator
									className={`${
										i === searchResults.length - 1 ? 'h-0 ' : ''
									} mx-auto w-11/12`}
								/> */}
							</Suspense>
						))}
					</div>
				)}
			</section>
		</>
	);
};

export default Search;
