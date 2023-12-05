import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../logo.png';

import { useAuthContext } from '../../hooks/useAuthContext';

import './Navbar.css';

const HomeNavbar = () => {
	const { user } = useAuthContext();

	const location = useLocation();

	const { dispatch } = useAuthContext();

	const handleClick = () => {
		// remove user from storage
		localStorage.removeItem('user');

		// dispatch logout action
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<>
			<Navbar
				className='navbar-color'
				variant='dark'
			>
				<Container className='navbar-container'>
					<Navbar.Brand
						as={Link}
						to='/'
					>
						<img
							alt='{ KodeSnip }'
							src={Logo}
							className='logo-img'
						></img>
					</Navbar.Brand>

					{/* custom navbar for home page if user is not logged in */}
					{location.pathname === '/' && !user && (
						<Nav className='d-flex'>
							<Nav.Link
								as={Link}
								to='/register'
							>
								Register
							</Nav.Link>
							<Nav.Link
								as={Link}
								to='/login'
							>
								Login
							</Nav.Link>
						</Nav>
					)}

					{/* custom navbar for home page if user if logged in */}
					{location.pathname === '/' && user && (
						<Nav className='d-flex'>
							<NavDropdown
								title={
									user && user.newUser
										? user.newUser.name
										: user && user.checkUser
										? user.checkUser.name
										: 'User'
								}
								id='basic-nav-dropdown'
							>
								<NavDropdown.Item
									as={Link}
									to='/new'
								>
									New Codeshare
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									to='/codes'
								>
									Your Codeshares
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									to='/delete'
								>
									Delete Account
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									to='/codes'
									onClick={handleClick}
								>
									Log Out
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}

					{/* custom navbar for dashboard */}
					{location.pathname === '/codes' && user && (
						<Nav className='d-flex'>
							<NavDropdown
								title={
									user && user.newUser
										? user.newUser.name
										: user && user.checkUser
										? user.checkUser.name
										: 'User'
								}
								id='basic-nav-dropdown'
							>
								<NavDropdown.Item
									as={Link}
									to='/new'
								>
									New Codeshare
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									to='/delete'
								>
									Delete Account
								</NavDropdown.Item>
								<NavDropdown.Item
									as={Link}
									onClick={handleClick}
								>
									Log Out
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}

					{/* custom navbar for new document creation page */}
					{location.pathname === '/new' && (
						<Nav className='d-flex'>
							<button
								type='submit'
								style={{
									background: 'none',
									border: 'none',
									padding: '0',
									textDecoration: 'none',
									cursor: 'pointer',
									color: 'white',
								}}
							>
								Save
							</button>
						</Nav>
					)}
				</Container>
			</Navbar>
		</>
	);
};

export default HomeNavbar;
