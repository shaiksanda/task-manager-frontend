export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "green";
    case "pending":
      return "red";
    default:
      return "gray";
  }
};
