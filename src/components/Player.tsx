import { faEye, faEyeSlash, faPause, faPlay, faStepBackward, faStepForward, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rreact, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { setSelcted } from '../modules/videoModule';
import { RootState } from '../store/store';

const PlayerLayout = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 4rem;
    padding: 0 2rem;
    background: #222;
`;

const PlayerButton = styled.button`
    cursor: pointer;
    font-size: 1.5rem;
    background: inherit;
    border: none;
    color: #fff;
    &:hover {
        color: #ccc;
    }
    span {
        display: block;
        width: 0;
        height: 0;
        overflow: hidden;
    }
`;

const OpenButton = styled(PlayerButton)`
    
`;
const PrevButton = styled(PlayerButton)``;
const PlayButton = styled(PlayerButton)``;
const NextButton = styled(PlayerButton)``;
const VolumeButton = styled(PlayerButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
`;

const VolumeBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2rem;
    margin-right: auto;
    & > div {
        width: 10rem;
        height: 0.2rem;
        background: #ccc;
        border-radius: 100px;
        overflow: hidden;
        transition: 0.2s;
        &:hover {
            height: 1rem;
        }
        &:hover > div::after {
            width: 1rem;
            height: 1rem;
            opacity: 1;
        }
    }
`;
const VolumeBar = styled.div<{ volume: number }>`
    position: relative;
    text-indent: -9999px;
    width: ${({ volume }) => volume}%;
    height: 100%;
    background: #ff1a40;
    &::after {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        background: #fff;
        border-radius: 50%;
        opacity: 0;
        transition: 0.2s;
    }
`;

const VideoBlock = styled.div<{ isOpend: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #222;
    z-index: -1;
    transform: ${({ isOpend }) => isOpend ? 'translateY(0)' : 'translateY(100%)'};
    transition: 0.3s;

    & > div {
        width: 100%;
        height: 70%;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
`;

const ProgressBarBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
    background: #ccc;
`;
const ProgressBar = styled.div``;


const Player = () => {
    const { loading, data, error } = useSelector((state: RootState) => state.video);
    const [isOpend, setIsOpend] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [volumeClicked, setvolumClicked] = useState(false);
    const [volume, setVolume] = useState(100);
    const dispatch = useDispatch();
    const volumeRef = useRef<HTMLDivElement>(null);
    const youtubeRef = useRef<any>(null);

    const volumeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!volumeRef.current || !volumeClicked) return;
        const width = volumeRef.current.clientWidth;
        const mousePosition = e.clientX - volumeRef.current.offsetLeft;
        const volumePercent = Math.round(mousePosition / width * 100);
        setVolume(volumePercent);
    }

    const onReady = () => {
        if (!youtubeRef.current) return;
        youtubeRef.current.internalPlayer.pauseVideo();
    }

    const prevMusic = () => {
        const current = data.selected.id;
        const prev = current - 1;

        if (prev < 0) {
            dispatch(setSelcted(data.data[20]));
        } else {
            dispatch(setSelcted(data.data[prev]));
        }
    }

    const nextMusic = () => {
        const current = data.selected.id;
        const next = current + 1;
        const isSearched = data.selected !== data.data[data.selected.id];

        console.log(isSearched);

        if (next > 20 || isSearched) {
            dispatch(setSelcted(data.data[0]));
        } else {
            dispatch(setSelcted(data.data[next]));
        }
    }

    useEffect(() => {
        if (!youtubeRef.current) return;
        youtubeRef.current.internalPlayer.setVolume(volume);
    }, [volume]);

    return (
        <PlayerLayout>
            <VideoBlock isOpend={isOpend}>
                <YouTube
                    ref={youtubeRef}
                    videoId={data.selected.videoId}
                    onPlay={() => setIsPlayed(true)}
                    onPause={() => setIsPlayed(false)}
                    onReady={onReady}
                    opts={{
                        playerVars: {
                            autoplay: 1
                        }
                    }}
                />
            </VideoBlock>
            <ProgressBarBox>
                <ProgressBar></ProgressBar>
            </ProgressBarBox>
            <OpenButton><span>영상열기</span>{isOpend ? <FontAwesomeIcon onClick={() => setIsOpend(false)} icon={faEyeSlash} /> : <FontAwesomeIcon onClick={() => setIsOpend(true)} icon={faEye} />}</OpenButton>
            <VolumeBox>
                <VolumeButton onClick={() => volume === 0 ? setVolume(100) : setVolume(0)}><span>볼륨 on/off</span><FontAwesomeIcon icon={volume === 0 ? faVolumeOff : faVolumeUp} /></VolumeButton>
                <div
                    ref={volumeRef}
                    onMouseDown={() => setvolumClicked(true)}
                    onMouseUp={() => setvolumClicked(false)}
                    onMouseMove={volumeHandler}
                    onMouseLeave={() => setvolumClicked(false)}
                >
                    <VolumeBar volume={volume}>{volume}</VolumeBar>
                </div>
            </VolumeBox>
            <div>
                <PrevButton onClick={prevMusic}><span></span><FontAwesomeIcon icon={faStepBackward} /></PrevButton>
                {
                    !isPlayed
                        ? <PlayButton onClick={() => youtubeRef.current.internalPlayer.playVideo()}><span></span><FontAwesomeIcon icon={faPlay} /></PlayButton>
                        : <PlayButton onClick={() => youtubeRef.current.internalPlayer.pauseVideo()}><span></span><FontAwesomeIcon icon={faPause} /></PlayButton>
                }
                <NextButton onClick={nextMusic}><span></span><FontAwesomeIcon icon={faStepForward} /></NextButton>
            </div>
        </PlayerLayout>
    )
}

export default Player;