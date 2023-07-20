import { UserGithub, UsersGithub, UserRepo } from "../../types/schema"

interface GithubState {
  users: UsersGithub[],
  user: UserGithub,
  repos: UserRepo[],
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
interface GetRepos {
  type: "GET_REPOS",
  payload: UserRepo[]
}
type GithubAction = GetUsers | GetUser | ClearUsers | SetLoading | GetRepos;

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
    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer;