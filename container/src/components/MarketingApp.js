import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
   const ref = useRef();
   const history = useHistory();

   useEffect(() => {
      const { onParentNavigate } = mount(ref.current, {
         onNavigate: (location) => {
            // naming aliases of pathname
            const { pathname: nextPathname } = location;
            // console.log(nextPathname);
            const { pathname } = history.location;

            // check if pathname in browser history !== nextPathname param
            // do some redirection
            if (pathname !== nextPathname) {
               history.push(nextPathname);
            }

         }
      });

      history.listen(onParentNavigate);
   }, []);

   return <div ref={ref} />;
};