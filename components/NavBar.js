'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";


export default function NavBar() {

	const pathname = usePathname();

	return (
		<Navbar isBlurred height='7vh'>
			<NavbarBrand>
				<p className="hidden font-bold text-inherit">Transportify</p>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-4" justify="center">
				<NavbarItem isActive={pathname.includes('map')}>
					<Link color={pathname.includes('map') ? 'foreground' : 'primary'} href="/aplication/map">
						Mapa
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname.includes('buses')}>
					<Link color={pathname.includes('buses') ? 'foreground' : 'primary'} href="/aplication/buses">
						Buses Cercanos
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname.includes('stops')}>
					<Link color={pathname.includes('stops') ? 'foreground' : 'primary'} href="/aplication/stops" >
						Paradas Cercanas
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				{/* <NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem> */}
			</NavbarContent>
		</Navbar>
	);
}
