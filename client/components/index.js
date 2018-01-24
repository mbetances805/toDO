/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main'
export { default as UserHome } from './userHome'
export { Login, Signup } from './authForm'
export { default as Form } from './form'
export { default as OpenActivities } from './openActivities'
export { default as ActivityList } from './activityList'
export { default as Welcome } from './welcome'
export { default as Footer } from './footer'
