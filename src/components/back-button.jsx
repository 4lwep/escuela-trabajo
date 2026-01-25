'use client'
import { useRouter } from "next/navigation"


export default function BackButton({ className, children }) {

    const { back } = useRouter()

    return (
        <div className={className} onClick={back}>
            {children}
        </div>
    )
}

