import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
	//Posts
	const firstPoll = await prisma.poll.create({
		data: {
			question: "What's the best ice cream flavor?",
			options: {
				createMany: {
					data: [
						{
							choice: 'Vanilla',
							image:
								'https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1044&q=80',
						},
						{
							choice: 'Chocolate',
							image:
								'https://images.unsplash.com/photo-1626697556651-67ebdcb8cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
						},
						{
							choice: 'Mint Chip',
							image:
								'https://images.unsplash.com/photo-1496041877055-c55fc243fc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
						},
						{
							choice: 'Strawberry',
							image:
								'https://images.unsplash.com/photo-1633933358116-a27b902fad35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
						},
					],
				},
			},
		},
	});

	//Users
	const hashedPassword = await hash('Sasuke5423!', 12);

	const dev = await prisma.user.upsert({
		where: { email: 'devingarcia5423@gmail.com' },
		update: {},
		create: {
			email: 'devingarcia5423@gmail.com',
			name: 'Dev',
			username: 'batmanonwheels',
			settings: {
				create: {},
			},
			account: {
				create: {
					password: hashedPassword,
				},
			},
		},
	});

	const kat = await prisma.user.upsert({
		where: { email: 'secorkathryn@gmail.com' },
		update: {},
		create: {
			email: 'secorkathryn@gmail.com',
			name: 'Kat',
			username: 'kathryn',
			image:
				'https://media.licdn.com/dms/image/C4E03AQG0rjcB0XWV7w/profile-displayphoto-shrink_800_800/0/1598403916694?e=1697673600&v=beta&t=-Hp54sLaGBw-bcZU4nGCXWBUGzM8Jww5oih3Sj_ypxI',
			settings: {
				create: {},
			},
			responses: {
				create: {
					pollId: 1,
					option: 'three',
					response: 'Mint Chip',
				},
			},
			account: {
				create: {
					password: hashedPassword,
				},
			},
		},
	});

	const updatePollVotes = await prisma.poll.update({
		where: {
			id: firstPoll.id,
		},
		data: {
			totalVotes: {
				increment: 1,
			},
		},
	});

	const updateOptionVotes = await prisma.pollOption.updateMany({
		where: {
			pollId: firstPoll.id,
			choice: 'Mint Chip',
		},
		data: {
			votes: {
				increment: 1,
			},
		},
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
