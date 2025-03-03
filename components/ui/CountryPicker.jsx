
'use client'

import { useRef, useState } from "react"
import { Input } from "./input"

export default function CountryPicker({ defaultCountry }) {
    const [countries, setCountries] = useState([])
    const input = useRef(null)
    function handleClick(e) {
        setCountries([])
        console.log(e.target.dataset.country)
        input.current.value = e.target.dataset.country
    }

    let timeout

    async function getCountries(e) {
        clearTimeout(timeout)
        if (e.target.value.length > 3) {
            timeout = setTimeout(async () => {
                const resp = await fetch(`https://nominatim.openstreetmap.org/search?country=${e.target.value}&format=json&accept-language=ru`)
                const geoData = await resp.json()
                setCountries(geoData)
                console.log(geoData)
            }, 2000)
        } else {
            setCountries([])
        }


    }

    return (
        <div className="relative">
            <Input defaultValue={defaultCountry} ref={input} name="country" placeholder="Введите страну" onInput={getCountries} />
            {
                countries.length > 0 && (
                    <div className="absolute w-full left-0 top-[105%] border border-blue-600">

                        {
                            countries.map(country => (
                                <div key={country.place_id}>
                                    <button type="button" onClick={handleClick} data-country={country.display_name}>{country.display_name}</button>
                                </div>
                            ))
                        }

                    </div>
                )
            }

        </div>
    )
}
