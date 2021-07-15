import axios from "axios";

export const getVideoAsync = async (url: string) => {

    return await axios.get(url);
};
