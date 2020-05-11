import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    fighters.setFighters(firstFighter, secondFighter);
    document.addEventListener('keydown', (event) => {
      onKeyDown(event, resolve);
    });
    document.addEventListener('keyup', (event) => {
      onKeyUp(event);
    });
  });
}

const fighters = {
  setFighters(firstFighter, secondFighter) {
    this.first = firstFighter;
    this.first.maxHealth = parseInt(`${this.first.health}`);
    this.second = secondFighter;
    this.second.maxHealth = parseInt(`${this.second.health}`);
  }
};

export function onKeyDown(key, resolve) {
  setBlock(key.code, true);
  if (key.code === controls.PlayerOneAttack) {
    fighters.second.health -= getDamage(fighters.first, fighters.second);
    renderHealthIndicator('left-fighter-indicator', fighters.second);
  } else if (key.code === controls.PlayerTwoAttack) {
    fighters.first.health -= getDamage(fighters.second, fighters.first);
    renderHealthIndicator('right-fighter-indicator', fighters.first)
  }
  if (isGameOver()) {
    resolve(fighters.first.health <= 0 ? fighters.second : fighters.first);
  }
}

function renderHealthIndicator(indicatorId, fighter) {
  const indicator = document.querySelector(`#${indicatorId}`);
  console.log(fighter.health);
  indicator.style.width = `${fighter.health / fighter.maxHealth * 100}%`
}

export function isGameOver() {
  return fighters.first.health <= 0 || fighters.second.health <= 0;
}

export function onKeyUp(key) {
  setBlock(key.code, false)
}

function setBlock(key, isBlocked) {
  if (key === controls.PlayerOneBlock) {
    fighters.first.block = isBlocked;
  }
  if (key === controls.PlayerTwoBlock) {
    fighters.second.block = isBlocked;
  }
}

export function getDamage(attacker, defender) {
  if (attacker.block) return 0;
  const damage = defender.block ? getHitPower(attacker) - getBlockPower(defender) : getHitPower(attacker);
  const misfire = 0;
  return damage > misfire ? damage : 0;
}

export function getHitPower(fighter) {
  return fighter.attack * criticalHitDamageChance();
}

export function getBlockPower(fighter) {
  return fighter.defense * criticalHitDamageChance();
}

export function criticalHitDamageChance() {
  return Math.random() + 1;
}

// TODO: Бойцы также могут наносить критические удары,
//  которые не могут быть заблокированы и вычисляются по формуле 2 * attack,
//  где attack - характеристика бойца.
//  Для того, чтобы бойцу нанести такой удар, нужно одновременно нажать 3 соответствующие клавиши,
//  указанные в файле controls.js. Этот удар можно наносить не чаще, чем каждые 10 секунд.
