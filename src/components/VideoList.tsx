import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getVideo, setSelcted, Video } from '../modules/videoModule';
import { RootState } from '../store/store';
import SelectVideo from './SelectVideo';

const ListLayout = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    color: #fff;
    overflow: hidden;

    &:hover button {
        opacity: 1;
    }

    button {
        position: absolute;
        cursor: pointer;
        border: none;
        outline: none;
        background: none;
        font-size: 2rem;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        span {
            display: block;
            width: 0;
            height: 0;
            overflow: hidden;
        }
        &:hover {
            transform: scale(1.3);
        }
        &:not(:last-child) {
            left: 1rem;
        }
        &:last-child {
            right: 1rem;
        }
    }
`;

const VideoWrap = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const VideoImage = styled.div<{ thumbnail: string, isSelected?: boolean }>`
    background: url('${({ thumbnail }) => thumbnail}') no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    border: ${({ isSelected }) => isSelected && '5px solid #fff'};
    transition: transform 0.3s;
`;

const VideoListBlock = styled.ul<{ slideX: number }>`
     display: flex;
     transform: translateX(-${({ slideX }) => slideX}px);
     transition: transform 0.3s;
`;

const VideoItem = styled.li<{ isSelected?: boolean }>`
    position: relative;
        flex: 0 0 auto;
        width: 20rem;
        height: 12rem;
        padding: 0 0.5rem;
        overflow: hidden;
        border: ${({ isSelected }) => isSelected && '3px solid #fff'};
        h3 {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.6);
            transform: translateY(100%);
            transition: transform 0.3s;
        }

        &:hover {
            h3 {
                transform: translateY(0%);
            }
            ${VideoImage} {
                transform: scale(1.2);
            }
        }
`;

const VideoList = () => {
    const [slideX, setSlideX] = useState(0);
    const { loading, data, error } = useSelector((state: RootState) => state.video);
    const dispatch = useDispatch();
    const videoListRef = useRef<HTMLUListElement>(null);

    const onSlideRight = () => {
        const videoItem = videoListRef.current?.querySelector('li');
        if (!videoItem) return;
        let moveX = videoItem.getBoundingClientRect().width;

        if (slideX + moveX > (data.data.length * moveX) - window.innerWidth) {
            moveX = 0;
        }

        setSlideX(slideX => slideX + moveX);
    }
    const onSlideLeft = () => {
        const videoItem = videoListRef.current?.querySelector('li');
        if (!videoItem) return;
        let moveX = videoItem.getBoundingClientRect().width;

        if (slideX - moveX < 0) {
            moveX = 0;
        }

        setSlideX(slideX => slideX - moveX);
    }

    useEffect(() => {
        dispatch(getVideo());
    }, [dispatch]);

    useEffect(() => {
        if (data.data.length === 0) return;
        setSlideX(0);
    }, [data.data]);

    useEffect(() => {
        if (data.selected.videoId === '') {
            dispatch(setSelcted(data.data[0]));
        }
    }, [data, dispatch]);

    if (loading) return <ListLayout>로딩중...</ListLayout>;
    if (error) return <ListLayout>에러발생</ListLayout>;
    if (data.data.length === 0) return <ListLayout>검색결과가 없음</ListLayout>;

    return (
        <ListLayout>
            <VideoListBlock slideX={slideX} ref={videoListRef}>
                {
                    data.data.map((video: Video, idx: number) => {
                        return (
                            <VideoItem onClick={() => dispatch(setSelcted(data.data[idx]))} isSelected={video.videoId === data.selected.videoId} key={idx}>
                                <VideoWrap>
                                    <VideoImage thumbnail={video.thumbnail}></VideoImage>
                                </VideoWrap>
                                <h3>{video.title}</h3>
                            </VideoItem>
                        );
                    })
                }
            </VideoListBlock>
            <button onClick={onSlideLeft}><span>왼쪽으로</span><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button onClick={onSlideRight}><span>오른쪽으로</span><FontAwesomeIcon icon={faChevronRight} /></button>
        </ListLayout>
    );
}

export default VideoList;