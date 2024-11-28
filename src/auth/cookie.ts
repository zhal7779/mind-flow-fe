import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const getCookie = () => cookies.get("auth_info");
