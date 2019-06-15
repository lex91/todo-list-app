import sha256 from 'crypto-js/sha256';
import cloneDeepWith from 'lodash/cloneDeepWith';

import { isObject } from 'utils/object';

export type IHashable<T> = {
  _hash: string | null;
  data: T;
};

export type WithHash<T> = T extends IHashable<infer THashableData>
  ? {
      data: WithHash<THashableData>;
      _hash: string;
    }
  : T extends object
  ? {
      [P in keyof T]: WithHash<T[P]>;
    }
  : T;

export const createHashable = <T>(data: T): IHashable<T> => ({
  _hash: null,
  data,
});

export const isHashable = <T extends object>(it: any): it is IHashable<T> =>
  isObject(it) && '_hash' in it;

export const isHashed = <T extends object>(it: any): it is WithHash<IHashable<T>> =>
  isHashable(it) && it._hash !== null;

export const hash = <T>(data: T): WithHash<T> =>
  cloneDeepWith(data, item => {
    if (isHashable(item) && item._hash === null) {
      const clonedData = hash(data) as object;

      return {
        _hash: calcHashForObject(clonedData),
        data: clonedData,
      };
    }
  });

const calcHash = (data: any): string =>
  isObject(data) ? (isHashed(data) ? data._hash : calcHashForObject(data)) : calcHashForData(data);

const calcHashForData = (data: any) => sha256(JSON.stringify(data)).toString();

const calcHashForObject = (data: object) =>
  calcHash(
    Object.entries(data)
      .map(([k, v]) => `${k}:${calcHash(v)}`)
      .join(),
  );
