import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
   const history = defaultHistory || createMemoryHistory();

   if (onNavigate) {
      // whenever url/path changing, automatically call onNavigate callback
      history.listen(onNavigate);
   }

   ReactDOM.render(<App history={history} />, el);

   return {
      onParentNavigate(location) {
         // console.log('Container just navigate')
         const { pathname: nextPathname } = location;
         const { pathname } = history.location;

         if (pathname !== nextPathname) {
            history.push(nextPathname)
         }
      }
   }
};
// if we are in development and in isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
   const devRoot = document.querySelector('#_marketing-dev-root');

   if (devRoot) {
      mount(devRoot, { defaultHistory: createBrowserHistory() });
   }
}


// we are running through container
// and we should export the mount function
export { mount }