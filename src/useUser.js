import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const fetchUser = async () => {
    const token = window.localStorage.getItem("token");
    return await axios("https://localhost:5001/identity/user", {
        headers: {
            "Authorization": `Bearer ${token && JSON.parse(token)}`
        }
    })
}

const useUser = () => {
    const [user, setUser] = useState(null);
    const { data, isLoading, isError, refetch } = useQuery("user", fetchUser);

    useEffect(() => {
        if (!data || !data.data) return;
        setUser(data.data)
    }, [data])

    const storeToken = (token) => {
        window.localStorage.setItem("token", JSON.stringify(token))
        refetch();
    }

    return {
        user,
        isLoading,
        isError,
        storeToken
    };
};

export default useUser;
