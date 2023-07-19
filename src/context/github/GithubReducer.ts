import { UserGithub, UsersGithub } from "../../types/schema"

interface GithubState {
  users: UsersGithub[],
  user: UserGithub,
  loading: boolean,
}
interface GetUsers {
  type: "GET_USERS",
  payload: UserGithub[]
}
interface GetUser {
  type: "GET_USER",
  payload: UserGithub
}
interface SetLoading {
  type: "SET_LOADING",
}
interface ClearUsers {
  type: "CLEAR_USERS",
}
type GithubAction = GetUsers | GetUser | ClearUsers | SetLoading;

const githubReducer = (state: GithubState, action: GithubAction) => {
  switch(action.type) {
    case "GET_USERS" : 
    return {
      ...state,
      users: action.payload,
      loading: false,
    }
    case "GET_USER" : 
    return {
      ...state,
      user: action.payload,
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