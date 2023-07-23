import { UserGithub, UsersGithub, UserRepo } from "../../types/schema"

interface GithubState {
  users: UsersGithub[],
  user: UserGithub,
  repos: UserRepo[],
  loading: boolean,
  inputSearch: string,
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
interface InputSearch {
  type: "INPUT_SEARCH",
  payload: string
}
interface ClearInputSearch {
  type:"CLEAR_INPUT_SEARCH",
}
interface GetUserAndRepos {
  type: "GET_USER_AND_REPOS",
  payload: {
    user: UserGithub,
    repos:  UserRepo[]
  }
}
type GithubAction = GetUsers | ClearUsers | SetLoading | InputSearch | ClearInputSearch | GetUserAndRepos;

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
    case "CLEAR_INPUT_SEARCH": 
    return {
      ...state,
      inputSearch: "",
    }
    case "CLEAR_USERS": 
    return {
      ...state,
      users: [],
    }
    case "INPUT_SEARCH": 
    return {
      ...state,
      inputSearch: action.payload
    }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer;