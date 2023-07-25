//'use client'

import { getServerSession } from 'next-auth';
import { useRouter } from 'next/navigation';

interface profileProps {
	params: { username: string };
}

const Profile = ({ params }: profileProps) => {
	return <div>{params.username}</div>;
};

export default Profile;
