# short.li
URL Shortening Service

![img of main page](./src/Assets.ShortliPage.png)


### Installation

`npm install`

### Get App Started

`npm run dev`

### Run tests

`npm run test`

## Component Context

I could tell early on that the only part of my website that was actually doing anything and maintaining data/state was going to be the area where links were shortened then displayed.

I decided to put both in the LinkManager Component. Looking at the component now, the display portion could additionally be split out into another component but this would only be for readability. 

I still think it makes sense that all of this is together since a lot of the input form dictates how the links display looks and the display also has expiration functionality that is reused in the form as well.

The rest of the components are stateless Container, Nav Bar, and Hero Banner. I decided the Hero Banner was general enough that it could have some potetntial reuse in the future as well. 

The app entirely lives in the `src` folder but utils, Styles, and SharedComponents are all considered reusable and could work if more were added to the website.

If I had more time I would have also made a reusable button component as I saw a lot of repeated styles and condensed a lot of the repeating CSS styles in LinkManager as well. 

## Service Context

The POST request to the shortening API only gave me the original url, the new short url, and the short url's slug and I knew I wanted to also set an expiration on the link and have it expire on page load if any old links were still displayed.

I took some inspiration from bit.ly storing most recent links for their guest users in localstorage and decided to implement a caching layer in localstorage between the api and the fronend. This cache would have an array of the links but with additional expiration data. It also contained an object of slugs for quick look up when we want to see if a custom slug has been taken.

In order to ensure the validity of the cache, I made sure to only make cache edits if api responses were successful. 

This is why the flow of all actions are mainly api request ---> localstorage update with api request ---> updating state with the newly updated cache. 

The api controls ONLY control api functions and localstorage controls ONLY control localstorage. This is done so there is no weird mixup about what data is coming where and ensures we can call one action after another so nothing is put in cache that did not happen in the api.

If I had more time, I might have added even more cache validity by making a request to the api at page load and comparing what was in cache to make sure everything that was in the api was also in cache or that no expired links were in cache but gone from the api.

It is not the ideal system and if I had control over the API I would add the necessary expiration fields. I could have also just stored expirations in cache, but since I knew it would be difficult to map the data from two diferent sources, I decided to just keep all data together for simplicity.

Having a cache still did provide nice wins like quick lookups for slugs taken and quick rerenders when new links were added (since we didn't have to do any GET requests after a new link was added to get the updated list).

## Nice to haves
- Copy button to easily grab the new short link. (This could have been easily implemented as util function if I had more time. Used a pretty tiny library, Clipboard.js, san react wrapper, to achieve it).
- View of how much time was left before a link expired.
- Animated buttons.
- Some Acessibility details (links and buttons clearly showing they are on focus or active)
