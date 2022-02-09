# Shuttle-Tracker-Web
New shuttle tracker web UI implemented in Vue.js.
View the temporary testing site [here](https://staging.web.shuttletracker.app/).
The shuttle tracker web UI does not help with crowd-sourcing location data.

## Dependency Installation
This project requires [Node.js](https://nodejs.dev/) and its package manager `npm` to run. To install the dependencies:
```
npm install
```

### Compiles and hot-reloads for development
There are two development environments: `development` and `production`. 
The `development` mode gives developers access to devtools and information that isn't shown in the `production` build.
Run it with the following command:
```
npm run serve
```
To simulate the `production` build (which is how the final deployment would look like), run the following command:
```
npm run serve_prod
```

### Compiles and minifies for production
For normal `production` build, run the following command:
```
npm run build
```
To build with `development` mode, run the following command:
```
npm run build_dev
```

### Contribution guideline
- To get started, first clone the repo with `git clone REPO_URL`. It is recommended to setup an ssh key since password credential is deprecated. 
- Before making any contributions, make sure you go on the issue tab and assign yourself to the specific bug. This is to avoid multiple people working on the same stuff. 
- To start making changes, create a new branch of branch `dev`. Do this by using `git checkout -b NEW_BRANCH_NAME`. 
- Make the commit messages meaningful. Don't leave it blank.
- To submit changes, push your new branch to the repo with `git push origin NEW_BRANCH_NAME`.
- Create a pull request merging your new branch to `dev`, and request reviews from one of the moderators.
- After the first review the change should show on the [staging server](https://staging.web.shuttletracker.app/).
- Finalized feature will be pushed to the `main` branch after testing.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
