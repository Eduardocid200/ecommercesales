'use client'
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser: SafeUser | null
}


const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
const [isLoading, setIsloading] =useState(false)
const { register, handleSubmit, formState: {errors}} =useForm<FieldValues>({
defaultValues:{
    email:'',
    password:''

}
});
const router= useRouter()

useEffect(()=>{
    if(currentUser){
        router.push('/cart');
        router.refresh();
    }
}, [])

const onSubmit: SubmitHandler<FieldValues> = (data)=> {
    setIsloading(true);
    signIn('credentials', {
        ...data,
        redirect: false
    }).then((callback) => {
        setIsloading(false)

        if (callback?.ok){
            router.push('/cart')
            router.refresh()
            toast.success('Logueado')
        }
        if(callback?.error){
            toast.error(callback.error)
        }

    })
}
if(currentUser){
    return (<p className="text-center">Ingresando espere por favor...</p>)
}


    return ( 
        <>
        <Heading title="Ingresa en ImportSales "/>
        <Button 
        outline
        label="Continua con Google"
        icon= {AiOutlineGoogle}
        onClick={()=>{signIn('google')}}
        />
        <hr className="bg-slate-300 w-full h-px"/>
        
        <Input 
        id="email"
        label="Email"
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        
        />
        
        <Input 
        id="password"
        label="Password"
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        type="password"
        
        />
        <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />
        <p className="text-sm ">No tienes cuenta?<Link className="underline" href="/register">Registrusde</Link></p>
        </>
        
     );
    }



 
export default LoginForm;