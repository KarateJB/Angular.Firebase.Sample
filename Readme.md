## To run the project

1. Install Angular CLI
```
$ npm install -g @angular/cli
```

2. Install Firebase CLI
```
$ npm install -g firebase-tools
```

3. Clone this project
```
$ git clone https://github.com/KarateJB/Angular.Firebase.git
```

4. Install npm packages
```
$ cd Angular.Firebase/sample
$ npm install
```

5. Build the app (To /dist)
```
$ ng build --prod --aot=false
```

6. Deploy
```
$ firebase login
$ firebase init
$ firebase deploy

7. Use other firebase project (Optional)
```
$ firebase use --add
$ firebase list
$ firebase use {alias name}
$ firebase deploy
```
