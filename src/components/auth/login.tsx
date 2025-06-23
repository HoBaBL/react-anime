import { ConfigProvider, Input } from "antd"
import { supabase } from "../../api"
import style from './auth.module.css'
import { useForm } from "react-hook-form"
import type {SubmitHandler} from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"

type Inputs = {
    email: string
    pasword: string,
    name:string
}

const Login = () => {
    const { register, handleSubmit} = useForm<Inputs>()
    const [loading, setLoading] = useState(false)
    const onSubmit: SubmitHandler<Inputs> = (dataForm) => {
        login(dataForm)
    }

    async function login(dataForm:any) {
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: dataForm.email,
            password: dataForm.pasword,
        })
        if (error) console.log(error)
        
        setLoading(true)
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            navigate("/")
        }
    },[loading])

    return (
        <div className={style.container}>
            <div className={style.box}>
                <h2 className={style.h2}>Вход</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={style.formLogin}>
                    <input className={style.input} {...register("email")} type="text" placeholder="Email"/>
                    <input className={style.input} {...register("pasword")} type="password" placeholder="Пароль"/>
                    <input className={style.btnLogin} type="submit" value={'Войти'}/>
                </form>
                <div className={style.textFotter}>
                    <p>
                        Нет учетной записи?
                        <Link to={`/registration`}>
                            <button className={style.link}>Зарегистрируйтесь</button>
                        </Link>
                    </p>
                </div>

            </div>
             

        </div>
    )
}

export default Login