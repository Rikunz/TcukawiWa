import axios from "axios";

export async function daring(command: string) {
    const response = await axios(`http://api.mautau.ga/${command}`, {
        method: "GET"
    });
    const datasend = response.data;
    console.log(datasend);
    return datasend;
}