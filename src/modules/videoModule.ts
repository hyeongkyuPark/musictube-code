import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { getVideoAsync } from "../api/videoApi";
import { SearchVideo, VideoResponse } from "../util/youtubeSearchUtil";
import { GOOGLE_ACCESS_KEY } from "../config/config";

export const GET_VIDEO = 'GET_VIDEO';
export const GET_VIDEO_SUCCESS = 'GET_VIDEO_SUCCESS';
export const GET_VIDEO_ERROR = 'GET_VIDEO_ERROR';


export type Video = {
    id: number,
    videoId: string,
    title: string,
    description: string,
    thumbnail: string,
    viewCount: string,
    likeCount: string,
    commentCount: string
}

const initialVideo = {
    id: 0,
    videoId: '',
    title: '',
    description: '',
    thumbnail: '',
    viewCount: '',
    likeCount: '',
    commentCount: ''
}

const initialState = {
    loading: false,
    data: { data: [initialVideo], selected: initialVideo },
    error: null
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getVideo: (state) => {
            state.loading = true;
            state.data.data = [initialVideo];
            state.error = null;
        },
        searchVideo: (state, action) => {
            state.loading = true;
            state.data.data = [initialVideo];
            state.error = null;
        },
        getVideoSuccess: (state, action: { payload: Video[] }) => {
            state.loading = false;
            state.data.data = action.payload;
            state.error = null;
        },
        getVideoError: (state, action) => {
            state.loading = false;
            state.data.data = [];
            state.error = action.payload;
        },
        setSelcted: (state, action) => {
            state.data.selected = action.payload;
        }
    }
});

function* getVideoSaga() {
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?key=${GOOGLE_ACCESS_KEY}&part=snippet, statistics&chart=mostPopular&regionCode=KR&videoCategoryId=10&maxResults=20`;
        const response: AxiosResponse<any> = yield call(getVideoAsync, url);
        const items = response.data.items;

        const payload = items.map((item: VideoResponse, idx: number): Video => {
            return {
                id: idx,
                videoId: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                commentCount: item.statistics.commentCount,
                description: item.snippet.description,
                likeCount: item.statistics.likeCount,
                viewCount: item.statistics.viewCount
            }
        });

        yield put({ type: getVideoSuccess, payload });

    } catch (e) {
        yield put({ type: getVideoError, payload: e });
    }
}

function* searchVideoSaga(action: { payload: string }) {
    try {
        console.log(action.payload);
        const urlBefore = `https://www.googleapis.com/youtube/v3/search?key=${GOOGLE_ACCESS_KEY}&part=snippet&regionCode=KR&maxResults=20&type=video&videoCategoryId=10&q=${action.payload}`;
        const responseBefore: AxiosResponse<any> = yield call(getVideoAsync, urlBefore);
        const itemsBefore = responseBefore.data.items;

        const ids = itemsBefore.map((item: SearchVideo) => item.id.videoId).join();
        const url = `https://www.googleapis.com/youtube/v3/videos?key=${GOOGLE_ACCESS_KEY}&part=snippet, statistics&id=${ids}`;
        const response: AxiosResponse<any> = yield call(getVideoAsync, url);
        const items = response.data.items;


        const payload = items.map((item: VideoResponse, idx: number): Video => {
            return {
                id: idx,
                videoId: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.medium.url,
                commentCount: item.statistics.commentCount,
                description: item.snippet.description,
                likeCount: item.statistics.likeCount,
                viewCount: item.statistics.viewCount
            }
        });

        yield put({ type: getVideoSuccess, payload });
    } catch (e) {
        yield put({ type: getVideoError, payload: e });
    }
}

export const {
    getVideo,
    searchVideo,
    getVideoSuccess,
    getVideoError,
    setSelcted,
} = videoSlice.actions;

export function* videoSaga() {
    yield takeLatest(getVideo, getVideoSaga);
    yield takeLatest(searchVideo, searchVideoSaga);
}

const videoReducer = videoSlice.reducer;
export default videoReducer;