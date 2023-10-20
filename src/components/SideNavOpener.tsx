'use client';

import useResize, { ElementSize } from '@/hooks/useResize';
import { Menu } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@/redux/store';
import { openSideBar } from '@/redux/actions/appAction';

type SideNavOpenerProps = {
	pageIcon: JSX.Element;
};

const SideNavOpener: FC<SideNavOpenerProps> = ({ pageIcon }) => {
	const isOpen = useSelector<ReduxState, boolean>(
		(state) => state.app.isSideBarOpen
	);
	const dispatch = useDispatch();

	const icon = isOpen ? pageIcon : <Menu />;

	const handleOpenSideNav = useCallback(() => {
		dispatch(openSideBar());
	}, [dispatch]);

	return (
		<div className='w-6 h-6 cursor-pointer' onClick={handleOpenSideNav}>
			{icon}
		</div>
	);
};

export default SideNavOpener;
