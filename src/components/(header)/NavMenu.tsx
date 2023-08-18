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
	BarChartIcon as Stats,
	MagnifyingGlassIcon as Search,
} from '@radix-ui/react-icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { useSelectedLayoutSegment } from 'next/navigation';

interface NavMenuProps {}

const NavMenu = async ({}: NavMenuProps) => {
	const session = await getServerSession(authOptions);

	const navBarOptions = [
		{ name: 'home', href: '/', icon: Home },
		{ name: 'search', href: '/search', icon: Search },
		{ name: 'stats', href: '/stats', icon: Stats },
		{ name: 'profile', href: '/profile', icon: User },
		{ name: 'settings', href: '/settings', icon: Settings },
	];

	return (
		<nav>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='p-1'>
						<HamburgerMenuIcon className='h-7 w-10' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='center'>
					{navBarOptions.map((option, i) => (
						<DropdownMenuItem className='flex flex-col' key={i}>
							<Link
								href={option.href}
								className={cn(
									buttonVariants({ variant: 'ghost', size: 'icon' })
								)}
							>
								<option.icon className='h-[1.5rem] w-[1.5rem]' />
							</Link>
							<p className='text-xs text-muted-foreground'>{option.name}</p>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
};

export default NavMenu;
