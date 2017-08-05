# static
This repo uses the [nginx buildpack](https://github.com/dokku/buildpack-nginx) to serve static files with dokku.

# deployment

First, add the dokku project "static" as a remote repo.

```
git remote add dokku dokku@dxetech.org:static
```

Then, push your changes with `git push dokku master`.

