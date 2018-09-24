[![Build Status](https://travis-ci.org/CodeSnooker/ts-library.svg?branch=master)](https://travis-ci.org/CodeSnooker/ts-library)
[![Coverage Status](https://coveralls.io/repos/github/CodeSnooker/ts-library/badge.svg?branch=master)](https://coveralls.io/github/CodeSnooker/ts-library?branch=master)

ts-library
---
This is sample typescript library project which can be used base project to build a typescript library.

Creating Library
----

1. Clone this repository by running following command. Here we are target folder as lamda. You can change the name if you wish to do so.

```
git clone https://github.com/CodeSnooker/ts-library.git lamda
```

2. We need to change the origin url. We can do so by running following command. Replace the git url with your own repository.

```
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

3. Make sure to update the URL in package.json file also.

4. Now run ```npm install```

5. Now you can place your code in ```lib``` folder

6. Write some test and place your test file in \__tests__ folder

7. run ```npm run test``` to test your project.

8. run ```npm run test:cover``` to check code coverage

9. Connect your repositories with [Travis-Cli](https://travis-cli.org) and [Coveralls](https://coveralls.io)

10. Commit your code

11. run ```npm version patch``` to push your code along with release tag on the github server.

12. Don't forget to update README.md for you library.

13. To publish your library, login to npm.

14. run ```npm publish```
