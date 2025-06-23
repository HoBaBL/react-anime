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

const Register = () => {
    const { register, handleSubmit} = useForm<Inputs>()
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = (dataForm) => {
        registration(dataForm)
    }

    async function registration(dataForm: Inputs) {
        const { data, error } = await supabase.auth.signUp(
            {
            email: dataForm.email,
            password: dataForm.pasword,
            options: {
                data: {
                first_name: dataForm.name,
                }
            }
            }
        )
        if (error) console.log(error)
        data
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
                <h2 className={style.h2}>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={style.formLogin}>
                    <input className={style.input} {...register("name")} type="text" placeholder="Имя пользователя"/>
                    <input className={style.input} {...register("email")} type="text" placeholder="Email"/>
                    <input className={style.input} {...register("pasword")} type="password" placeholder="Пароль"/>
                    <input className={style.btnLogin} type="submit" value={'Зарегистрироваться'}/>
                </form>
                <div className={style.textFotter}>
                    <p>
                        У вас есть учетная запись?
                        <Link to={`/login`}>
                            <button className={style.link}>Выполните вход</button>
                        </Link>
                    </p>
                </div>
            </div>
             

        </div>
    )
}

export default Register