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
	MagnifyingGlassIcon as Search,
} from '@radix-ui/react-icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface NavMenuProps {}

const NavMenu = async ({}: NavMenuProps) => {
	const session = await getServerSession(authOptions);

	return (
		<nav>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='p-1'>
						<HamburgerMenuIcon className='h-7 w-10' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='center'>
					<DropdownMenuItem className='flex flex-col'>
						<Link
							href={'/'}
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
						>
							<Home className='h-[1.5rem] w-[1.5rem]' />
						</Link>
						<p className='text-xs text-muted-foreground'>home</p>
					</DropdownMenuItem>
					<DropdownMenuItem className='flex flex-col'>
						<Link
							href={'/search'}
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
						>
							<Search className='h-[1.5rem] w-[1.5rem]' />
						</Link>
						<p className='text-xs text-muted-foreground'>search</p>
					</DropdownMenuItem>
					<DropdownMenuItem className='flex flex-col'>
						<Link
							href={'/stats'}
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
						>
							<Chart className='h-[1.5rem] w-[1.5rem]' />
						</Link>
						<p className='text-xs text-muted-foreground'>stats</p>
					</DropdownMenuItem>
					<DropdownMenuItem className='flex flex-col'>
						<Link
							href={'/profile'}
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
						>
							<User className='h-[1.5rem] w-[1.5rem]' />
						</Link>
						<p className='text-xs text-muted-foreground'>profile</p>
					</DropdownMenuItem>
					<DropdownMenuItem className='flex flex-col'>
						<Link
							href={'/settings'}
							className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
						>
							<Settings className='h-[1.5rem] w-[1.5rem]' />
						</Link>
						<p className='text-xs text-muted-foreground'>settings</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
};

export default NavMenu;