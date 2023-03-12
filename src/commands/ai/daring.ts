import { Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";
import { daring } from "../../util/daring.js";

export async function run(client: Client, message: Message) {
    const { args } = client.parseMessage(message);
    console.log(args[0]);
    const data = await daring(args[0]);
    const datasend = caption(data);
    datasend.forEach(sendData);
    function sendData(value: any) {
        wait(2000);
        client.clientInstances?.sendText(message.chatId, value);
    }
}

function caption(data: any) {
    const allcapt = [];
    for (var id in data) {
        if (data.jenis.search("Tugas") != -1) {
            allcapt.push(
                `Id = ${id} \n
            Jenis = ${data.Jenis} \n
            Deskripsi = ${data.Deskripsi} \n
            Dosen = ${data.Dosen} \n
            Jurusan = ${data.Jurusan} \n
            Matkul = ${data.Matkul} \n
            Status = ${data.Status} \n
            Waktu Mulai = ${data["Waktu mulai"]}
            `);
        }
        else if (data.jenis.search("Meeting") != -1) {
            allcapt.push(
                `Id = ${id} \n
            Jenis = ${data.Jenis} \n
            Bentuk Pembelajara = ${data["Bentuk Pembelajaran"]} \n
            Deskripsi = ${data.Deskripsi} \n
            Dosen = ${data.Dosen} \n
            Indikator Kemampuan = ${data["Indikator Kemampuan"]} \n
            Jurusan = ${data.Jurusan} \n
            Link = ${data.Link ? data.link : ""} \n
            Materi Perkuliahan = ${data["Materi Perkuliahan"]} \n
            Matkul = ${data.Matkul} \n
            Status = ${data.Status} \n
            Waktu Mulai = ${data["Waktu mulai"]}
            Waktu Selesai = ${data["Waktu selesai"]}
            `);
        }
        else if (data.jenis.search("Meeting") != -1) {
            allcapt.push(
                `Id = ${id} \n
                Jenis = ${data.Jenis} \n
                Jurusan = ${data.Jurusan} \n
                Matkul = ${data.Matkul} \n
                Nama Pemgirim = ${data["Nama Pengirim"]} \n
                Status = ${data.Status}
            `);
        }
    }
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