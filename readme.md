# Learning DENO v1.0 - Build simple REST API

* [x] What is DENO?
* [x] Install
    * [x] using scoop to install, my env is Win10
    with power shell: `iwr -useb get.scoop.sh | iex`
    * [x] install deno
    execute this: `scoop install deno` or for more specific version, `scoop install deno@version`
* [x] Create `hello world!`
    * [x] run success with `deno run fileName.ts`
* [ ] Build REST API - CRUD operation
    * Determine what to use:
    * [x] Framework
        * using OAK framework as REST - `https://oakserver.github.io/oak/`
    * [ ] Logger
    * [ ] CORS
    * [x] Environment Variable
        * need to set export: true on config function
    * [x] Db driver
        * using mongo DB on version v0.8.0 which compatible with dino version 1.0.5
        * make sure to start service of mongo on workspace
        * start with command: `deno run --allow-net --allow-env --allow-read --allow-write --allow-plugin --unstable .\main.ts`
    * [ ] File watcher for auto reaload on every changes
* [ ] POST /dinosaurs
    * Create a dinosaur
* [X] GET /dinosaurs
    * List all dinosaurs
* [ ] PATCH /dinosaurs/:id
    * Update a dinosaur by id
* [ ] DELETE /dinosaurs/:id
    * Delete a dinosaur by id