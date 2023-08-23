import UserCard from '@/components/(user)/UserCard';
import ResponseCard from '@/components/(user)/ResponseCard';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import {
	UserWithFriendsAndResponses,
	UserWithFriendsAndResponsesAndPolls,
} from '@/types/prisma';
import moment from 'moment';

interface userProfileProps {
	params: { username: string };
}
export async function generateMetadata({ params }: userProfileProps) {
	return {
		title: `${params.username}'s Profile`,
	};
}

const UserProfile = async ({ params }: userProfileProps) => {
	const session = await getServerSession(authOptions);

	const user: Partial<UserWithFriendsAndResponses> | null =
		await prisma.user.findUnique({
			where: {
				username: params.username as string,
			},
			select: {
				id: true,
				name: true,
				username: true,
				image: true,
				streak: true,
				longestStreak: true,
				verifiedEmail: true,
				friends: true,
				responses: {
					include: {
						poll: true,
					},
				},
			},
		});

	const {
		id,
		name,
		username,
		image,
		// streak,
		// longestStreak,
		// verifiedEmail,
		responses,
		// friends,
	} = user as UserWithFriendsAndResponsesAndPolls;

	const friends = 409;
	const streak = 3;
	const longestStreak = 16;

	// const responses = [
	// 	{
	// 		id: 1,
	// 		date: 'July 30th, 2023',
	// 		response: 'Apples',
	// 		option: 'ONE',
	// 		prompt: 'Apples or Oranges?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
	// 		liked: true,
	// 	},
	// 	{
	// 		id: 2,
	// 		date: 'July 29th, 2023',
	// 		response: 'iOS',
	// 		option: 'ONE',
	// 		prompt: 'iOS or Android?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFwcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
	// 		liked: false,
	// 	},
	// 	{
	// 		id: 3,
	// 		date: 'July 28th, 2023',
	// 		response: 'Pie',
	// 		option: 'ONE',
	// 		prompt: 'Pie or Cake?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
	// 		liked: true,
	// 	},
	// 	{
	// 		id: 4,
	// 		date: 'July 26th, 2023',
	// 		response: 'Chocolate',
	// 		option: 'ONE',
	// 		prompt: 'Vanilla or Chocolate?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1626697556651-67ebdcb8cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
	// 		liked: true,
	// 	},
	// 	{
	// 		id: 5,
	// 		date: 'July 25th, 2023',
	// 		response: 'Pizza',
	// 		option: 'ONE',
	// 		prompt: 'Cookies or Pizza?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
	// 		liked: true,
	// 	},
	// 	{
	// 		id: 6,
	// 		date: 'July 24th, 2023',
	// 		response: 'Life',
	// 		option: 'ONE',
	// 		prompt: 'Life or Death?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1476611317561-60117649dd94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
	// 		liked: false,
	// 	},
	// 	{
	// 		id: 7,
	// 		date: 'July 23th, 2023',
	// 		response: 'Prince',
	// 		option: 'ONE',
	// 		prompt: 'Prince or Michael Jackson?',
	// 		image:
	// 			'https://images.unsplash.com/photo-1557080768-1b6176358e51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJpbmNlfGVufDB8MHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=800&q=60',
	// 		liked: true,
	// 	},
	// ];

	return (
		<section className='flex flex-col'>
			<UserCard
				id={id}
				name={name}
				username={username}
				streak={streak}
				image={image}
				longestStreak={longestStreak}
				friends={friends}
			/>
			<div className='mx-2 my-auto h-[90%]'>
				<h3 className='ml-1 mb-1 mt-3 text-gray-600 dark:text-gray-300'>{`${
					name.split(' ')[0]
				}'s Poll Responses`}</h3>
				<ul className='h-fit overflow-scroll snap-proximity snap-y'>
					{responses.length > 0 ? (
						responses.map((res, i) => {
							const [month, day, year] = moment(res.poll.createdAt)
								.format('MMMM D YYYY')
								.split(' ');

							const date = month + ' ' + day + 'th' + ' ' + year;

							return (
								<ResponseCard
									key={res.id}
									id={res.id}
									date={date}
									response={res.response}
									option={res.option}
									pollId={res.poll.id}
									prompt={res.poll.question}
									image={res.image}
									liked={true}
									name={name}
									last={i === responses.length - 1 ? true : false}
								/>
							);
						})
					) : (
						<div className='my-auto text-center h-full'>
							<h2 className='text-l font- text-muted-foreground py-1'>
								No insights yet..
							</h2>
						</div>
					)}
				</ul>
			</div>
		</section>
	);
};

export default UserProfile;
