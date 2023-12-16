'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function LoginScreen({ handleForm, setEmail, setPassword }) {

  return (
    <main className="flex w-screen h-screen items-center">

      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100dvh]">
        <div className="hidden lg:block">
          <img
            alt="portada"
            className="h-full w-full object-cover"
            height="1080"
            src="https://res.cloudinary.com/fedexx/image/upload/v1695161045/regalos-chicas-15-anos-ideas_qzipkj.webp"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
            }}
            width="1920"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto w-[350px] space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Inicia sesión</h1>
              <p className="text-gray-500 dark:text-gray-400">Accedé con tu usuario para cargar la info que necesitamos para generar tu invitación</p>
            </div>


            <form onSubmit={handleForm}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="tumail@ejemplo.com" required type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">contraseña</Label>
                  <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button variant='default' className="w-full" type="submit">
                  Login
                </Button>

              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Algún problema? {' '}
              <Link className="underline" href="#">
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
