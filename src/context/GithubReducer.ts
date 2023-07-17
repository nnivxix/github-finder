import { UserGithub } from "../types/schema"

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
type GithubAction = GetUsers | SetLoading;

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
    default:
      return state
  }
}

export default githubReducer;