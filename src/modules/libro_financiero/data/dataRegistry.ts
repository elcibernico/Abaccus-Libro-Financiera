// Archivo autogenerado
import { TopicData } from '@/types';

import data_U01_Pto01 from './U01_Pto01';
import data_U01_Pto02 from './U01_Pto02';
import data_U01_Pto02_1 from './U01_Pto02-1';
import data_U01_Pto02_2 from './U01_Pto02-2';
import data_U02_Pto01 from './U02_Pto01';
import data_U02_Pto02 from './U02_Pto02';
import data_U02_Pto02_1_1 from './U02_Pto02-1-1';
import data_U02_Pto02_1_2 from './U02_Pto02-1-2';
import data_U02_Pto02_1_3 from './U02_Pto02-1-3';
import data_U02_Pto02_2 from './U02_Pto02-2';
import data_U02_Pto02_2_1 from './U02_Pto02-2-1';
import data_U02_Pto02_2_2 from './U02_Pto02-2-2';

export const dataRegistry: Record<string, TopicData> = {
  'U01_Pto01': data_U01_Pto01,
  'U01_Pto02': data_U01_Pto02,
  'U01_Pto02-1': data_U01_Pto02_1,
  'U01_Pto02-2': data_U01_Pto02_2,
  'U02_Pto01': data_U02_Pto01,
  'U02_Pto02': data_U02_Pto02,
  'U02_Pto02-1-1': data_U02_Pto02_1_1,
  'U02_Pto02-1-2': data_U02_Pto02_1_2,
  'U02_Pto02-1-3': data_U02_Pto02_1_3,
  'U02_Pto02-2': data_U02_Pto02_2,
  'U02_Pto02-2-1': data_U02_Pto02_2_1,
  'U02_Pto02-2-2': data_U02_Pto02_2_2,
};

export const availableTopics = new Set(Object.keys(dataRegistry));
