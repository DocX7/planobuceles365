# Família na Palavra

Aplicativo simples para GitHub Pages com plano anual de leitura bíblica em ordem cronológica, perfis Marcus/Ingrid, progresso salvo no navegador e área infantil do Arthur.

## Versão atual

O app já está preparado para exibir o texto bíblico completo da ACF a partir do arquivo:

```txt
data/biblia-acf.json
```

Esse arquivo foi gerado a partir do CSV `1. Bíblia ACF(1).csv` enviado no ChatGPT.

## Arquivos do app

```txt
index.html
styles.css
app.js
manifest.webmanifest
service-worker.js
assets/icon.svg
data/README.md
.nojekyll
```

## Para completar a Bíblia no GitHub

Suba manualmente o arquivo `biblia-acf.json` dentro da pasta `data/`.

O caminho final precisa ficar assim:

```txt
data/biblia-acf.json
```

Depois disso, o app carregará automaticamente o texto bíblico completo dos capítulos do dia.

## Publicar no GitHub Pages

1. Acesse `Settings > Pages`.
2. Escolha `Deploy from a branch`.
3. Selecione `main` e `/root`.
4. Salve e aguarde o link do GitHub Pages.
