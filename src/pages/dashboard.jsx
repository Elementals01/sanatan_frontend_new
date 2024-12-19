import axios from "axios";
import React, { Component, useEffect, useState } from "react";

function Dashboard() {
	var Api = `${process.env.REACT_APP_SERVER}dashboard`;
	var accessToken = localStorage.getItem("accessToken");
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	const [nodata, SetNodata] = useState(false);
	const [data, Setdata] = useState([]);
	const [pagescount, Setpages] = useState();
	async function fetchdata() {
		try {
			setloading(true);
			seterror(false);

			const response = await axios.get(Api, {
				withCredentials: true, // If your API requires cookies for authentication
			});

			Setdata(response.data);
			if (response.data.length === 0) {
				SetNodata(true);
			} else {
				SetNodata(false);
			}
		} catch (error) {
			seterror(true);
		} finally {
			setloading(false);
		}
	}

	useEffect(() => {
		fetchdata();
	}, []);

	if (loading) {
		return (
			<div>
				<span className="loader"></span>
			</div>
		);
	}
	if (IsError) {
		return (
			<div className="center">
				<h4>Unexpected Server Error</h4>
			</div>
		);
	}

	return (
		<div>
			<h1>Dashboard</h1>

			<div className="cards-group dash">
				<div className="Card shade-red ">
					<div className="card-icon">
						<img src="/icons/dashboard/user.svg" alt="img" />
					</div>
					<span>Today's visitors</span>
					<h2>00</h2>
				</div>
				<div className="Card shade-red ">
					<div className="card-icon">
						<img src="/icons/dashboard/user-group.svg" alt="img" />
					</div>
					<span>Users</span>
					<h2>{data[0].users}</h2>
				</div>
				<div className="Card shade-purple ">
					<div className="card-icon">
						<img src="/icons/dashboard/file-01.svg" alt="img" />
					</div>
					<span>Pages</span>
					<h2>{data[0].pages}</h2>
				</div>
				<div className="Card shade-green">
					<div className="card-icon">
						<img src="/icons/dashboard/menu-square.svg" alt="img" />
					</div>
					<span>Category</span>
					<h2>{data[0].category}</h2>
				</div>
				<div className="Card shade-green">
					<div className="card-icon">
						<img
							src="/icons/dashboard/hierarchy-square-01.svg"
							alt="img"
						/>
					</div>
					<span>Sub Category</span>
					<h2>{data[0].subcategory}</h2>
				</div>
				<div className="Card shade-blue">
					<div className="card-icon">
						<img src="/icons/dashboard/charity.svg" alt="img" />
					</div>
					<span>Donation</span>
					<h2>{data[0].donation}</h2>
				</div>
				<div className="Card shade-green">
					<div className="card-icon">
						<img src="/icons/dashboard/invoice-03.svg" alt="img" />
					</div>
					<span>Invoices</span>
					<h2>{data[0].invoice}</h2>
				</div>
				<div className="Card shade-brown">
					<div className="card-icon">
						<img src="/icons/dashboard/Language.svg" alt="img" />
					</div>
					<span>Languages</span>
					<h2>{data[0].language}</h2>
				</div>
				<div className="Card shade-green">
					<div className="card-icon">
						<img src="/icons/dashboard/Blog.svg" alt="img" />
					</div>
					<span>Blogs</span>
					<h2>{data[0].blog}</h2>
				</div>
				<div className="Card shade-blue">
					<div className="card-icon">
						<img src="/icons/dashboard/folder-02.svg" alt="img" />
					</div>
					<span>Files</span>
					<h2>{data[0].file}</h2>
				</div>
				<div className="Card shade-purple">
					<div className="card-icon">
						<img src="/icons/dashboard/pdf-02.svg" alt="img" />
					</div>
					<span>Pdf</span>
					<h2>{data[0].pdfs}</h2>
				</div>
				<div className="Card shade-red">
					<div className="card-icon">
						<img src="/icons/dashboard/album-02.svg" alt="img" />
					</div>
					<span>Images</span>
					<h2>{data[0].images}</h2>
				</div>
				<div className="Card shade-blue">
					<div className="card-icon">
						<img src="/icons/dashboard/music-note-03.svg" alt="img" />
					</div>
					<span>Audio</span>
					<h2>{data[0].audio}</h2>
				</div>
				<div className="Card shade-olive">
					<div className="card-icon">
						<img src="/icons/dashboard/Component2.svg" alt="img" />
					</div>
					<span>Video</span>
					<h2>{data[0].video}</h2>
				</div>
				<div className="Card shade-red">
					<div className="card-icon">
						<img src="/icons/dashboard/Suggestion.svg" alt="img" />
					</div>
					<span>Feedbacks</span>
					<h2>00</h2>
				</div>
				<div className="Card shade-brown">
					<div className="card-icon">
						<img src="/icons/dashboard/Question-mark.svg" alt="img" />
					</div>
					<span>Question & Answers</span>
					<h2>00</h2>
				</div>
				<div className="Card shade-blue">
					<div className="card-icon"></div>
					<span>Forums</span>
					<h2>00</h2>
				</div>
				<div className="Card shade-blue">
					<div className="card-icon"></div>
					<span>Forum Channels</span>
					<h2>00</h2>
				</div>
			</div>
			<div className="center mb-10"></div>
		</div>
	);
}

export default Dashboard;
