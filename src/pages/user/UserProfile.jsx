import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile({ id }) {
	const [data, setData] = useState(1);
	async function fetchdata() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER}users/${id}`
			);
			console.log(res);

			setData(res.data);
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);
	return (
		<div style={{ marginBottom: "30px" }}>
			<div className="card-700">
				<h1>Profile</h1>
				<hr style={{ margin: "20px", color: "#8F95B2" }} />
				<span style={{ padding: "20px", color: "#8F95B2" }}>
					ABOUT
				</span>

				<div className="user-info-card">
					<div className="user-info-item">
						<img src="/icons/svg/usericon.svg" alt="" />
						<span>{data.fullName}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/user-circle.png" alt="" />
						<span>@{data.username}</span>
					</div>

					<div className="user-info-item">
						<img src="/icons/svg/gender.svg" alt="" />
						<span>{}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/svg/calendar-03.svg" alt="" />
						<span>{}</span>
					</div>
				</div>
				<span style={{ padding: "20px", color: "#8F95B2" }}>
					CONTACT
				</span>
				<div className="user-info-card">
					<div className="user-info-item">
						<img src="/icons/svg/call.svg" alt="" />
						<span>{data.phone}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/svg/mail.svg" alt="" />
						<span>{data.email}</span>
					</div>
				</div>
				<span style={{ padding: "20px", color: "#8F95B2" }}>
					ADDRESS
				</span>
				<div className="user-info-card">
					<div className="user-info-item">
						<img src="/icons/svg/navigation.svg" alt="" />
						<span>{data.address}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/svg/location.svg" alt="" />
						<span>{data.city}</span>
					</div>

					<div className="user-info-item">
						<img src="/icons/svg/maps.svg" alt="" />
						<span>{data.state}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/svg/pin-location.svg" alt="" />
						<span>{data.pin}</span>
					</div>
					<div className="user-info-item">
						<img src="/icons/svg/globe.svg" alt="" />
						<span>{data.country}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
