# Readme



## Adding icons
Adding custom icons requires running a manual build process. After adding the custom icon, do the following steps:

1. Add the custom icon in .svg format to `/docs/node_modules/uikit/custom/icons`.
2. In `/docs/node_modules/uikit`, run `yarn` then `yarn compile`.
3. In `/docs`, run `npm install`.
4. Edit `_sass/uikit/components/icon.scss` and comment out the two lines that set the background color.

```
// .uk-icon:not(.uk-preserve) [fill*='#']:not(.uk-preserve) { fill: currentcolor; }
// .uk-icon:not(.uk-preserve) [stroke*='#']:not(.uk-preserve) { stroke: currentcolor; }
```
