import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavBar() {
	return (
		<Navbar isBordered height='7vh'>
			<NavbarBrand>
				<p className="hidden font-bold text-inherit">Transportify</p>
			</NavbarBrand>
			<NavbarContent className="sm:flex gap-4" justify="center">
				<NavbarItem isActive>
					<Link>
						Mapa
					</Link>
				</NavbarItem>
				<NavbarItem >
					<Link color="foreground" href="#">
						Buses Cercanos
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
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
