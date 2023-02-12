import { EnkaNetwork } from "enkanetwork";
const enka = new EnkaNetwork({ language: "EN", caching: true });

export async function enkashin(id: number) {
    const user = await enka.fetchUser(id);
    const result = user.player
    const enka_result = {
      nickname: result.nickname,
      signature: result.signature,
      level: result.level,
      nameCard: result.nameCard,
      achievements: result.achievements,
      abyssFloor: result.abyssFloor,
      abyssLevel: result.abyssLevel,
    };
    return enka_result;
}