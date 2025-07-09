import style from './animeMain.module.css'
import { getReleasesId, getFranchises, supabase, getListId } from '../../api'
import type { EpisodeType, Episode } from '../../types/typesEpisode'
import { useEffect, useRef, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom';
// import { Modal, ConfigProvider, Input, Button, Skeleton, Dropdown, type MenuProps } from 'antd';
import { Modal, ConfigProvider, Input, Button, Skeleton } from 'antd';
import type { FranchisesType } from '../../types/typesFranchises' 
import { IoSearch } from "react-icons/io5";
import ReactPlayer from 'react-player'
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import type { OnProgressProps } from 'react-player/base'
import { PiStarFill, PiStarBold } from "react-icons/pi";
import { GrNext, GrPrevious } from "react-icons/gr";


type lastType = {
    id: `${string}-${string}-${string}-${string}-${string}`, 
    release_episode_id: string | undefined,
    id_user: string
    playerSeek: number,
    played: number,
    id_release: number | undefined
}

type favourites = {
    id: number
    id_title: string,
    id_user: string,
    time: string
}

// const items: MenuProps['items'] = [
//   {
//     label: (
//       <button className={style.headerMenuDropdownText}>Просмотрено</button>
//     ),
//     key: '0',
//   },
//   {
//     label: (
//       <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
//         2nd menu item
//       </a>
//     ),
//     key: '1',
//   },
//   {
//     type: 'divider',
//   },
//   {
//     label: '3rd menu item',
//     key: '3',
//   },
// ];

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
    const [favourites, setFavourites] = useState<favourites[]>([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('') /// id user
    const navigate = useNavigate();


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
        console.log(timeoutPopular)
        setLoading(true)
        document.title = timeoutPopular.name.main

    }

    useEffect(() => {
        createPopular()
        window.scrollTo(0, 0)
        setLoading(false)
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

    // useEffect(() => {
    //     lastEpisodesAdd()
    // },[user, release])

    // async function lastEpisodesAdd() {
    //     const { data, error } = await supabase
    //         .from('episodes_timecod')
    //         .select()
    //         .eq('id_user', user)
    //         .eq('id_release', release?.id)
    //     setLastEpisidesLocal(data!)
    //     if (error) console.log(error)
    // }

    async function lastEpisodes(progress:OnProgressProps) {
        // if (user !== '') {
        //     // if (!lastEpisodesLocal.find(i => i.release_episode_id === episodes?.id)) {
        //     //     const { error } = await supabase
        //     //     .from('episodes_timecod')
        //     //     .insert({ 
        //     //         id: crypto.randomUUID(),
        //     //         release_episode_id: episodes?.id, 
        //     //         id_user: user,
        //     //         playerSeek:0,
        //     //         played: 0,
        //     //         id_release: release?.id
        //     //     })
        //     // if (error) console.log(error)
            
        //     // } else {
        //         const copyEpisodes = lastEpisodesLocal.find(i => i.release_episode_id === episodes?.id)
        //         if (copyEpisodes != undefined && progress!.playedSeconds !== 0) {
        //             const { error } = await supabase
        //                 .from('episodes_timecod')
        //                 .update({ playerSeek: Math.trunc(progress!.playedSeconds), played: progress!.played})
        //                 .eq('id_user', user)
        //                 .eq('release_episode_id', copyEpisodes.release_episode_id)
        //             if (error) console.log(error)
        //         }
        //     // }
        //     lastEpisodesAdd()
        // } 
        const copy = [...lastEpisodesLocal]
        if (!lastEpisodesLocal.find(i => i.release_episode_id === episodes?.id)) {
            
            const lastEpisodes = {
                id: crypto.randomUUID(),
                release_episode_id: episodes?.id, 
                id_user: '0',
                playerSeek:0,
                played: 0,
                id_release: release?.id
            }
            copy.push(lastEpisodes)
            setLastEpisidesLocal(copy)
            localStorage.setItem('last_episodes', JSON.stringify(copy))
        } else {
            const copyEpisodes = lastEpisodesLocal.find(i => i.release_episode_id === episodes?.id)
            if (copyEpisodes != undefined && progress.playedSeconds !== 0) {
                copyEpisodes.playerSeek = Math.trunc(progress.playedSeconds)
                copyEpisodes.played = progress.played
            }
            localStorage.setItem('last_episodes', JSON.stringify(copy))
        }
    
        
    }

    function seek() {
        const copy = lastEpisodesLocal.find(i => i.release_episode_id === episodes?.id)
        if (player.current !== null && copy != undefined) {
            player.current.seekTo(copy.playerSeek)
        }
    }

    async function User() {
        const { data, error } = await supabase.auth.getSession()
        setUser(data.session?.user.id!)
        if (error !== null) {
            console.log(error)
        }
        Favourites(data.session?.user.id!)
    }

    useEffect(() => {
        User()
        
    },[user])

    async function Favourites(user:string) {
        const { data, error } = await supabase
            .from('anime_favorites')
            .select()
            .eq('id_user', user)
        setFavourites(data!)
        if (error) console.log(error)
    }

    useEffect(() => {
        const array = [2637,9433,6837]
        getListId(array)
    },[])
    

    
    /// добавить в избранное
    async function addFavorites() {
        if (user !== undefined) {
            const { error } = await supabase
            .from('anime_favorites')
            .insert(
                { 
                    id: crypto.randomUUID(),
                    id_title: release?.id, 
                    id_user: user,
                    time: new Date(),
                    poster: release?.poster.src,
                    name: release?.name.main,
                    name_en: release?.name.english,
                    genres: release?.genres,
                    year: release?.year,
                    age_rating: release?.age_rating.label,
                    description: release?.description,
                    alias: release?.alias
                },
            ).select()
            if (error) console.log(error)
            Favourites(user)
        } else {
            navigate("/login")
        }
        
    }

    async function deleteFavorites() {
        const response = await supabase
        .from('anime_favorites')
        .delete()
        .eq('id_title', release?.id)
        .eq('id_user', user)
        if (response) {}
        Favourites(user)
    }

    function nextEpisodes() {
        const index = release?.episodes.indexOf(episodes!)
        let episod = release?.episodes[index!]
        if (sortNew) {
            if (index! + 1 !== release?.episodes.length) {
                episod = release?.episodes[index! + 1]
                setEpisodes(episod)

                if (episod?.hls_1080 !== null) {
                    setURLVideo(episod!.hls_1080)
                } else if (episod.hls_1080 === null && episod?.hls_720 !== null) {
                    setURLVideo(episod?.hls_720)
                } else if (episod?.hls_1080 === null && episod?.hls_720 === null && episod?.hls_480 !== null) {
                    setURLVideo(episod?.hls_480)
                }
            }

        } else {
            if (index !== 0) {
                episod = release?.episodes[index! - 1]
                setEpisodes(episod)

                
                if (episod?.hls_1080 !== null) {
                    setURLVideo(episod!.hls_1080)
                } else if (episod.hls_1080 === null && episod?.hls_720 !== null) {
                    setURLVideo(episod?.hls_720)
                } else if (episod?.hls_1080 === null && episod?.hls_720 === null && episod?.hls_480 !== null) {
                    setURLVideo(episod?.hls_480)
                }
            }
        }
        
    }

    function previousEpisodes() {
        const index = release?.episodes.indexOf(episodes!)
        let episod = release?.episodes[index!]
        if (!sortNew) {
            if (index! + 1 !== release?.episodes.length) {
                episod = release?.episodes[index! + 1]
                setEpisodes(episod)

                if (episod?.hls_1080 !== null) {
                    setURLVideo(episod!.hls_1080)
                } else if (episod.hls_1080 === null && episod?.hls_720 !== null) {
                    setURLVideo(episod?.hls_720)
                } else if (episod?.hls_1080 === null && episod?.hls_720 === null && episod?.hls_480 !== null) {
                    setURLVideo(episod?.hls_480)
                }
            }

        } else {
            if (index !== 0) {
                episod = release?.episodes[index! - 1]
                setEpisodes(episod)

                
                if (episod?.hls_1080 !== null) {
                    setURLVideo(episod!.hls_1080)
                } else if (episod.hls_1080 === null && episod?.hls_720 !== null) {
                    setURLVideo(episod?.hls_720)
                } else if (episod?.hls_1080 === null && episod?.hls_720 === null && episod?.hls_480 !== null) {
                    setURLVideo(episod?.hls_480)
                }
            }
        }
    }


    // function viewedAdd() {

    // }

    return (
        <div className={style.container}>
            { loading ?
                <>
                    <div className={style.flexHeader}>
                        <img className={style.img} src={`https://anilibria.top/${release?.poster.src}`} alt="" />
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
                                { release?.average_duration_of_episode !== null ? <p className={style.textMenuGray}>Время серии: <span className={style.textMenu}>{release?.average_duration_of_episode} мин</span></p> : ''} 
                            </div>
                            <div className={style.flexBtn}>
                                {favourites && !favourites.find(i =>Number(i.id_title) === release!.id) ? 
                                    <button onClick={() => addFavorites()} className={style.starBtn}><PiStarBold size={24}/> В избранное</button>
                                    : 
                                    <button onClick={() => deleteFavorites()} className={style.starBtnActive}><PiStarFill size={24}/> Добавлено</button>
                                }
                                {/* <ConfigProvider
                                    theme={{
                                        token: {
                                        colorBgElevated:"#0c0c0c",
                                        controlItemBgHover: "#1f1f1f"
                                        },
                                        components: {
                                        Button: {
                                            colorLink: '#e4e4e4',
                                            colorLinkHover: '#e4e4e4',
                                            colorLinkActive: '#e4e4e4'
                                        },
                                        
                                    },
                                }}>
                                    <Dropdown overlayClassName={style.dropdownStyle} menu={{ items }} trigger={['click']}>
                                        
                                        <button onClick={(e) => e.preventDefault()} className={style.listBtn}><PiStarBold size={24}/> Добавить в список</button>
                                        
                                    </Dropdown>
                                </ConfigProvider> */}
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
                                playing={true}
                                pip={true}
                                url={URLVideo}
                                progressInterval={5000}
                                onStart={() => seek()}
                                onProgress={(progress) => {
                                    lastEpisodes(progress)
                                }}
                            />
                            <div className={style.boxBtnNext}>
                                <button onClick={() => previousEpisodes()} className={style.btnNext}><GrPrevious/> Предыдущее</button>
                                <button onClick={() => nextEpisodes()} className={style.btnNext}>Следующее <GrNext/></button>
                            </div>
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
                            <Input style={{width:"100%"}} size="large" className={style.input} value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Введите номер эпизода..." prefix={<IoSearch size={20} color='#d56f1a'/>} />
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
                    <p style={{fontSize:'14px', marginBottom: '30px'}} className={style.textMenuGray}>Просмотрено {lastEpisodesLocal.filter((e) => e.played > 0.8 && e.id_release === release?.id).length} из {release?.episodes.length}</p>
                    <div className={style.episodesGrid}>
                        {   query === '' ?
                            release?.episodes.map((item) => 
                                <div style={{backgroundImage: `url(https://anilibria.top/${item.preview.src})`, backgroundSize: "cover" }} onClick={() => newURL(item)} className={lastEpisodesLocal.find((i) => i.release_episode_id === item.id && i.playerSeek > 1080) ? style.previewActive : style.preview} key={item.id}>
                                    <div className={style.previewAbsolute}>
                                        <div style={{padding:'10px'}}>
                                            <p className={style.previewTextMax}>{item.ordinal} эпизод</p>
                                            <p className={style.previewText}>{item.name}</p>
                                            
                                        </div>
                                    </div>
                                    {lastEpisodesLocal.find((i) => i.release_episode_id === item.id && i.played > 0.85) ? 
                                        <div>
                                            <p style={{padding:'10px', color:'#d56f1a', alignItems:'center'}} className={style.previewTextMax}>Просмотрен</p> 
                                        </div>
                                        : ''
                                    }
                                    
                                </div>
                            )
                            :
                            release?.episodes.filter((i) => i.sort_order === Number(query)).map((item) => 
                                <div style={{backgroundImage: `url(https://anilibria.top/${item.preview.src})`, backgroundSize: "cover" }} onClick={() => newURL(item)} className={lastEpisodesLocal.find((i) => i.release_episode_id === item.id && i.playerSeek > 1080) ? style.previewActive : style.preview} key={item.id}>
                                    <div className={style.previewAbsolute}>
                                        <div style={{padding:'10px'}}>
                                            <p className={style.previewTextMax}>{item.ordinal} эпизод</p>
                                            <p className={style.previewText}>{item.name}</p>
                                            
                                        </div>
                                    </div>
                                    {lastEpisodesLocal.find((i) => i.release_episode_id === item.id && i.played > 0.85) ? 
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
                                                    <img className={style.imgFranchise} src={`https://anilibria.top/${item.release.poster.preview}`} alt="" />
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
                </>
                : 
                <div>
                    <ConfigProvider
                        theme={{
                            components: {
                            Skeleton: {
                                gradientFromColor: "rgba(0, 0, 0, 0.36)"
                            },
                            
                            },
                        }}
                        >
                            <div className={style.flexHeader}>
                                <Skeleton.Image className={style.img} style={{ width: "100%", height: "500px", borderRadius: "15px"}} active={true}/>
                                <div style={{width:"100%"}}>
                                    <Skeleton.Input size='default' block={true} className={style.h1Skeleton} style={{width: '100%', marginTop:"30px", height: "40px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '60%', marginTop:"25px", height: "30px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '50%', marginTop:"20px", height: "30px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '50%', marginTop:"20px", height: "30px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '50%', marginTop:"20px", height: "30px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '50%', marginTop:"20px", height: "30px"}} active={true}/>
                                    <Skeleton.Input size='default' block={true} className={style.text} style={{width: '20%', marginTop:"20px", height: "50px"}} active={true}/>
                                </div>

                            </div>
                            <div style={{width:"100%", marginTop: '30px'}}>
                                <Skeleton.Input size='default' block={true} className={style.text} style={{width: '100%', marginTop:"20px", height: "25px"}} active={true}/>
                                <Skeleton.Input size='default' block={true} className={style.text} style={{width: '100%', marginTop:"20px", height: "25px"}} active={true}/>
                                <Skeleton.Input size='default' block={true} className={style.text} style={{width: '100%', marginTop:"20px", height: "25px"}} active={true}/>
                                <Skeleton.Input size='default' block={true} className={style.text} style={{width: '100%', marginTop:"20px", height: "25px"}} active={true}/>
                            </div>
                            <Skeleton.Input size='default' block={true} className={style.text} style={{width: '20%', marginTop:"20px", height: "50px"}} active={true}/>
                    </ConfigProvider>
                </div>
            }
        </div>
    )
}

export default AnimeMain