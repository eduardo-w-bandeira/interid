import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadPages, pascalToKebab } from './trails/Trails';

const App = () => {
    const [pages, setPages] = useState({});
  
    useEffect(() => {
      const fetchPages = async () => {
        const loadedPages = await loadPages();
        setPages(loadedPages);
      };
      fetchPages();
    }, []);
  
    return (
        <Routes>
          {Object.keys(pages).map((key) => {
            let polishedKey = key.replace('Page', '');
            polishedKey = pascalToKebab(polishedKey);
            if (key === "HomePage") {
                polishedKey = "";
            };
            const Component = pages[key];
            return (
              <Route
                key={polishedKey}
                path={`/${polishedKey}`} // Use the component name as the path
                element={<Component />} // Render the component
              />
            );
          })}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
    );
  };
  
  export default App;