'use client'
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/products/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
interface RegisterFormProps{
    currentUser: SafeUser | null
}


const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
const [isLoading, setIsloading] =useState(false)
const { register, handleSubmit, formState: {errors}} =useForm<FieldValues>({
defaultValues:{
    name:"",
    email:"",
    password:"",

},
});
const router =useRouter()
useEffect(()=>{
    if(currentUser){
        router.push("/cart");
        router.refresh();
    }
}, []);
const onSubmit: SubmitHandler<FieldValues>= (data)=>{
    setIsloading(true)
    axios.post('/api/register', data).then(()=>{
        toast.success('Cuenta Creada')

        signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false,
        }).then((callback)=>{
            if (callback?.ok){
            router.push('/cart')
            router.refresh()
            toast.success("Ingreso Correcto")
        }
        if(callback?.error){
            toast.error(callback.error)
        }
        })
    }).catch(()=>toast.error("Algo salio mal")).finally(()=>
        setIsloading(false))
    };

if(currentUser){
    return( 
   <p className="text-center">Ingresando espere por favor...</p>
)    }

    return ( 
        <>
        <Heading title="Registrate en ImportSales "/>
        <Button 
        outline
        label="Registrate con Google"
        icon= {AiOutlineGoogle}
        onClick={()=>{signIn('google', {redirect:false})}}
        />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input 
        id="name"
        label="Name"
        disabled={isLoading} 
        register={register}
        errors={errors}
        required
        
        />
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
        <Button label={isLoading ? "Cargando" : "Registrarse"} onClick={handleSubmit(onSubmit)} />
        <p className="text-sm ">Ya tienes cuenta?<Link className="underline" href="/login">Ingresar</Link></p>
        </>
        
     );
}
 
export default RegisterForm;