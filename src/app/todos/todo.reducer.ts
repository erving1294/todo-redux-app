import { Todo } from './models/todo.model';
import { createReducer, on } from '@ngrx/store';
import {
  crear,
  toggle,
  editar,
  borrar,
  toggleAll,
  limpiarCompletados,
} from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Ser como LOLITO'),
  new Todo('Aprender a construir en Fornite'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del Capitan América'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(limpiarCompletados, (state) => state.filter((todo) => !todo.completado))
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
