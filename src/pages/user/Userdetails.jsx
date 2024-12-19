import React, { useEffect, useState } from "react";
import "../../css/user/user.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Usercollection from "./Usercollection";
import Userwishlist from "./Userwishlist";
import Userdonation from "./Userdonation";
import UserProfile from "./UserProfile";
function Userdetails() {
	const { id } = useParams();
	const [tab, setTab] = useState(1);
	const [data, setData] = useState(1);
	async function fetchdata() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER}users/${id}`
			);
			setData(res.data);
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);
	return (
		<div>
			<h1>User Details</h1>

			<div className="banner-container">
				<div className="user-banner">
					<div className="userpic-col">
						<div className="userpic-in-banner"></div>
						<span>{data.fullName}</span>
					</div>
				</div>
			</div>

			<div className="user-cards-group">
				<div className="card-340">
					<strong>Account Settings</strong>
					<div
						style={{
							backgroundColor:
								tab === 1 ? "rgba(255, 166, 0, 0.13)" : "transparent",
						}}
						className="users-sidebar-tab"
						onClick={() => setTab(1)}>
						<div
							style={{
								backgroundColor: "rgb(244 196 48 / 10%)",
								borderRadius: "100%",
								width: "40px",
								height: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<img src="/icons/svg/Edit.svg" alt="img" />
						</div>
						<span>Profile</span>
					</div>
					<div
						className="users-sidebar-tab"
						style={{
							backgroundColor:
								tab === 2 ? "rgba(255, 166, 0, 0.13)" : "transparent",
						}}
						onClick={() => setTab(2)}>
						<div
							style={{
								backgroundColor: "rgb(0 212 252 / 10%)",
								borderRadius: "100%",
								width: "40px",
								height: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<img src="/icons/Collection.png" alt="img" />
						</div>
						<span>Collection</span>
					</div>
					<div
						className="users-sidebar-tab"
						style={{
							backgroundColor:
								tab === 3 ? "rgba(255, 166, 0, 0.13)" : "transparent",
						}}
						onClick={() => setTab(3)}>
						<div
							style={{
								backgroundColor: "rgb(252 0 0 / 10%)",
								borderRadius: "100%",
								width: "40px",
								height: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<img src="/icons/love.svg" alt="img" />
						</div>{" "}
						<span>Wishlist</span>
					</div>
					<div
						className="users-sidebar-tab"
						style={{
							backgroundColor:
								tab === 4 ? "rgba(255, 166, 0, 0.13)" : "transparent",
						}}
						onClick={() => setTab(4)}>
						<div
							style={{
								backgroundColor: "rgb(0 212 252 / 10%)",
								borderRadius: "100%",
								width: "40px",
								height: "40px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<img src="/icons/history.png" alt="img" />
						</div>
						<span>Donation History</span>
					</div>
				</div>
				{tab === 1 && <UserProfile id={id} />}
				{tab === 2 && <Usercollection id={data._id} />}
				{tab === 3 && <Userwishlist id={data._id} />}
				{tab === 4 && <Userdonation id={data._id} />}
			</div>
		</div>
	);
}

export default Userdetails;
