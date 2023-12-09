# 「ロケみる集会」共通コンポーネント置き場

This is a sample UI component

## develop component

```bash
docker compose run --rm web yarn install
docker compose up
```

## build component

```bash
docker compose run --rm web yarn build
docker compose run --rm web npm version patch
docker compose run --rm web npm publish
```

## build storybook

```bash
docker compose run --rm web yarn build-storybook
```
