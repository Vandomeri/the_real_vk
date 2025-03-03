
'use client'

import { useRef, useState } from "react"
import { Input } from "./input"

export default function CityPicker({ defaultCity }) {
    const [cities, setCities] = useState([])
    const input = useRef(null)
    function handleClick(e) {
        setCities([])
        console.log(e.target.dataset.city)
        input.current.value = e.target.dataset.city
    }

    let timeout

    async function getCountries(e) {
        clearTimeout(timeout)
        if (e.target.value.length > 3) {
            timeout = setTimeout(async () => {
                const resp = await fetch(`https://nominatim.openstreetmap.org/search?city=${e.target.value}&format=json&accept-language=ru`)
                const geoData = await resp.json()
                setCities(geoData.filter((city) => city.type === 'city'))
            }, 2000)
        } else {
            setCities([])
        }


    }

    return (
        <div className="relative">
            <Input defaultValue={defaultCity} name="city" ref={input} placeholder="Введите город" onInput={getCountries} />
            {
                cities.length > 0 && (
                    <div className="absolute w-full left-0 top-[105%] border border-blue-600">

                        {
                            cities.map(city => (
                                <div key={city.place_id}>
                                    <button type="button" onClick={handleClick} data-city={city.display_name}>{city.display_name}</button>
                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    )
}
