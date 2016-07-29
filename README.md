![Static SaaS Boilerplate logo](https://cdn.rawgit.com/jehna/static-saas-boilerplate/master/src/img/logo.svg)

# Static SaaS Boilerplate
> Backendless static SaaS template that can be deployed anywhere

A static-site SaaS boilerplate that uses Firebase to handle the users.

## See it live

You can see this project live at:

https://jehna.github.io/static-saas-boilerplate/

## Getting started

### Prerequisites

Before starting you need to create a new Firebase account and configure it to
the project.

1. Go to [Firebase console](firebase-console)
2. Press `Create new project`
3. Enter project name and press `Create project`
4. Press `Auth` from the left-hand menu
5. Select `Sign-in method` tab
6. Enable `Email/Password` provider
7. Press home button from left-hand menu
8. Select `Add Firebase to your web app`
9. Copy-paste the `config` object to `src/js/firebase-keys-secret.js`

This creates a new Firebase project and adds the configuration to the app.

### Installing dependencies

Before starting, run:

```shell
npm install
```

This installs the dependencies needed to run the project.

## Developing

To develop the project locally, just run the following command:

```shell
grunt
```

This starts Grunt task runner that compiles the needed assets from `src/` folder
to `dist/` folder, starts a webserver and opens up a browser to the correct
address.

The Grunt then starts to watch the files for changes, so needed assets are 
recompiled as you save them to `src/` folder.

## Features

This is a boilerplate for any SaaS product.
* Includes a simple product page and login + sign up + password reset
* No backend, only static files
* Written with ES2015 and JSX that is compiled to ES5 with Babel
* Uses React to render views
* User handling is done by Firebase

## Configuration

This project uses config files to handle the configuratons.

#### Firebase
File: `src/js/firebase-keys-secret.js`  

This is the Firebase's config file that you should use to configure Firebase.

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.

### Assets

Logo icons made by [Freepik][freepik] from [www.flaticon.com][flaticon] is
licensed by [CC 3.0 BY][cc-30-by].

[Hero image][hero-image] by [Simon Hattinga Verschure][simon-verschure]

[firebase-console]:https://console.firebase.google.com/
[freepik]:http://www.flaticon.com/authors/freepik
[flaticon]:http://www.flaticon.com
[cc-30-by]:(http://creativecommons.org/licenses/by/3.0/)
[hero-image]:https://unsplash.com/photos/WNevBlZWCKA
[simon-verschure]:https://unsplash.com/@webmarbles
