import style from './animeMain.module.css'
import { getReleasesId, getFranchises } from '../../api'
import type { EpisodeType, Episode } from '../../types/typesEpisode'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { Modal, ConfigProvider } from 'antd';
import type { FranchisesType } from '../../types/typesFranchises' 

const AnimeMain = () => {
    const [release, setRelease] = useState<EpisodeType>() 
    const [URLVideo, setURLVideo] = useState('')
    const { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [episodes, setEpisodes] = useState<Episode>()
    const [Franchises, setFranchises] = useState<FranchisesType>()

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
                        <p className={style.textMenuGray}>Количество серий: <span className={style.textMenu}>{release?.episodes_total}</span></p>
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
                    width={'45%'}
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
                    <iframe className={style.iframe} src={`https://cr7tv.github.io/player/player2.html?url=${URLVideo}`} frameBorder="0" allowFullScreen></iframe>
                </Modal>
            </ConfigProvider>
            <div className={style.episodesGrid}>
                {
                    release?.episodes.map((item) => 
                        <div onClick={() => newURL(item)} className={style.preview} key={item.id}>
                            <div className={style.previewAbsolute}>
                                <div style={{padding:'10px'}}>
                                    <p className={style.previewTextMax}>{item.ordinal} эпизод</p>
                                    <p className={style.previewText}>{item.name}</p>
                                </div>
                            </div>
                            <img className={style.imgPreview} src={`https://anilibria.wtf/${item.preview.src}`} alt="" />
                        </div>
                    )
                }
            </div>
            <div className={style.line}></div>
            <h2 className={style.h2}>Связанное</h2>
            <div>
                <h3 className={style.h3}>{Franchises?.data[0].name}</h3>
                <p className={style.yearFranchises}>{Franchises?.data[0].first_year} - {Franchises?.data[0].last_year}</p>
                <div>
                    {Franchises?.data[0].franchise_releases.sort((a, b) => a.sort_order -b.sort_order).map((item) => 
                        <Link to={`/${item.release.alias}`} style={item.release_id === release?.id ? {backgroundColor: "#1a1919"} : {}} className={style.flexFranchise} key={item.id}>
                            <div className={item.release_id === release?.id ? style.lineVert : style.lineVertNone}></div>
                            <div className={style.flexFranchiseFlex}>
                                <img className={style.imgFranchise} src={`https://anilibria.wtf/${item.release.poster.preview}`} alt="" />
                                <div className={style.flexFlex}>
                                    <div>
                                        <p className={style.textFranchise}>{item.release.name.main}</p>
                                        <p className={style.textFranchiseEn}>{item.release.name.english}</p>
                                        <p className={style.textFranchiseEn}>{item.release.year}</p>
                                        <p className={style.textFranchiseEn}>{item.release.episodes_total} эпизодов</p>
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
        </div>
    )
}

export default AnimeMain