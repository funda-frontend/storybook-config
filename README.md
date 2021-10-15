# storybook-config

Storybook configuration for Funda projects.

## Why?

Why where these wrapper components created?
Why not write stories just like I see in the storybook documentation?

As long as wrappers do not confuse the developer, any steps that can be taken
to reduce the amount of code that the developer is copying and pasting, the
better. This will reduce errors and will make writing stories more enjoyable.
This makes stories look more cohesive and reduces distractions for a book (a
collection of stories) where most of the stories have their own templates and
args.

Storybook stories will also go through breaking changes between Vue v2 and
Vue v3. While updating a single story through a breaking change is a trivial
task, reformatting the arguments for every story written, would take a lot of
time. This should allow us to move through the breaking change by only
changing the function that generates a story.

## Usage

All configuration here is built from functional components, so a developer
will be able to easily debug any storybook configuration by seeing the
output of each of these functions. While the helper functions could further
abstract a storybook implementation, this crosses a line where obfuscation
begins to be a hinderende when a developer is debugging, or joining this
project for the first time.

### Single story book

If you just have a single story, then you can use the story function directly.
Any information that you need in your story needs to be added as parameters to
the story function.

```js
import { story, book } from '@funda/storybook-config';

// import your component that you are going to test
import SaveBox from '../SaveBox.vue';

const bookSettings = book({
    // define the folder structure for your component
    title: 'Advertisement/Create/Save Box',
    component: { SaveBox },
});

export default bookSettings;

export const Default = story({
    // all of the work that the book function does for you is included here
    ...bookSettings,
    args: {
        disabled: false,
        canBuy: false,
        waiting: false,
    },
});
```

### Multi story book

```js
import { defaultStory, book } from '@funda/storybook-config';

// import your component that you are going to test
import UiUploadButton from '../UiUploadButton.vue';


const bookSettings = book({
    title: 'UI/Buttons/Upload',
    component: { UiUploadButton },
});

export default bookSettings;

// This uploadButtonStory function will return all the information storybook
// needs to make a story. Args can be passed in to override any default values
function uploadButtonStory(args) {
    return defaultStory({
        // all of the work that the book function does for you is included here
        ...bookSettings,
        // whatever you add here will always be included, but can be overwritten
        // by the 'args' key
        defaultArgs: {
            accept: '*',
        },
        ...args,
    });
}

// For these stories, we are regularly relying on the default values at the Vue
// component level, which is why we do not include values for these props in the
// defaultArgs parameter on the defaultStory function. 'accept' is the only
// required prop for the component. We are however, overwriting these default
// values on different stories.

export const Default = uploadButtonStory();
export const DifferentUploadText = uploadButtonStory({
    args: {
        uploadText: 'Add an image',
    },
});
export const DifferentUploadValidation = uploadButtonStory({
    args: {
        accept: 'video/*',
        uploadText: 'Add a video',
    },
});
export const Error = uploadButtonStory({
    args: {
        errorMessage: 'The image that you tried to upload is too small',
    },
});
export const MultipleSelection = uploadButtonStory({
    args: {
        multiple: true,
    },
});
export const ShowFileNames = uploadButtonStory({
    args: {
        showFileNames: true,
        multiple: true,
    },
});

```

## Automatic features

If you specify a book that has a title that starts with `page` (case
insensitive), the layout of the story will be fullscreen to closer emulate
what the page will look like (especially on mobile devices). This can be
overwritten at the story level.

```js
const bookSettings = book({
    title: 'Page/Home',
});
```
