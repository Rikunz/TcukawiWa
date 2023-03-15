import { Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";
import { daring } from "../../util/daring.js";

export async function run(client: Client, message: Message) {
    const { args } = client.parseMessage(message);
    const data = await daring(args[0]);
    const datasend = caption(data);
    for (var i = 0; i < datasend.length; i++) {
        client.clientInstances?.sendImage(message.chatId, datasend[i][1], `${i}.jpg`, datasend[i][0]);
    }


}

function caption(data: any) {
    const allcapt = [];
    for (const id in data) {
        var jenis = data[id].Jenis ? data[id].Jenis : data[id].jenis;
        if (jenis.search("Tugas") != -1) {
            allcapt.push([`*Id =* ${id}\n*Jenis =* ${jenis}\n*Deskripsi =* ${data[id].Deskripsi}\n*Dosen =* ${data[id].Dosen}\n*Jurusan =* ${data[id].Jurusan}\n*Matkul =* ${data[id].Matkul}\n*Status =* ${data[id].Status}\n*Waktu Mulai =* ${data[id]["Waktu mulai"]}\n*Waktu Post =* ${data[id].waktu_post}`, data[id].ss_link]);
        }
        else if (jenis.search("Diskusi") != -1) {
            allcapt.push([`*Id =* ${id}\n*Jenis =* ${jenis}\n*Bentuk Pembelajara =* ${data[id]["Bentuk Pembelajaran"]}\n*Deskripsi =* ${data[id].Deskripsi}\n*Dosen =* ${data[id].Dosen}\n*Indikator Kemampuan =* ${data[id]["Indikator Kemampuan"]}\n*Jurusan =* ${data[id].Jurusan}\n*Link =* ${data[id].Link ? data[id].Link : ""}\n*Materi Perkuliahan =* ${data[id]["Materi Perkuliahan"]}\n*Matkul =* ${data[id].Matkul}\n*Status =* ${data[id].Status}\n*Waktu Mulai =* ${data[id]["Waktu mulai  "]}\n*Waktu Selesai =* ${data[id]["Waktu selesai  "]}\n*Waktu Post =* ${data[id].waktu_post}`, data[id].ss_link]);
        }
        else if (jenis.search("Meeting") != -1) {
            allcapt.push([`*Id =* ${id}\n*Jenis =* ${jenis}\n*Bentuk Pembelajara =* ${data[id]["Bentuk Pembelajaran"]}\n*Deskripsi =* ${data[id].Deskripsi}\n*Dosen =* ${data[id].Dosen}\n*Indikator Kemampuan =* ${data[id]["Indikator Kemampuan"]}\n*Jurusan =* ${data[id].Jurusan}\n*Link =* ${data[id].Link ? data[id].Link : ""}\n*Materi Perkuliahan =* ${data[id]["Materi Perkuliahan"]}\n*Matkul =* ${data[id].Matkul}\n*Status =* ${data[id].Status}\n*Waktu Mulai =* ${data[id]["Waktu mulai  "]}\n*Waktu Selesai =* ${data[id]["Waktu selesai  "]}\n*Waktu Post =* ${data[id].waktu_post}`, data[id].ss_link]);
        }
        else if (jenis.search("Materi") != -1) {
            allcapt.push([`*Id =* ${id}\n*Jenis =* ${jenis}\n*Jurusan =* ${data[id].Jurusan}\n*Matkul =* ${data[id].Matkul}\n*Nama Pemgirim =* ${data[id]["Nama Pengirim"]}\n*Status =* ${data[id].Status}\n*Waktu Post =* ${data[id].waktu_post}`, data[id].ss_link]);
        }
    }
    console.log(allcapt);
    return allcapt;
}


export const name = "daring";
export const description = "informasi daring";
export const alias = ["daring"];