# Explorer Kit Server

Build & watch

```
pnpm dev
```

Start Dev Server with hot reloading

```
pnpm dev-serve
```

Start server

```
pnpm serve
```

Example requests

```
curl --location 'http://localhost:3000/decode/accounts' --header 'Content-Type: application/json' --data '{
    "accounts": [
        {
            "ownerProgram": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "data": "/NFB6YMsrxCtkXSVyg8nG1spPNRwJ+pzcAftQOs5oL0mA+FEPRpnATHIUtp5LuY9RJEScraeiSf6ghxvpIcl2eGPjQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        }
    ]
}'
```

```
curl --location 'http://localhost:3000/decode/transactions' --header 'Content-Type: application/json' --data '{
    "transactions": ["B8WHcXetQ5nZKHNhZFK6NYeyL9whFEczxqSXn8m8Gy7LvjwrNYgKT6Wm2ZuXu76cbZc1Nj2DX8N83h7AsaJ4fHQUFx2nEXqQM22iKT1oBkWSimnRXGT1k2JQBr45kgpC5JFgxYYHkKd2s6f6hfxby4uh2JPTzv3j3vt8BwZEbF6x9jqZUo3385RYCPFz44nbTtDZ8mN34pv2ZvpH7RoAf5QvjofAWzUG97sDa4rtaaemMR6tQsuZRDd3oJ7btm1kLtHRxmZDiL2aHNY5rkRTRbWEVm1tDyjWB5c7KxGBBKNH5u2ztQcAZSp7Dstiyn4cqjZEBVNd3vAQY6n61sutfYPGN5xxgrgxV6EkjpASFKt7PzHRSvpEonLUHHKB955ZHbnbNXSvUp9vv4vD5Xji3FY86TT9SYRRSrs2NJ6dD66NB1MSEoPnhmKRtmM1coh"]
}'
```

For example responses, see the [tests](./tests/server.test.ts).
