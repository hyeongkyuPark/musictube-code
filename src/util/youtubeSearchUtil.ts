import { __String } from "typescript"

export type VideoResponse = {
    kind: string,
    etag: string,
    id: string,
    snippet: {
        publishedAt: Date,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium: {
                url: string,
                width: number,
                height: number
            },
            high: {
                url: string,
                width: number,
                height: number
            },
            standard: {
                url: string,
                width: number,
                height: number
            },
            maxres: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        tags: string[],
        categoryId: string,
        liveBroadcastContent: string,
        defaultLanguage: string,
        localized: {
            title: string,
            description: string
        },
        defaultAudioLanguage: string
    },
    statistics: {
        viewCount: string,
        likeCount: string,
        dislikeCount: string,
        favoriteCount: string,
        commentCount: string
    }
}

export type SearchVideo = {
    kind: string,
    etag: __String,
    id: {
        kind: string,
        videoId: string
    },
    snippet: {
        publishedAt: Date,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium: {
                url: string,
                width: number,
                height: number
            },
            high: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        liveBroadcastContent: string,
        publishTime: Date
    }
}

export type SearchVideoResponse = {
    kind: string,
    etag: string,
    items: VideoResponse[] | SearchVideo[],
    nextPageToken: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    }
};