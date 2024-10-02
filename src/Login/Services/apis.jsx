import axiosInstance from "../../axiosInstance";


export async function authLogin(payload) {
    try {
        const response = await axiosInstance.post('/login', payload);
        console.log("Login response:", response);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function  authLogout(){
    return  (await axiosInstance.post("/logout", []))
}

export async function authRegister(payload) {
    console.log(payload)
    try {
        const response = await axiosInstance.post('/register', payload);
        console.log("Registration response:", response);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}
