import axios from 'axios'
import { retrieveToken } from './Auth.actions'
import history from '../routers/history'
import { toast } from "react-toastify";
import React from 'react'
import Notification from '../components/NotificationNewPost'

const io = require('socket.io-client')
// const socket = io('https://api.eowyn.szuflicki.tk')
const socket = io('http://localhost:8081')
// const instance = axios.create({ baseURL: '/api' })
const instance = axios.create({ baseURL: 'http://localhost:8081' })



export const addNewDisscussion = (category, topic, desc, tags) => {
    return dispatch => {
        instance.post('/discussions', { category, topic, desc, tags }, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                console.log(res)
                dispatch(addNewDisscussionSuccess())
                history.push(`/discussion/${res.data.id}`)
            })
            .catch(err => { })
    }
}

export const ADD_NEW_DISCUSSION_SUCCESS = 'ADD_NEW_DISCUSSION_SUCCESS';
function addNewDisscussionSuccess() {
    return {
        type: ADD_NEW_DISCUSSION_SUCCESS,
        payload: {}
    };
}

export const getDisscussion = (id) => {
    return dispatch => {
        instance.get(`/discussion/${id}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getDisscussionSuccess(res.data))
            })
            .catch(err => { })
    }
}

export const GET_DISCUSSION_SUCCESS = 'GET_DISCUSSION_SUCCESS';
function getDisscussionSuccess(data) {
    return {
        type: GET_DISCUSSION_SUCCESS,
        payload: data
    };
}

export const getMorePostsDisscussion = (id, offset) => {
    return dispatch => {
        instance.get(`/discussion/${id}?offset=${offset}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getMorePostsDisscussionSuccess(res.data))
            })
            .catch(err => { })
    }
}

export const GET_MORE_POSTS_DISCUSSION_SUCCESS = 'GET_MORE_POSTS_DISCUSSION_SUCCESS';
function getMorePostsDisscussionSuccess(data) {
    return {
        type: GET_MORE_POSTS_DISCUSSION_SUCCESS,
        payload: data
    };
}

export const getDiscussionsList = (cat) => {
    return dispatch => {
        instance.get(`/discussions/${cat}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getDiscussionsListSuccess(res.data))
            })
            .catch(err => { })
    }
}

export const GET_DISCUSSIONS_LIST_SUCCESS = 'GET_DISCUSSIONS_LIST_SUCCESS';
function getDiscussionsListSuccess(data) {
    return {
        type: GET_DISCUSSIONS_LIST_SUCCESS,
        payload: data
    };
}

export const getMoreOfDiscussionsList = (cat, offset = 0) => {
    return dispatch => {
        instance.get(`/discussions/${cat}?offset=${offset}`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getMoreOfDiscussionsListSuccess(res.data))
            })
            .catch(err => { })
    }
}

export const GET_MORE_OF_DISCUSSIONS_LIST_SUCCESS = 'GET_MORE_OF_DISCUSSIONS_LIST_SUCCESS';
function getMoreOfDiscussionsListSuccess(data) {
    return {
        type: GET_MORE_OF_DISCUSSIONS_LIST_SUCCESS,
        payload: data
    };
}

export const newPost = (text, topic_id) => {
    return dispatch => {
        instance.post(`/discussion/`, { text, topic_id }, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(newPostSuccess(res.data))
            })
            .catch(err => {
                toast.error("Log in to comment");
            })
    }
}

export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
function newPostSuccess(data) {
    return {
        type: NEW_POST_SUCCESS,
        payload: data
    };
}

export const getFollows = () => {
    return dispatch => {
        instance.get(`/follows`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getFollowsSuccess(res.data))
            })
            .catch(err => {
                // toast.error("Log in to comment");
            })
    }
}

export const GET_FOLLOWS_SUCCESS = 'GET_FOLLOWS_SUCCESS';
function getFollowsSuccess(data) {
    return {
        type: GET_FOLLOWS_SUCCESS,
        payload: data
    };
}

export const getFollowed = () => {
    return dispatch => {
        instance.get(`/followed`, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(getFollowedSuccess(res.data))
            })
            .catch(err => {
                // toast.error("Log in to comment");
            })
    }
}

export const GET_FOLLOWED_SUCCESS = 'GET_FOLLOWED_SUCCESS';
function getFollowedSuccess(data) {
    return {
        type: GET_FOLLOWED_SUCCESS,
        payload: data
    };
}

export const follow = (topic_id) => {
    return dispatch => {
        instance.post(`/follow`, { topic_id }, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(followSuccess(topic_id))
                dispatch(getFollows())
            })
            .catch(err => {
                toast.error("Error occured");
            })
    }
}

export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
function followSuccess(data) {
    return {
        type: FOLLOW_SUCCESS,
        payload: data
    };
}

export const unfollow = (topic_id) => {
    return dispatch => {
        instance.post(`/unfollow`, { topic_id }, { headers: { "authorization": localStorage.getItem('token') } })
            .then(res => {
                dispatch(unfollowSuccess(topic_id))
                dispatch(getFollows())
            })
            .catch(err => {
                // toast.error("Log in to comment");
            })
    }
}

export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
function unfollowSuccess(data) {
    return {
        type: UNFOLLOW_SUCCESS,
        payload: data
    };
}

export const notifyNewPost = (post, discussion) => {
    return dispatch => {
        dispatch(notifyNewPostSuccess(post))
        toast.info(<Notification post={post} discussion={discussion} />);
    }
}

export const NOTIFY_NEW_POST_SUCCESS = 'NOTIFY_NEW_POST_SUCCESS';
function notifyNewPostSuccess(data) {
    return {
        type: NOTIFY_NEW_POST_SUCCESS,
        payload: data
    };
}

export const justNotifyNewPost = (post, discussion) => {
    return dispatch => {
        toast.info(<Notification post={post} discussion={discussion} />);
    }
}



export const searchDiscussions = (cat) => {
    return dispatch => {
        instance
            .get(`/discussions/${cat}`, {
                params: {
                    cat
                }
            })
            .then(res => {
                dispatch(searchDiscussionsSuccess(res.data))
            })
            .catch(err => { })
    }
}

export const SEARCH_DISCUSSIONS_SUCCESS = 'SEARCH_DISCUSSIONS_SUCCESS';
function searchDiscussionsSuccess(data) {
    return {
        type: GET_DISCUSSIONS_LIST_SUCCESS,
        payload: data
    };
}
