import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomReactQuery = (path) => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				setError(false);
				const response = await axios.get(path);
				setData(response.data);
				setLoading(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		})();
	});
	return [data, error, loading];
};

export default CustomReactQuery;
