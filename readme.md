# denoshort

short your url

## start

```
deno run --allow-read --allow-write --allow-run main.ts
```

## dev
deno run --allow-read --allow-write --allow-run https://deno.land/x/live_reload@0.0.3/reload.ts --main=main.ts

## post a url

post as default type
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"url":"https://deno.land","type":"default"}' \
  http://localhost:8080
```

post as chinese type
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"url":"https://deno.land","type":"chinese"}' \
  http://localhost:8080
```

post as emoji type
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"url":"https://deno.land","type":"emoji"}' \
  http://localhost:8080
```

return like:
```
xxx
```

then get

```
http://localhost:8080/xxx
```

xxx is that you post return reponse data
