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
- Once your pull request has been merged into `dev`, ask that a maintainer push your changes to the staging environment.
- After the first review the change should show on the [staging environment](https://staging.web.shuttletracker.app/).
- Finalized feature will be pushed to the `main` branch after testing.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment
Deployment for the Web interface is similar to that of the Shuttle Tracker Server, so refer to the [Production Server Administration](https://github.com/wtg/Shuttle-Tracker-Server/wiki/Production-Server-Administration) article for Shuttle Tracker Server for most details about deployment. The main difference is that for the Web interface, the production environment is `shuttletracker-new-web` (not `shuttletracker-new`), and the staging environment is `shuttletracker-new-web-staging` (not `shuttletracker-new-staging`). Also, the Web interface doesn’t use any database.

### Production Environment
- To add the Git remote: `git remote add production ssh://dokku@srv1.webtech.union.rpi.edu:2222/shuttletracker-new-web`
- To deploy: `git push production main:master`

### Staging Environment
- To add the Git remote: `git remote add staging ssh://dokku@srv1.webtech.union.rpi.edu:2222/shuttletracker-new-web-staging`
- To deploy: `git push staging dev:master`
	- Note the reference to the local `dev` branch instead of the local `main` branch. You can try pushing `main` to the staging environment, but doing so might create difficult-to-resolve merge conflicts. Proceed with caution!

### New Paths
If you add a handler or a static page for a new path (such as `/privacy-policy` or `/about`), then make sure to update the nginx configuration on the server. To do so, open an SSH connection to the server (see the aforementioned Production Server Administration article for instructions) and run the following command:
```bash
sudo nano /home/dokku/shuttletracker-new-web/nginx.conf.d/routing.conf
```
Put the following configuration into the file, replacing `[path]` with the new path:
```nginx
location [path] {
		try_files $uri $uri/ /index.html;
		index index.html index.htm;
}
```
Press Control-X, then Y, and then Return to save and to exit. Then, run the following commands:
```bash
dokku nginx:validate-config shuttletracker-new-web-staging
dokku ps:restart shuttletracker-new-web-staging
```
(Replace `shuttletracker-new-web` with `shuttletracker-new-web-staging` for the staging environment.) If you don’t update the nginx configuration in this manner, then users might see a 404 Not Found error page when they visit the new path.
