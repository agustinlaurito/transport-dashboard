import NavBar from "@/components/NavBar";



export default function Layout({ children }) {


	return(
		<div>
			<NavBar />
			<div>
				{children}
			</div>

		</div>
	)

};
