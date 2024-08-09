# vigilant-hstk

## Preliminary

Before starting you'll need expo / react native installed on your computer. Check out https://docs.expo.dev/get-started/installation/.

### Setup

Install node modules:

```
npm install
```

or

```
yarn install
```

Then you can run the app with:

```
npm run ios
```

Or

```
npm run android
```

## Test Structure
This app is already setup with a few things. The first screen you see should look something like this: 

The buttons on this screen will navigate to three separate screens, each corresponding to a section of the test. The screens will be blank initially, it is your job to build the screens in order to meet the requirements of each section of the test. Please make sure that all of your work renders into the components exported by each of these three screen files `PartOne.js`, `PartTwo.js` and `PartThree.js`. You may create new files if you want. Please do not modify `MainScreen.js`, but you can modify any other files as necessary.

# The Test
In this test you'll be working with placeholder data from a backend found here: https://jsonplaceholder.typicode.com/

You will be scored based on completion of the tasks below. Scores are for us to communicate to you how heavily we weight each task and help you decide whether or not you want to attempt to complete each task, in case you get stuck and need to skip to the next task. 

If you fail to complete all tasks that doesn't necessarily mean you wont be able to move forward in the interview process.

Please complete each task in the corresponding component file in "src/screens". You can create as many files as you'd like and put them anywhere you'd like, just make sure the question is answered in the screen file itself and can still be navigated too from `MainScreen.js`. 


***For data fetching use hstkFetch exported from `src/hstkFetch.js` instead of the typical `fetch` or any other solution. hstkFetch works exactly like javascript's built in fetch except that it simulates a one second reponse delay.***

You are not expected to handle errors for any requests that fail for some reason other than what happened in your code. Feel free to make any fetch requests inside of a `useEffect` callback for this challenge (although generally speaking you may not want to do that).
