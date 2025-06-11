export const getUserInfo = () => {
  const storage = localStorage.getItem("token") ? localStorage : sessionStorage;
  return {
    role: storage.getItem("role"),
    department: storage.getItem("department"),
  };
};
