# DxE Events

This project powers the events page on the DxE website.

# Development

To develop on DxE Events, you first need to get the mobile backend:
github.com/dxe/dxe_mobile_api. The mobile API backend must be running
locally so you can fetch events from it.

Then run `npm run start` to start the dev server.

# Deployment

First, build the app by running `npm run build`. Then deploy it to
dokku by following the steps in the README.md at the root of this
repo.
