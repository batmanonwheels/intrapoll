import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	HamburgerMenuIcon,
	HomeIcon as Home,
	PersonIcon as User,
	GearIcon as Settings,
	BarChartIcon as Chart,
} from '@radix-ui/react-icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ThemeToggle from './(user)/ThemeToggle';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface NavMenuProps {}

const NavMenu = async ({}: NavMenuProps) => {
	const session = await getServerSession(authOptions);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className=' p-0'>
					<HamburgerMenuIcon className='h-7 w-10' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center' className='border-none shadow-none'>
				<DropdownMenuItem>
					<Link
						href={'/'}
						className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
					>
						<Home className='h-[1.5rem] w-[1.5rem]' />
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={'/#stats'}
						className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
					>
						<Chart className='h-[1.5rem] w-[1.5rem]' />
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={'/profile'}
						className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
					>
						<User className='h-[1.5rem] w-[1.5rem]' />
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={'/settings'}
						className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
					>
						<Settings className='h-[1.5rem] w-[1.5rem]' />
					</Link>
				</DropdownMenuItem>
				{/* <DropdownMenuItem>
					<Button variant='ghost' size='default'>
						<Link href={'/account'}>Account</Link>
					</Button>
				</DropdownMenuItem> */}
				{/* <DropdownMenuItem className='flex justify-center'>
					<ThemeToggle />
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavMenu;
