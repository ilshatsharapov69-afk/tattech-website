// Кейсы внедрений T-Tech.
// Данные редактируются через Sveltia CMS в src/data/cases.json.
// Этот файл — типизированный re-export, чтобы import из компонентов не менялся.

import data from './cases.json';

export interface CaseEntry {
  img: string;
  industry: string;
  pain: string;
  solution: string;
  metric: string;
  deadline: string;
  color: string;
}

export const cases: CaseEntry[] = data.items;
