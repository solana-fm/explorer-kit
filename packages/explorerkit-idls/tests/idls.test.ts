import { describe, expect, it } from "vitest"; // <-- **

import { addIdlToMap, getProgramIdl, IdlRepository } from "../src";
import { getMultipleProgramIdls } from "../src/idls/IdlRepository";

describe("getProgramIdl", () => {
  it("should return null if the program does not have an idl", async () => {
    const idl = await getProgramIdl("BRGovFm72qvoE8MwWP1ipgefSuUvp5y2Vs7PoRM74Sth");
    expect(idl).toBeNull();
  });

  it("should return an idl from the cloud repository if the program has an idl", async () => {
    const idl = await getProgramIdl("KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD", {
      slotContext: 207849890,
    });
    expect(idl).not.toBeNull();
    expect(idl?.idlSlotVersion).toBe(207849880);
    expect(idl?.programId).toBe("KLend2g3cP87fffoy8q1mQqGKjrxjC8boSyAYavgmjD");
  });

  it("should return a local shank idl if the program exists in the local repository", async () => {
    const idl = await getProgramIdl("Stake11111111111111111111111111111111111111");
    expect(idl).not.toBeNull();
    expect(idl?.idlType).toBe("shank");
  });

  it("should return a local anchor idl if the program exists in the local repository", async () => {
    const idl = await getProgramIdl("EewxydAPCCVuNEyrVN68PuSYdQ7wKn27V9Gjeoi8dy3S");
    expect(idl).not.toBeNull();
    expect(idl?.idlType).toBe("anchor");
  });

  it("should return a local kinobi tree in string if the program exists in the local repository", async () => {
    const idl = await getProgramIdl("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
    expect(idl).not.toBeNull();
    expect(idl?.idlType).toBe("kinobi");
  });

  it("should return a historical idl if the program exists in the local repository", async () => {
    const idl = await getProgramIdl("ComputeBudget111111111111111111111111111111", { slotContext: 132784000 });
    expect(idl).not.toBeNull();
    expect(idl?.idlSlotVersion).toBe(134784000);
  });

  it("should return the most recent idl if the program exists in the local repository", async () => {
    const idl = await getProgramIdl("ComputeBudget111111111111111111111111111111", { slotContext: 134784001 });
    expect(idl).not.toBeNull();
    expect(idl?.idlSlotVersion).toBe(134784001);
  });

  it("should be able to add an idl from the cloud repository to the local repository if the program has an idl", async () => {
    const idl = await getProgramIdl("hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492");
    const secondNewIdl = await getProgramIdl("9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF");
    if (idl && secondNewIdl) {
      const newRepoMap = addIdlToMap(IdlRepository, "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492", idl.idl, 190389568);
      const newIdl = await getProgramIdl(
        "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492",
        { slotContext: 192389568 },
        newRepoMap
      );

      expect(newIdl).not.toBeNull();
      expect(newIdl?.idlSlotVersion).toBe(190389568);
      expect(newRepoMap.size).toBe(IdlRepository.size + 1);

      addIdlToMap(newRepoMap, "9mn9Z2qWndBPr6qGyFbXJUEUHvjGFgmUUz5CrpBZ9WF", secondNewIdl.idl, 181607619);
      expect(newRepoMap.size).toBe(IdlRepository.size + 2);
    }
  });

  it("should be able to add an idl to the same program hash with a more recent slot", async () => {
    const idl = await getProgramIdl("hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492");
    if (idl) {
      const newRepoMap = addIdlToMap(IdlRepository, "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492", idl.idl, 189389568);
      addIdlToMap(newRepoMap, "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492", idl.idl, 193389568);
      const newIdl = await getProgramIdl(
        "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492",
        { slotContext: 192389568 },
        newRepoMap
      );

      expect(newIdl).not.toBeNull();
      expect(newIdl?.idlSlotVersion).toBe(189389568);
      expect(newRepoMap.size).toBe(IdlRepository.size + 1);
      expect(newRepoMap.get("hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492")?.size).toBe(2);
    }
  });

  it("should returns undefined when program ID is not found in the IDL repository map", async () => {
    const idl = await getProgramIdl("randomProgramID");
    expect(idl).toBeNull();
  });

  it("should returns the latest IDL when no slot is specified", async () => {
    const idl = await getProgramIdl("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.programId).toBe("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.idlSlotVersion).toBe(199472471);
  });

  it("should returns the IDL for the specified slot when it exists", async () => {
    const idl = await getProgramIdl("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB", {
      slotContext: 181955385,
    });
    expect(idl?.programId).toBe("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.idlSlotVersion).toBe(181955385);
  });

  it("should returns the latest IDL when the specified slot is not found", async () => {
    const idl = await getProgramIdl("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.programId).toBe("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.idlSlotVersion).toBe(199472471);
  });

  it("should returns the IDL for the closest slot when no exact match is found", async () => {
    const idl = await getProgramIdl("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB", {
      slotContext: 123,
    });
    expect(idl?.programId).toBe("JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB");
    expect(idl?.idlSlotVersion).toBe(141435143);
  });

  it("should returns the IDL for the only slot when there is only one", async () => {
    const idl = await getProgramIdl("24Uqj9JCLxUeoC3hGfh5W3s9FM9uCHDS2SG3LYwBpyTi");
    expect(idl?.programId).toBe("24Uqj9JCLxUeoC3hGfh5W3s9FM9uCHDS2SG3LYwBpyTi");
    expect(idl?.idlSlotVersion).toBe(201171086);
  });

  it("should return a cloud anchor idl if the idl has a metadata type", async () => {
    const idl = await getProgramIdl("9tKE7Mbmj4mxDjWatikzGAtkoWosiiZX9y6J4Hfm2R8H");
    expect(idl).not.toBeNull();
    expect(idl?.idlType).toBe("anchor");
  });

  it("should return a anchor 0.3.0 idl from the cloud repository", async () => {
    const idl = await getProgramIdl("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM");
    expect(idl).not.toBeNull();
    expect(idl?.idlType).toBe("anchorV1");
  });
});

describe("getMultipleProgramIdls", () => {
  it("should return an empty array if no program hashes are provided", async () => {
    const idls = await getMultipleProgramIdls([]);
    expect(idls).toEqual([]);
  });

  it("should return an array of IdlItems for the provided program hashes", async () => {
    const programHashes = [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY",
      "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg",
    ];
    const idls = await getMultipleProgramIdls(programHashes);
    expect(idls).toHaveLength(3);
    expect(idls[0]).toHaveProperty("programId", "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    expect(idls[1]).toHaveProperty("programId", "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY");
    expect(idls[2]).toHaveProperty("programId", "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg");
  });

  it("should return an array of IdlItems for the provided program hashes that involves searching the IDL repository", async () => {
    const programHashes = [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY",
      "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg",
      "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492",
    ];
    const idls = await getMultipleProgramIdls(programHashes);
    expect(idls).toHaveLength(4);
    expect(idls[0]).toHaveProperty("programId", "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    expect(idls[1]).toHaveProperty("programId", "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY");
    expect(idls[2]).toHaveProperty("programId", "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg");
    expect(idls[3]).toHaveProperty("programId", "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492");
  });

  it("should return only the IdlItems that could be fetched", async () => {
    const programHashes = [
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY",
      "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492",
      "nix9RErnQYXpuf329ntPgSzThogtfeyUempD7zDrnSH",
    ];
    const idls = await getMultipleProgramIdls(programHashes);
    expect(idls).toHaveLength(3);
    expect(idls[0]).toHaveProperty("programId", "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    expect(idls[1]).toHaveProperty("programId", "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY");
    expect(idls[2]).toHaveProperty("programId", "hgCTjkS8j9Vnwax7Jarooqrd4FqPWGGPN6VKp5ka492");
  });
});
