// Программы 1С (типовые лицензии).
// Данные редактируются через Sveltia CMS в src/data/programs.json.
// Этот файл — типизированный re-export, чтобы import из компонентов не менялся.

import data from './programs.json';

export interface ProgramEntry {
  emoji: string;
  title: string;
  price: string;
  priceNote: string;
  desc: string;
  bullets: string[];
  msg: string;
}

export const programs: ProgramEntry[] = data.items;

export const tgUrlForProgram = (msg: string) =>
  `https://t.me/CyclesOfID?text=${encodeURIComponent(msg)}`;
