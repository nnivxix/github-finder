import { UserGithub } from "../../types/schema"

interface GithubState {
  users: UserGithub[],
  loading: boolean,
}
interface GetUsers {
  type: "GET_USERS",
  payload: UserGithub[]
}
interface SetLoading {
  type: "SET_LOADING",
}
interface ClearUsers {
  type: "CLEAR_USERS",
}
type GithubAction = GetUsers | ClearUsers | SetLoading;

const githubReducer = (state: GithubState, action: GithubAction) => {
  switch(action.type) {
    case "GET_USERS" : 
    return {
      ...state,
      users: action.payload,
      loading: false,
    }
    case "SET_LOADING": 
    return {
      ...state,
      loading: true,
    }
    case "CLEAR_USERS": 
    return {
      ...state,
      users: [],
    }
    default:
      return state
  }
}

export default githubReducer;