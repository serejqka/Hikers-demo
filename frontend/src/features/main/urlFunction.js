export default function urlFunction(url, setGetCat, urlButton, SetNav) {
  switch (url) {
    case '/categories/1':
      setGetCat(0);
      break;
    case '/categories/2':
      setGetCat(1);
      break;
    case '/categories/3':
      setGetCat(2);
      break;
    case '/categories/4':
      setGetCat(3);
      break;
    case '/categories/5':
      setGetCat(4);
      break;
    case '/categories/6':
      setGetCat(5);
      break;
    default:
      // SetNav('/');
      break;
  }
}
