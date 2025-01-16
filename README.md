# M346

## Setup

    $ hugo new site m346.frickelbude.ch
    $ cd m346.frickelbude.ch
    $ hugo mod init m346.frickelbude.ch

Add the following to `hugo.toml`:

    [module]
      [[module.imports]]
        path = 'github.com/McShelby/hugo-theme-relearn'

Run:

    $ hugo server --disableFastRender --ignoreCache --noHTTPCache

## Adding Content

Add a home page:

    $ hugo new --kind home _index.md

Add a chapter:

    $ hugo new --kind chapter admin/_index.md

Add a page:

    $ hugo new admin/hanok.md

# Deployment

    $ rsync -av public/ --exclude 'js/mathjax' --exclude 'js/swagger-ui' debian@91.92.155.156:/home/m346.frickelbude.ch/public/
