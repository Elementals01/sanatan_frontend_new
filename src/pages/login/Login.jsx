import React, { Component, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
function ReturnHome() {
	window.location.reload();
}

export default function Login() {
	const loginmodal = { email: "", password: "" };
	const [data, setdata] = useState(loginmodal);
	const [error, showerror] = useState(false);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setdata({ ...data, [name]: value });
		console.log(data);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			axios
				.post(`${process.env.REACT_APP_SERVER}auth/login`, data)

				.then((res) => {
					if (res.status === 200) {
						const data = res.data.data;

						const accessToken = data.accessToken;
						const refreshToken = data.refreshToken;
						// Store the token in local storage
						localStorage.setItem("accessToken", accessToken);
						localStorage.setItem("refreshToken", refreshToken);
						ReturnHome();
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) { }
	};
	return (
		<>
			<div>
				<div className="login-box">
					<div className="login-inputs">
						<div className="center">
							<img src="/logo.jpg" height={100} />
						</div>
						<div className="heading-box">
							<h1>Welcome To Sanatan Dharamaya</h1>
							<span>
								Enjoy our dashboard UI Kit that will kickstart your
								projects in a flash
							</span>
						</div>
						<div className="inputboxs">
							{" "}
							<div className="drop-col">
								<span>Email address</span>
								<input
									onChange={inputHandler}
									type="email"
									name="email"
								/>
								{error && (
									<div className="center mb-4">
										<span className="errortxt">
											Invalid Credentials.
										</span>
									</div>
								)}
							</div>
							<div className="drop-col">
								<span>Password</span>
								<input
									onChange={inputHandler}
									name="password"
									id="pass"
								/>
								{error && (
									<div className="center mb-4">
										<span className="errortxt">
											Invalid Credentials.
										</span>
									</div>
								)}
							</div>
						</div>

						<button onClick={handleSubmit} className="addButton">
							Sign In
						</button>
					</div>
					<div className="login-img">
						<img src="/login-img.jpeg" alt="login-image" />
					</div>
				</div>
			</div>
		</>
	);
}
