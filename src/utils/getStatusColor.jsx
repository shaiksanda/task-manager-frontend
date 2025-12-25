export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "green";
    case "pending":
      return "orange";
    case "missed":
      return "red";
    default:
      return "gray";
  }
};
