import { Application, Router, Context, send } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { encode, decode, Type } from './1062/mod.ts';


const db = new DB("db.sqlite");
db.query("CREATE TABLE IF NOT EXISTS urls (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT,url TEXT)");
const app = new Application();
const port = 8080;

const router = new Router();
router
    .get("/:code", async ({ request, response, params }: Context | any) => {
        const { code } = params;
        const res = await db.query("select id,url from urls where code = :code limit 0,1", { code });
        // 
        for (const [id, url] of res) {
            console.log(id, url)
            if (url) {
                response.redirect(url);
            }
        }
        response.body = "404";
    })
    .post("/", async ({ request, response, params }: Context | any) => {
        const { url, type } = await request.body({ type: 'json' }).value;
        if (type in Type) {
            await db.query("INSERT INTO urls (url) VALUES (:url)", { url: url });
            const lastid = await db.lastInsertRowId;
            console.log(lastid);
            const str = encode(lastid, type);
            console.log(str);
            await db.query("UPDATE urls SET code = :code where id=:id", { code: str, id: lastid });
            response.body = str;
        } else {
            response.body = "type error";
        }

    })

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener('listen', () => {
    console.log(`Listening on: localhost:${port}`);
});

app.listen({ port: port });