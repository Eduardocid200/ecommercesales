import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import {MdFacebook} from 'react-icons/md'
import {AiFillTwitterCircle, AiFillInstagram} from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold">Categorías de la Tienda</h3>
                        <Link href='#'>Auriculares</Link>
                        <Link href='#'>Cargadores</Link>
                        <Link href='#'>Teclados</Link>
                        <Link href='#'>Mouses</Link>
                        <Link href='#'>Accesorios</Link>
                        <Link href='#'>Intercomunicadores</Link>
                        <Link href='#'>Convertidor de Tv</Link>
                        <Link href='#'>Consolas</Link>
                        <Link href='#'>Joysticks</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold">Servicio al Cliente</h3>
                        <Link href='#'>Contáctanos</Link>
                        <Link href='#'>Política de Envíos</Link>
                        <Link href='#'>Cambios y Devoluciones</Link>
                        <Link href='#'>FAQs</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold">Acerca de Nosotros</h3>
                        <p className="mb-2">En EcommerceSales!, estamos apasionados por la tecnología y comprometidos con brindarte la mejor experiencia de compra en línea para equipos electrónicos y accesorios de última generación. Somos una pequeña tienda de comercio electrónico que busca ofrecer productos de alta calidad, servicio excepcional y la satisfacción total de nuestros clientes.</p>
                        <p>&copy;{new Date().getFullYear()} EcommerceSales todos los derechos reservados</p>
                    </div>
                    <FooterList>
                    <h3 className="text-base font-bold">Siguenos</h3>
                    <div className="flex gap-2">
                    <Link href='#'>
                        <MdFacebook size={24}/></Link>
                    <Link href='#'>
                        <AiFillTwitterCircle size={24}/></Link>
                        <Link href='#'>
                        <AiFillInstagram size={24}/></Link>
                    </div>

                    </FooterList>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
