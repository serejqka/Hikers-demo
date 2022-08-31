export default function iconSwitch(e, setGetCat, SetNav, urlButton) {
  e.preventDefault();
  const tik = Number(e.target.id);
  switch (tik) {
    case 1:
      SetNav('/categories/1');
      setGetCat(0);
      break;
    case 2:
      SetNav('/categories/2');
      setGetCat(1);
      break;
    case 3:
      SetNav('/categories/3');
      setGetCat(2);
      break;
    case 4:
      SetNav('/categories/4');
      setGetCat(3);
      break;
    case 5:
      SetNav('/categories/5');
      setGetCat(4);
      break;
    case 6:
      SetNav('/categories/6');
      setGetCat(5);
      break;
    default:
      // SetNav(`${urlButton}`);
      break;
  }
}
