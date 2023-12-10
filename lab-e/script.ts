const CHANGE_STYLE_ID = '#change-style';
const DYNAMIC_STYLE_ID = '#dynamic-style';

type StyleHref = 'css/style.css' | 'css/style2.css';

const availableStyles: Record<string, StyleHref> = {
  default: 'css/style.css',
  alternative: 'css/style2.css',
};

const styleLink: { id: string; hrefs: Record<string, StyleHref> } = {
  id: DYNAMIC_STYLE_ID,
  hrefs: availableStyles,
};

window.addEventListener('load', () => {
  const changeStyleLink = document.querySelector(CHANGE_STYLE_ID);

  changeStyleLink?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleStyle();
  });
});

const toggleStyle = (): void => {
  const linkElement = document.querySelector<HTMLLinkElement>(styleLink.id);

  if (linkElement) {
    linkElement.href = getNextStyle(linkElement.href);
  }
};

const getNextStyle = (currentHref: string): StyleHref => {
  const currentFilename = currentHref.split('/').pop();

  const currentKey = Object.keys(styleLink.hrefs).find((key) => {
    return styleLink.hrefs[key].split('/').pop() === currentFilename;
  });

  if (!currentKey) {
    return styleLink.hrefs[Object.keys(styleLink.hrefs)[0]];
  }

  const keys = Object.keys(styleLink.hrefs);
  const nextIndex = (keys.indexOf(currentKey) + 1) % keys.length;
  return styleLink.hrefs[keys[nextIndex]];
};
