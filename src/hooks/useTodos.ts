import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot } from 'firebase/firestore';
import { getTodosQuery } from '@/lib/firebase/queries';
import { RootState } from '@/store/store';
import { setTodos, Todo } from '@/store/todosSlice';
import { INDEXES } from '@/lib/constants/firebase';
import { TOAST_MESSAGES } from '@/lib/constants/messages';
import { toast } from 'sonner';

export function useTodos() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.todos);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) return;

    try {
      const unsubscribe = onSnapshot(
        getTodosQuery(user.uid),
        (snapshot) => {
          const todos: Todo[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Todo));
          dispatch(setTodos(todos));
        },
        (error) => {
          if (error.code === 'failed-precondition') {
            toast.error(TOAST_MESSAGES.ERRORS.INDEX_REQUIRED, {
              action: {
                label: 'Create Index',
                onClick: () => window.open(INDEXES.TODOS.BY_USER_AND_DATE, '_blank')
              }
            });
          } else {
            toast.error(TOAST_MESSAGES.ERRORS.LOAD_TODOS);
          }
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error(TOAST_MESSAGES.ERRORS.SUBSCRIPTION, error);
    }
  }, [dispatch, user]);

  return { todos: items, loading, error };
}