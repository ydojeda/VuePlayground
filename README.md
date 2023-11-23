# VuePlayground

A repo for learning Vue

## VueSchool Tutorials
Follow through [Vue 3 fundamentals](https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api) and [component fundamentals](https://vueschool.io/courses/vue-js-3-components-fundamentals).

✅ **Output**: Functioning basic shopping list app that can create and toggle shopping list items

## CRUD Blog Post
Use [dummyJSON](https://dummyjson.com/docs/posts) for posts and user data
### Goals
- Build components similar to asknicely site and use LESS
- Use Vue Router for performing create/update functionality
- Use Vuex state management and store list items

### Main Components
✅ Vertical Navigation Bar
- sticky to the left side
- two nav items: the VueSchool Tutorials output page, and the CRUD Todo List

✅ Blog Post Item
- Similar to "Response" box on asknicely

✅ Input Fields for Create/Update Blog Post
- Take note of the active/non-active styling
- Add input fields for switching users

### Data Description
(For creating a store)

**User**
- id
- firstName
- lastName
- email
- image
- address_city
- company_name

**Posts**
- id
- text
- userId
- tags
- reactions  


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
