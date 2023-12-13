import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../src/server";

describe("Server API Tests", () => {
  it("Decodes accounts correctly", async () => {
    const res = await request(app)
      .post("/decode/accounts")
      .send({
        accounts: [
          {
            ownerProgram: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            data: "/NFB6YMsrxCtkXSVyg8nG1spPNRwJ+pzcAftQOs5oL0mA+FEPRpnATHIUtp5LuY9RJEScraeiSf6ghxvpIcl2eGPjQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      decodedAccounts: [
        {
          error: null,
          decodedData: {
            name: "tokenAccount",
            data: {
              mint: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
              owner: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
              amount: "93163489",
              delegate: null,
              accountState: {
                enumType: "initialized",
              },
              isNative: null,
              delegatedAmount: "0",
              closeAuthority: null,
            },
            type: "account",
          },
        },
      ],
    });
  });

  it("Decodes transactions correctly", async () => {
    const res = await request(app)
      .post("/decode/transactions")
      .send({
        transactions: [
          "B8WHcXetQ5nZKHNhZFK6NYeyL9whFEczxqSXn8m8Gy7LvjwrNYgKT6Wm2ZuXu76cbZc1Nj2DX8N83h7AsaJ4fHQUFx2nEXqQM22iKT1oBkWSimnRXGT1k2JQBr45kgpC5JFgxYYHkKd2s6f6hfxby4uh2JPTzv3j3vt8BwZEbF6x9jqZUo3385RYCPFz44nbTtDZ8mN34pv2ZvpH7RoAf5QvjofAWzUG97sDa4rtaaemMR6tQsuZRDd3oJ7btm1kLtHRxmZDiL2aHNY5rkRTRbWEVm1tDyjWB5c7KxGBBKNH5u2ztQcAZSp7Dstiyn4cqjZEBVNd3vAQY6n61sutfYPGN5xxgrgxV6EkjpASFKt7PzHRSvpEonLUHHKB955ZHbnbNXSvUp9vv4vD5Xji3FY86TT9SYRRSrs2NJ6dD66NB1MSEoPnhmKRtmM1coh",
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      decodedAccounts: [
        {
          error: null,
          decodedInstructions: [
            {
              name: "setComputeUnitPrice",
              data: {
                discriminator: 3,
                computeUnitPrice: 50000,
              },
              type: "instruction",
            },
            {
              name: "setComputeUnitLimit",
              data: {
                discriminator: 2,
                computeUnitLimit: 200000,
              },
              type: "instruction",
            },
            {
              name: "authorize",
              data: {
                discriminator: 1,
                authorizePubkey: "CompuYiTmdxvHERMig9DKw1i8i1VpX4oMzgFoMd2LFrM",
                stakeAuthorize: {
                  enumType: "withdrawer",
                },
              },
              type: "instruction",
            },
          ],
        },
      ],
    });
  });
});
