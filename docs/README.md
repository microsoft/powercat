# Readme

## Adding icons
Adding customs requires running a manual build process. After adding the custom icon, do the following steps:

In docs/node_modules/uikit, run `yarn` then `yarn compile`.
In docs/, run `npm install`.
Edit _sass/uikit/components/icon.scss and comment out the icon color. 
```
// .uk-icon:not(.uk-preserve) [fill*='#']:not(.uk-preserve) { fill: currentcolor; }
// .uk-icon:not(.uk-preserve) [stroke*='#']:not(.uk-preserve) { stroke: currentcolor; }
```
