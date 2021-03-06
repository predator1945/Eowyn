import {
    GET_DISCUSSION_SUCCESS, GET_DISCUSSIONS_LIST_SUCCESS, ADD_NEW_DISCUSSION_SUCCESS, NEW_POST_SUCCESS,
    GET_FOLLOWS_SUCCESS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, NOTIFY_NEW_POST_SUCCESS, GET_MORE_OF_DISCUSSIONS_LIST_SUCCESS, GET_MORE_POSTS_DISCUSSION_SUCCESS, SEARCH_DISCUSSIONS_SUCCESS,GET_FOLLOWED_SUCCESS
} from '../actions/Discussions.actions'

const dashboardReducerDefaultState = {
    discussion: null,
    list: [],
    follows: null,
    count: 0,
    followed: {
        rows: [],
        count: 0
    }
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {
        case GET_DISCUSSION_SUCCESS:
            console.log(action.payload)
            return { ...state, ...action.payload }

        case GET_DISCUSSIONS_LIST_SUCCESS:
            return { ...state, list: action.payload.rows, count: action.payload.count }

        case ADD_NEW_DISCUSSION_SUCCESS:
            return { ...state, ...action.payload }

        case GET_FOLLOWS_SUCCESS:
            return { ...state, follows: action.payload }

        case FOLLOW_SUCCESS:
            return { ...state, follows: [action.payload + "", ...state.follows] }

        case UNFOLLOW_SUCCESS:
            return { ...state, follows: state.follows.filter(el => el != action.payload) }

        case NOTIFY_NEW_POST_SUCCESS:
            // return state
            return { ...state, posts: {rows: [action.payload, ...state.posts.rows], count: state.posts.count + 1 }}

        case GET_MORE_OF_DISCUSSIONS_LIST_SUCCESS:
            return { ...state, list: [...state.list, ...action.payload.rows], count: action.payload.count }

        case GET_MORE_POSTS_DISCUSSION_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                posts: {
                    count: action.payload.posts.count,
                    rows: [...state.posts.rows, ...action.payload.posts.rows]
                }
            }

        case SEARCH_DISCUSSIONS_SUCCESS:
            return { ...state, list: action.payload.rows, count: action.payload.count }

        case GET_FOLLOWED_SUCCESS:
            return { ...state, ...action.payload }

        default: return state
    }
}