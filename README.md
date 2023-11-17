# VuePlayground

A repo for learning Vue

## VueSchool Tutorials
Follow through [Vue 3 fundamentals](https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api) and [component fundamentals](https://vueschool.io/courses/vue-js-3-components-fundamentals).

✅ **Output**: Functioning basic shopping list app that can create and toggle shopping list items

## CRUD Todo List
### Goals
- Build components similar to asknicely site and use LESS
- Use Vue Router for performing create/update functionality
- Use Vuex state management and store list items

### Main Components
◻️ Vertical Navigation Bar
- sticky to the left side
- two nav items: the VueSchool Tutorials output page, and the CRUD Todo List

◻️ Todo Item Card
- Similar to "Response" box on asknicely

◻️ Input Fields for Create/Update Form
- Take note of the active/non-active styling

### Data Description
(For creating a store)

**Todo Item**
- date
- owner_id
- text
- isDone
- priority: high, medium, low
- tag_ids

**Owners**
- owner_id
- name
- email

**Tags**
- tag_id
- name


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
