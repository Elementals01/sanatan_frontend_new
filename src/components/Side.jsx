import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./../css/Navbar.css";
import Logo from "./logo";
export class Sidebar extends Component {
	render() {
		return (
			<div>
				<div className="sidebar">
					<ul className="menu-items">
						<NavLink to="/">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Icon.svg" />
									<span>Dashboard</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/users">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Users.svg" />
									<span>Users</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/category">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Category.svg" />
									<span>Category</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/languages">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Languages.svg" />
									<span>Languages</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/pages">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Pages.svg" />
									<span>Pages</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/blogs">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Blogs.svg" />
									<span>Blog</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/donations">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Donation.svg" />
									<span>Donation</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/invoices">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Invoices.svg" />
									<span>Invoices</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/whatsnew">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/New.svg" />
									<span>What's New</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/herobanner">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Hero.svg" />
									<span>Hero Banner</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/notification">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Notification.svg" />
									<span>Notification</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/cardstyle">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Cards.svg" />
									<span>Card Style</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/pagestyle">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Pagestyle.svg" />
									<span>Page Style</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/filemanager">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Files.svg" />
									<span>File Manager</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/socialmedia">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Social.svg" />
									<span>Social Media</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/feedback">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Feedback.svg" />
									<span>Feedback</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/applanguages">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Applanguage.svg" />
									<span>App Language</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/menubuilder">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Social.svg" />
									<span>App Menu Builder</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/faq">
							<li className="sidebar-tabs">
								<div>
									<img src="/icons/svg/FAQ.svg" />
									<span>FAQ</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
						<NavLink to="/authpage">
							<li
								style={{ marginBottom: "70px" }}
								className="sidebar-tabs">
								<div>
									<img src="/icons/svg/Auth.svg" />
									<span>Authentication</span>
								</div>
								<FontAwesomeIcon icon={faAngleRight} />
							</li>{" "}
						</NavLink>
					</ul>
				</div>
			</div>
		);
	}
}

export default Sidebar;
