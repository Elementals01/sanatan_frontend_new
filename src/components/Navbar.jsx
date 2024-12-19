import React, { Component } from "react";
import Logo from "./logo";

export class Navbar extends Component {
	render() {
		return (
			<div className="nav">
				<Logo />
				<ul className="navbar">
					<li className="nav-items">
						<div className="blursearch">
							<input
								className="search"
								placeholder="Search"
								type="search"
								name="searchbar"
								id="searchbar"
							/>
							<img alt="" src="/icons/svg/search.svg" />
						</div>
					</li>
					<li className="langbtn nav-items">
						<button className="language-icon">
							<img alt="" src="/icons/svg/Language.svg" />
						</button>{" "}
						English
					</li>
					<li className="nav-items">
						{" "}
						<button className="bell-icon">
							<img alt="" src="/icons/svg/notification-03.svg" />
						</button>
					</li>
					<li className="nav-items">
						<img
							className="profile-pic"
							src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
							alt=""
						/>
					</li>
				</ul>
			</div>
		);
	}
}

export default Navbar;
