# calculator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Test
### Ошибка "regeneratorRuntime is not defined" возникает при попытке транспилировать код, содержащий асинхронные функции
### (async/await), для поддержки старых браузеров.

### Решение 1:
### Отказаться от поддержки старых браузеров, поддерживать только 2 последние версии Chrome и Firefox, где async/await поддерживается нативно. Для этого можно использовать @babel/preset-env.

npm install --save-dev @babel/preset-env
yarn add @babel/preset-env -D

## package.json:
{
 "browserslist": [
 "last 2 Chrome versions",
 "last 2 Firefox versions"
  ],
  "babel": {
    "presets": [
      [
        "@babel/preset-env"
      ]
    ]
  }
}

### Решение 2: 
### Использовать @babel/plugin-transform-runtime.

npm install --save-dev @babel/plugin-transform-runtime
yarn add @babel/plugin-transform-runtime -D

### package.json:

"babel": {
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

