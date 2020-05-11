import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if (fighter) {
    const fighterImage = createFighterImage(fighter);
    const fighterAddinfo = createFighterAddInfo(fighter);
    fighterElement.append(fighterImage, fighterAddinfo);
  }
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterAddInfo(fighter) {
  const { health, name } = fighter;

  const addInfoElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___add-info',
  });

  const nameElement = createElement({
    tagName: 'p',
    className: 'fighter-preview___add-name',
    innerText: name,
  });

  const healthElement = createElement({
    tagName: 'p',
    className: 'fighter-preview___add-health',
    innerText: health,
  });

  addInfoElement.append(nameElement, healthElement);

  return addInfoElement;
}
