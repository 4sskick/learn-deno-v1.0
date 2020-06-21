# Learning DENO v1.0 - Build simple REST API

* [x] What is DENO?
* [x] Install
    * [x] using scoop to install, my env is Win10
    with power shell: `iwr -useb get.scoop.sh | iex`
    * [x] install deno
    execute this: `scoop install deno` or for more specific version, `scoop install deno@version`
* [x] Create `hello world!`
    * [x] run success with `deno run fileName.ts`
* [ ] Build REST API - CRUD operation folder `REST-dinosaurs`
    * Determine what to use:
    * [x] Framework
        * using OAK framework as REST - `https://oakserver.github.io/oak/`
    * [ ] Logger
    * [ ] CORS
    * [x] Environment Variable
        * need to set export: true on config function
    * [x] Db driver
        * mongo DB on version [v0.8.0](https://github.com/manyuanrong/deno_mongo/tree/v0.8.0) which compatible dino version 1.0.5
        * make sure to:
            * start service of mongo on workspace - [can see here for short script](https://gist.github.com/4sskick/d600f7988e1ca64b01cb055de750b199)
            * stop service [can see here for short script](https://gist.github.com/4sskick/4ae35869e506d1a625585acfe9998006)
        * start with command: `deno run --allow-net --allow-env --allow-read --allow-write --allow-plugin --unstable .\main.ts`
    * [ ] File watcher for auto reaload on every changes
* [x] POST /dinosaurs
    * Create a dinosaur
* [X] GET /dinosaurs
    * List all dinosaurs
* [ ] PATCH /dinosaurs/:id
    * Update a dinosaur by id
* [ ] DELETE /dinosaurs/:id
    * Delete a dinosaur by id