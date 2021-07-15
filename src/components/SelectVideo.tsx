import React from 'react';
import styled from 'styled-components';
import AppLayout from './layout/AppLayout';
import { faCommentAlt, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Video } from '../modules/videoModule';
import { exchangeK } from '../util/count';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SelectVideoLayout = styled.section`
    width: 100%;
    margin-bottom: 3rem;
`;

const ThreeLineText = styled.p`
    white-space: normal; 
    line-height: 1.4; 
    height: 4.4em; 
    text-align: left;
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const VideoContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const TextArea = styled.div`
    width: 50%;
    color: #fff;
    h2 {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        white-space: normal;
        line-height: 1.2;
        height: 2.4em; 
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const VideoInfo = styled.ul`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    li {
        span {
            margin-left: 0.5rem;
        }
    }
`;

const ImageArea = styled.div`
    width: 32rem;
    height: 20rem;
    background: #ccc;
`;

const Image = styled.div<{ source: string }>`
    width: 100%;
    height: 100%;
    background: url('${({ source }) => source}') no-repeat center center;
    background-size: cover;
`;

const SelectVideo = () => {
    const { loading, data, error } = useSelector((state: RootState) => state.video);

    if (loading) return <SelectVideoLayout>로딩중...</SelectVideoLayout>;
    if (error) return <SelectVideoLayout>에러발생</SelectVideoLayout>;
    if (data.data.length === 0) return <SelectVideoLayout>검색결과가 없음</SelectVideoLayout>;

    return (
        <SelectVideoLayout>
            <AppLayout>
                <VideoContent>
                    <TextArea>
                        <h2>{data.selected.title}</h2>
                        <VideoInfo>
                            <li>
                                <FontAwesomeIcon icon={faEye} />
                                <span>{exchangeK(parseInt(data.selected.viewCount))}</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>{exchangeK(parseInt(data.selected.likeCount))}</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCommentAlt} />
                                <span>{exchangeK(parseInt(data.selected.commentCount))}</span>
                            </li>
                        </VideoInfo>
                        <ThreeLineText>
                            {data.selected.description}
                        </ThreeLineText>
                    </TextArea>
                    <ImageArea>
                        <Image source={data.selected.thumbnail} />
                    </ImageArea>
                </VideoContent>
            </AppLayout>
        </SelectVideoLayout>
    );
};

export default SelectVideo;