import { collection, query, where, orderBy, QueryConstraint } from 'firebase/firestore';
import { db } from './db';
import { COLLECTIONS } from '@/lib/constants/firebase';

export const getTodosQuery = (userId: string) => {
  const constraints: QueryConstraint[] = [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  ];
  
  return query(
    collection(db, COLLECTIONS.TODOS), 
    ...constraints
  );
};