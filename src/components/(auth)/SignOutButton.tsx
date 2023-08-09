'use client';

import { signOut } from 'next-auth/react';
import { Button, buttonVariants } from '../ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className={cn('text-red-400 text-center w-full my-3')}
					variant='outline'
				>
					Log Out
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className={cn('mx-auto w-11/12')}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure you wanna go?</AlertDialogTitle>
					<AlertDialogDescription>
						This will log you out forever...until you log back in.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>No! Take me back!</AlertDialogCancel>
					<AlertDialogAction
						className={cn(
							buttonVariants({ variant: 'secondary' }),
							'text-red-400  text-center w-full my-3'
						)}
						onClick={() => signOut()}
					>
						Yes, let me out!
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default SignOutButton;
