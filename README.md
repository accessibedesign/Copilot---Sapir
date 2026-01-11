## 🎨 accessWidget UI library

accessWidget-UI is a lightweight npm package built using Preact, designed to be simple and easy-to-use. It is tree-shakeable and includes only necessary dependencies to keep the package size small.

This package exports several components, including `button`, `skip-links`, `screen-reader-button`, `widget`, and `widget-skeleton`, which can be imported individually as needed. It also exports `SupportedLanguageCode` from ~/types.

###### status
[![codecov](https://codecov.io/gh/acsbe/accessWidget-UI/branch/main/graph/badge.svg?token=RRyAppujEC)](https://codecov.io/gh/acsbe/accessWidget-UI)

###### Recommended to know
`Preact` `Typescript` `Jest` `CircleCI` `PlayWright` `Sass` `Storybook`

###### Development tools
`Preact Dev tools chrome extension`

## Development
## CLI Commands

``` bash
# install dependencies
npm install

# serve demo with hot reload at localhost:8080
npm run serve

# lint the project with eslint to find code style issues
npm run lint

# run tests with jest and enzyme
npm run test:unit
```

## Usage

accessWidget-UI Module provides a static run method that allows you to easily mount a Preact component to a given container. It also provides a `setDictionary` method that updates the context of the `useTranslation` hook used by the application.

### Importing the package
```typescript 
import AccessWidgetUiModule, { AppProps, ShadowComponent } from '@acsbe/accesswidget-ui';
```

### Generating and attaching template
```typescript 
const appRoot = document.createElement(`div`);
appRoot.attachShadow({ mode: "open" });

const options = { prepend: false };
const data = { /* the component's props */ };

const instance = await AccessWidgetUiModule.run({ template: YourComponent, data }, document.body, options);

```

### Updating the dictionary
```typescript 
AccessWidgetUiModule.setDictionary(dictionary);
```


### Testing Capabilities
#### Visual Regression Testing using Chromatic
Automatically capture UI component snapshots and compare them to reference images, enabling rapid identification of any visual regressions.

#### Unit Testing using Jest 
Write expressive test cases to verify the expected behavior of functions, components, and modules, ensuring code reliability and facilitating easier code maintenance.

### Methods and Types

#### run()
The run method is used to mount a given component to a specified container. It takes the following parameters:
```typescript 
AccessWidgetUiModule.run({ template: App, data: {} }, container, options)
```
- `template`: a constructor for the preact component
- `data`: the props to be sent to the component
- `container`: the container to append the component to
- `options`: an optional object that contains the following properties:
  - `prepend`: a boolean value that specifies whether to prepend the component to the top of the container
#### setDictionary()
The setDictionary method is used to set the given dictionary to the context of the useTranslation hook that serves the application and update all instances. It takes the following parameters:
```typescript 
AccessWidgetUiModule.setDictionary(dictionary);
```
- `dictionary`: an object that contains the translation for the 'current' language

#### ShadowComponent
ShadowComponent is a type that extends the Preact Component type with functionality required for using Access Widget UI projects. It adds the following methods:

- `update(props: Record<string, any>): Promise<void>`: a method that updates the component props and triggers forceUpdate
- `detach(): Promise<void>:` a method that removes the component's host from the DOM/its parent
- `ref`: HTMLElement: a reference to the first element in the component
- `host`: HTMLElement: a reference to the component's host element
