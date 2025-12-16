// import { Instagram, Facebook, X,   Linkedin, } from "lucide-react"
// import Link from "next/link"
// export default function Footer() {
//     return (
//         <>
//                 <div className="bg-main lg:flex items-center justify-end flex-col">
//       <div className="lg:flex lg:w-[70%] p-5 items-center lg:p-10 lg:space-y-0 space-y-7">
       
//         <div className="  text-white space-y-4 w-full flex items-center flex-col text-center ">
//           <h2 className="font-grotesk text-[35px] font-semibold">Connect With Us</h2>
//           <p className='lg:text-[16px] text-[13px]'>Stay updated on our activities, events, and opportunities to get involved by following us on social media or contacting us directly.</p>
//           <ul className="font-grotesk space-y-3">
//             <li className='flex items-center gap-2'>
//              <Link className='border lg:border-[gray] hover:border-[#000000] hover:bg-[#000000]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
//               target="_blank" href="https://www.tiktok.com/@acusamedia?_t=8j75ANdvYVq&_r=1"> 
//               <Facebook /> </Link>
//               <Link className='border lg:border-[gray] hover:border-[#25d366] hover:bg-[#25d366]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
//               target="_blank" href="https://wa.me/+2347025735703?text=Hello!%20ACUSA%20MEDIA%20,%20I%20have%20saved%20your%20contact%20my%20name%20is%20_"> 
//               <X /> </Link>
//               <Link className='border lg:border-[gray] hover:border-[#1da1f2] hover:bg-[#1da1f2]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]'
//                target="_blank" href=""> 
//                <X /> </Link>
//               <Link className='border lg:border-[gray] hover:border-[#c32aa3] hover:bg-[#c32aa3]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
//               target="_blank" href="https://www.instagram.com/acusamedia?igsh=MWRqdnU1azBrN21sag%3D%3D&utm_source=qr "> 
//               <Instagram /> </Link>
//               <Link className='border lg:border-[gray] hover:border-[#fffb00bb] hover:bg-[#fffb00bb]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
//               target="_blank" href="https://">
//                 <Instagram /> </Link>
//               <Link className='border lg:border-[gray] hover:border-[#0a66c2] hover:bg-[#0a66c2]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
//               target="_blank" href="">
//                 <X/></Link>
//               <Link className='border lg:border-[gray] hover:border-[#1ed760] hover:bg-[#1ed760]  transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]'
//                target="_blank" href="https://open.spotify.com/episode/0J5FJYFmkcHM6CNn77br2G?si=nQeK9hqcTbygwXzNIJpwIQ">
//                  <X/> </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="relative w-full text-center">
//         <hr className="glass w-full " />

//         <div className="relative font-grotesk text-white p-5">
//           <p className="font-light">Copyright &copy; {new Date().getFullYear()} ACUSA MEDIA. All Rights Reserved</p>
//         </div>
//       </div>

//     </div>
//             </>
//     )
// }


import { Instagram, Facebook, X, Linkedin } from "lucide-react"
import { FaFacebookF, FaTiktok, } from "react-icons/fa";
import { BsSnapchat } from "react-icons/bs";
import Link from "next/link"

export default function Footer(): JSX.Element {
    return (
        <>
            <div className="bg-main lg:flex items-center justify-end flex-col">
                <div className="lg:flex lg:w-[70%] p-5 items-center lg:p-10 lg:space-y-0 space-y-7">
                    <div className="text-white space-y-4 w-full flex items-center flex-col text-center">
                        <h2 className="font-grotesk text-[35px] font-semibold">Connect With Us</h2>
                        <p className='lg:text-[16px] text-[13px]'>
                            Stay updated on our activities, events, and opportunities to get involved by following us on social media or contacting us directly.
                        </p>
                        <ul className="font-grotesk space-y-3">
                            <li className='flex items-center gap-2'>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#000000] hover:bg-[#000000] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
                                    target="_blank" 
                                    href="https://www.tiktok.com/@acusamedia?_t=8j75ANdvYVq&_r=1"
                                > 
                                    <FaTiktok /> 
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#25d366] hover:bg-[#25d366] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
                                    target="_blank" 
                                    href="https://wa.me/+2347025735703?text=Hello!%20ACUSA%20MEDIA%20,%20I%20have%20saved%20your%20contact%20my%20name%20is%20_"
                                > 
                                    <X /> 
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#1da1f2] hover:bg-[#1da1f2] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]'
                                    target="_blank" 
                                    href=""
                                > 
                                    <BsSnapchat/> 
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#c32aa3] hover:bg-[#c32aa3] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
                                    target="_blank" 
                                    href="https://www.instagram.com/acusamedia?igsh=MWRqdnU1azBrN21sag%3D%3D&utm_source=qr"
                                > 
                                    <Instagram /> 
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#fffb00bb] hover:bg-[#fffb00bb] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
                                    target="_blank" 
                                    href="https://"
                                >
                                    <Instagram /> 
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#0a66c2] hover:bg-[#0a66c2] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]' 
                                    target="_blank" 
                                    href=""
                                >
                                    <X />
                                </Link>
                                <Link 
                                    className='border lg:border-[gray] hover:border-[#1ed760] hover:bg-[#1ed760] transition-all ease-in-out w-6 h-6 rounded-full grid place-content-center p-[20px]'
                                    target="_blank" 
                                    href="https://open.spotify.com/episode/0J5FJYFmkcHM6CNn77br2G?si=nQeK9hqcTbygwXzNIJpwIQ"
                                >
                                    <X /> 
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="relative w-full text-center">
                    <hr className="glass w-full" />

                    <div className="relative font-grotesk text-white p-5">
                        <p className="font-light">
                            Copyright &copy; {new Date().getFullYear()} ACUSA MEDIA. All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}