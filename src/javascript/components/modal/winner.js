import { showModal } from './modal';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(winner) {
  const bodyElement = createElement({ tagName: 'div', className: 'winner'});
  const bodyText = createElement({ tagName: 'p', className: 'winner-text'});
  const bodyHealth = createElement({ tagName: 'p', className: 'winner-health'});
  bodyText.textContent = `${winner.name} is win!`;
  bodyHealth.textContent = `Health is ${winner.health}`;
  bodyElement.appendChild(bodyText);
  bodyElement.appendChild(bodyHealth);

  const modalObject = {
    title: 'Congratulation',
    bodyElement: bodyElement,
  };
  showModal(modalObject);
}
