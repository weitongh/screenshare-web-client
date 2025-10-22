const pages = import.meta.glob('/src/pages/*.js');

const loadPage = async (pageName) => {
  const path = `/src/pages/${pageName}.js`;
  const importFn = pages[path];
  
  if (!importFn) {
    throw new Error(`Page not found: ${pageName}`);
  }

  const module = await importFn();
  return module.default();
};

const page = async () => {
  const pathname = location.pathname;

  switch (pathname) {
    case '/':
      return loadPage('Room');
    case '/room':
      return loadPage('Room');
    default:
      return loadPage('NotFound');
  }
};

export const render = async (root) => {
  const html = await page();
  root.innerHTML = html;
};
