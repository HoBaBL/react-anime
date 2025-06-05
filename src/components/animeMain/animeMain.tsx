import style from './animeMain.module.css'
import { getReleasesId, getFranchises } from '../../api'
import type { EpisodeType, Episode } from '../../types/typesEpisode'
import { useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { Modal, ConfigProvider, Input, Button } from 'antd';
import type { FranchisesType } from '../../types/typesFranchises' 
import { IoSearch } from "react-icons/io5";
import ReactPlayer from 'react-player'
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import type { OnProgressProps } from 'react-player/base'


type lastType = {
    epID: string | undefined, 
    relID: number | undefined,
    playerSeek: number
}

const AnimeMain = () => {
    const [release, setRelease] = useState<EpisodeType>() 
    const [URLVideo, setURLVideo] = useState('')
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [episodes, setEpisodes] = useState<Episode>()
    const [Franchises, setFranchises] = useState<FranchisesType>()
    const [query, updateQuery] = useState('');
    const [sortNew, setSortNew] = useState(true)
    const [lastEpisodesLocal, setLastEpisidesLocal] = useState<lastType[]>(JSON.parse(localStorage.getItem('last_episodes')!) || [])
    const player = useRef<ReactPlayer>(null)


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const createPopular = async () => {
        const timeoutPopular = await getReleasesId(id!)
        const timeoutFranchises = await getFranchises(timeoutPopular.id!)
        setRelease(timeoutPopular)
        setFranchises(timeoutFranchises)
    }

    useEffect(() => {
        createPopular()
        window.scrollTo(0, 0)
    },[id])

    function newURL(item: Episode) {
        setEpisodes(item)
        
        showModal()
        if (item.hls_1080 !== null) {
            setURLVideo(item.hls_1080)
        } else if (item.hls_1080 === null && item.hls_720 !== null) {
            setURLVideo(item.hls_720)
        } else if (item.hls_1080 === null && item.hls_720 === null && item.hls_480 !== null) {
            setURLVideo(item.hls_480)
        }
    }

    const screenWidth = window.screen.width; 
    let modalWidth = ''

    if (screenWidth < 770 ) {
        modalWidth = '90%'
    } else {
        modalWidth = '45%'
    }

    function reverseRelease() {
        release?.episodes.reverse()
    }

    function lastEpisodes(progress:OnProgressProps) {
        const copy = [...lastEpisodesLocal]
        if (!lastEpisodesLocal.find(i => i.epID === episodes?.id)) {
            
            const lastEpisodes = {
                epID: episodes?.id, 
                relID: release?.id,
                playerSeek: 0
            }
            copy.push(lastEpisodes!)
            setLastEpisidesLocal(copy)
            localStorage.setItem('last_episodes', JSON.stringify(copy))
        } else {
            const copyEpisodes = lastEpisodesLocal.find(i => i.epID === episodes?.id)
            if (copyEpisodes != undefined && progress.playedSeconds !== 0) {
                copyEpisodes.playerSeek = Math.trunc(progress.playedSeconds)
            }
            localStorage.setItem('last_episodes', JSON.stringify(copy))
        }
    }

    function seek() {
        const copy = lastEpisodesLocal.find(i => i.epID === episodes?.id)
        if (player.current !== null && copy != undefined) {
            player.current.seekTo(copy.playerSeek)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.flexHeader}>
                <img className={style.img} src={`https://anilibria.wtf/${release?.poster.src}`} alt="" />
                <div>
                    <h1 className={style.h1}>{release?.name.main}</h1>
                    <p className={style.text}>{release?.name.english}</p>
                    <div className={style.flex}>
                        <p className={style.textMain}>{release?.age_rating.label}</p>
                        { !release?.is_ongoing ? 
                            <div className={style.ongoing}>
                                <p className={style.ongoingText}>Завершён</p>
                            </div>
                            : 
                            <div className={style.ongoing}>
                                <p className={style.ongoingText}>Выходит</p>
                            </div>
                        }

                    </div>
                    <div>
                        <p className={style.textMenuGray}>Жанр: <span className={style.textMenu}>{release?.genres.map((item) => item.name).join(' • ')}</span></p>
                        <p className={style.textMenuGray}>Год выхода: <span className={style.textMenu}>{release?.year}</span></p>
                        { release?.episodes_total !== null ? <p className={style.textMenuGray}>Количество серий: <span className={style.textMenu}>{release?.episodes_total}</span></p> : ''}
                        <p className={style.textMenuGray}>Время серии: <span className={style.textMenu}>{release?.average_duration_of_episode} мин</span></p>
                    </div>
                </div>
            </div>
            <div>
                <p className={style.textDescription}>{release?.description}</p>
            </div>
            <div className={style.line}></div>
            <h2 className={style.h2}>Эпизоды</h2>
            
            <ConfigProvider
                theme={{
                    components: {
                    Modal: {
                        contentBg:"#121212"
                    },
                    },
                }}
                >
                <Modal
                    className={style.modalModal}
                    width={modalWidth}
                    wrapClassName={style.modal}
                    closable={false}
                    footer
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div style={{marginBottom:"20px"}}>
                        <p className={style.previewTextMax}>{episodes?.ordinal} эпизод</p>
                        <p className={style.previewText}>{episodes?.name}</p>
                    </div>
                    <ReactPlayer
                        // onPause={() => stopSeek()}
                        ref={player}
                        className={style.iframe}
                        width={'100%'}
                        height={'auto'}
                        controls={true}
                        url={URLVideo}
                        onStart={() => seek()}
                        onProgress={(progress) => {
                            lastEpisodes(progress)
                        }}
                    />
                </Modal>
            </ConfigProvider>
            <div className={style.inputBox}>
                <ConfigProvider
                    theme={{
                        components: {
                        Input: {
                            hoverBorderColor:'none',
                            activeBorderColor:'#d56f1a',
                            hoverBg: '#2e2e2e',
                            colorBorder: "transparent",
                            activeBg: '#2e2e2e',
                            colorTextPlaceholder: '#703a2e'
                        },
                        },
                    }}
                    >
                    <Input style={{width:"100%"}} size="large" className={style.input} value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Введите номер или название эпизода..." prefix={<IoSearch size={20} color='#d56f1a'/>} />
                </ConfigProvider>
                <ConfigProvider
                    theme={{
                        components: {
                        Button: {
                            defaultBg: 'transparent',
                            defaultBorderColor:'#d56f1a',
                            defaultColor:'#e4e4e4',
                            contentFontSize: 20,
                            defaultActiveBg: 'transparent',
                            defaultHoverBg: '#1f1f1f',
                            defaultHoverColor: '#1f1f1f',
                            defaultActiveColor:'#e4e4e4' ,
                            defaultActiveBorderColor:'#d56f1a',
                            defaultHoverBorderColor: '#d56f1a'
                        },
                        },
                    }}
                >   
                    {sortNew ?
                        <Button className={style.btnSort} onClick={() => {setSortNew(false);reverseRelease()}}><FaSortAmountDownAlt size={20} color='#d56f1a'/></Button>
                        :
                        <Button className={style.btnSort} onClick={() => {setSortNew(true);reverseRelease()}}><FaSortAmountUp size={20} color='#d56f1a'/></Button>
                    }
                    
                </ConfigProvider>
            </div>
            <p style={{fontSize:'14px', marginBottom: '30px'}} className={style.textMenuGray}>Просмотрено {lastEpisodesLocal.filter((e) => e.relID === release?.id).length} из {release?.episodes_total}</p>
            <div className={style.episodesGrid}>
                {   
                    release?.episodes.map((item) => 
                        <div style={{backgroundImage: `url(https://anilibria.wtf/${item.preview.src})`, backgroundSize: "cover" }} onClick={() => newURL(item)} className={lastEpisodesLocal.find((i) => i.epID === item.id && i.playerSeek > 1080) ? style.previewActive : style.preview} key={item.id}>
                            <div className={style.previewAbsolute}>
                                <div style={{padding:'10px'}}>
                                    <p className={style.previewTextMax}>{item.ordinal} эпизод</p>
                                    <p className={style.previewText}>{item.name}</p>
                                    
                                </div>
                            </div>
                            {lastEpisodesLocal.find((i) => i.epID === item.id && i.playerSeek > 1080) ? 
                                <div>
                                    <p style={{padding:'10px', color:'#d56f1a', alignItems:'center'}} className={style.previewTextMax}>Просмотрен</p> 
                                </div>
                                : ''
                            }
                            
                        </div>
                    )
                }
            </div>
            <div className={style.line}></div>
            
            {   Franchises?.data.length !== 0 ?
                <>
                    <h2 className={style.h2}>Связанное</h2>
                    <div>
                        <h3 className={style.h3}>{Franchises?.data[0].name}</h3>
                        <p className={style.yearFranchises}>{Franchises?.data[0].first_year} - {Franchises?.data[0].last_year}</p>
                        <div>
                            {Franchises?.data[0].franchise_releases.sort((a, b) => a.sort_order -b.sort_order).map((item) => 
                                <Link to={`/${item.release.alias}`} style={item.release_id === release?.id ? {backgroundColor: "#1a1919"} : {}} className={style.flexFranchise} key={item.id}>
                                    <div className={item.release_id === release?.id ? style.lineVert : style.lineVertNone}></div>
                                    <div className={style.flexFranchiseFlex}>
                                        <div>
                                            <img className={style.imgFranchise} src={`https://anilibria.wtf/${item.release.poster.preview}`} alt="" />
                                        </div>
                                        
                                        <div className={style.flexFlex}>
                                            <div>
                                                <p className={style.textFranchise}>{item.release.name.main}</p>
                                                <p className={style.textFranchiseEn}>{item.release.name.english}</p>
                                                <p className={style.textFranchiseEn}>{item.release.year}</p>
                                                {item.release?.episodes_total !== null ? <p className={style.textFranchiseEn}>{item.release.episodes_total} эпизодов</p> : ''} 
                                            </div>
                                            <div>
                                                <p className={item.release_id === release?.id ? style.FranchisesNum : style.FranchisesNumGray}>#{item.sort_order}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            : ""
            }
        </div>
    )
}

export default AnimeMain