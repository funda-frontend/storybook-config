# Storybook Config

Configuration for Funda storybook projects.

## Features

* Functions from [storybook-wrapper-helper](https://github.com/funda-frontend/storybook-wrapper-helper) to help you write storybook stories
* Function to generate Funda branding in storybook

### Funda Theme

1. Create `.storybook/manager.js` in your project
1. Include theme configuration

```js
import { addons } from '@storybook/addons';
import { createTheme } from '@funda/storybook-config';

addons.setConfig({ theme: createTheme() });
```
