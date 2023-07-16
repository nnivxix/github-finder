import { UserGithub } from "../types/schema"

interface GithubState {
  users: UserGithub[],
  loading: boolean,
}
interface GithubAction {
  type: "GET_USERS",
  payload: UserGithub[]
}

const githubReducer = (state: GithubState, action: GithubAction) => {
  switch(action.type) {
    case "GET_USERS" : 
    return {
      ...state,
      users: action.payload,
      loading: false,
    }
    default:
      return state
  }
}

export default githubReducer;