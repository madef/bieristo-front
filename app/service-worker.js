const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v1');
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/',
      '/static/css/bootstrap-5.0/bootstrap.css',
      '/static/css/bootstrap-5.0/bootstrap.css.map',
      '/static/css/bootstrap-5.0/bootstrap-grid.css',
      '/static/css/bootstrap-5.0/bootstrap-grid.css.map',
      '/static/css/bootstrap-5.0/bootstrap-grid.min.css',
      '/static/css/bootstrap-5.0/bootstrap-grid.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap-grid.rtl.css',
      '/static/css/bootstrap-5.0/bootstrap-grid.rtl.css.map',
      '/static/css/bootstrap-5.0/bootstrap-grid.rtl.min.css',
      '/static/css/bootstrap-5.0/bootstrap-grid.rtl.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap.min.css',
      '/static/css/bootstrap-5.0/bootstrap.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap-reboot.css',
      '/static/css/bootstrap-5.0/bootstrap-reboot.css.map',
      '/static/css/bootstrap-5.0/bootstrap-reboot.min.css',
      '/static/css/bootstrap-5.0/bootstrap-reboot.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap-reboot.rtl.css',
      '/static/css/bootstrap-5.0/bootstrap-reboot.rtl.css.map',
      '/static/css/bootstrap-5.0/bootstrap-reboot.rtl.min.css',
      '/static/css/bootstrap-5.0/bootstrap-reboot.rtl.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap.rtl.css',
      '/static/css/bootstrap-5.0/bootstrap.rtl.css.map',
      '/static/css/bootstrap-5.0/bootstrap.rtl.min.css',
      '/static/css/bootstrap-5.0/bootstrap.rtl.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap-utilities.css',
      '/static/css/bootstrap-5.0/bootstrap-utilities.css.map',
      '/static/css/bootstrap-5.0/bootstrap-utilities.min.css',
      '/static/css/bootstrap-5.0/bootstrap-utilities.min.css.map',
      '/static/css/bootstrap-5.0/bootstrap-utilities.rtl.css',
      '/static/css/bootstrap-5.0/bootstrap-utilities.rtl.css.map',
      '/static/css/bootstrap-5.0/bootstrap-utilities.rtl.min.css',
      '/static/css/bootstrap-5.0/bootstrap-utilities.rtl.min.css.map',
      '/static/css/icons-1.4.1/bootstrap-icons.css',
      '/static/css/icons-1.4.1/fonts/bootstrap-icons.woff',
      '/static/css/icons-1.4.1/fonts/bootstrap-icons.woff2',
      '/static/css/main.css',
      '/static/image/icon-16.png',
      '/static/image/icon-32.png',
      '/static/image/icon-64.png',
      '/static/image/icon.png',
      '/js/Alert',
      '/js/Api',
      '/js/App',
      '/js/ChartRenderer',
      '/js/Confirm',
      '/js/Identifier',
      '/static/js/Language/fr_FR.json',
      '/js/Listener',
      '/js/Menu',
      '/js/NotificationManager',
      '/js/Page',
      '/js/Template/Element',
      '/js/Template/Part/Button',
      '/js/Template/Part/Col',
      '/js/Template/Part/Container',
      '/js/Template/Part/Div',
      '/js/Template/Part/Form',
      '/js/Template/Part/Grid',
      '/js/Template/Part/Input',
      '/js/Template/Part/Jumbotron',
      '/js/Template/Part/Label',
      '/js/Template/Part/Nav',
      '/js/Template/Part/NodeAbstract',
      '/js/Template/Part/Option',
      '/js/Template/Part/P',
      '/js/Template/Part/RawText',
      '/js/Template/Part/Row',
      '/js/Template/Part/Select',
      '/js/Template/Part/Span',
      '/js/Template/Part/Svg',
      '/js/Template/Part/SwitchMode',
      '/js/Template/Part/Textarea',
      '/js/Template/Part/Title',
      '/js/Template/Widget/Account',
      '/js/Template/Widget/Board/Add',
      '/js/Template/Widget/Board/Edit',
      '/js/Template/Widget/Board/View',
      '/js/Template/Widget/FormLogin',
      '/js/Template/Widget/Menu',
      '/js/Template/Widget/Navbar',
      '/js/Template/Widget/NotFound',
      '/js/Template',
      '/js/Translator',
      '/js/Url'
    ])
  );
});
