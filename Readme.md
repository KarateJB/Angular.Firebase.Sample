## To run the project

1. Create a new Firebase project

* Enable **Google** and **Anonymous** login
* Set RTDB rules
```
{
  "rules": {
    "Demo": 
    	{
        "products":{
          ".read": "auth != null",
           ".write": "auth != null  && auth.token.email == 'xxx@gmail.com'"

    		},
        "orders": {
          ".read": "auth != null",
          ".write": "auth != null"
    		}
      }
    }
}
```

* Set Storage rules
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth!=null;
      allow write: if (request.resource.size < 0.5 * 1024 * 1024 && request.auth.token.email == 'xxx@gmail.com');
    }
  }
}
```

2. Install Angular CLI
```
$ npm install -g @angular/cli
```

3. Install Firebase CLI
```
$ npm install -g firebase-tools
```

4. Clone this project
```
$ git clone https://github.com/KarateJB/Angular.Firebase.git
```

5. Install npm packages
```
$ cd Angular.Firebase/sample
$ npm install
```

6. Update sample\src\app\class\FirebaseConfig.ts

7. Build the app (To /dist)
```
$ ng build --prod --aot=false
```

8. Deploy to Firebase
```
$ firebase login
$ firebase init
$ firebase deploy
```

9. Use other firebase project (Optional)
```
$ firebase use --add
$ firebase list
$ firebase use {alias name}
$ firebase deploy
```
