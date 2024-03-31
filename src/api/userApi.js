export const fetchUserData = async () => {
    const response = await fetch("/data.json");
    const Users=  response.json();
    return Users;
    };