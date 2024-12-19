const STATUS_ACTIVE = {
	id: "STATUS_ACTIVE",
	name: "Active",
	color: "#FF754C",
	bgcolor: "#FFEBF6",
};
const STATUS_INACTIVE = {
	id: "STATUS_INACTIVE",
	name: "Inactive",
	color: "#6C5DD3",
	bgcolor: "#F8F7FD",
};
const STATUSES = [STATUS_ACTIVE, STATUS_INACTIVE];

const StatusCell = ({ getValue, row, column, table }) => {
	const value = getValue() || {};

	//const { updateData } = table.options.meta;
	return (
		<>
			<select
				name="status"
				className={`tablestatus ${value}`}
				disabled={true}
				value={value}>
				{STATUSES.map((status, i) => (
					<option
						key={i}
						style={{
							background: status.bgcolor,
							color: status.color,
						}}
						//	onClick={() => updateData(row.index, column.id, status)}
						value={status.id}>
						{status.name}
					</option>
				))}
			</select>
		</>
	);
};
export default StatusCell;
