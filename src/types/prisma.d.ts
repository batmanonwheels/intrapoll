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

const pollIncludeResponses = Prisma.validator<Prisma.PollInclude>()({
	responses: true,
});

type PollWithResponses = Prisma.PollGetPayload<{
	include: typeof pollIncludeResponses;
}>;

const responseIncludeUser = Prisma.validator<Prisma.ResponseInclude>()({
	user: true,
});

type ResponseWithUser = Prisma.ResponseGetPayload<{
	include: typeof responseIncludeUser;
}>;
