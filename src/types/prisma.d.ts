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
