import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

interface MenuProps {}

const Menu = ({}: MenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>
					<HamburgerMenuIcon className='h-7 w-7' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem>
					<Link
						href={'/'}
						className={cn(
							buttonVariants({ variant: 'ghost', size: 'default' })
						)}
					>
						Home
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={'/sign-in'}
						className={cn(
							buttonVariants({ variant: 'ghost', size: 'default' })
						)}
					>
						Sign In
					</Link>
				</DropdownMenuItem>
				{/* <DropdownMenuItem>
					<Button variant='ghost' size='default'>
						<Link href={'/account'}>Account</Link>
					</Button>
				</DropdownMenuItem> */}
				<DropdownMenuItem className='flex justify-center'>
					<ThemeToggle />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Menu;
