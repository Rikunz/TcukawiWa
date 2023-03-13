import { Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";
import { daring } from "../../util/daring.js";

export async function run(client: Client, message: Message) {
    const { args } = client.parseMessage(message);
    const data = await daring(args[0]);
    const datasend = caption(data);
    function sendData(value: any) {
        wait(2000);
        client.clientInstances?.sendText(message.chatId, value);
    }
    datasend.forEach(sendData);

}

function caption(data: any) {
    const allcapt = [];
    for (const id in data) {
        console.log(data[id]);
        var jenis = data[id].Jenis ? data[id].Jenis : data[id].jenis;
        if (jenis.search("Tugas") != -1) {
            allcapt.push([
                `*Id =* ${id}\n*Jenis =* ${jenis}\n*Deskripsi =* ${data[id].Deskripsi}\n*Dosen =* ${data[id].Dosen}\n*Jurusan =* ${data[id].Jurusan}\n*Matkul =* ${data[id].Matkul}\n*Status =* ${data[id].Status}\n*Waktu Mulai =* ${data[id]["Waktu mulai"]}
            `], [data[id].ss_link]);
        }
        else if (jenis.search("Meeting") != -1) {
            allcapt.push([
                `*Id =* ${id}\n*Jenis =* ${jenis}\n*Bentuk Pembelajara =* ${data[id]["Bentuk Pembelajaran"]}\n*Deskripsi =* ${data[id].Deskripsi}\n*Dosen =* ${data[id].Dosen}\n*Indikator Kemampuan =* ${data[id]["Indikator Kemampuan"]}\n*Jurusan =* ${data[id].Jurusan}\n*Link =* ${data[id].Link ? data[id].Link : ""}\n*Materi Perkuliahan =* ${data[id]["Materi Perkuliahan"]}\n*Matkul =* ${data[id].Matkul}\n*Status =* ${data[id].Status}\n*Waktu Mulai =* ${data[id]["Waktu mulai  "]}\n*Waktu Selesai =* ${data[id]["Waktu selesai  "]}
            `], [data[id].ss_link]);
        }
        else if (jenis.search("Meeting") != -1) {
            allcapt.push([
                `*Id =* ${id}\n*Jenis =* ${jenis}\n*Jurusan =* ${data[id].Jurusan}\n*Matkul =* ${data[id].Matkul}\n*Nama Pemgirim =* ${data[id]["Nama Pengirim"]}\n*Status =* ${data[id].Status}
            `], [data[id].ss_link]);
        }
    }
    console.log(allcapt);
    return allcapt;
}

function wait(ms: number) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
};

export const name = "daring";
export const description = "informasi daring";
export const alias = ["daring"];