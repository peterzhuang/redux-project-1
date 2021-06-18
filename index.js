// {
//     type: 'ADD_TODO',
//     todo: {
//       id: 0,
//       name: 'Learn Redux',
//       complete: false,
//     }
//   }
  
//   {
//     type: 'REMOVE_TODO',
//     id: 0,
//   }
  
//   {
//     type: 'TOGGLE_TODO',
//     id: 0,
//   }
  
//   {
//     type: 'ADD_GOAL',
//     goal: {
//       id: 0,
//       name: 'Run a Marathon'
//     }
//   }
  
//   {
//     type: 'REMOVE_GOAL',
//     id: 0
//   }
  
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }

function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
}
  
function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
}
  
function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
}

function todos(state = [], action) {
    // if(action.type === 'ADD_TODO') {
    //     return state.concat([action.todo])
    // } else if (action.type === 'REMOVE_TODO') {
    //     return state.filter(todo => todo.id !== action.id)
    // } else if (action.type === 'TOGGLE_TODO') {
    //     return state.map(todo => todo.id !== action.id ? todo : 
    //         Object.assign({}, todo, {complete: !todo.complete})
    //     )
    // } else {
    //     return state
    // }
    switch(action.type) {
        case ADD_TODO :
          return state.concat([action.todo])
        case REMOVE_TODO :
          return state.filter(todo => todo.id !== action.id)
        case TOGGLE_TODO :
          return state.map(todo => todo.id !== action.id ? todo :
            Object.assign({}, todo, {complete: !todo.complete})
          )
        default :
          return state
      }
}

function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}


function createStore(reducer) {
    let state 

    let listeners = []


    const getState = () => state 

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }
}

const store = createStore(app)

const unsubscribe = store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//       id: 0,
//       name: 'Learn Redux',
//       complete: false,
//     }
// })
store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false,
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Learn Vue',
    complete: true,
}))

store.dispatch(addTodoAction({
    id: 2,
    name: 'Learn Drawing',
    complete: false,
}))

// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//       id: 1,
//       name: 'Learn Vue',
//       complete: true,
//     }
// })

// store.dispatch({
//     type: ADD_TODO,
//     todo: {
//       id: 2,
//       name: 'Learn Drawing',
//       complete: false,
//     }
// })

// store.dispatch({
//     type: REMOVE_TODO,
//     id: 1,
// })
store.dispatch(removeTodoAction(1))

// store.dispatch({
//     type: TOGGLE_TODO,
//     id: 0,
// })
store.dispatch(toggleTodoAction(0))

// store.dispatch({
//     type: ADD_GOAL,
//     goal: {
//       id: 0,
//       name: 'Learn Korean'
//     }
// })

// store.dispatch({
//     type: ADD_GOAL,
//     goal: {
//       id: 1,
//       name: 'Getting fit'
//     }
// })
store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Korean'
}))

store.dispatch(addGoalAction({
    id: 1,
    name: 'Getting fit'
}))

// store.dispatch({
//     type: REMOVE_GOAL,
//     id: 0
// })
store.dispatch(removeGoalAction(0))