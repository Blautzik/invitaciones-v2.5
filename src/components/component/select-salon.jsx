import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"


const SelectSalon = ({ salones }) => {
    return (
        <form className="p-4 max-w-lg grid gap-4 md:gap-10">
            <div className="grid gap-2 w-240px">
                <Label className="text-base" htmlFor="plan">
                    Salón
                </Label>
                <Select defaultValue="1" className=''>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona tu salón" className="text-black" >Selecciona tu salon</SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {
                            salones.map((salon, index) =>
                                    <SelectItem value={salon} key={salon.foto_salon}> {salon.nombre} </SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}

export default SelectSalon