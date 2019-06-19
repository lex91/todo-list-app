import { ITodoList } from 'models/todoList';
import { WithHash } from 'utils/hashable';

import { firestore as db } from './app';

export const setList = async (
  nextState: WithHash<ITodoList>,
  prevStateHash?: string,
): Promise<boolean> =>
  db.runTransaction(async transaction => {
    const itemRef = db.collection('lists').doc(nextState.data.id);

    if (prevStateHash) {
      const listSnapshot = await transaction.get(itemRef);
      const prevSnapshotData = listSnapshot.data();
      if (!prevSnapshotData || prevSnapshotData._hash !== prevStateHash) {
        return false;
      }
    }

    transaction.set(itemRef, nextState);

    return true;
  });

export const getList = async (id: string): Promise<WithHash<ITodoList> | null> => {
  const snapshot = await db
    .collection('lists')
    .doc(id)
    .get();

  return snapshot.exists ? (snapshot.data() as WithHash<ITodoList>) : null;
};

export const watchList = (
  id: string,
  onUpdate: (list: WithHash<ITodoList>) => void,
): (() => void) =>
  db
    .collection('lists')
    .doc(id)
    .onSnapshot(snapshot => {
      if (snapshot.exists) {
        onUpdate(snapshot.data() as WithHash<ITodoList>);
      }
    }, console.warn);
