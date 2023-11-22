import NavBar from "@/components/NavBar";



export default function Layout({ children }) {


	return(
		<div>
			<NavBar />
			<div className="h-[97vh] overflow-y-auto">
				{children}
			</div>

		</div>
	)

};
