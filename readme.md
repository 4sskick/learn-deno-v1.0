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
    * [ ] Framework
        * [ ] Logger
        * [ ] CORS
    * [ ] Environment Variable
    * [ ] Db driver
    * [ ] File watcher for auto reaload on every changes
* [ ] POST /dinosaurs
    * Create a dinosaur
* [ ] GET /dinosaurs
    * List all dinosaurs
* [ ] PATCH /dinosaurs/:id
    * Update a dinosaur by id
* [ ] DELETE /dinosaurs/:id
    * Delete a dinosaur by id