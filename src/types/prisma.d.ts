import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const userIncludeSettings = Prisma.validator<Prisma.UserInclude>()({
	settings: true,
});

type UserWithSettings = Prisma.UserGetPayload<{
	include: typeof userIncludeSettings;
}>;

const userIncludeSettingsAndAccount = Prisma.validator<Prisma.UserInclude>()({
	settings: true,
	account: true,
});

type UserWithSettingsAndAccount = Prisma.UserGetPayload<{
	include: typeof userIncludeSettingsAndAccount;
}>;

const userIncludeResponses = Prisma.validator<Prisma.UserInclude>()({
	responses: true,
});

type UserWithResponses = Prisma.UserGetPayload<{
	include: typeof userIncludeResponses;
}>;

const userIncludeFriends = Prisma.validator<Prisma.UserInclude>()({
	friends: true,
});

type UserWithFriends = Prisma.UserGetPayload<{
	include: typeof userIncludeFriends;
}>;

const userIncludeFriendsAndResponses = Prisma.validator<Prisma.UserInclude>()({
	friends: true,
	responses: true,
});

type UserWithFriendsAndResponses = Prisma.UserGetPayload<{
	include: typeof userIncludeFriendsAndResponses;
}>;

const UserIncludeFriendsAndResponsesAndPolls =
	Prisma.validator<Prisma.UserInclude>()({
		friends: true,
		responses: {
			include: {
				poll: true,
			},
		},
	});

type UserWithFriendsAndResponsesAndPolls = Prisma.UserGetPayload<{
	include: typeof UserIncludeFriendsAndResponsesAndPolls;
}>;

const pollIncludeResults = Prisma.validator<Prisma.PollInclude>()({
	results: true,
});

type PollWithResults = Prisma.PollGetPayload<{
	include: typeof pollIncludeResults;
}>;

const pollIncludeOptionsAndResults = Prisma.validator<Prisma.PollInclude>()({
	options: {
		select: {
			choice: true,
			image: true,
			votes: true,
			percentage: string,
		},
	},
	results: true,
});

type PollWithOptionsAndResults = Prisma.PollGetPayload<{
	include: typeof pollIncludeOptionsAndResults;
}>;

const responseIncludeUser = Prisma.validator<Prisma.ResponseInclude>()({
	user: true,
});

type ResponseWithUser = Prisma.ResponseGetPayload<{
	include: typeof responseIncludeUser;
}>;

const responseIncludePoll = Prisma.validator<Prisma.ResponseInclude>()({
	poll: true,
});

type ResponseWithPoll = Prisma.ResponseGetPayload<{
	include: typeof responseIncludePoll;
}>;
